import {
	DOCUMENT_ID,
	type DocumentSummary,
	isDocument,
	MAX_TEXT_LENGTH,
} from "../shared/documents";

const JOURNAL_KEY = "annelie-os.drafts.v1";
const CURRENT_KEY = "annelie-os.current-document.v1";
interface Draft {
	id: string;
	body: string;
	revision: number;
}
export function parseJournal(raw: string | null): Draft[] {
	const records: unknown = JSON.parse(raw || "[]");
	if (
		!Array.isArray(records) ||
		records.some(
			(doc) =>
				!doc ||
				!DOCUMENT_ID.test(doc.id) ||
				typeof doc.body !== "string" ||
				doc.body.length > MAX_TEXT_LENGTH ||
				!Number.isSafeInteger(doc.revision) ||
				doc.revision < 0,
		)
	)
		throw new Error("Invalid draft journal");
	return records;
}
/** Own drafts independently of mounted windows; server acknowledgement clears only matching edits. */
export class Editor {
	body = $state("");
	currentId = $state("");
	documents = $state<DocumentSummary[]>([]);
	ready = $state(false);
	failed = $state(false);
	recovered = $state(false);
	private drafts = new Map<string, Draft>();
	private revision = 0;
	private pending: Promise<void> | undefined;
	private unreadableId: string | null = null;
	private timer: ReturnType<typeof setTimeout> | undefined;
	private storageAvailable = true;
	private selection = 0;
	private journalDamaged = false;
	private destroyed = false;
	private async request(path: string, options?: RequestInit) {
		return fetch(path, { ...options, signal: AbortSignal.timeout(8000) });
	}
	private remember() {
		try {
			if (this.journalDamaged) throw new Error("Preserve unreadable journal");
			localStorage.setItem(
				JOURNAL_KEY,
				JSON.stringify([...this.drafts.values()]),
			);
			localStorage.setItem(CURRENT_KEY, this.currentId);
			this.storageAvailable = true;
		} catch {
			this.storageAvailable = false;
			this.failed = true;
		}
	}
	async initialize() {
		try {
			for (const draft of parseJournal(localStorage.getItem(JOURNAL_KEY)))
				this.drafts.set(draft.id, draft);
		} catch {
			this.journalDamaged = true;
			this.failed = true;
		}
		let id: string | null = null;
		try {
			id = localStorage.getItem(CURRENT_KEY);
		} catch {
			this.storageAvailable = false;
		}
		if (id && DOCUMENT_ID.test(id)) await this.select(id);
		else {
			this.currentId = crypto.randomUUID();
			this.ready = true;
		}
		await this.refresh();
		await this.flush();
	}
	async refresh() {
		try {
			const response = await this.request("/api/documents");
			if (!response.ok) throw new Error("Document list unavailable");
			this.documents = await response.json();
		} catch {
			this.failed = true;
		}
	}
	update(body: string) {
		this.body = body;
		this.drafts.set(this.currentId, {
			id: this.currentId,
			body,
			revision: this.revision,
		});
		this.remember();
		clearTimeout(this.timer);
		this.timer = setTimeout(() => void this.flush(), 500);
	}
	async select(id: string) {
		const selection = ++this.selection;
		this.unreadableId = id;
		this.ready = false;
		const draft = this.drafts.get(id);
		if (draft) {
			this.currentId = id;
			this.body = draft.body;
			this.revision = draft.revision;
			this.ready = true;
			this.unreadableId = null;
			this.remember();
			return;
		}
		try {
			const response = await this.request(`/api/documents/${id}`);
			const doc: unknown =
				response.status === 404 ? null : await response.json();
			if (response.status !== 404 && (!response.ok || !isDocument(doc)))
				throw new Error("Document unavailable");
			if (selection !== this.selection || this.destroyed) return;
			this.currentId = id;
			this.body = isDocument(doc) ? doc.body : "";
			this.revision = isDocument(doc) ? doc.revision : 0;
			this.ready = true;
			this.unreadableId = null;
			this.remember();
		} catch {
			this.failed = true; /* Keep the previous draft intact on read failure. */
		}
	}
	newDocument() {
		this.selection += 1;
		this.unreadableId = null;
		this.currentId = crypto.randomUUID();
		this.body = "";
		this.revision = 0;
		this.ready = true;
		this.remember();
		void this.flush();
	}
	async retry() {
		if (this.unreadableId) await this.select(this.unreadableId);
		else if (!this.ready) {
			this.ready = true;
			this.currentId = crypto.randomUUID();
		}
		await this.flush();
		await this.refresh();
	}
	async flush(): Promise<void> {
		clearTimeout(this.timer);
		if (this.destroyed) return;
		if (this.pending) {
			await this.pending;
			if (this.drafts.size && !this.failed) await this.flush();
			return;
		}
		this.pending = this.saveDrafts().finally(() => {
			this.pending = undefined;
		});
		await this.pending;
	}
	private async saveDrafts() {
		try {
			for (const [id] of this.drafts) {
				let draft = this.drafts.get(id);
				while (draft && !this.destroyed) {
					const sent = { ...draft };
					const response = await this.request(`/api/documents/${id}`, {
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ body: sent.body, revision: sent.revision }),
					});
					if (response.status === 409) {
						// Preserve both versions: save local edits as a new document, never overwrite remote changes.
						const local = this.drafts.get(id) || sent;
						const copyId = crypto.randomUUID();
						this.drafts.set(copyId, { ...local, id: copyId, revision: 0 });
						this.drafts.delete(id);
						if (this.currentId === id) {
							this.currentId = copyId;
							this.revision = 0;
						}
						this.recovered = true;
						this.remember();
						break;
					}
					const saved: unknown = await response.json();
					if (!response.ok || !isDocument(saved))
						throw new Error("Save failed");
					const local = this.drafts.get(id);
					if (this.currentId === id) this.revision = saved.revision;
					if (local?.body === sent.body) this.drafts.delete(id);
					else if (local)
						this.drafts.set(id, { ...local, revision: saved.revision });
					this.remember();
					draft = this.drafts.get(id);
				}
			}
			this.failed =
				!this.storageAvailable ||
				this.journalDamaged ||
				this.unreadableId !== null;
			await this.refresh();
		} catch {
			this.failed = true;
		}
	}
	destroy() {
		this.destroyed = true;
		clearTimeout(this.timer);
	}
}
