<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href?: string;
		variant?: 'primary' | 'outline' | 'ghost';
		size?: 'md' | 'lg';
		external?: boolean;
		type?: 'button' | 'submit';
		class?: string;
		children: Snippet;
		onclick?: (e: MouseEvent) => void;
	}

	let {
		href,
		variant = 'primary',
		size = 'md',
		external = false,
		type = 'button',
		class: extra = '',
		children,
		onclick
	}: Props = $props();

	const base =
		'inline-flex items-center justify-center gap-2 rounded-lg border font-semibold transition-all duration-300 ease-[var(--ease-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]';

	const sizes = {
		md: 'px-5 py-2.5 text-sm',
		lg: 'px-7 py-3.5 text-base'
	};

	const variants = {
		primary:
			'border-[var(--color-accent)] bg-[var(--color-accent)] text-white shadow-[0_10px_24px_rgba(19,93,255,0.18)] hover:border-[var(--color-accent-strong)] hover:bg-[var(--color-accent-strong)] hover:-translate-y-0.5',
		outline:
			'border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:-translate-y-0.5',
		ghost:
			'border-transparent bg-transparent text-[var(--color-ink)] hover:border-[var(--color-line)] hover:bg-[var(--color-surface)] hover:text-[var(--color-accent)]'
	};

	let cls = $derived(`${base} ${sizes[size]} ${variants[variant]} ${extra}`);
</script>

{#if href}
	<a
		{href}
		class={cls}
		target={external ? '_blank' : undefined}
		rel={external ? 'noopener noreferrer' : undefined}
	>
		{@render children()}
	</a>
{:else}
	<button {type} class={cls} {onclick}>
		{@render children()}
	</button>
{/if}
