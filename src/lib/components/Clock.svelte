<script lang="ts">
	import { onMount } from "svelte";
	let now = $state(new Date());
	onMount(() => {
		const timer = setInterval(() => {
			now = new Date();
		}, 30_000);
		return () => clearInterval(timer);
	});
	const hours = Array.from({ length: 12 }, (_, index) => index + 1);
</script>

<svg
	class="aos-clock"
	viewBox="0 0 200 200"
	role="img"
	aria-label={`Es ist ${now.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })} Uhr`}
>
	<title>Analoge Uhr</title>
	<circle class="aos-clock-rim" cx="100" cy="100" r="94" />
	{#each hours as hour}<text
			class="aos-clock-number"
			x={100 + 72 * Math.sin((hour * Math.PI) / 6)}
			y={100 - 72 * Math.cos((hour * Math.PI) / 6)}>{hour}</text
		>{/each}
	<line
		class="aos-clock-hour"
		x1="100"
		y1="100"
		x2="100"
		y2="53"
		transform={`rotate(${(now.getHours() % 12) * 30 + now.getMinutes() * 0.5} 100 100)`}
	/>
	<line
		class="aos-clock-minute"
		x1="100"
		y1="100"
		x2="100"
		y2="31"
		transform={`rotate(${now.getMinutes() * 6} 100 100)`}
	/>
	<circle class="aos-clock-pin" cx="100" cy="100" r="8" />
</svg>
