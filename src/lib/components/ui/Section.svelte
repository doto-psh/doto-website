<script lang="ts">
	import type { Snippet } from 'svelte';
	import Container from './Container.svelte';

	interface Props {
		id?: string;
		/** Adds a quiet blue-tinted band to alternate sections. */
		surface?: boolean;
		class?: string;
		children: Snippet;
	}

	let { id, surface = false, class: extra = '', children }: Props = $props();
</script>

<section
	{id}
	class="py-20 md:py-24 lg:py-28 {surface
		? 'border-y border-[var(--color-line)] bg-[var(--color-surface-blue)]'
		: ''} {extra}"
>
	<Container>
		{@render children()}
	</Container>
</section>
