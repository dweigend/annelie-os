import { json } from "@sveltejs/kit";
import { documents } from "$lib/server/documents";
export async function GET() {
	try {
		return json(await documents.list());
	} catch (error) {
		console.error("Document listing failed", error);
		return json({ error: "storage-unavailable" }, { status: 503 });
	}
}
