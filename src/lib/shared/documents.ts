export const MAX_TEXT_LENGTH = 200_000;
export const DOCUMENT_ID =
	/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export interface WritingDocument {
	schemaVersion: 1;
	id: string;
	body: string;
	revision: number;
	createdAt: string;
	updatedAt: string;
}
export type DocumentSummary = Pick<
	WritingDocument,
	"id" | "revision" | "updatedAt"
> & { title: string };
export function documentTitle(body: string): string {
	return body.trim().split("\n")[0]?.slice(0, 70) || "Neuer Text";
}
export function isDocument(record: unknown): record is WritingDocument {
	if (!record || typeof record !== "object") return false;
	const doc = record as WritingDocument;
	return (
		doc.schemaVersion === 1 &&
		typeof doc.id === "string" &&
		DOCUMENT_ID.test(doc.id) &&
		typeof doc.body === "string" &&
		doc.body.length <= MAX_TEXT_LENGTH &&
		Number.isSafeInteger(doc.revision) &&
		doc.revision > 0 &&
		typeof doc.createdAt === "string" &&
		Number.isFinite(Date.parse(doc.createdAt)) &&
		typeof doc.updatedAt === "string" &&
		Number.isFinite(Date.parse(doc.updatedAt))
	);
}
