import { json } from "@sveltejs/kit";
export function GET() {
	return json({ status: "ok", application: "annelie-os", version: "1.0.0" });
}
