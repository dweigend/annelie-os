import { geometryRule } from "./geometry";

const MIN_WIDTH = 480;
const MIN_HEIGHT = 320;
const DESKTOP_MARGIN = 16;
const KEYBOARD_STEP = 16;
const KEYBOARD_DIRECTIONS = {
	ArrowLeft: [-1, 0],
	ArrowRight: [1, 0],
	ArrowUp: [0, -1],
	ArrowDown: [0, 1],
};
const clamp = (value, minimum, maximum) =>
	Math.max(minimum, Math.min(maximum, value));

/** Resize a shell window and move its optional paper grip without remounting content. */
export function initializeWindowResize(programWindow) {
	const geometry = geometryRule(".aos-window-sized");
	programWindow.classList.add("aos-resizable-window");
	let drag;
	let lastBounds;

	function applyBounds(left, top, right, bottom) {
		lastBounds = { left, top, right, bottom };
		for (const [property, value] of Object.entries({
			left,
			top,
			width: right - left,
			height: bottom - top,
		}))
			geometry.setProperty(property, `${value}px`);
		programWindow.classList.add("aos-window-sized");
	}

	function resize(bounds, edge, dx, dy) {
		let { left, top, right, bottom } = bounds;
		const minWidth = Math.min(MIN_WIDTH, innerWidth - 2 * DESKTOP_MARGIN);
		const minHeight = Math.min(MIN_HEIGHT, innerHeight - 2 * DESKTOP_MARGIN);
		if (edge.includes("w"))
			left = clamp(left + dx, DESKTOP_MARGIN, right - minWidth);
		if (edge.includes("e"))
			right = clamp(right + dx, left + minWidth, innerWidth - DESKTOP_MARGIN);
		if (edge.includes("n"))
			top = clamp(top + dy, DESKTOP_MARGIN, bottom - minHeight);
		if (edge.includes("s"))
			bottom = clamp(
				bottom + dy,
				top + minHeight,
				innerHeight - DESKTOP_MARGIN,
			);
		applyBounds(left, top, right, bottom);
	}

	function finishResize() {
		drag = undefined;
		programWindow.classList.remove("is-resizing", "is-moving");
	}

	function beginDrag(event, handle, className) {
		if (event.button !== 0 || !event.isPrimary) return;
		event.preventDefault();
		drag = {
			id: event.pointerId,
			x: event.clientX,
			y: event.clientY,
			bounds: programWindow.getBoundingClientRect(),
		};
		handle.setPointerCapture(event.pointerId);
		programWindow.classList.add(className);
	}

	function move(bounds, dx, dy) {
		const left = clamp(
			bounds.left + dx,
			DESKTOP_MARGIN,
			innerWidth - DESKTOP_MARGIN - bounds.width,
		);
		const top = clamp(
			bounds.top + dy,
			DESKTOP_MARGIN,
			innerHeight - DESKTOP_MARGIN - bounds.height,
		);
		applyBounds(left, top, left + bounds.width, top + bounds.height);
	}

	for (const handle of programWindow.querySelectorAll("[data-window-drag]")) {
		handle.addEventListener("pointerdown", (event) =>
			beginDrag(event, handle, "is-moving"),
		);
		handle.addEventListener("pointermove", (event) => {
			if (!drag || drag.id !== event.pointerId) return;
			move(drag.bounds, event.clientX - drag.x, event.clientY - drag.y);
		});
		handle.addEventListener("pointerup", finishResize);
		handle.addEventListener("lostpointercapture", finishResize);
		handle.addEventListener("keydown", (event) => {
			const direction = KEYBOARD_DIRECTIONS[event.key];
			if (!direction) return;
			event.preventDefault();
			move(
				programWindow.getBoundingClientRect(),
				direction[0] * KEYBOARD_STEP,
				direction[1] * KEYBOARD_STEP,
			);
		});
	}

	for (const edge of ["n", "e", "s", "w", "ne", "nw", "sw", "se"]) {
		const handle = document.createElement(edge === "se" ? "button" : "span");
		handle.className = `aos-resize-handle aos-resize-${edge}`;
		if (edge === "se") {
			handle.type = "button";
			handle.setAttribute("aria-label", "Fenstergröße ändern");
			handle.title = "Fenstergröße ändern · Ziehen oder Pfeiltasten";
			handle.addEventListener("keydown", (event) => {
				const direction = KEYBOARD_DIRECTIONS[event.key];
				if (!direction) return;
				event.preventDefault();
				resize(
					programWindow.getBoundingClientRect(),
					edge,
					direction[0] * KEYBOARD_STEP,
					direction[1] * KEYBOARD_STEP,
				);
			});
		} else handle.setAttribute("aria-hidden", "true");
		handle.addEventListener("pointerdown", (event) => {
			beginDrag(event, handle, "is-resizing");
		});
		handle.addEventListener("pointermove", (event) => {
			if (!drag || drag.id !== event.pointerId) return;
			resize(drag.bounds, edge, event.clientX - drag.x, event.clientY - drag.y);
		});
		handle.addEventListener("pointerup", finishResize);
		handle.addEventListener("lostpointercapture", finishResize);
		programWindow.append(handle);
	}
	programWindow.addEventListener("close", finishResize);
	const fitViewport = () => {
		if (!lastBounds) return;
		const width = Math.min(
			lastBounds.right - lastBounds.left,
			innerWidth - 2 * DESKTOP_MARGIN,
		);
		const height = Math.min(
			lastBounds.bottom - lastBounds.top,
			innerHeight - 2 * DESKTOP_MARGIN,
		);
		const left = clamp(
			lastBounds.left,
			DESKTOP_MARGIN,
			innerWidth - DESKTOP_MARGIN - width,
		);
		const top = clamp(
			lastBounds.top,
			DESKTOP_MARGIN,
			innerHeight - DESKTOP_MARGIN - height,
		);
		applyBounds(left, top, left + width, top + height);
	};
	window.addEventListener("resize", fitViewport);
	return {
		destroy() {
			window.removeEventListener("resize", fitViewport);
		},
	};
}
