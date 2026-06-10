<script lang="ts">
	import Seo from '$lib/components/layout/Seo.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import ValuePillars from '$lib/components/sections/ValuePillars.svelte';
	import PortfolioSummary from '$lib/components/sections/PortfolioSummary.svelte';
	import FeaturedProjects from '$lib/components/sections/FeaturedProjects.svelte';
	// import BlogPreview from '$lib/components/sections/BlogPreview.svelte';
	import AboutTeaser from '$lib/components/sections/AboutTeaser.svelte';
	import { pick } from '$lib/i18n/routing';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let profile = $derived(data.portfolio.profile);
	let realName = $derived(profile.realName ? pick(profile.realName, data.locale) : pick(profile.name, data.locale));
</script>

<Seo
	title={`${realName} (doto) — ${pick(profile.role, data.locale)}`}
	description={`${realName} · ${pick(profile.tagline, data.locale)}`}
	locale={data.locale}
/>

<Hero {profile} locale={data.locale} />
<ValuePillars />
<PortfolioSummary portfolio={data.portfolio} locale={data.locale} />
<FeaturedProjects projects={data.projects} locale={data.locale} />
<!-- <BlogPreview posts={data.posts} locale={data.locale} /> -->
<AboutTeaser {profile} locale={data.locale} />
