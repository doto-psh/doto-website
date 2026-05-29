<script lang="ts">
	import type { Snippet } from 'svelte';
	import Container from './Container.svelte';

	interface Props {
		id?: string;
		/** Adds a subtle warm surface background to alternate sections. */
		surface?: boolean;
		class?: string;
		children: Snippet;
	}

	let { id, surface = false, class: extra = '', children }: Props = $props();
</script>

<section
	{id}
	class="py-20 md:py-28 lg:py-36 {surface ? 'bg-[var(--color-surface)]' : ''} {extra}"
>
	<Container>
		{@render children()}
	</Container>
</section>
