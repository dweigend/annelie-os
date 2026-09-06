<script lang="ts">
	import Icon from "./Icon.svelte";
	let { scene, choose }: { scene: string; choose: (scene: string) => void } =
		$props();
	const scenes = [
		{ id: "day", name: "Tag" },
		{ id: "sunrise", name: "Sonnenaufgang" },
		{ id: "night", name: "Nacht" },
		{ id: "cream", name: "Morgenlicht" },
		{ id: "muted-night", name: "Dunkel" },
		{ id: "evening", name: "Abend" },
		{ id: "space", name: "Weltall" },
	];
	let picker: HTMLDetailsElement;
</script>

<details class="os-appearance" bind:this={picker}>
	<summary class="aos-home-background" aria-label="Hintergrund wählen"
		><Icon name="sun" /></summary
	>
	<div class="os-backgrounds" role="group" aria-label="Hintergrund">
		{#each scenes as option}<button
				type="button"
				aria-label={option.name}
				aria-pressed={scene === option.id}
				onclick={() => {
					choose(option.id);
					picker.open = false;
				}}
				><img
					src={`/design/background-${option.id}.png`}
					alt=""
					loading="lazy"
				/></button
			>{/each}
	</div>
</details>
