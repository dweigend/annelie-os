<script lang="ts">
	import { onMount, type Snippet } from "svelte";
	import { initializeWindowResize } from "$lib/client/window-resize";
	import Icon from "./Icon.svelte";
	let {
		title,
		close,
		children,
	}: { title: string; close: () => void; children: Snippet } = $props();
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
	aria-labelledby="program-title"
	oncancel={(event) => {
		event.preventDefault();
	}}
>
	<header class="aos-window-header">
		<span aria-hidden="true"></span>
		<h1 class="aos-window-title" id="program-title">{title}</h1>
		<button
			class="aos-button aos-button-quiet"
			type="button"
			aria-label={`${title} schließen`}
			onclick={close}><Icon name="x" /></button
		>
	</header>
	{@render children()}
</dialog>
