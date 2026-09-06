import { initializeClock } from "./clock.js";

initializeClock();
for (const button of document.querySelectorAll("[data-game]")) {
	button.addEventListener("click", () => {
		document.querySelector("#game-preview-title").textContent =
			button.dataset.game;
		document.querySelector("#game-preview-dialog").showModal();
	});
}
