<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Locale, Profile } from '$lib/types';
	import { pick } from '$lib/i18n/routing';
	import Button from '$lib/components/ui/Button.svelte';
	import { reveal } from '$lib/actions/reveal';

	interface Props {
		profile: Profile;
		locale: Locale;
	}

	let { profile, locale }: Props = $props();
</script>

<div class="grid gap-8 lg:grid-cols-[340px_1fr] lg:items-center">
	<div use:reveal class="relative max-w-sm">
		<img
			src={profile.photoUrl}
			alt={pick(profile.name, locale)}
			class="aspect-square w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] object-cover shadow-[0_22px_60px_rgba(16,24,39,0.10)]"
		/>
		<div class="absolute bottom-4 left-4 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-[var(--color-accent)]">
			{pick(profile.location, locale)}
		</div>
	</div>

	<div use:reveal={{ delay: 80 }} class="flex min-w-0 max-w-3xl flex-col gap-5">
		<span class="w-fit rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] text-[var(--color-accent)]">
			{$_('portfolio.profileEyebrow')}
		</span>
		<div>
			<h1 class="text-4xl font-black leading-tight text-[var(--color-ink)] md:text-5xl">
				{pick(profile.name, locale)}
			</h1>
			{#if profile.realName}
				<p class="mt-2 text-base font-bold text-[var(--color-muted)]">{pick(profile.realName, locale)}</p>
			{/if}
			<p class="mt-3 text-balance text-xl font-bold text-[var(--color-muted)]">{pick(profile.role, locale)}</p>
		</div>
		<p class="max-w-full break-words text-[1.45rem] font-black leading-tight text-[var(--color-ink)] md:text-3xl">
			{pick(profile.tagline, locale)}
		</p>
		<p class="max-w-full whitespace-pre-line break-words text-pretty text-lg leading-relaxed text-[var(--color-muted)]">{pick(profile.bio, locale)}</p>
		<div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
			<!-- Resume PDF temporarily disabled
			<Button href={profile.resumeUrl} variant="primary" size="lg">
				{$_('hero.ctaSecondary')}
			</Button>
			-->
			<!-- GitHub link temporarily disabled
			<Button href={profile.github} variant="outline" external size="lg">
				GitHub <span aria-hidden="true">↗</span>
			</Button>
			-->
			<Button href={`mailto:${profile.email}`} variant="ghost" external size="lg">
				{profile.email}
			</Button>
		</div>
	</div>
</div>
