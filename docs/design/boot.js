/** Selects a static identity reference; the kiosk opens home, never this page. */
const scenes = new Set([
	"day",
	"sunrise",
	"night",
	"cream",
	"muted-night",
	"evening",
	"space",
]);
const requestedScene = new URLSearchParams(location.search).get("scene");
if (scenes.has(requestedScene)) {
	document.documentElement.dataset.bootScene = requestedScene;
}
