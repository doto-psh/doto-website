<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Locale, Project, SkillGroup } from '$lib/types';
	import { localizeHref, pick } from '$lib/i18n/routing';

	let { groups, projects, locale }: { groups: SkillGroup[]; projects: Project[]; locale: Locale } = $props();
	let active = $state<number | null>(0);

	function evidence(group: SkillGroup) {
		return group.evidenceProjectSlugs
			.map((slug) => projects.find((project) => project.slug === slug))
			.filter((project): project is Project => Boolean(project));
	}

	function panelId(category: string) {
		return `capability-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
	}
</script>

<div class="capability-list">
	{#each groups as group, index (group.category)}
		<div class="capability-item">
			<button
			type="button"
			class="capability-row"
			aria-expanded={active === index}
			aria-controls={panelId(group.category)}
			onclick={() => (active = active === index ? null : index)}
			>
				<span class="number type-meta-decorative">{String(index + 1).padStart(2, '0')}</span>
				<strong class="type-item-title">{pick(group.title, locale)}</strong>
				<span class="type-meta">{group.items.slice(0, 3).map((item) => item.name).join(' · ')}</span>
				<small class="type-meta">{group.items.length} tools</small>
				<i aria-hidden="true">{active === index ? '−' : '+'}</i>
				<span class="sr-only">{active === index ? $_('capabilities.collapse') : $_('capabilities.expand')}</span>
			</button>
			{#if active === index}
				<div class="capability-detail" id={panelId(group.category)}>
					<p class="type-body">{pick(group.description, locale)}</p>
					<div>
						<p class="meta-label">{$_('capabilities.evidence')}</p>
						<ul>
							{#each evidence(group) as project (project.slug)}
								<li><a class="type-control" href={localizeHref(`/projects/${project.slug}`, locale)}>{pick(project.title, locale)} <span aria-hidden="true">↗</span></a></li>
							{/each}
						</ul>
					</div>
					<ul class="tool-list" aria-label="Tools">
					{#each group.items as item (item.name)}<li class="type-meta">{item.name}</li>{/each}
					</ul>
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.capability-list { border-top: 1px solid var(--color-line); }
	.capability-item { border-bottom: 1px solid var(--color-line); }
	.capability-row { width: 100%; min-height: 7.8rem; display: grid; grid-template-columns: 4rem 1.25fr 1fr .45fr 2rem; gap: 1.5rem; align-items: center; border: 0; background: transparent; color: var(--color-ink); text-align: left; }
	.capability-row span, .capability-row small { color: var(--color-subtle); }
	.capability-row strong { font-weight: 600; }
	.capability-row i { justify-self: end; font-size: 1.7rem; font-style: normal; font-weight: 300; }
	.capability-detail { display: grid; grid-template-columns: 1.1fr .9fr; gap: 2.5rem; padding: 0 4rem 2.8rem; }
	.capability-detail > p { max-width: 44rem; margin: 0; color: var(--color-muted); }
	.capability-detail ul { margin: .9rem 0 0; padding: 0; list-style: none; }
	.capability-detail a { display: inline-block; padding: .25rem 0; color: var(--color-ink); text-decoration: underline; text-decoration-color: var(--color-line-strong); text-underline-offset: .3rem; }
	.tool-list { grid-column: 1 / -1; display: flex; flex-wrap: wrap; gap: .5rem; }
	.tool-list li { padding: .45rem .7rem; border: 1px solid var(--color-line); border-radius: 999px; }
	@media (max-width: 760px) {
		.capability-row { grid-template-columns: 2rem 1fr 2rem; gap: .8rem; min-height: 6.2rem; }
		.capability-row > span:nth-of-type(2), .capability-row small { display: none; }
		.capability-row i { grid-column: 3; }
		.capability-detail { grid-template-columns: 1fr; gap: 1.5rem; padding: 0 2rem 2rem; }
		.tool-list { grid-column: auto; }
	}
</style>
