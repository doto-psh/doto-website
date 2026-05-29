<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Locale, Product } from '$lib/types';
	import { localizeHref } from '$lib/i18n/routing';
	import Section from '$lib/components/ui/Section.svelte';
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import ProductGrid from '$lib/components/product/ProductGrid.svelte';
	import { reveal } from '$lib/actions/reveal';

	interface Props {
		products: Product[];
		locale: Locale;
	}

	let { products, locale }: Props = $props();
</script>

<Section surface>
	<div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
		<SectionHeading
			eyebrow={$_('featured.eyebrow')}
			title={$_('featured.title')}
			subtitle={$_('featured.subtitle')}
		/>
		<div use:reveal class="hidden md:block">
			<Button href={localizeHref('/templates', locale)} variant="outline">
				{$_('featured.cta')} <span aria-hidden="true">→</span>
			</Button>
		</div>
	</div>

	<div class="mt-14">
		<ProductGrid {products} {locale} />
	</div>

	<div use:reveal class="mt-12 md:hidden">
		<Button href={localizeHref('/templates', locale)} variant="outline">
			{$_('featured.cta')} <span aria-hidden="true">→</span>
		</Button>
	</div>
</Section>
