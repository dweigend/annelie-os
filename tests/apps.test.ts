import { describe, expect, it } from "vitest";
import { validateApps } from "../src/lib/server/apps";

const app = {
	id: "letter-lerner",
	label: "Schreibspiel",
	origin: "http://127.0.0.1:3001",
	entryPath: "/?embedded=1",
	healthPath: "/healthz",
	bridgeVersion: 1,
};
describe("installed app boundary", () => {
	it("accepts a separate loopback app", () =>
		expect(validateApps([app])).toEqual([app]));
	it.each([
		"https://example.com",
		"http://localhost:3001",
		"http://127.0.0.1:3000",
		"http://user@127.0.0.1:3001",
	])("rejects unsafe or shared origins: %s", (origin) =>
		expect(() => validateApps([{ ...app, origin }])).toThrow());
	it("rejects duplicate apps and escaping paths", () => {
		expect(() => validateApps([app, app])).toThrow();
		expect(() =>
			validateApps([{ ...app, entryPath: "//example.com" }]),
		).toThrow();
	});
});
