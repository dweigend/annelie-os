<script lang="ts">
	let { icon }: { icon?: string } = $props();
</script>

<div class="os-loading" role="status" aria-label="Wird geöffnet">
	{#if icon}<img
			src={`/design/icon-${icon}.png`}
			width="96"
			height="96"
			alt=""
		/>{/if}
	<span class="aos-loading-dots" aria-hidden="true"
		><i class="aos-loading-dot"></i><i class="aos-loading-dot"></i><i
			class="aos-loading-dot"
		></i><i class="aos-loading-dot"></i></span
	>
</div>
