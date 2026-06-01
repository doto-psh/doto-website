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
	class="group flex h-full flex-col gap-4 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-3 transition-all duration-300 ease-[var(--ease-soft)] hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[0_16px_40px_rgba(16,24,39,0.08)]"
	data-cursor-hover
>
	<div class="overflow-hidden rounded-lg">
		<ProductCover
			title={pick(product.title, locale)}
			category={product.category}
			class="transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.02]"
		/>
	</div>
	<div class="flex flex-1 flex-col gap-2 px-1 pb-1">
		<div class="flex items-baseline justify-between gap-3">
			<h3 class="text-xl font-extrabold text-[var(--color-ink)] md:text-2xl">
				{pick(product.title, locale)}
			</h3>
			<span class="shrink-0 rounded-md bg-[var(--color-surface-blue)] px-2 py-1 text-sm font-black text-[var(--color-accent)]">
				{priceLabel}
			</span>
		</div>
		<p class="text-sm text-[var(--color-muted)]">{pick(product.tagline, locale)}</p>
		<span
			class="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-bold text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]"
		>
			{$_('templatesPage.viewDetail')}
			<span class="transition-transform duration-300 group-hover:translate-x-1">→</span>
		</span>
	</div>
</a>
