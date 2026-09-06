import { readFileSync } from "node:fs";
import type { InstalledApp } from "../shared/apps";
export function validateApps(config: unknown): InstalledApp[] {
	if (!Array.isArray(config))
		throw new Error("App configuration must be an array");
	const ids = new Set();
	const origins = new Set();
	return config.map((app) => {
		if (
			!app ||
			!["letter-lerner", "arithmetic"].includes(app.id) ||
			typeof app.label !== "string" ||
			app.label.length > 40 ||
			app.bridgeVersion !== 1
		)
			throw new Error("Invalid app manifest");
		const origin = new URL(app.origin);
		if (
			origin.protocol !== "http:" ||
			origin.hostname !== "127.0.0.1" ||
			!origin.port ||
			origin.username ||
			origin.password ||
			origin.origin !== app.origin ||
			origin.port === (process.env.PORT || "3000")
		)
			throw new Error("Apps require distinct loopback origins");
		for (const path of [app.entryPath, app.healthPath]) {
			if (
				typeof path !== "string" ||
				!path.startsWith("/") ||
				path.startsWith("//") ||
				path.includes("\\") ||
				new URL(path, origin).origin !== origin.origin
			)
				throw new Error("Invalid app path");
		}
		if (ids.has(app.id) || origins.has(app.origin))
			throw new Error("Duplicate app");
		ids.add(app.id);
		origins.add(app.origin);
		return {
			id: app.id,
			label: app.label,
			origin: app.origin,
			entryPath: app.entryPath,
			healthPath: app.healthPath,
			bridgeVersion: 1,
		};
	});
}
const defaults: InstalledApp[] = [
	{
		id: "letter-lerner",
		label: "Schreibspiel",
		origin: "http://127.0.0.1:3001",
		entryPath: "/?embedded=1",
		healthPath: "/healthz",
		bridgeVersion: 1,
	},
];
export const installedApps = validateApps(
	process.env.ANNELIE_OS_APPS_FILE
		? JSON.parse(readFileSync(process.env.ANNELIE_OS_APPS_FILE, "utf8"))
		: defaults,
);
export async function checkApp(app: InstalledApp): Promise<boolean> {
	try {
		const response = await fetch(new URL(app.healthPath, app.origin), {
			signal: AbortSignal.timeout(2500),
			redirect: "error",
		});
		await response.body?.cancel();
		return response.ok;
	} catch {
		return false;
	}
}
