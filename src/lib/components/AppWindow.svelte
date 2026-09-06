<script lang="ts">
	import { onMount, type Snippet } from "svelte";
	import { initializeWindowResize } from "$lib/client/window-resize";
	import Icon from "./Icon.svelte";
	let {
		title,
		close,
		children,
		frameless = false,
	}: {
		title: string;
		close: () => void;
		children: Snippet;
		frameless?: boolean;
	} = $props();
	let windowElement: HTMLDialogElement;
	onMount(() => {
		windowElement.showModal();
		return () => windowElement.close();
	});
</script>

<dialog
	bind:this={windowElement}
	use:initializeWindowResize
	class="aos-window aos-program-window"
	class:os-notebook-window={frameless}
	aria-labelledby="program-title"
	oncancel={(event) => {
		event.preventDefault();
	}}
>
	{#if frameless}
		<h1 class="aos-sr-only" id="program-title">{title}</h1>
		<button
			type="button"
			class="os-notebook-drag"
			data-window-drag
			aria-label="Block verschieben"
			title="Block verschieben · Ziehen oder Pfeiltasten"
		></button>
		<button
			type="button"
			class="os-notebook-close"
			aria-label={`${title} schließen`}
			onclick={close}><Icon name="x" /></button
		>
	{:else}
		<header class="aos-window-header">
			<span aria-hidden="true"></span>
			<h1 class="aos-window-title" id="program-title">{title}</h1>
			<button
				type="button"
				class="os-window-drag"
				data-window-drag
				aria-label={`${title} verschieben`}
				title="Fenster verschieben · Ziehen oder Pfeiltasten"
			></button>
			<button
				class="aos-button aos-button-quiet"
				type="button"
				aria-label={`${title} schließen`}
				onclick={close}><Icon name="x" /></button
			>
		</header>
	{/if}
	{@render children()}
</dialog>
