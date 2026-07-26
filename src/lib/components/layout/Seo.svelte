<script lang="ts">
	import { page } from '$app/stores';
	import { LOCALES, type Locale } from '$lib/types';
	import { localizeHref } from '$lib/i18n/routing';
	import { site } from '$lib/data/site';

	interface Props {
		title: string;
		description: string;
		locale: Locale;
	}

	let { title, description, locale }: Props = $props();

	let fullTitle = $derived(title);

	let barePath = $derived.by(() => {
		const segments = $page.url.pathname.split('/').filter(Boolean);
		if (segments.length && (LOCALES as readonly string[]).includes(segments[0])) segments.shift();
		return '/' + segments.join('/');
	});

	const ogLocale: Record<Locale, string> = {
		ko: 'ko_KR',
		en: 'en_US'
	};
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<meta name="robots" content="noindex, nofollow" />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.brand} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:locale" content={ogLocale[locale]} />
	<meta name="twitter:card" content="summary_large_image" />

	{#each LOCALES as code (code)}
		<link rel="alternate" hreflang={code} href={`${site.url}${localizeHref(barePath, code)}`} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={`${site.url}${localizeHref(barePath, 'ko')}`} />
</svelte:head>
