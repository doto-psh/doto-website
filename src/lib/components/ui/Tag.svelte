<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		active?: boolean;
		href?: string;
		onclick?: () => void;
		children: Snippet;
	}

	let { active = false, href, onclick, children }: Props = $props();

	const cls = $derived(
		`inline-flex min-h-10 items-center rounded-lg border px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
			active
				? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
				: 'border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
		}`
	);
</script>

{#if href}
	<a {href} class={cls}>{@render children()}</a>
{:else}
	<button type="button" class={cls} {onclick}>{@render children()}</button>
{/if}
