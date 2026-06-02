<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Locale, Project } from '$lib/types';
	import { localizeHref, pick } from '$lib/i18n/routing';
	import ProjectCover from './ProjectCover.svelte';

	interface Props {
		project: Project;
		locale: Locale;
	}

	let { project, locale }: Props = $props();
</script>

<a
	href={localizeHref(`/projects/${project.slug}`, locale)}
	class="group flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[0_22px_55px_rgba(16,24,39,0.1)]"
	data-cursor-hover
>
	<ProjectCover title={pick(project.title, locale)} category={project.category} stack={project.stack} />

	<div class="flex grow flex-col gap-4 p-5 md:p-6">
		<div class="flex flex-wrap items-center gap-2">
			<span class="rounded-md border border-[var(--color-line)] bg-[var(--color-surface-blue)] px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[var(--color-accent)]">
				{$_(`projectsPage.categories.${project.category}`)}
			</span>
			<span class="text-xs font-bold text-[var(--color-muted)]">{project.period}</span>
		</div>

		<div class="min-w-0">
			<h3 class="max-w-full break-words text-xl font-black text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
				{pick(project.title, locale)}
			</h3>
			<p class="mt-2 max-w-full break-words text-sm leading-relaxed text-[var(--color-muted)]">{pick(project.tagline, locale)}</p>
		</div>

		<div class="mt-auto flex flex-wrap gap-2">
			{#each project.stack.slice(0, 4) as item (item)}
				<span class="rounded-md border border-[var(--color-line)] px-2 py-1 text-[11px] font-semibold text-[var(--color-muted)]">
					{item}
				</span>
			{/each}
		</div>

		<span class="inline-flex items-center gap-1 text-sm font-bold text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-accent)]">
			{$_('projectsPage.viewDetail')}
			<span class="transition-transform group-hover:translate-x-1">→</span>
		</span>
	</div>
</a>
