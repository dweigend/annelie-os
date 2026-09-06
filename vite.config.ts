import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
export default defineConfig({
	plugins: [sveltekit()],
	css: {
		postcss: {
			plugins: [
				{
					postcssPlugin: "design-asset-paths",
					Declaration(declaration) {
						// Static HTML references and the production app share one canonical stylesheet.
						declaration.value = declaration.value.replaceAll(
							"../static/design/",
							"/design/",
						);
					},
				},
			],
		},
	},
	test: { include: ["tests/**/*.test.ts"], environment: "node" },
});
