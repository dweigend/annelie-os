import { randomUUID } from "node:crypto";
import {
	mkdir,
	open,
	readdir,
	readFile,
	rename,
	unlink,
} from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import {
	DOCUMENT_ID,
	type DocumentSummary,
	documentTitle,
	isDocument,
	MAX_TEXT_LENGTH,
	type WritingDocument,
} from "../shared/documents";

export class DocumentConflict extends Error {
	constructor(public current: WritingDocument | null) {
		super("Document revision conflict");
	}
}
export class DocumentStore {
	private writes = new Map<string, Promise<unknown>>();
	constructor(readonly directory: string) {}
	private path(id: string) {
		if (!DOCUMENT_ID.test(id)) throw new Error("Invalid document identifier");
		return join(this.directory, `${id}.json`);
	}
	private async atomicWrite(path: string, body: string) {
		const temporary = `${path}.${randomUUID()}.tmp`;
		try {
			const file = await open(temporary, "wx", 0o600);
			try {
				await file.writeFile(body, "utf8");
				await file.sync();
			} finally {
				await file.close();
			}
			await rename(temporary, path);
			const directory = await open(this.directory, "r");
			try {
				await directory.sync();
			} finally {
				await directory.close();
			}
		} finally {
			await unlink(temporary).catch(() => {});
		}
	}
	async read(id: string): Promise<WritingDocument | null> {
		const path = this.path(id);
		let damaged = false;
		for (const candidate of [path, `${path}.bak`]) {
			try {
				const record: unknown = JSON.parse(await readFile(candidate, "utf8"));
				if (!isDocument(record) || record.id !== id)
					throw new Error("Invalid document record");
				return record;
			} catch (error) {
				if ((error as NodeJS.ErrnoException).code !== "ENOENT") damaged = true;
			}
		}
		if (damaged)
			throw new Error("Document and backup cannot be read; originals retained");
		return null;
	}
	async list(): Promise<DocumentSummary[]> {
		await mkdir(this.directory, { recursive: true, mode: 0o700 });
		const files = await readdir(this.directory);
		const ids = new Set(
			files
				.map((file) => file.replace(/\.json(?:\.bak)?$/, ""))
				.filter((id) => DOCUMENT_ID.test(id)),
		);
		const documents = await Promise.all([...ids].map((id) => this.read(id)));
		return documents
			.filter((doc): doc is WritingDocument => doc !== null)
			.map((doc) => ({
				id: doc.id,
				revision: doc.revision,
				updatedAt: doc.updatedAt,
				title: documentTitle(doc.body),
			}))
			.sort((first, second) => second.updatedAt.localeCompare(first.updatedAt));
	}
	async save(
		id: string,
		body: string,
		revision: number,
	): Promise<WritingDocument> {
		const path = this.path(id);
		if (
			typeof body !== "string" ||
			body.length > MAX_TEXT_LENGTH ||
			!Number.isSafeInteger(revision) ||
			revision < 0
		)
			throw new Error("Invalid document update");
		const previous = this.writes.get(id) ?? Promise.resolve();
		const pending = previous
			.catch(() => {})
			.then(async () => {
				await mkdir(this.directory, { recursive: true, mode: 0o700 });
				const current = await this.read(id);
				// Retrying an acknowledged write after a lost response is idempotent.
				if (
					current &&
					current.revision === revision + 1 &&
					current.body === body
				)
					return current;
				if ((current?.revision ?? 0) !== revision)
					throw new DocumentConflict(current);
				const now = new Date().toISOString();
				const next: WritingDocument = {
					schemaVersion: 1,
					id,
					body,
					revision: revision + 1,
					createdAt: current?.createdAt ?? now,
					updatedAt: now,
				};
				if (current)
					await this.atomicWrite(`${path}.bak`, JSON.stringify(current));
				await this.atomicWrite(path, JSON.stringify(next));
				return next;
			});
		this.writes.set(id, pending);
		try {
			return await pending;
		} finally {
			if (this.writes.get(id) === pending) this.writes.delete(id);
		}
	}
}
const dataDirectory =
	process.env.ANNELIE_OS_DATA_DIR ||
	join(
		process.env.XDG_DATA_HOME || join(homedir(), ".local", "share"),
		"annelie-os",
	);
export const documents = new DocumentStore(join(dataDirectory, "documents"));
