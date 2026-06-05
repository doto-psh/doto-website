<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Seo from '$lib/components/layout/Seo.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import ContactForm from '$lib/components/forms/ContactForm.svelte';
	import ProfileHero from '$lib/components/portfolio/ProfileHero.svelte';
	import SkillMatrix from '$lib/components/portfolio/SkillMatrix.svelte';
	import Timeline from '$lib/components/portfolio/Timeline.svelte';
	import { pick } from '$lib/i18n/routing';
	import { reveal } from '$lib/actions/reveal';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let profile = $derived(data.portfolio.profile);
</script>

<Seo
	title={`${pick(profile.name, data.locale)} — doto`}
	description={pick(profile.tagline, data.locale)}
	locale={data.locale}
/>

<header class="blueprint-grid border-b border-[var(--color-line)] bg-[var(--color-paper)] py-16 md:py-24">
	<Section class="!py-0">
		<ProfileHero {profile} locale={data.locale} />
	</Section>
</header>

<Section>
	<div class="mb-12 flex flex-col gap-3">
		<span use:reveal class="w-fit rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] text-[var(--color-accent)]">
			{$_('portfolio.skillsEyebrow')}
		</span>
		<h2 use:reveal class="text-3xl font-black text-[var(--color-ink)] md:text-4xl">
			{$_('portfolio.skillsTitle')}
		</h2>
		<p use:reveal class="max-w-2xl text-lg text-[var(--color-muted)]">
			{$_('portfolio.skillsSubtitle')}
		</p>
	</div>
	<SkillMatrix skills={data.portfolio.skills} locale={data.locale} />
</Section>

<Section surface>
	<div class="mb-12 flex flex-col gap-3">
		<span use:reveal class="w-fit rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] text-[var(--color-accent)]">
			{$_('portfolio.timelineEyebrow')}
		</span>
		<h2 use:reveal class="text-3xl font-black text-[var(--color-ink)] md:text-4xl">
			{$_('portfolio.timelineTitle')}
		</h2>
		<p use:reveal class="max-w-2xl text-lg text-[var(--color-muted)]">
			{$_('portfolio.timelineSubtitle')}
		</p>
	</div>
	<Timeline items={data.portfolio.timeline} locale={data.locale} />
</Section>

<Section>
	<div use:reveal class="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
		<div class="flex flex-col gap-5">
			<span class="w-fit rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] text-[var(--color-accent)]">
				{$_('aboutPage.contactTitle')}
			</span>
			<h2 class="text-3xl font-black text-[var(--color-ink)] md:text-4xl">
				{$_('portfolio.contactTitle')}
			</h2>
			<p class="text-lg text-[var(--color-muted)]">{$_('aboutPage.contactBody')}</p>
			<div class="flex flex-wrap gap-3">
				<Button href={profile.resumeUrl} variant="primary" size="lg">
					{$_('hero.ctaSecondary')}
				</Button>
				<Button href={profile.github} variant="outline" size="lg" external>
					GitHub <span aria-hidden="true">↗</span>
				</Button>
			</div>
		</div>
		<ContactForm />
	</div>
</Section>
