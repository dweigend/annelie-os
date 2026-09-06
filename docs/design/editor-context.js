/** Embedded editors use the shell title bar; standalone previews have their own. */
if (
	window.parent !== window &&
	new URLSearchParams(location.search).get("embedded") === "1"
) {
	document.documentElement.dataset.embeddedEditor = "true";
}
