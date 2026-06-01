<script lang="ts">
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: import('svelte').Snippet } = $props();

	let reduce = $state(false);

	$effect(() => {
		reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	// Keep <html lang> in sync during client-side navigation.
	$effect(() => {
		document.documentElement.lang = data.locale;
	});
</script>

<Header locale={data.locale} />

<main class="min-h-screen pt-16 md:pt-20">
	{#key $page.url.pathname}
		<div in:fade={{ duration: reduce ? 0 : 260, delay: reduce ? 0 : 60 }}>
			{@render children()}
		</div>
	{/key}
</main>

<Footer locale={data.locale} />
