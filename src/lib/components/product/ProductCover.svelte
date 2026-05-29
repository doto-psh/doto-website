<script lang="ts">
	import type { ProductCategory } from '$lib/types';

	interface Props {
		title: string;
		category: ProductCategory;
		class?: string;
	}

	let { title, category, class: extra = '' }: Props = $props();

	// Ocean-toned gradients per category. Swap for real cover images later
	// by reading product.coverImage and rendering an <img> instead.
	const gradients: Record<ProductCategory, string> = {
		productivity: 'linear-gradient(135deg, #4aa3d4 0%, #145c8e 100%)', // open water
		finance: 'linear-gradient(135deg, #3fb6ae 0%, #16708a 100%)', // shallow teal
		study: 'linear-gradient(135deg, #5b8dd9 0%, #29407e 100%)', // deep current
		creator: 'linear-gradient(135deg, #56c5d0 0%, #2a8fb8 100%)' // surf cyan
	};

	let initial = $derived(title.trim().charAt(0).toUpperCase());
</script>

<div
	class="relative flex aspect-[4/3] items-end overflow-hidden rounded-2xl {extra}"
	style:background={gradients[category]}
	aria-hidden="true"
>
	<span
		class="pointer-events-none absolute -right-2 -top-6 select-none font-serif text-[9rem] leading-none text-white/25"
		style="font-family: var(--font-serif)"
	>
		{initial}
	</span>
	<div class="absolute inset-0 bg-[radial-gradient(120%_80%_at_80%_0%,transparent,rgba(8,28,48,0.28))]"></div>
</div>
