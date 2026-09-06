import { json, type RequestHandler } from "@sveltejs/kit";
import { DocumentConflict, documents } from "$lib/server/documents";
import { DOCUMENT_ID, MAX_TEXT_LENGTH } from "$lib/shared/documents";
export const GET: RequestHandler = async ({ params }) => {
	if (!params.id || !DOCUMENT_ID.test(params.id))
		return json({}, { status: 400 });
	try {
		const doc = await documents.read(params.id);
		return doc ? json(doc) : json({}, { status: 404 });
	} catch (error) {
		console.error("Document read failed", error);
		return json({ error: "storage-unavailable" }, { status: 503 });
	}
};
export const PUT: RequestHandler = async ({ request, params }) => {
	if (!params.id || !DOCUMENT_ID.test(params.id))
		return json({}, { status: 400 });
	let update: { body?: unknown; revision?: unknown };
	try {
		update = await request.json();
	} catch {
		return json({}, { status: 400 });
	}
	if (
		!update ||
		typeof update.body !== "string" ||
		update.body.length > MAX_TEXT_LENGTH ||
		typeof update.revision !== "number" ||
		!Number.isSafeInteger(update.revision) ||
		update.revision < 0
	)
		return json({}, { status: 400 });
	try {
		return json(await documents.save(params.id, update.body, update.revision));
	} catch (error) {
		if (error instanceof DocumentConflict)
			return json({ current: error.current }, { status: 409 });
		console.error("Document save failed", error);
		return json({ error: "storage-unavailable" }, { status: 503 });
	}
};
