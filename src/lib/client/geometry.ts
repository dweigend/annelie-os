/** Dynamic placement updates a central CSS rule; markup never receives inline styles. */
export function geometryRule(selector: string): CSSStyleDeclaration {
	for (const sheet of document.styleSheets) {
		try {
			for (const rule of sheet.cssRules) {
				if (rule instanceof CSSStyleRule && rule.selectorText === selector)
					return rule.style;
			}
		} catch {
			/* Ignore browser-managed or cross-origin stylesheets. */
		}
	}
	throw new Error(`Missing geometry rule: ${selector}`);
}
