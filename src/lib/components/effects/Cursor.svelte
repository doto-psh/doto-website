<script lang="ts">
	import { onMount } from 'svelte';

	let dot = $state<HTMLElement | null>(null);
	let ring = $state<HTMLElement | null>(null);
	let enabled = $state(false);

	onMount(() => {
		const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!fine || reduce) return;

		enabled = true;
		document.body.dataset.cursor = 'on';

		let mouseX = window.innerWidth / 2;
		let mouseY = window.innerHeight / 2;
		let ringX = mouseX;
		let ringY = mouseY;
		let raf = 0;

		const onMove = (e: MouseEvent) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
			if (dot) dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

			const target = e.target as HTMLElement | null;
			const interactive = target?.closest('a, button, [data-cursor-hover]');
			ring?.classList.toggle('is-hover', Boolean(interactive));
		};

		const loop = () => {
			ringX += (mouseX - ringX) * 0.18;
			ringY += (mouseY - ringY) * 0.18;
			if (ring) ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
			raf = requestAnimationFrame(loop);
		};

		window.addEventListener('mousemove', onMove, { passive: true });
		raf = requestAnimationFrame(loop);

		return () => {
			window.removeEventListener('mousemove', onMove);
			cancelAnimationFrame(raf);
			delete document.body.dataset.cursor;
		};
	});
</script>

{#if enabled}
	<div bind:this={ring} class="cursor-ring" aria-hidden="true"></div>
	<div bind:this={dot} class="cursor-dot" aria-hidden="true"></div>
{/if}
