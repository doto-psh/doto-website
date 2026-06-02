<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Seo from '$lib/components/layout/Seo.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import ProjectCover from '$lib/components/project/ProjectCover.svelte';
	import ProjectGrid from '$lib/components/project/ProjectGrid.svelte';
	import { localizeHref, pick } from '$lib/i18n/routing';
	import { reveal } from '$lib/actions/reveal';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let project = $derived(data.project);
	let title = $derived(pick(project.title, data.locale));
	let impact = $derived(pick(project.impact, data.locale));
	let highlights = $derived(pick(project.highlights, data.locale));
</script>

<Seo title={`${title} — doto`} description={pick(project.tagline, data.locale)} locale={data.locale} />

<article class="py-12 md:py-20">
	<Container>
		<a
			href={localizeHref('/projects', data.locale)}
			class="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2 text-sm font-semibold text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
		>
			<span aria-hidden="true">←</span> {$_('projectPage.backToProjects')}
		</a>

		<div class="mt-10 grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
			<div use:reveal class="lg:sticky lg:top-28 lg:self-start">
				<ProjectCover {title} category={project.category} stack={project.stack} />
			</div>

			<div use:reveal={{ delay: 80 }} class="flex flex-col gap-6">
				<div class="flex flex-wrap items-center gap-2">
					<span class="w-fit rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] text-[var(--color-accent)]">
						{$_(`projectsPage.categories.${project.category}`)}
					</span>
					<span class="text-sm font-bold text-[var(--color-muted)]">{project.period}</span>
				</div>

				<h1 class="text-4xl font-black text-[var(--color-ink)] md:text-5xl">{title}</h1>
				<p class="text-lg font-medium text-[var(--color-muted)]">{pick(project.tagline, data.locale)}</p>
				<p class="leading-relaxed text-[var(--color-ink)]">{pick(project.description, data.locale)}</p>

				<div class="grid gap-3 sm:grid-cols-2">
					<div class="rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-4">
						<span class="text-xs font-black uppercase tracking-[0.14em] text-[var(--color-muted)]">
							{$_('projectPage.role')}
						</span>
						<p class="mt-2 font-bold text-[var(--color-ink)]">{pick(project.role, data.locale)}</p>
					</div>
					<div class="rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-4">
						<span class="text-xs font-black uppercase tracking-[0.14em] text-[var(--color-muted)]">
							{$_('projectPage.stack')}
						</span>
						<p class="mt-2 font-bold text-[var(--color-ink)]">{project.stack.slice(0, 3).join(' · ')}</p>
					</div>
				</div>

				<div>
					<h2 class="mb-3 text-sm font-black uppercase tracking-[0.14em] text-[var(--color-muted)]">
						{$_('projectPage.impact')}
					</h2>
					<ul class="flex flex-col gap-2">
						{#each impact as item (item)}
							<li class="flex items-start gap-3 text-[var(--color-ink)]">
								<span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"></span>
								{item}
							</li>
						{/each}
					</ul>
				</div>

				<div class="rounded-lg border border-[var(--color-line)] bg-[var(--color-surface-blue)] p-5">
					<h2 class="text-sm font-black uppercase tracking-[0.14em] text-[var(--color-accent)]">
						{$_('projectPage.caseStudy')}
					</h2>
					<p class="mt-3 leading-relaxed text-[var(--color-ink)]">{pick(project.caseStudy, data.locale)}</p>
				</div>

				<div>
					<h2 class="mb-3 text-sm font-black uppercase tracking-[0.14em] text-[var(--color-muted)]">
						{$_('projectPage.highlights')}
					</h2>
					<div class="flex flex-wrap gap-2">
						{#each highlights as item (item)}
							<span class="rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2 text-sm font-semibold text-[var(--color-muted)]">
								{item}
							</span>
						{/each}
					</div>
				</div>

				<div class="flex flex-wrap gap-3 border-t border-[var(--color-line)] pt-6">
					{#if project.githubUrl}
						<Button href={project.githubUrl} external variant="primary" size="lg">
							{$_('projectPage.github')} <span aria-hidden="true">↗</span>
						</Button>
					{/if}
					{#if project.liveUrl}
						<Button href={project.liveUrl} external variant="outline" size="lg">
							{$_('projectPage.live')} <span aria-hidden="true">↗</span>
						</Button>
					{/if}
				</div>
			</div>
		</div>

		{#if data.related.length}
			<div class="mt-24 border-t border-[var(--color-line)] pt-16">
				<h2 use:reveal class="mb-10 text-2xl font-black text-[var(--color-ink)] md:text-3xl">
					{$_('projectPage.related')}
				</h2>
				<ProjectGrid projects={data.related} locale={data.locale} />
			</div>
		{/if}
	</Container>
</article>
