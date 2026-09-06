/** Selects a static startup design specimen, without pretending to boot Ubuntu. */
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
