import { json } from "@sveltejs/kit";
import { installedApps } from "$lib/server/apps";
export function GET() {
	return json(installedApps);
}
