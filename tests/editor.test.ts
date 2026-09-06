import { randomUUID } from "node:crypto";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { Editor, parseJournal } from "../src/lib/client/editor.svelte";

const memory = new Map<string, string>();
const documents = new Map<
	string,
	{
		id: string;
		body: string;
		revision: number;
		schemaVersion: 1;
		createdAt: string;
		updatedAt: string;
	}
>();
let offline = false;
const editors: Editor[] = [];
function editor() {
	const editor = new Editor();
	editors.push(editor);
	return editor;
}
beforeEach(() => {
	memory.clear();
	documents.clear();
	offline = false;
	vi.stubGlobal("localStorage", {
		getItem: (key: string) => memory.get(key) ?? null,
		setItem: (key: string, value: string) => memory.set(key, value),
	});
	vi.stubGlobal(
		"fetch",
		vi.fn(async (path: string, options?: RequestInit) => {
			if (offline) throw new Error("Offline");
			if (path === "/api/documents")
				return Response.json(
					[...documents.values()].map((doc) => ({ ...doc, title: doc.body })),
				);
			const id = path.split("/").at(-1) || "";
			const current = documents.get(id);
			if (options?.method !== "PUT")
				return Response.json(current ?? {}, { status: current ? 200 : 404 });
			const update = JSON.parse(String(options.body));
			if (update.revision !== (current?.revision ?? 0))
				return Response.json({ current }, { status: 409 });
			const saved = {
				schemaVersion: 1 as const,
				id,
				body: update.body,
				revision: update.revision + 1,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			documents.set(id, saved);
			return Response.json(saved);
		}),
	);
});
afterEach(() => {
	for (const editor of editors) editor.destroy();
	editors.length = 0;
	vi.unstubAllGlobals();
});
it("restores an unsaved draft after browser restart and later saves it", async () => {
	const first = editor();
	await first.initialize();
	offline = true;
	first.update("Über den See\nHallo!");
	await first.flush();
	expect(first.failed).toBe(true);
	first.destroy();
	const second = editor();
	await second.initialize();
	expect(second.body).toBe("Über den See\nHallo!");
	offline = false;
	await second.flush();
	expect(documents.get(second.currentId)?.body).toBe(second.body);
	expect(parseJournal(memory.get("annelie-os.drafts.v1") || null)).toEqual([]);
});
it("keeps drafts when switching documents and preserves both conflicting versions", async () => {
	const current = editor();
	await current.initialize();
	current.update("Original");
	await current.flush();
	const oldId = current.currentId;
	const saved = documents.get(oldId);
	if (!saved) throw new Error("Missing test document");
	documents.set(oldId, { ...saved, body: "Other window", revision: 2 });
	current.update("Local version");
	current.newDocument();
	await current.flush();
	await vi.waitFor(() =>
		expect([...documents.values()].map((doc) => doc.body)).toContain(
			"Local version",
		),
	);
	expect(documents.get(oldId)?.body).toBe("Other window");
	expect(current.recovered).toBe(true);
});
it("does not remove edits made while an earlier save is in flight", async () => {
	const current = editor();
	await current.initialize();
	current.update("First");
	const flush = current.flush();
	current.update("Second");
	await flush;
	expect(documents.get(current.currentId)?.body).toBe("Second");
});
it("rejects malformed recovery records rather than silently erasing them", () => {
	expect(() =>
		parseJournal(
			JSON.stringify([{ id: randomUUID(), body: "Text", revision: -1 }]),
		),
	).toThrow();
});
