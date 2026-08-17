<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Seo from '$lib/components/layout/Seo.svelte';
	import SystemWorkList from '$lib/components/portfolio/SystemWorkList.svelte';
	import { localizeHref, pick } from '$lib/i18n/routing';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let selected = $derived(data.projects.filter((project) => project.featured));
	let more = $derived(data.projects.filter((project) => !project.featured));
</script>

<Seo title={`${$_('workPage.title')} — doto`} description={$_('workPage.subtitle')} locale={data.locale} />

<header class="work-hero">
	<div class="container-page hero-grid">
		<div>
			<p class="meta-label">{$_('workPage.eyebrow')} · {String(data.projects.length).padStart(2, '0')}</p>
			<h1 class="type-page-title">{$_('workPage.title')}</h1>
		</div>
		<div class="hero-copy">
			<p class="type-body">{$_('workPage.subtitle')}</p>
			<span class="type-meta">AI systems / backend / infrastructure</span>
		</div>
	</div>
</header>

<section class="selected-section" aria-labelledby="selected-work">
	<div class="container-page">
		<div class="section-heading">
			<h2 id="selected-work" class="meta-label">{$_('workPage.selected')}</h2>
			<span class="type-meta">{String(selected.length).padStart(2, '0')} / {String(data.projects.length).padStart(2, '0')}</span>
		</div>
		<SystemWorkList projects={selected} locale={data.locale} />
	</div>
</section>

{#if more.length}
	<section class="theme-light more-section" aria-labelledby="more-work">
		<div class="container-page">
			<div class="section-heading">
				<h2 id="more-work" class="meta-label">{$_('workPage.more')}</h2>
				<span class="type-meta">Archive / systems</span>
			</div>
			<ol class="archive-list">
				{#each more as project, index (project.slug)}
					<li>
						<a href={localizeHref(`/projects/${project.slug}`, data.locale)}>
							<span class="archive-index type-meta-decorative">{String(index + selected.length + 1).padStart(2, '0')}</span>
							<div><h3 class="type-item-title">{pick(project.title, data.locale)}</h3><p class="type-body-small">{pick(project.tagline, data.locale)}</p></div>
							<span class="archive-role type-meta">{pick(project.role, data.locale)}<small class="type-meta">{project.period}</small></span>
							<i aria-hidden="true">↗</i>
						</a>
					</li>
				{/each}
			</ol>
		</div>
	</section>
{/if}

<style>
	.work-hero { padding: 10rem 0 5rem; border-bottom: 1px solid var(--color-line); }
	.hero-grid { display: grid; grid-template-columns: minmax(0,1.35fr) minmax(18rem,.65fr); gap: 4rem; align-items: end; }
	.meta-label { color: var(--color-secondary); }
	h1 { max-width: 12ch; margin: 1.4rem 0 0; }
	.hero-copy { padding-top: 2rem; border-top: 1px solid var(--color-line); }
	.hero-copy p { margin: 0; color: var(--color-muted); }
	.hero-copy span, .section-heading > span { display: block; margin-top: 1.5rem; text-transform: uppercase; letter-spacing: .08em; }
	.selected-section, .more-section { padding: 6rem 0 8rem; }
	.section-heading { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.4rem; }
	.section-heading > span { margin: 0; }
	.archive-list { margin: 0; padding: 0; list-style: none; border-top: 1px solid var(--color-line); }
	.archive-list a { display: grid; grid-template-columns: 3rem minmax(0,1fr) 16rem 3rem; gap: 2rem; align-items: center; padding: 2.1rem 0; border-bottom: 1px solid var(--color-line); color: var(--color-ink); transition: padding 200ms, color 200ms; }
	.archive-list a:hover { padding-inline: 1rem; color: var(--color-accent); }
	.archive-list h3 { margin: 0; }
	.archive-list p { max-width: 44rem; margin: .65rem 0 0; color: var(--color-muted); }
	.archive-role { color: var(--color-subtle); }
	.archive-role small { display: block; color: var(--color-subtle); }
	.archive-list i { font-style: normal; font-size: 1.1rem; }
	@media (max-width: 820px) { .hero-grid { grid-template-columns: 1fr; gap: 2.5rem; } .archive-list a { grid-template-columns: 2rem 1fr 2rem; gap: 1rem; } .archive-role { grid-column: 2; } .archive-list i { grid-column: 3; grid-row: 1 / span 2; } }
	@media (max-width: 620px) { .work-hero { padding: 8rem 0 4rem; } .selected-section, .more-section { padding: 4rem 0 5rem; } .section-heading > span { display: none; } }
</style>
