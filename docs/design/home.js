import { initializeClock } from "./clock.js";
import { initializeDesktopIcons } from "./desktop-icons.js";
import { initializeWindowResize } from "./window-resize.js";

const programWindow = document.querySelector("#program-window");
const editorFrame = document.querySelector("#editor-frame");
const gamePreview = document.querySelector("#game-preview");
const closeButton = document.querySelector("#program-close");
const titles = { text: "Texten", math: "Rechnen", letters: "Schreibspiel" };
let activeLauncher;

function openProgram(launcher) {
	activeLauncher = launcher;
	const editor = launcher.dataset.app === "text";
	document.querySelector("#program-title").textContent =
		titles[launcher.dataset.app];
	closeButton.setAttribute(
		"aria-label",
		`${titles[launcher.dataset.app]} schließen`,
	);
	editorFrame.hidden = !editor;
	gamePreview.hidden = editor;
	if (editor && !editorFrame.hasAttribute("src")) {
		editorFrame.src = "editor.html?embedded=1";
	}
	programWindow.showModal();
	if (editor) editorFrame.contentDocument?.querySelector("textarea")?.focus();
}
editorFrame.addEventListener("load", () => {
	if (programWindow.open && !editorFrame.hidden) {
		editorFrame.contentDocument?.querySelector("textarea")?.focus();
	}
});
closeButton.addEventListener("click", () => programWindow.close());
programWindow.addEventListener("close", () => activeLauncher?.focus());
initializeClock();
initializeWindowResize(programWindow);
initializeDesktopIcons(openProgram);
