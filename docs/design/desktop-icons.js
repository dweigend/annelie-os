const POSITION_KEY = "annelie-os.preview.icon-positions";
const DRAG_THRESHOLD = 6;
const KEYBOARD_STEP = 16;

/** Free desktop placement; geometry updates existing app.css rules, never inline styles. */
export function initializeDesktopIcons(openProgram) {
	const workspace = document.querySelector(".aos-desktop-icons");
	const launchers = [...workspace.querySelectorAll("[data-app]")];
	const stylesheet = [...document.styleSheets].find((sheet) =>
		sheet.href?.endsWith("/src/app.css"),
	);
	const positions = {};
	let savedPositions = {};
	try {
		const saved = JSON.parse(localStorage.getItem(POSITION_KEY) || "{}");
		if (saved && typeof saved === "object") savedPositions = saved;
	} catch {
		// Missing or damaged preferences do not prevent using the desktop.
	}
	function save() {
		try {
			localStorage.setItem(POSITION_KEY, JSON.stringify(positions));
		} catch {
			/* Placement remains usable for this visit without browser storage. */
		}
	}
	function place(launcher, x, y) {
		const maxX = Math.max(0, workspace.clientWidth - launcher.offsetWidth);
		const maxY = Math.max(0, workspace.clientHeight - launcher.offsetHeight);
		const boundedX = Math.max(0, Math.min(maxX, x));
		const boundedY = Math.max(0, Math.min(maxY, y));
		const rule = [...stylesheet.cssRules].find(
			(entry) => entry.selectorText === `#${launcher.id}`,
		);
		rule.style.setProperty("left", `${boundedX}px`);
		rule.style.setProperty("top", `${boundedY}px`);
		positions[launcher.dataset.app] = {
			x: maxX ? boundedX / maxX : 0,
			y: maxY ? boundedY / maxY : 0,
		};
	}
	function restore(launcher, position) {
		place(
			launcher,
			position.x * Math.max(0, workspace.clientWidth - launcher.offsetWidth),
			position.y * Math.max(0, workspace.clientHeight - launcher.offsetHeight),
		);
	}
	for (const launcher of launchers) {
		const saved = savedPositions[launcher.dataset.app];
		if (Number.isFinite(saved?.x) && Number.isFinite(saved?.y))
			restore(launcher, saved);
		else place(launcher, launcher.offsetLeft, launcher.offsetTop);
		let drag;
		let suppressClick = false;
		launcher.addEventListener("pointerdown", (event) => {
			if (event.button !== 0 || !event.isPrimary) return;
			suppressClick = false;
			drag = {
				id: event.pointerId,
				x: event.clientX,
				y: event.clientY,
				left: launcher.offsetLeft,
				top: launcher.offsetTop,
				moved: false,
			};
			launcher.setPointerCapture(event.pointerId);
		});
		launcher.addEventListener("pointermove", (event) => {
			if (!drag || event.pointerId !== drag.id) return;
			const dx = event.clientX - drag.x;
			const dy = event.clientY - drag.y;
			if (!drag.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
			drag.moved = true;
			launcher.classList.add("is-dragging");
			place(launcher, drag.left + dx, drag.top + dy);
		});
		launcher.addEventListener("pointerup", (event) => {
			if (!drag || event.pointerId !== drag.id) return;
			suppressClick = drag.moved;
			if (drag.moved) save();
			drag = undefined;
			launcher.classList.remove("is-dragging");
		});
		launcher.addEventListener("lostpointercapture", () => {
			if (drag) place(launcher, drag.left, drag.top);
			drag = undefined;
			launcher.classList.remove("is-dragging");
		});
		launcher.addEventListener("click", (event) => {
			if (suppressClick && event.detail !== 0) {
				suppressClick = false;
				event.preventDefault();
				return;
			}
			openProgram(launcher);
		});
		launcher.addEventListener("keydown", (event) => {
			const direction = {
				ArrowLeft: [-1, 0],
				ArrowRight: [1, 0],
				ArrowUp: [0, -1],
				ArrowDown: [0, 1],
			}[event.key];
			if (!event.altKey || !direction) return;
			event.preventDefault();
			place(
				launcher,
				launcher.offsetLeft + direction[0] * KEYBOARD_STEP,
				launcher.offsetTop + direction[1] * KEYBOARD_STEP,
			);
			save();
		});
	}
	window.addEventListener("resize", () => {
		for (const launcher of launchers)
			restore(launcher, positions[launcher.dataset.app]);
	});
}
