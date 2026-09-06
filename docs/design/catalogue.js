/** Interactive documentation; production app behavior lives in separate projects. */

const root = document.documentElement;
const appState = document.querySelector("#app-state");
for (const button of document.querySelectorAll("[data-set-theme]")) {
	button.addEventListener("click", () => {
		root.dataset.theme = button.dataset.setTheme;
		for (const themeButton of document.querySelectorAll("[data-set-theme]"))
			themeButton.setAttribute("aria-pressed", String(themeButton === button));
		document
			.querySelector(".catalogue-editor-frame")
			.contentWindow.postMessage(
				{ type: "design-preview-theme", theme: button.dataset.setTheme },
				location.origin,
			);
	});
}
function openEditor() {
	document.querySelector("#editor").scrollIntoView();
}
for (const button of document.querySelectorAll("[data-start-writing]"))
	button.addEventListener("click", openEditor);
function updateAppState() {
	document.querySelector("#sample-app-title").textContent =
		appState.value === "empty" ? "Texten" : "Schreibspiel";
	for (const state of ["unavailable", "loading", "empty"])
		document.querySelector(`#app-${state}`).hidden = appState.value !== state;
}
appState.addEventListener("change", updateAppState);
document.querySelector("#retry-app").addEventListener("click", () => {
	document.querySelector("#retry-feedback").textContent =
		"Vorschau: Hier ist kein Spiel verbunden.";
});
for (const button of document.querySelectorAll("[data-home]"))
	button.addEventListener("click", () => {
		document.querySelector("#home").scrollIntoView();
		document
			.querySelector(".catalogue-home-frame")
			.focus({ preventScroll: true });
	});
for (const button of document.querySelectorAll("[data-demo-action]"))
	button.addEventListener("click", () => {
		document.querySelector("#action-feedback").textContent =
			`Activated: ${button.getAttribute("aria-label") || button.textContent.trim()}. Visual specimen only.`;
	});
document.querySelector("#sound-toggle").addEventListener("click", (event) => {
	const button = event.currentTarget;
	const enabled = button.getAttribute("aria-pressed") !== "true";
	button.setAttribute("aria-pressed", String(enabled));
	button.setAttribute("aria-label", enabled ? "Ton an" : "Ton aus");
});
for (const button of document.querySelectorAll("[data-number]"))
	button.addEventListener("click", () => {
		for (const number of document.querySelectorAll("[data-number]"))
			number.setAttribute("aria-pressed", String(number === button));
	});
const trashDialog = document.querySelector("#trash-dialog");
document.querySelector("#show-trash").addEventListener("click", () => {
	trashDialog.returnValue = "cancel";
	trashDialog.showModal();
});
trashDialog.addEventListener("close", () => {
	document.querySelector("#trash-feedback").textContent =
		trashDialog.returnValue === "trash"
			? "Preview: moved to trash. No real document was changed."
			: "Preview: document kept.";
});
document
	.querySelector("#show-conflict")
	.addEventListener("click", () =>
		document.querySelector("#conflict-dialog").showModal(),
	);
