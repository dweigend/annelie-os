<script lang="ts">
	import { onMount } from "svelte";
	import type { InstalledApp } from "$lib/shared/apps";
	import Icon from "./Icon.svelte";
	import Loading from "./Loading.svelte";
	let { app, icon }: { app: InstalledApp | undefined; icon: string } = $props();
	let phase = $state<"loading" | "ready" | "failed">("loading");
	let frame = $state<HTMLIFrameElement>();
	let source = $state("");
	let timeout: ReturnType<typeof setTimeout>;
	let poll: ReturnType<typeof setInterval>;
	let attempt = 0;
	let stopped = false;
	async function healthy() {
		if (!app) return false;
		try {
			const response = await fetch(`/api/apps/${app.id}/health`, {
				signal: AbortSignal.timeout(4000),
			});
			return response.ok && (await response.json()).ready === true;
		} catch {
			return false;
		}
	}
	async function launch() {
		const current = ++attempt;
		clearTimeout(timeout);
		clearInterval(poll);
		source = "";
		phase = "loading";
		if (!(await healthy())) {
			if (current === attempt && !stopped) phase = "failed";
			return;
		}
		if (current !== attempt || stopped || !app) return;
		source = `${app.origin}${app.entryPath}`;
		timeout = setTimeout(() => {
			phase = "failed";
			source = "";
		}, 15_000);
	}
	onMount(() => {
		function receive(event: MessageEvent) {
			const message = event.data;
			if (
				!app ||
				event.origin !== app.origin ||
				event.source !== frame?.contentWindow ||
				message?.channel !== "annelie-os" ||
				message.version !== 1 ||
				message.appId !== app.id ||
				message.type !== "ready" ||
				phase !== "loading"
			)
				return;
			clearTimeout(timeout);
			phase = "ready";
			poll = setInterval(async () => {
				if (!(await healthy()) && !stopped) {
					phase = "failed";
					source = "";
					clearInterval(poll);
				}
			}, 12_000);
		}
		window.addEventListener("message", receive);
		void launch();
		return () => {
			stopped = true;
			attempt += 1;
			clearTimeout(timeout);
			clearInterval(poll);
			window.removeEventListener("message", receive);
		};
	});
</script>

<div class="os-external" data-phase={phase}>
	{#if source}<iframe
			bind:this={frame}
			class="aos-program-frame"
			src={source}
			title={app?.label || "Spiel"}
			sandbox="allow-scripts allow-same-origin"
			allow="autoplay"
			referrerpolicy="no-referrer"
		></iframe>{/if}
	{#if phase === "loading"}<Loading {icon} />{:else if phase === "failed"}<div
			class="os-empty"
		>
			<button
				class="aos-button aos-button-primary"
				type="button"
				onclick={launch}><Icon name="rotate-ccw" />Noch einmal</button
			>
		</div>{/if}
</div>
