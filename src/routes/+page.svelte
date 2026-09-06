<script lang="ts">
	import { onMount, tick } from "svelte";
	import { Editor } from "$lib/client/editor.svelte";
	import { initializeDesktopIcons } from "$lib/client/desktop-icons";
	import {
		APP_LABELS,
		type DesktopApp,
		type InstalledApp,
	} from "$lib/shared/apps";
	import AppWindow from "$lib/components/AppWindow.svelte";
	import BackgroundPicker from "$lib/components/BackgroundPicker.svelte";
	import Clock from "$lib/components/Clock.svelte";
	import ExternalApp from "$lib/components/ExternalApp.svelte";
	import Notebook from "$lib/components/Notebook.svelte";
	let active = $state<DesktopApp | null>(null);
	let scene = $state("day");
	let apps = $state<InstalledApp[]>([]);
	const editor = new Editor();
	const icons: DesktopApp[] = ["text", "math", "letters"];
	const themes = [
		"day",
		"sunrise",
		"night",
		"cream",
		"muted-night",
		"evening",
		"space",
	];
	let lastLauncher: HTMLElement;
	function open(launcher: HTMLButtonElement) {
		lastLauncher = launcher;
		active = launcher.dataset.app as DesktopApp;
	}
	async function close() {
		active = null;
		void editor.flush();
		await tick();
		lastLauncher?.focus();
	}
	function choose(next: string) {
		scene = themes.includes(next) ? next : "day";
		try {
			localStorage.setItem("annelie-os.scene.v1", scene);
		} catch {
			/* Appearance stays available for this session. */
		}
	}
	onMount(() => {
		try {
			choose(localStorage.getItem("annelie-os.scene.v1") || "day");
		} catch {
			/* Use the day scene without browser storage. */
		}
		void editor.initialize();
		void fetch("/api/apps")
			.then(async (response) => {
				if (response.ok) apps = await response.json();
			})
			.catch(() => {});
		return () => editor.destroy();
	});
</script>

<svelte:head
	><title>Annelie OS</title><meta
		name="description"
		content="Texten, rechnen und Buchstaben entdecken."
	/></svelte:head
>
<main
	class="aos-desktop aos-desktop-full os-desktop"
	data-home-scene={scene}
	data-theme={["night", "muted-night", "evening", "space"].includes(scene)
		? "evening"
		: "day"}
	aria-label="Annelie OS"
>
	<div class="aos-desktop-top"><Clock /></div>
	<nav
		class="aos-desktop-icons"
		aria-label="Programme"
		use:initializeDesktopIcons={open}
	>
		{#each icons as icon}<button
				id={`desktop-${icon}`}
				class="aos-launcher"
				aria-label={APP_LABELS[icon]}
				type="button"
				data-app={icon}
				><img
					src={`/design/icon-${icon}.png`}
					alt=""
					width="152"
					height="152"
					draggable="false"
				/></button
			>{/each}
	</nav>
	<BackgroundPicker {scene} {choose} />
	{#if active}
		<AppWindow title={APP_LABELS[active]} {close} frameless={active === "text"}>
			{#if active === "text"}<Notebook {editor} />{:else}<ExternalApp
					app={apps.find(
						(app) =>
							app.id ===
							(active === "letters" ? "letter-lerner" : "arithmetic"),
					)}
					icon={active}
				/>{/if}
		</AppWindow>
	{/if}
</main>
