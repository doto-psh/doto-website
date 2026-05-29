<script lang="ts">
	import type { Locale, Product } from '$lib/types';
	import { reveal } from '$lib/actions/reveal';
	import ProductCard from './ProductCard.svelte';

	interface Props {
		products: Product[];
		locale: Locale;
	}

	let { products, locale }: Props = $props();
</script>

<div class="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
	{#each products as product, i (product.slug)}
		<div use:reveal={{ delay: (i % 3) * 90 }}>
			<ProductCard {product} {locale} />
		</div>
	{/each}
</div>
