<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Locale, Product } from '$lib/types';
	import { localizeHref, pick } from '$lib/i18n/routing';
	import ProductCover from './ProductCover.svelte';

	interface Props {
		product: Product;
		locale: Locale;
	}

	let { product, locale }: Props = $props();

	const priceLabel = $derived(
		new Intl.NumberFormat(locale, {
			style: 'currency',
			currency: product.currency,
			maximumFractionDigits: 0
		}).format(product.price)
	);
</script>

<a
	href={localizeHref(`/templates/${product.slug}`, locale)}
	class="group flex flex-col gap-4"
	data-cursor-hover
>
	<div class="overflow-hidden rounded-2xl">
		<ProductCover
			title={pick(product.title, locale)}
			category={product.category}
			class="transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.03]"
		/>
	</div>
	<div class="flex flex-col gap-1.5">
		<div class="flex items-baseline justify-between gap-3">
			<h3 class="font-serif text-xl text-[var(--color-ink)] md:text-2xl">
				{pick(product.title, locale)}
			</h3>
			<span class="shrink-0 text-sm font-medium text-[var(--color-accent)]">{priceLabel}</span>
		</div>
		<p class="text-sm text-[var(--color-muted)]">{pick(product.tagline, locale)}</p>
		<span
			class="mt-1 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]"
		>
			{$_('templatesPage.viewDetail')}
			<span class="transition-transform duration-300 group-hover:translate-x-1">→</span>
		</span>
	</div>
</a>
