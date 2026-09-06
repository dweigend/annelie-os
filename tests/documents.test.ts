import { randomUUID } from "node:crypto";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { DocumentConflict, DocumentStore } from "../src/lib/server/documents";

let directory: string;
let store: DocumentStore;
beforeEach(async () => {
	directory = await mkdtemp(join(tmpdir(), "annelie-documents-"));
	store = new DocumentStore(directory);
});
afterEach(async () => {
	await rm(directory, { recursive: true, force: true });
});
describe("durable documents", () => {
	it("survives a new store instance and retains the previous version", async () => {
		const id = randomUUID();
		await store.save(id, "Hallo Änne\nZweite Zeile", 0);
		await store.save(id, "Hallo Änne\nNoch eine Zeile", 1);
		expect((await new DocumentStore(directory).read(id))?.body).toContain(
			"Noch eine",
		);
		expect(
			JSON.parse(await readFile(join(directory, `${id}.json.bak`), "utf8"))
				.body,
		).toContain("Zweite");
		expect((await store.list())[0].title).toBe("Hallo Änne");
	});
	it("serializes competing updates and rejects a stale revision", async () => {
		const id = randomUUID();
		await store.save(id, "Original", 0);
		const results = await Promise.allSettled([
			store.save(id, "First", 1),
			store.save(id, "Second", 1),
		]);
		expect(
			results.filter((result) => result.status === "fulfilled"),
		).toHaveLength(1);
		expect(
			results.find((result) => result.status === "rejected"),
		).toMatchObject({ reason: expect.any(DocumentConflict) });
	});
	it("makes retry after a lost acknowledgement idempotent", async () => {
		const id = randomUUID();
		await store.save(id, "Text", 0);
		expect((await store.save(id, "Text", 0)).revision).toBe(1);
	});
	it("recovers a damaged primary from the last good backup", async () => {
		const id = randomUUID();
		await store.save(id, "First", 0);
		await store.save(id, "Second", 1);
		await writeFile(join(directory, `${id}.json`), "{broken");
		expect((await store.read(id))?.body).toBe("First");
	});
	it("retains unreadable originals and rejects traversal", async () => {
		const id = randomUUID();
		await writeFile(join(directory, `${id}.json`), "{broken");
		await expect(store.save(id, "Replacement", 0)).rejects.toThrow("retained");
		expect(await readFile(join(directory, `${id}.json`), "utf8")).toBe(
			"{broken",
		);
		await expect(store.read("../../secret")).rejects.toThrow("identifier");
	});
});
