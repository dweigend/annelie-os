import { json, type RequestHandler } from "@sveltejs/kit";
import { checkApp, installedApps } from "$lib/server/apps";
export const GET: RequestHandler = async ({ params }) => {
	const app = installedApps.find((entry) => entry.id === params.id);
	if (!app) return json({}, { status: 404 });
	return json({ ready: await checkApp(app) });
};
