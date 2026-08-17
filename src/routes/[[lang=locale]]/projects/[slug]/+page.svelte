<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Seo from '$lib/components/layout/Seo.svelte';
	import ProjectFlow from '$lib/components/project/ProjectFlow.svelte';
	import { localizeHref, pick } from '$lib/i18n/routing';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let project = $derived(data.project);
	let details = $derived(project.caseStudyDetails);
	let title = $derived(pick(project.title, data.locale));
</script>

<Seo title={`${title} — doto`} description={pick(project.tagline, data.locale)} locale={data.locale} />

<article>
	<header class="project-hero">
		<div class="container-page">
			<a href={localizeHref('/projects', data.locale)} class="text-link">← {$_('projectPage.back')}</a>
			<div class="hero-grid">
				<div>
					<p class="meta-label">{project.featured ? $_('workPage.selected') : $_('projectPage.overview')} · SYSTEM</p>
					<h1 class="type-page-title">{title}</h1>
					<p class="tagline type-lead">{pick(project.tagline, data.locale)}</p>
				</div>
				<dl>
					<div><dt class="type-meta">{$_('projectPage.role')}</dt><dd class="type-meta">{pick(project.role, data.locale)}</dd></div>
					<div><dt class="type-meta">{$_('projectPage.period')}</dt><dd class="type-meta">{project.period}</dd></div>
					<div><dt class="type-meta">{$_('projectPage.stack')}</dt><dd class="type-meta">{project.stack.join(' · ')}</dd></div>
				</dl>
			</div>
		</div>
	</header>

	{#if details}
		<div class="case-body">
			<section class="container-reading lead-section">
				<p class="meta-label">01 / {$_('projectPage.problem')}</p>
				<h2 class="type-section-title">{pick(details.problem, data.locale)}</h2>
			</section>

			{#if details.constraints}
				<section class="theme-light case-section">
					<div class="container-reading split-section">
						<h2 class="meta-label">02 / {$_('projectPage.constraints')}</h2>
						<ol class="number-list">{#each pick(details.constraints, data.locale) as item, index (item)}<li><span class="type-meta-decorative">{String(index + 1).padStart(2, '0')}</span><p class="type-body">{item}</p></li>{/each}</ol>
					</div>
				</section>
			{/if}

			<section class="case-section">
				<div class="container-reading">
					<h2 class="meta-label">03 / {$_('projectPage.decisions')}</h2>
					<div class="decision-list">
						{#each pick(details.decisions, data.locale) as decision, index (decision.title)}
							<article><span class="type-meta-decorative">{String(index + 1).padStart(2, '0')}</span><h3 class="type-lead">{decision.title}</h3><p class="type-body">{decision.detail}</p></article>
						{/each}
					</div>
				</div>
			</section>

			<section class="theme-light case-section">
				<div class="container-reading">
					<h2 class="meta-label flow-label">04 / {$_('projectPage.flow')}</h2>
					{#each details.flows as flow (flow.id)}<ProjectFlow {flow} locale={data.locale} />{/each}
				</div>
			</section>

			<section class="case-section">
				<div class="container-reading split-section">
					<h2 class="meta-label">05 / {$_('projectPage.outcome')}</h2>
					<ul class="outcome-list">{#each pick(details.outcome, data.locale) as item (item)}<li class="type-lead">{item}</li>{/each}</ul>
				</div>
			</section>

			{#if details.lessons}
				<section class="lesson-section"><div class="container-reading"><p class="meta-label">06 / {$_('projectPage.lessons')}</p>{#each pick(details.lessons, data.locale) as item (item)}<blockquote class="type-section-title">{item}</blockquote>{/each}</div></section>
			{/if}
		</div>
	{:else}
		<section class="theme-light case-section">
			<div class="container-reading overview">
				<p class="meta-label">01 / {$_('projectPage.overview')}</p>
				<h2 class="type-section-title">{pick(project.description, data.locale)}</h2>
				<p class="type-prose">{pick(project.caseStudy, data.locale)}</p>
				<ul>{#each pick(project.impact, data.locale) as item (item)}<li class="type-body">{item}</li>{/each}</ul>
			</div>
		</section>
	{/if}

	{#if data.next && details}
		<footer class="next-project"><a class="container-page" href={localizeHref(`/projects/${data.next.slug}`, data.locale)}><span class="meta-label">{$_('projectPage.next')}</span><strong class="type-section-title">{pick(data.next.title, data.locale)}</strong><i aria-hidden="true">↗</i></a></footer>
	{/if}
</article>

<style>
	.project-hero { padding: 8rem 0 5rem; border-bottom: 1px solid var(--color-line); }
	.hero-grid { display: grid; grid-template-columns: minmax(0,1.35fr) minmax(17rem,.65fr); gap: clamp(3rem,7vw,8rem); margin-top: 4.5rem; align-items: end; }
	.meta-label { color: var(--color-secondary); }
	h1 { max-width: 13ch; margin: 1.25rem 0 0; }
	.tagline { max-width: 49rem; margin: 2rem 0 0; color: var(--color-muted); }
	dl { margin: 0; border-top: 1px solid var(--color-line); }
	dl div { padding: 1rem 0; border-bottom: 1px solid var(--color-line); }
	dt { color: var(--color-subtle); text-transform: uppercase; }
	dd { margin: .45rem 0 0; color: var(--color-subtle); }
	.lead-section, .case-section, .lesson-section { padding: 7rem 0; }
	.lead-section h2, .overview h2 { margin: 2rem 0 0; }
	.split-section { display: grid; grid-template-columns: 10rem minmax(0,1fr); gap: 4rem; }
	.number-list, .outcome-list { margin: 0; padding: 0; list-style: none; border-top: 1px solid var(--color-line); }
	.number-list li { display: grid; grid-template-columns: 3rem 1fr; gap: 1rem; padding: 1.4rem 0; border-bottom: 1px solid var(--color-line); }
	.number-list p { margin: 0; color: var(--color-ink); }
	.decision-list { margin-top: 2rem; border-top: 1px solid var(--color-line); }
	.decision-list article { display: grid; grid-template-columns: 3rem 13rem 1fr; gap: 2rem; padding: 2rem 0; border-bottom: 1px solid var(--color-line); }
	.decision-list h3 { margin: 0; font-weight: 650; }
	.decision-list p { margin: 0; color: var(--color-muted); }
	.flow-label { margin-bottom: 1.5rem; }
	.outcome-list li { padding: 1.4rem 0; border-bottom: 1px solid var(--color-line); }
	.lesson-section { border-block: 1px solid var(--color-line); background: radial-gradient(circle at 80% 10%,rgba(86,137,255,.12),transparent 30%); }
	blockquote { max-width: 30ch; margin: 2rem 0 0; font-weight: 550; }
	.overview > p:not(.meta-label) { margin-top: 2rem; color: var(--color-muted); }
	.overview ul { margin: 3rem 0 0; padding: 0; list-style: none; border-top: 1px solid var(--color-line); }
	.overview li { padding: 1.25rem 0; border-bottom: 1px solid var(--color-line); }
	.next-project { border-top: 1px solid var(--color-line); }
	.next-project a { display: grid; grid-template-columns: 10rem 1fr 3rem; gap: 2rem; align-items: center; padding-block: 4.5rem; color: var(--color-ink); }
	.next-project i { font-style: normal; font-size: 1.3rem; }
	.next-project a:hover strong { color: var(--color-accent); }
	@media (max-width: 780px) { .hero-grid, .split-section { grid-template-columns: 1fr; gap: 2.5rem; } .decision-list article { grid-template-columns: 2rem 1fr; gap: 1rem; } .decision-list p { grid-column: 2; } .next-project a { grid-template-columns: 1fr 2rem; } .next-project .meta-label { grid-column: 1 / -1; } }
	@media (max-width: 620px) { .project-hero { padding: 7.5rem 0 4rem; } .hero-grid { margin-top: 3rem; } .lead-section, .case-section, .lesson-section { padding: 5rem 0; } }
</style>
