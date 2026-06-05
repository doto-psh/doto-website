<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { ProjectCategory } from '$lib/types';
	import { projectCategories } from '$lib/data/projects';
	import Seo from '$lib/components/layout/Seo.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';
	import ProjectGrid from '$lib/components/project/ProjectGrid.svelte';
	import MascotEmptyState from '$lib/components/portfolio/MascotEmptyState.svelte';
	import { pick } from '$lib/i18n/routing';
	import { reveal } from '$lib/actions/reveal';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let selected = $state<ProjectCategory | 'all'>('all');
	let query = $state('');

	let filtered = $derived.by(() => {
		const normalized = query.trim().toLowerCase();
		return data.projects.filter((project) => {
			const categoryMatch = selected === 'all' || project.category === selected;
			const haystack = [
				pick(project.title, data.locale),
				pick(project.tagline, data.locale),
				pick(project.description, data.locale),
				pick(project.role, data.locale),
				...project.stack,
				...pick(project.impact, data.locale)
			]
				.join(' ')
				.toLowerCase();
			return categoryMatch && (!normalized || haystack.includes(normalized));
		});
	});
</script>

<Seo
	title={`${$_('projectsPage.title')} — doto`}
	description={$_('projectsPage.subtitle')}
	locale={data.locale}
/>

<header class="blueprint-grid border-b border-[var(--color-line)] bg-[var(--color-paper)] py-16 md:py-24">
	<Container>
		<div use:reveal class="grid min-w-0 gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
			<div class="flex min-w-0 max-w-3xl flex-col gap-4">
				<span class="w-fit rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] text-[var(--color-accent)]">
					{$_('projectsPage.eyebrow')}
				</span>
				<h1 class="max-w-full text-3xl font-black text-[var(--color-ink)] sm:text-4xl md:text-5xl lg:text-6xl">
					{$_('projectsPage.title')}
				</h1>
				<p class="max-w-full break-words text-lg font-medium text-[var(--color-muted)]">{$_('projectsPage.subtitle')}</p>
			</div>

			<div class="min-w-0 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-4">
				<label for="project-search" class="text-xs font-black uppercase tracking-[0.14em] text-[var(--color-muted)]">
					{$_('projectsPage.searchLabel')}
				</label>
				<input
					id="project-search"
					bind:value={query}
					type="search"
					placeholder={$_('projectsPage.searchPlaceholder')}
					class="mt-3 w-full min-w-0 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-4 py-3 text-sm font-semibold text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)]"
				/>
			</div>
		</div>
	</Container>
</header>

<section class="py-12 md:py-16">
	<Container>
		<div class="mb-10 grid max-w-full grid-cols-2 gap-2 border-b border-[var(--color-line)] pb-6 sm:flex sm:flex-wrap">
			<Tag active={selected === 'all'} onclick={() => (selected = 'all')}>
				{$_('projectsPage.all')}
			</Tag>
			{#each projectCategories as cat (cat)}
				<Tag active={selected === cat} onclick={() => (selected = cat)}>
					{$_(`projectsPage.categories.${cat}`)}
				</Tag>
			{/each}
		</div>

		{#if filtered.length}
			<ProjectGrid projects={filtered} locale={data.locale} />
		{:else}
			<MascotEmptyState message={$_('projectsPage.empty')} />
		{/if}
	</Container>
</section>
