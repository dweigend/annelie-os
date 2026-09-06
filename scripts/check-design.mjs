/** Export canonical CSS tokens and verify contrast, local assets and references. */
import assert from "node:assert/strict";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const css = readFileSync(resolve(root, "src/app.css"), "utf8");
const declarations = (block) =>
	Object.fromEntries(
		[...block.matchAll(/(--aos-[\w-]+)\s*:\s*([^;]+);/g)].map((match) => [
			match[1],
			match[2].trim(),
		]),
	);
const base = declarations(css.match(/:root\s*\{([^}]+)\}/)[1]);
const evening = declarations(
	css.match(/\[data-theme=['"]evening['"]\]\s*\{([^}]+)\}/)[1],
);
const themes = { day: base, evening: { ...base, ...evening } };
const exported = `${JSON.stringify({ version: "1.0.0", source: "src/app.css", format: "CSS custom properties; values preserve their CSS units", base, overrides: { evening } }, null, "\t")}\n`;
const writing = process.argv.includes("--write");
mkdirSync(resolve(root, "design"), { recursive: true });
if (writing) writeFileSync(resolve(root, "design/tokens.json"), exported);
assert.equal(
	readFileSync(resolve(root, "design/tokens.json"), "utf8"),
	exported,
	"Token export is stale; run with --write.",
);

function luminance(hex) {
	assert.match(hex, /^#[0-9a-f]{6}$/i);
	const channels = [1, 3, 5]
		.map((offset) => Number.parseInt(hex.slice(offset, offset + 2), 16) / 255)
		.map((channel) =>
			channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
		);
	return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

const pairs = [
	["ink", "surface", 4.5],
	["ink", "paper", 4.5],
	["ink", "canvas", 4.5],
	["muted", "surface", 4.5],
	["muted", "paper", 4.5],
	["muted", "canvas", 4.5],
	["on-primary", "primary", 4.5],
	["on-primary", "primary-hover", 4.5],
	["ink", "selected", 4.5],
	["ink", "subtle", 4.5],
	["success", "success-soft", 4.5],
	["success", "surface", 4.5],
	["warning", "warning-soft", 4.5],
	["danger", "danger-soft", 4.5],
	["danger", "surface", 4.5],
	["focus", "focus-gap", 3],
	["control-border", "paper", 3],
	["control-border", "surface", 3],
	["primary", "surface", 4.5],
	["primary", "paper", 4.5],
	["clock-ink", "clock-face", 4.5],
	["clock-hour", "clock-face", 3],
	["clock-minute", "clock-face", 3],
];
const rows = [];
for (const [theme, tokens] of Object.entries(themes))
	for (const [foreground, background, minimum] of pairs) {
		const first = luminance(tokens[`--aos-color-${foreground}`]);
		const second = luminance(tokens[`--aos-color-${background}`]);
		const ratio =
			(Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
		assert.ok(
			ratio >= minimum,
			`${theme}: ${foreground}/${background} = ${ratio}, expected ${minimum}`,
		);
		rows.push(
			`| ${theme} | ${foreground} / ${background} | ${ratio.toFixed(2)}:1 | ${minimum}:1 |`,
		);
	}
const report = `# Semantic color contrast\n\nCalculated from canonical CSS tokens, using the WCAG sRGB relative-luminance\nformula. Values are rounded only for display; assertions use full precision.\nThis verifies listed solid-color pairs, not complete accessibility conformance\nor text over arbitrary images. Decorative pastel fills are not text colors.\n\n| Theme | Foreground / background | Measured | Required |\n| --- | --- | --- | --- |\n${rows.join("\n")}\n\nReference: [W3C contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).\n`;
if (writing) writeFileSync(resolve(root, "docs/design/contrast.md"), report);
assert.equal(
	readFileSync(resolve(root, "docs/design/contrast.md"), "utf8"),
	report,
	"Contrast report is stale.",
);

for (const match of css.matchAll(/url\(['"]?([^'")]+)['"]?\)/g))
	assert.ok(
		existsSync(resolve(root, "src", match[1])),
		`Missing CSS asset: ${match[1]}`,
	);
const html = readFileSync(resolve(root, "docs/design/catalogue.html"), "utf8");
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
	const target = match[1];
	if (target.startsWith("#") || target.startsWith("http")) continue;
	assert.ok(
		existsSync(resolve(root, "docs/design", target)),
		`Missing catalogue link: ${target}`,
	);
}
assert.ok(!/<style\b|\sstyle=/i.test(html), "Styles belong in src/app.css.");
assert.ok(
	!/https?:\/\//.test(html.match(/<head>([\s\S]+?)<\/head>/)[1]),
	"Catalogue startup must not use remote assets.",
);
console.log(
	`Design system verified: ${Object.keys(base).length} base tokens, ${rows.length} contrast pairs, local assets and catalogue links.`,
);
