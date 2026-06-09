<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Seo from '$lib/components/layout/Seo.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import ValuePillars from '$lib/components/sections/ValuePillars.svelte';
	import PortfolioSummary from '$lib/components/sections/PortfolioSummary.svelte';
	import FeaturedProjects from '$lib/components/sections/FeaturedProjects.svelte';
	// import BlogPreview from '$lib/components/sections/BlogPreview.svelte';
	import AboutTeaser from '$lib/components/sections/AboutTeaser.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<Seo title={$_('meta.title')} description={$_('meta.description')} locale={data.locale} />

<Hero locale={data.locale} />
<ValuePillars />
<PortfolioSummary portfolio={data.portfolio} locale={data.locale} />
<FeaturedProjects projects={data.projects} locale={data.locale} />
<!-- <BlogPreview posts={data.posts} locale={data.locale} /> -->
<AboutTeaser locale={data.locale} />
