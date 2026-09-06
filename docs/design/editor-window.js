import { initializeWindowResize } from "./window-resize.js";

if (document.documentElement.dataset.embeddedEditor !== "true") {
	initializeWindowResize(document.querySelector(".aos-editor-window"));
}
