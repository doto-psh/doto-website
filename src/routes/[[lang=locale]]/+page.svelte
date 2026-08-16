<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Seo from '$lib/components/layout/Seo.svelte';
	import ChatPanel from '$lib/components/chat/ChatPanel.svelte';
	import ArchitectureSpotlight from '$lib/components/portfolio/ArchitectureSpotlight.svelte';
	import CapabilityAccordion from '$lib/components/portfolio/CapabilityAccordion.svelte';
	import ExperienceTimeline from '$lib/components/portfolio/ExperienceTimeline.svelte';
	import HeroStage from '$lib/components/portfolio/HeroStage.svelte';
	import SystemWorkList from '$lib/components/portfolio/SystemWorkList.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { localizeHref, pick } from '$lib/i18n/routing';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let profile = $derived(data.portfolio.profile);
	let realName = $derived(profile.realName ? pick(profile.realName, data.locale) : pick(profile.name, data.locale));

	function formatDate(iso: string): string {
		return new Intl.DateTimeFormat(data.locale, { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(iso));
	}
</script>

<Seo title={`${realName} (doto) — ${pick(profile.role, data.locale)}`} description={$_('meta.description')} locale={data.locale} />

<HeroStage {profile} proofs={data.home.proofs} locale={data.locale} />

<section class="statement section-shell">
	<div class="container-page statement-grid reveal" use:reveal>
		<div>
			<p class="meta-label text-[var(--color-secondary)]">{$_('statement.eyebrow')}</p>
			<p class="statement-note">{$_('statement.note')}</p>
		</div>
		<div class="statement-copy">
			{#each pick(data.home.statement, data.locale) as line, index (line)}
				<p class:accent={index === 1} class:muted={index === 2}>{line}</p>
			{/each}
		</div>
	</div>
</section>

<section id="selected-work" class="section-shell work-section">
	<div class="container-page reveal" use:reveal>
		<div class="section-heading">
			<div><p class="meta-label text-[var(--color-secondary)]">{$_('featured.eyebrow')}</p><h2>{$_('featured.title')}</h2></div>
			<p>{$_('featured.subtitle')}</p>
		</div>
		<SystemWorkList projects={data.projects} locale={data.locale} />
		<a href={localizeHref('/projects', data.locale)} class="text-link mt-9">{$_('featured.cta')} <span aria-hidden="true">→</span></a>
	</div>
</section>

<section class="section-shell architecture-section">
	<div class="container-page architecture-grid reveal" use:reveal>
		<div class="architecture-copy">
			<p class="meta-label text-[var(--color-secondary)]">{$_('architecture.eyebrow')}</p>
			<h2>{$_('architecture.title')}</h2>
			<p>{$_('architecture.subtitle')}</p>
			<a class="text-link" href={localizeHref(`/projects/${data.architectureProject.slug}`, data.locale)}>{$_('architecture.cta')} <span aria-hidden="true">↗</span></a>
		</div>
		<ArchitectureSpotlight project={data.architectureProject} locale={data.locale} />
	</div>
</section>

<section id="capabilities" class="theme-light section-shell">
	<div class="container-page reveal" use:reveal>
		<div class="section-heading section-heading-light">
			<div><p class="meta-label text-[var(--color-accent)]">{$_('capabilities.eyebrow')}</p><h2>{$_('capabilities.title')}</h2></div>
			<p>{$_('capabilities.subtitle')}</p>
		</div>
		<CapabilityAccordion groups={data.portfolio.skills} projects={data.allProjects} locale={data.locale} />
	</div>
</section>

<section class="section-shell experience-section">
	<div class="container-page experience-grid reveal" use:reveal>
		<div class="experience-copy">
			<p class="meta-label text-[var(--color-secondary)]">{$_('experiencePreview.eyebrow')}</p>
			<h2>{$_('experiencePreview.title')}</h2>
			<p>{$_('experiencePreview.subtitle')}</p>
			<a class="text-link" href={localizeHref('/about#experience', data.locale)}>{$_('experiencePreview.cta')} <span aria-hidden="true">→</span></a>
		</div>
		<ExperienceTimeline items={data.portfolio.timeline} locale={data.locale} />
	</div>
</section>

<section class="section-shell notes-section">
	<div class="container-page reveal" use:reveal>
		<div class="section-heading">
			<div><p class="meta-label text-[var(--color-secondary)]">{$_('notesPreview.eyebrow')}</p><h2>{$_('notesPreview.title')}</h2></div>
			<a class="text-link" href={localizeHref('/notes', data.locale)}>{$_('notesPreview.cta')} <span aria-hidden="true">→</span></a>
		</div>
		<ol class="note-list">
			{#each data.posts as post, index (post.slug)}
				<li><a href={localizeHref(`/notes/${post.slug}`, data.locale)}><span class="note-index">{String(index + 1).padStart(2, '0')}</span><time datetime={post.date}>{formatDate(post.date)}</time><div><h3>{pick(post.title, data.locale)}</h3><p>{pick(post.excerpt, data.locale)}</p></div><i aria-hidden="true">↗</i></a></li>
			{/each}
		</ol>
	</div>
</section>

<section class="theme-light section-shell about-preview">
	<div class="container-page about-grid reveal" use:reveal>
		<div><p class="meta-label text-[var(--color-accent)]">{$_('aboutPreview.eyebrow')}</p><h2>{$_('aboutPreview.title')}</h2></div>
		<div><p>{$_('aboutPreview.body')}</p><p class="about-detail">{pick(profile.bio, data.locale).split('\n\n')[0]}</p><a class="text-link" href={localizeHref('/about', data.locale)}>{$_('aboutPreview.cta')} <span aria-hidden="true">→</span></a></div>
	</div>
</section>

<section class="section-shell ask-section">
	<div class="container-page ask-grid reveal" use:reveal>
		<div class="ask-copy"><p class="meta-label text-[var(--color-secondary)]">{$_('askPreview.eyebrow')}</p><h2>{$_('askPreview.title')}</h2><p>{$_('askPreview.body')}</p></div>
		<ChatPanel variant="compact" locale={data.locale} />
	</div>
</section>

<style>
	.section-heading { display: grid; grid-template-columns: minmax(0,1fr) minmax(18rem,30rem); gap: 4rem; align-items: end; margin-bottom: 4.8rem; }
	.section-heading h2, .architecture-copy h2, .experience-copy h2, .about-grid h2, .ask-copy h2 { max-width: 13ch; margin: 1.1rem 0 0; font-size: clamp(2.8rem, 5.2vw, 5.8rem); line-height: .98; font-weight: 600; }
	.section-heading > p, .section-heading > a, .architecture-copy > p, .experience-copy > p, .about-grid p, .ask-copy > p { margin: 0; color: var(--color-muted); line-height: 1.75; }
	.statement { min-height: 88svh; display: grid; align-items: center; background: linear-gradient(180deg,#070a0f,#090e16); }
	.statement-grid { display: grid; grid-template-columns: 15rem 1fr; gap: 4rem; }
	.statement-note { max-width: 13rem; margin: 1.25rem 0 0; color: var(--color-muted); font-size: .82rem; line-height: 1.7; }
	.statement-copy p { margin: 0; font-size: clamp(3rem, 7.2vw, 8.3rem); line-height: .96; letter-spacing: -.07em; font-weight: 600; }
	.statement-copy .accent { color: var(--color-secondary); }
	.statement-copy .muted { color: #6d7888; }
	.work-section { background: #080b11; }
	.architecture-section { background: radial-gradient(circle at 82% 40%, rgba(86,137,255,.12), transparent 32rem), #070a0f; }
	.architecture-grid { display: grid; grid-template-columns: .72fr 1.28fr; gap: clamp(3rem,7vw,7rem); align-items: center; }
	.architecture-copy h2 { margin-bottom: 1.8rem; }
	.architecture-copy > p { max-width: 32rem; }
	.architecture-copy .text-link, .experience-copy .text-link { margin-top: 2rem; }
	.experience-section { background: #080b11; }
	.experience-grid { display: grid; grid-template-columns: .68fr 1.32fr; gap: clamp(3rem,7vw,7rem); }
	.experience-copy { position: sticky; top: 8rem; align-self: start; }
	.experience-copy h2 { margin-bottom: 1.5rem; }
	.notes-section { background: #0a0e15; }
	.note-list { margin: 0; padding: 0; list-style: none; border-top: 1px solid var(--color-line); }
	.note-list a { display: grid; grid-template-columns: 3rem 9rem 1fr 2rem; gap: 1.5rem; align-items: start; padding: 2rem 0; border-bottom: 1px solid var(--color-line); color: var(--color-ink); transition: padding 180ms, background 180ms; }
	.note-list a:hover { padding-inline: .8rem; background: rgba(86,137,255,.06); }
	.note-index, .note-list time { color: var(--color-faint); font-family: var(--font-mono); font-size: .65rem; }
	.note-list h3 { margin: 0; font-size: clamp(1.45rem,2.5vw,2.5rem); letter-spacing: -.04em; }
	.note-list p { max-width: 45rem; margin: .65rem 0 0; color: var(--color-muted); font-size: .87rem; }
	.note-list i { justify-self: end; font-style: normal; }
	.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(3rem,8vw,8rem); align-items: end; }
	.about-grid h2 { max-width: 14ch; }
	.about-grid .about-detail { margin-top: 1.5rem; color: var(--color-ink); }
	.about-grid .text-link { margin-top: 2rem; }
	.ask-section { background: radial-gradient(circle at 12% 28%,rgba(86,137,255,.1),transparent 26rem),#070a0f; }
	.ask-grid { display: grid; grid-template-columns: .7fr 1.3fr; gap: clamp(3rem,7vw,7rem); align-items: center; }
	.ask-copy h2 { margin-bottom: 1.5rem; }
	@media (max-width: 900px) {
		.section-heading, .architecture-grid, .experience-grid, .about-grid, .ask-grid { grid-template-columns: 1fr; gap: 2.5rem; }
		.statement-grid { grid-template-columns: 1fr; gap: 3rem; }
		.experience-copy { position: static; }
	}
	@media (max-width: 620px) {
		.section-heading { margin-bottom: 3rem; }
		.note-list a { grid-template-columns: 2rem 1fr 2rem; gap: .75rem; }
		.note-list time { grid-column: 2; grid-row: 1; }
		.note-list div { grid-column: 2; }
		.note-list i { grid-column: 3; grid-row: 1 / span 2; }
		.note-list a:hover { padding-inline: 0; background: transparent; }
	}
</style>
