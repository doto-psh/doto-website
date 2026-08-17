<script lang="ts">
	import type { Locale, Project } from '$lib/types';
	import { localizeHref, pick } from '$lib/i18n/routing';

	let { projects, locale }: { projects: Project[]; locale: Locale } = $props();
</script>

<ol class="work-list">
	{#each projects as project, index (project.slug)}
		<li>
			<a href={localizeHref(`/projects/${project.slug}`, locale)} class="work-row">
				<span class="work-index type-meta-decorative">{String(index + 1).padStart(2, '0')}</span>
				<div class="work-main">
					<p class="work-org type-meta">{project.org ? pick(project.org, locale) : project.period}</p>
					<h3 class="type-item-title">{pick(project.title, locale)}</h3>
					<p class="work-summary type-body">{pick(project.tagline, locale)}</p>
					<ul aria-label="Technology stack">
						{#each project.stack as item (item)}<li class="type-meta">{item}</li>{/each}
					</ul>
				</div>
				<div class="work-impact">
					<span class="type-meta">Impact</span>
					<strong class="type-body-small">{pick(project.impact, locale)[0]}</strong>
					<small class="type-meta">{pick(project.role, locale)} · {project.period}</small>
				</div>
				<span class="work-open" aria-hidden="true">↗</span>
			</a>
		</li>
	{/each}
</ol>

<style>
	.work-list { margin: 0; padding: 0; list-style: none; border-top: 1px solid var(--color-line); }
	.work-row { display: grid; grid-template-columns: 4rem minmax(0,1.35fr) minmax(16rem,.65fr) 3.5rem; gap: 2rem; align-items: center; min-height: 17rem; padding: 2.4rem 0; border-bottom: 1px solid var(--color-line); color: var(--color-ink); transition: padding 240ms var(--ease-cinematic), background 240ms; }
	.work-row:hover { padding-inline: 1.25rem; background: linear-gradient(90deg, rgba(86,137,255,.09), transparent 78%); }
	.work-index { align-self: start; }
	.work-org { margin: 0 0 .8rem; color: var(--color-secondary); letter-spacing: .08em; text-transform: uppercase; }
	h3 { max-width: 18ch; margin: 0; }
	.work-summary { max-width: 46rem; margin: 1rem 0 0; color: var(--color-muted); }
	.work-main ul { display: flex; flex-wrap: wrap; gap: .45rem; margin: 1.4rem 0 0; padding: 0; list-style: none; }
	.work-main li { padding: .35rem .6rem; border: 1px solid var(--color-line); border-radius: 999px; color: #c8d1dd; }
	.work-impact { align-self: end; padding-bottom: .3rem; }
	.work-impact > span { display: block; letter-spacing: .08em; text-transform: uppercase; }
	.work-impact strong { display: block; margin-top: .55rem; color: #d7dee8; font-weight: 500; }
	.work-impact small { display: block; margin-top: 1.1rem; color: var(--color-subtle); }
	.work-open { display: grid; width: 3.4rem; height: 3.4rem; place-items: center; border: 1px solid var(--color-line-strong); border-radius: 50%; font-size: 1.1rem; transition: background 200ms, transform 200ms; }
	.work-row:hover .work-open { background: var(--color-accent); transform: rotate(18deg); }
	@media (max-width: 900px) {
		.work-row { grid-template-columns: 2.5rem minmax(0,1fr) 3rem; min-height: 0; gap: 1rem; }
		.work-impact { grid-column: 2; }
		.work-open { grid-column: 3; grid-row: 1 / span 2; }
	}
	@media (max-width: 620px) {
		.work-row { grid-template-columns: 2rem minmax(0,1fr); padding: 2rem 0; }
		.work-row:hover { padding-inline: 0; background: transparent; }
		.work-impact { grid-column: 2; }
		.work-open { grid-column: 2; grid-row: auto; width: 2.8rem; height: 2.8rem; margin-top: .5rem; }
	}
</style>
