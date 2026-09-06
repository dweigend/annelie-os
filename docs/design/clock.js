/** Render the analog reference as a functioning clock, not a fixed image. */
export function initializeClock() {
	const face = document.querySelector("[data-clock-face]");
	if (!face) return;
	const namespace = "http://www.w3.org/2000/svg";
	for (let hour = 1; hour <= 12; hour += 1) {
		const angle = (hour * Math.PI) / 6;
		const label = document.createElementNS(namespace, "text");
		label.setAttribute("x", String(100 + 72 * Math.sin(angle)));
		label.setAttribute("y", String(100 - 72 * Math.cos(angle)));
		label.setAttribute("class", "aos-clock-number");
		label.textContent = String(hour);
		face.append(label);
	}
	function update() {
		const now = new Date();
		const minutes = now.getMinutes();
		const hours = now.getHours() % 12;
		document
			.querySelector("[data-hour-hand]")
			.setAttribute(
				"transform",
				`rotate(${hours * 30 + minutes * 0.5} 100 100)`,
			);
		document
			.querySelector("[data-minute-hand]")
			.setAttribute("transform", `rotate(${minutes * 6} 100 100)`);
		const time = new Intl.DateTimeFormat("de-DE", {
			hour: "2-digit",
			minute: "2-digit",
		}).format(now);
		document
			.querySelector("[data-clock]")
			.setAttribute(
				"aria-label",
				`Es ist ${time} Uhr. Roter Stundenzeiger, blauer Minutenzeiger.`,
			);
	}
	update();
	setInterval(update, 60_000);
}
