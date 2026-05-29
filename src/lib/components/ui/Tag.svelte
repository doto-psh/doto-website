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
		`inline-flex items-center rounded-full border px-4 py-1.5 text-sm transition-colors duration-200 ${
			active
				? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-bg)]'
				: 'border-[var(--color-line)] text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
		}`
	);
</script>

{#if href}
	<a {href} class={cls}>{@render children()}</a>
{:else}
	<button type="button" class={cls} {onclick}>{@render children()}</button>
{/if}
