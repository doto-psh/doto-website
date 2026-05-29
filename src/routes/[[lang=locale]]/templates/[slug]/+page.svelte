<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Seo from '$lib/components/layout/Seo.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import ProductCover from '$lib/components/product/ProductCover.svelte';
	import ProductGrid from '$lib/components/product/ProductGrid.svelte';
	import { localizeHref, pick } from '$lib/i18n/routing';
	import { reveal } from '$lib/actions/reveal';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let product = $derived(data.product);
	let title = $derived(pick(product.title, data.locale));
	let features = $derived(pick(product.features, data.locale));
	let priceLabel = $derived(
		new Intl.NumberFormat(data.locale, {
			style: 'currency',
			currency: product.currency,
			maximumFractionDigits: 0
		}).format(product.price)
	);
</script>

<Seo title={`${title} — doto`} description={pick(product.tagline, data.locale)} locale={data.locale} />

<article class="py-12 md:py-20">
	<Container>
		<a
			href={localizeHref('/templates', data.locale)}
			class="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
		>
			<span aria-hidden="true">←</span> {$_('productPage.backToTemplates')}
		</a>

		<div class="mt-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
			<!-- Visual -->
			<div use:reveal class="lg:sticky lg:top-28 lg:self-start">
				<ProductCover {title} category={product.category} />
			</div>

			<!-- Details -->
			<div use:reveal={{ delay: 80 }} class="flex flex-col gap-6">
				<span class="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
					{$_(`templatesPage.categories.${product.category}`)}
				</span>
				<h1 class="font-serif text-4xl text-[var(--color-ink)] md:text-5xl">{title}</h1>
				<p class="text-lg text-[var(--color-muted)]">{pick(product.tagline, data.locale)}</p>

				<p class="leading-relaxed text-[var(--color-ink)]">
					{pick(product.description, data.locale)}
				</p>

				<div class="mt-2">
					<h2 class="mb-3 text-sm font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]">
						{$_('productPage.features')}
					</h2>
					<ul class="flex flex-col gap-2">
						{#each features as feature (feature)}
							<li class="flex items-start gap-3 text-[var(--color-ink)]">
								<span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"></span>
								{feature}
							</li>
						{/each}
					</ul>
				</div>

				<div
					class="mt-4 flex items-center gap-5 border-t border-[var(--color-line)] pt-6"
				>
					<span class="font-serif text-3xl text-[var(--color-ink)]">{priceLabel}</span>
					<Button href={product.buyUrl} external variant="primary" size="lg">
						{$_('productPage.buy')} <span aria-hidden="true">→</span>
					</Button>
				</div>
			</div>
		</div>

		{#if data.related.length}
			<div class="mt-24 border-t border-[var(--color-line)] pt-16">
				<h2 use:reveal class="mb-10 font-serif text-2xl text-[var(--color-ink)] md:text-3xl">
					{$_('productPage.related')}
				</h2>
				<ProductGrid products={data.related} locale={data.locale} />
			</div>
		{/if}
	</Container>
</article>
