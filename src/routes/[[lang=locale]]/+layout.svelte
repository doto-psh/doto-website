<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: import('svelte').Snippet } = $props();

	// Keep <html lang> in sync during client-side navigation.
	$effect(() => {
		document.documentElement.lang = data.locale;
	});
</script>

<Header locale={data.locale} />

<main id="main-content" class="min-h-screen">
	{@render children()}
</main>

<Footer locale={data.locale} />
