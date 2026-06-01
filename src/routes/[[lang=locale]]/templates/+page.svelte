<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { ProductCategory } from '$lib/types';
	import Seo from '$lib/components/layout/Seo.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';
	import ProductGrid from '$lib/components/product/ProductGrid.svelte';
	import { reveal } from '$lib/actions/reveal';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const categories: ProductCategory[] = ['productivity', 'finance', 'study', 'creator'];
	let selected = $state<ProductCategory | 'all'>('all');

	let filtered = $derived(
		selected === 'all' ? data.products : data.products.filter((p) => p.category === selected)
	);
</script>

<Seo
	title={`${$_('templatesPage.title')} — doto`}
	description={$_('templatesPage.subtitle')}
	locale={data.locale}
/>

<header class="blueprint-grid border-b border-[var(--color-line)] bg-[var(--color-paper)] py-16 md:py-24">
	<Container>
		<div use:reveal class="flex max-w-2xl flex-col gap-4">
			<span class="w-fit rounded-md border border-[var(--color-line)] bg-white px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] text-[var(--color-accent)]">
				{$_('templatesPage.eyebrow')}
			</span>
			<h1 class="text-4xl font-black text-[var(--color-ink)] md:text-5xl lg:text-6xl">
				{$_('templatesPage.title')}
			</h1>
			<p class="text-lg font-medium text-[var(--color-muted)]">{$_('templatesPage.subtitle')}</p>
		</div>
	</Container>
</header>

<section class="py-12 md:py-16">
	<Container>
		<div class="mb-12 flex flex-wrap gap-2 border-b border-[var(--color-line)] pb-6">
			<Tag active={selected === 'all'} onclick={() => (selected = 'all')}>
				{$_('templatesPage.all')}
			</Tag>
			{#each categories as cat (cat)}
				<Tag active={selected === cat} onclick={() => (selected = cat)}>
					{$_(`templatesPage.categories.${cat}`)}
				</Tag>
			{/each}
		</div>

		{#if filtered.length}
			{#key selected}
				<ProductGrid products={filtered} locale={data.locale} />
			{/key}
		{:else}
			<p class="py-16 text-center text-[var(--color-muted)]">{$_('templatesPage.empty')}</p>
		{/if}
	</Container>
</section>
