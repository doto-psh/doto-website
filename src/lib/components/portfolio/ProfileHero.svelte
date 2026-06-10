<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Locale, Profile } from '$lib/types';
	import { pick } from '$lib/i18n/routing';
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
				<div class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
					<p class="text-base font-bold text-[var(--color-muted)]">{pick(profile.realName, locale)}</p>
					<a
						href={`mailto:${profile.email}`}
						class="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" aria-hidden="true">
							<rect x="3" y="5" width="18" height="14" rx="2" />
							<path d="m3 7 9 6 9-6" />
						</svg>
						{profile.email}
					</a>
				</div>
			{/if}
			<p class="mt-3 text-balance text-xl font-bold text-[var(--color-muted)]">{pick(profile.role, locale)}</p>
		</div>
		<p class="max-w-full break-words text-[1.45rem] font-black leading-tight text-[var(--color-ink)] md:text-3xl">
			{pick(profile.tagline, locale)}
		</p>
		<p class="max-w-full whitespace-pre-line break-words text-pretty text-lg leading-relaxed text-[var(--color-muted)]">{pick(profile.bio, locale)}</p>
	</div>
</div>
