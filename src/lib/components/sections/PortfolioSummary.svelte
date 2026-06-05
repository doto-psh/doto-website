<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Locale, PortfolioData } from '$lib/types';
	import { localizeHref } from '$lib/i18n/routing';
	import Section from '$lib/components/ui/Section.svelte';
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import SkillMatrix from '$lib/components/portfolio/SkillMatrix.svelte';
	import Timeline from '$lib/components/portfolio/Timeline.svelte';
	import { reveal } from '$lib/actions/reveal';

	interface Props {
		portfolio: PortfolioData;
		locale: Locale;
	}

	let { portfolio, locale }: Props = $props();
	let summarySkills = $derived(portfolio.skills.slice(0, 3));
	let summaryTimeline = $derived(portfolio.timeline.slice(0, 3));
</script>

<Section>
	<div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
		<SectionHeading
			eyebrow={$_('portfolio.summaryEyebrow')}
			title={$_('portfolio.summaryTitle')}
			subtitle={$_('portfolio.summarySubtitle')}
		/>
		<div use:reveal class="hidden md:block">
			<Button href={localizeHref('/about', locale)} variant="outline">
				{$_('portfolio.viewFullProfile')} <span aria-hidden="true">→</span>
			</Button>
		</div>
	</div>

	<div class="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
		<div>
			<h3 use:reveal class="mb-5 text-sm font-black uppercase tracking-[0.14em] text-[var(--color-muted)]">
				{$_('portfolio.skillsTitle')}
			</h3>
			<SkillMatrix skills={summarySkills} {locale} compact />
		</div>
		<div>
			<h3 use:reveal class="mb-5 text-sm font-black uppercase tracking-[0.14em] text-[var(--color-muted)]">
				{$_('portfolio.timelineTitle')}
			</h3>
			<Timeline items={summaryTimeline} {locale} />
		</div>
	</div>

	<div use:reveal class="mt-10 md:hidden">
		<Button href={localizeHref('/about', locale)} variant="outline">
			{$_('portfolio.viewFullProfile')} <span aria-hidden="true">→</span>
		</Button>
	</div>
</Section>
