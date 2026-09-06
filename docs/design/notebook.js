/** Minimal editor design specimen. Documents are intentionally in memory only. */
const writing = document.querySelector("#notebook-text");
const menu = document.querySelector("#notebook-menu");
const list = document.querySelector("#notebook-documents");
const drafts = new Map([["first", ""]]);
let activeDocument = "first";
let sequence = 0;

function renderDocuments() {
	list.replaceChildren();
	for (const [id, text] of drafts) {
		const button = document.createElement("button");
		button.type = "button";
		button.className = "aos-button aos-button-quiet";
		button.textContent = text.split("\n")[0].slice(0, 32) || "Leeres Blatt";
		button.setAttribute("aria-current", String(id === activeDocument));
		button.addEventListener("click", () => {
			activeDocument = id;
			writing.value = drafts.get(id);
			menu.open = false;
			writing.focus();
		});
		list.append(button);
	}
}

writing.addEventListener("input", () =>
	drafts.set(activeDocument, writing.value),
);
document.querySelector("#notebook-new").addEventListener("click", () => {
	activeDocument = `draft-${++sequence}`;
	drafts.set(activeDocument, "");
	writing.value = "";
	menu.open = false;
	writing.focus();
});
menu.addEventListener("toggle", () => {
	if (menu.open) renderDocuments();
});
document.addEventListener("keydown", (event) => {
	if (event.key !== "Escape" || !menu.open) return;
	menu.open = false;
	menu.querySelector("summary").focus();
});
document.addEventListener("click", (event) => {
	if (!menu.contains(event.target)) menu.open = false;
});
window.addEventListener("message", (event) => {
	if (event.origin !== location.origin || event.source !== parent) return;
	if (event.data?.type !== "design-preview-theme") return;
	if (!["day", "evening"].includes(event.data.theme)) return;
	document.documentElement.dataset.theme = event.data.theme;
});
writing.setSelectionRange(writing.value.length, writing.value.length);

// Opening the standalone writing app places the caret ready for typing.
if (window.top === window.self) writing.focus();
