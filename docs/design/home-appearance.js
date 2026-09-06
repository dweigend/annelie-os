/** Apply the selected local preview background before the home screen paints. */
const homeScenes = new Set([
	"day",
	"sunrise",
	"night",
	"cream",
	"muted-night",
	"evening",
	"space",
]);
const darkHomeScenes = new Set(["night", "muted-night", "space"]);
const preferenceKey = "annelie-os.preview.background";
const selectedScene = new URLSearchParams(location.search).get("scene");
let homeScene = homeScenes.has(selectedScene) ? selectedScene : "day";
try {
	if (homeScenes.has(selectedScene)) {
		localStorage.setItem(preferenceKey, selectedScene);
	} else {
		const savedScene = localStorage.getItem(preferenceKey);
		if (homeScenes.has(savedScene)) homeScene = savedScene;
	}
} catch {
	// Background selection still works when browser storage is unavailable.
}
document.documentElement.dataset.homeScene = homeScene;
document.documentElement.dataset.theme = darkHomeScenes.has(homeScene)
	? "evening"
	: "day";
