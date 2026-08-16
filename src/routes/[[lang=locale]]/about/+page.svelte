<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Seo from '$lib/components/layout/Seo.svelte';
	import ExperienceTimeline from '$lib/components/portfolio/ExperienceTimeline.svelte';
	import { pick } from '$lib/i18n/routing';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let profile = $derived(data.portfolio.profile);
	let bioParagraphs = $derived(pick(profile.bio, data.locale).split('\n\n'));
	let supporting = $derived(data.portfolio.timeline.filter((item) => item.category !== 'career'));
</script>

<Seo title={`${profile.realName ? pick(profile.realName, data.locale) : pick(profile.name, data.locale)} — doto`} description={pick(profile.tagline, data.locale)} locale={data.locale} />

<header class="about-hero">
	<div class="container-page about-grid">
		<div class="portrait-wrap">
			<img src={profile.photoUrl} alt={profile.realName ? pick(profile.realName, data.locale) : pick(profile.name, data.locale)} />
			<div><span>{pick(profile.location, data.locale)}</span><span>{pick(profile.role, data.locale)}</span></div>
		</div>
		<div class="intro">
			<p class="meta-label">{$_('aboutPage.eyebrow')} · PROFILE</p>
			<h1>{$_('aboutPage.title')}</h1>
			<p class="lead">{$_('aboutPage.intro')}</p>
			<div class="bio">{#each bioParagraphs as paragraph (paragraph)}<p>{paragraph}</p>{/each}</div>
		</div>
	</div>
</header>

<section id="experience" class="experience-section" aria-labelledby="experience-title">
	<div class="container-page section-grid">
		<div><p class="meta-label">01 / Career</p><h2 id="experience-title">{$_('aboutPage.timeline')}</h2></div>
		<ExperienceTimeline items={data.portfolio.timeline} locale={data.locale} />
	</div>
</section>

<section class="theme-light skills-section" aria-labelledby="skills-title">
	<div class="container-page section-grid">
		<div><p class="meta-label">02 / Stack</p><h2 id="skills-title">{$_('aboutPage.skills')}</h2></div>
		<div class="skill-list">
			{#each data.portfolio.skills as group, index (group.category)}
				<article>
					<span>{String(index + 1).padStart(2, '0')}</span>
					<div><h3>{pick(group.title, data.locale)}</h3><p>{pick(group.description, data.locale)}</p></div>
					<ul>{#each group.items as item (item.name)}<li>{item.name}</li>{/each}</ul>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="support-section" aria-label={$_('aboutPage.timeline')}>
	<div class="container-page section-grid">
		<div><p class="meta-label">03 / More</p><h2>Background</h2></div>
		<div class="support-list">
			{#each supporting as item (item.id)}
				<article>
					<p>{$_(`portfolio.timelineCategories.${item.category}`)}</p>
					<div><h3>{pick(item.title, data.locale)}</h3>{#if item.organization}<span>{pick(item.organization, data.locale)}</span>{/if}</div>
					<time>{item.period ? pick(item.period, data.locale) : ''}</time>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="theme-light contact-section" aria-labelledby="contact-title">
	<div class="container-page contact-grid">
		<div><p class="meta-label">{$_('aboutPage.contact')}</p><h2 id="contact-title">{$_('contact.title')}</h2></div>
		<div class="contact-links">
			<a href={`mailto:${profile.email}`}>{profile.email}<span>↗</span></a>
			<a href={profile.resumeUrl}>{$_('aboutPage.resume')}<span>↗</span></a>
			<a href={profile.github} target="_blank" rel="noreferrer">GitHub<span>↗</span></a>
		</div>
	</div>
</section>

<style>
	.about-hero { padding: 9rem 0 7rem; border-bottom: 1px solid var(--color-line); }
	.about-grid { display: grid; grid-template-columns: minmax(17rem,.72fr) minmax(0,1.28fr); gap: clamp(3rem,8vw,9rem); align-items: start; }
	.portrait-wrap { position: sticky; top: 7rem; }
	.portrait-wrap img { width: 100%; max-width: 31rem; aspect-ratio: 4 / 5; object-fit: cover; filter: saturate(.7) contrast(1.05); }
	.portrait-wrap > div { display: flex; justify-content: space-between; gap: 1rem; margin-top: 1rem; color: var(--color-faint); font-family: var(--font-mono); font-size: .61rem; text-transform: uppercase; }
	.meta-label { color: var(--color-secondary); }
	.intro h1 { max-width: 11ch; margin: 1.5rem 0 0; font-size: clamp(3.6rem,7vw,7rem); line-height: .92; font-weight: 600; letter-spacing: -.065em; }
	.lead { max-width: 40rem; margin: 2rem 0 0; color: #c9d1dc; font-size: 1.15rem; line-height: 1.75; }
	.bio { max-width: 43rem; margin-top: 3.5rem; padding-top: 2rem; border-top: 1px solid var(--color-line); }
	.bio p { margin: 0; color: var(--color-muted); line-height: 1.85; }
	.bio p + p { margin-top: 1.25rem; }
	.experience-section, .skills-section, .support-section, .contact-section { padding: 7rem 0; scroll-margin-top: 5rem; }
	.section-grid { display: grid; grid-template-columns: minmax(12rem,.38fr) minmax(0,1fr); gap: clamp(3rem,7vw,8rem); }
	.section-grid h2 { margin: 1rem 0 0; font-size: clamp(2rem,4vw,4rem); font-weight: 600; letter-spacing: -.045em; }
	.skill-list { border-top: 1px solid var(--color-line); }
	.skill-list article { display: grid; grid-template-columns: 2rem minmax(12rem,.7fr) minmax(15rem,1fr); gap: 1.5rem; padding: 2rem 0; border-bottom: 1px solid var(--color-line); }
	.skill-list article > span, .skill-list li { font-family: var(--font-mono); font-size: .61rem; }
	.skill-list article > span { color: var(--color-faint); }
	.skill-list h3 { margin: 0; font-size: 1.25rem; font-weight: 650; }
	.skill-list p { margin: .7rem 0 0; color: var(--color-muted); font-size: .86rem; line-height: 1.65; }
	.skill-list ul { display: flex; flex-wrap: wrap; align-content: start; gap: .45rem; margin: 0; padding: 0; list-style: none; }
	.skill-list li { padding: .35rem .55rem; border: 1px solid var(--color-line); border-radius: 999px; color: var(--color-muted); }
	.support-list { border-top: 1px solid var(--color-line); }
	.support-list article { display: grid; grid-template-columns: 8rem 1fr 8rem; gap: 1.5rem; padding: 1.7rem 0; border-bottom: 1px solid var(--color-line); }
	.support-list p, .support-list time, .support-list span { margin: 0; color: var(--color-faint); font-family: var(--font-mono); font-size: .62rem; }
	.support-list h3 { margin: 0 0 .45rem; font-size: 1.2rem; font-weight: 600; }
	.support-list time { text-align: right; }
	.contact-grid { display: grid; grid-template-columns: 1fr minmax(18rem,.6fr); gap: 4rem; align-items: end; }
	.contact-grid h2 { max-width: 17ch; margin: 1rem 0 0; font-size: clamp(2.5rem,5vw,5.5rem); font-weight: 600; line-height: 1; letter-spacing: -.055em; }
	.contact-links { border-top: 1px solid var(--color-line); }
	.contact-links a { display: flex; justify-content: space-between; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--color-line); color: var(--color-ink); font-family: var(--font-mono); font-size: .7rem; }
	.contact-links a:hover { color: var(--color-accent); }
	@media (max-width: 850px) { .about-grid, .section-grid, .contact-grid { grid-template-columns: 1fr; } .portrait-wrap { position: static; } .portrait-wrap img { max-width: 23rem; } .skill-list article { grid-template-columns: 2rem 1fr; } .skill-list ul { grid-column: 2; } }
	@media (max-width: 620px) { .about-hero { padding: 7.5rem 0 5rem; } .experience-section, .skills-section, .support-section, .contact-section { padding: 5rem 0; } .support-list article { grid-template-columns: 1fr; gap: .6rem; } .support-list time { text-align: left; } }
</style>
