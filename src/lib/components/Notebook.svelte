<script lang="ts">
	import type { Editor } from "$lib/client/editor.svelte";
	import { MAX_TEXT_LENGTH } from "$lib/shared/documents";
	import Icon from "./Icon.svelte";
	import Loading from "./Loading.svelte";
	let { editor }: { editor: Editor } = $props();
	let menu: HTMLDetailsElement;
	let writing = $state<HTMLTextAreaElement>();
	function closeMenu() {
		if (menu) menu.open = false;
	}
	function create() {
		editor.newDocument();
		closeMenu();
		writing?.focus();
	}
	async function select(id: string) {
		await editor.select(id);
		closeMenu();
		writing?.focus();
	}
</script>

<svelte:window
	onkeydown={(event) => {
		if (event.key === "Escape" && menu?.open) {
			event.preventDefault();
			closeMenu();
			writing?.focus();
		}
	}}
/>
<section class="aos-notebook os-notebook" aria-label="Texten">
	{#if editor.ready}
		<label class="aos-sr-only" for="writing">Dein Text</label>
		<textarea
			bind:this={writing}
			id="writing"
			class="aos-notebook-text"
			value={editor.body}
			oninput={(event) => editor.update(event.currentTarget.value)}
			onfocus={closeMenu}
			maxlength={MAX_TEXT_LENGTH}
			spellcheck="false"
			autocomplete="off"></textarea>
	{:else}<Loading />{/if}
	<details
		bind:this={menu}
		class="aos-notebook-menu"
		ontoggle={(event) => {
			if (event.currentTarget.open) void editor.refresh();
		}}
	>
		<summary aria-label="Meine Texte"><Icon name="file-text" /></summary>
		<div class="aos-notebook-menu-panel">
			<button
				class="aos-button aos-button-primary os-new-document"
				type="button"
				onclick={create}><Icon name="plus" />Neuer Text</button
			>
			<nav class="aos-notebook-documents" aria-label="Meine Texte">
				{#each editor.documents as document (document.id)}<button
						type="button"
						class="aos-button aos-button-quiet"
						aria-current={editor.currentId === document.id}
						onclick={() => select(document.id)}>{document.title}</button
					>{/each}
			</nav>
		</div>
	</details>
	{#if editor.failed}
		<div class="os-save-notice" role="alert">
			<span>Dein Text wartet noch aufs Speichern.</span><button
				type="button"
				class="aos-button aos-button-primary"
				onclick={() => editor.retry()}
				><Icon name="rotate-ccw" />Noch einmal</button
			>
		</div>
	{:else if editor.recovered}
		<div class="os-save-notice" role="status">
			<span>Beide Fassungen sind aufgehoben.</span><button
				type="button"
				class="aos-button aos-button-quiet"
				onclick={() => {
					editor.recovered = false;
				}}>Weiter</button
			>
		</div>
	{/if}
</section>
