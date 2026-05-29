<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	interface Props {
		eyebrow?: string;
		title: string;
		subtitle?: string;
		align?: 'left' | 'center';
	}

	let { eyebrow, title, subtitle, align = 'left' }: Props = $props();
</script>

<div
	use:reveal
	class="flex max-w-2xl flex-col gap-3 {align === 'center' ? 'mx-auto items-center text-center' : ''}"
>
	{#if eyebrow}
		<span
			class="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]"
		>
			{eyebrow}
		</span>
	{/if}
	<h2 class="text-3xl text-[var(--color-ink)] md:text-4xl lg:text-5xl">{title}</h2>
	{#if subtitle}
		<p class="text-base text-[var(--color-muted)] md:text-lg">{subtitle}</p>
	{/if}
</div>
