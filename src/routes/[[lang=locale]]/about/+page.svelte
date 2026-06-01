<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Seo from '$lib/components/layout/Seo.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { site } from '$lib/data/site';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const values = ['clarity', 'craft', 'sharing'] as const;
</script>

<Seo
	title={`${$_('aboutPage.title')} — doto`}
	description={$_('aboutPage.intro')}
	locale={data.locale}
/>

<header class="blueprint-grid border-b border-[var(--color-line)] bg-[var(--color-paper)] py-16 md:py-24">
	<Container>
		<div use:reveal class="flex max-w-3xl flex-col gap-5">
			<span class="w-fit rounded-md border border-[var(--color-line)] bg-white px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] text-[var(--color-accent)]">
				{$_('aboutPage.eyebrow')}
			</span>
			<h1 class="text-4xl font-black leading-tight text-[var(--color-ink)] md:text-5xl lg:text-6xl">
				{$_('aboutPage.title')}
			</h1>
			<p class="text-xl font-medium leading-relaxed text-[var(--color-muted)]">{$_('aboutPage.intro')}</p>
		</div>
	</Container>
</header>

<Section surface>
	<div use:reveal class="mx-auto max-w-3xl rounded-lg border border-[var(--color-line)] bg-white p-6 md:p-8">
		<p class="text-lg font-medium leading-loose text-[var(--color-ink)]">{$_('aboutPage.story')}</p>
	</div>
</Section>

<Section>
	<h2 use:reveal class="mb-12 text-2xl font-black text-[var(--color-ink)] md:text-3xl">
		{$_('aboutPage.valuesTitle')}
	</h2>
	<div class="grid gap-10 md:grid-cols-3">
		{#each values as value, i (value)}
			<div
				use:reveal={{ delay: i * 100 }}
				class="rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-6"
			>
				<span class="text-sm font-black text-[var(--color-accent)]">0{i + 1}</span>
				<h3 class="mt-5 text-xl font-extrabold text-[var(--color-ink)]">
					{$_(`aboutPage.values.${value}.title`)}
				</h3>
				<p class="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
					{$_(`aboutPage.values.${value}.body`)}
				</p>
			</div>
		{/each}
	</div>
</Section>

<Section surface>
	<div use:reveal class="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
		<h2 class="text-3xl font-black text-[var(--color-ink)] md:text-4xl">
			{$_('aboutPage.contactTitle')}
		</h2>
		<p class="text-lg text-[var(--color-muted)]">{$_('aboutPage.contactBody')}</p>
		<Button href={`mailto:${site.email}`} variant="primary" size="lg" external>
			{site.email}
		</Button>
	</div>
</Section>
