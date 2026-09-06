import { type Handle, json } from "@sveltejs/kit";
import { installedApps } from "$lib/server/apps";
export const handle: Handle = async ({ event, resolve }) => {
	if (!["127.0.0.1", "localhost", "[::1]"].includes(event.url.hostname))
		return new Response("Local access only", { status: 403 });
	if (!["GET", "HEAD", "OPTIONS"].includes(event.request.method)) {
		if (
			event.request.headers.get("origin") !== event.url.origin ||
			!event.request.headers.get("content-type")?.startsWith("application/json")
		)
			return json({}, { status: 403 });
	}
	const response = await resolve(event);
	response.headers.set("X-Content-Type-Options", "nosniff");
	response.headers.set("Referrer-Policy", "no-referrer");
	response.headers.set(
		"Content-Security-Policy",
		`frame-ancestors 'none'; frame-src ${installedApps.map((app) => app.origin).join(" ") || "'none'"}; object-src 'none'; base-uri 'self'`,
	);
	if (event.url.pathname.startsWith("/api/") || event.url.pathname === "/")
		response.headers.set("Cache-Control", "no-store");
	return response;
};
