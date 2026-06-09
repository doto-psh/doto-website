<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Locale, Profile } from '$lib/types';
	import { localizeHref, pick } from '$lib/i18n/routing';
	import Container from '$lib/components/ui/Container.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	interface Props {
		profile: Profile;
		locale: Locale;
	}

	let { profile, locale }: Props = $props();

	const signals = ['capture', 'organize', 'share'] as const;
</script>

<section class="relative isolate overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-bg)]">
	<div class="blueprint-grid pointer-events-none absolute inset-0 -z-20 opacity-80" aria-hidden="true"></div>
	<div
		class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-[var(--color-bg)] to-transparent"
		aria-hidden="true"
	></div>

	<Container>
		<div class="grid items-center gap-12 py-16 md:py-20 xl:min-h-[60vh] xl:grid-cols-[1.05fr_0.95fr]">
			<!-- Copy -->
			<div class="flex min-w-0 flex-col justify-center">
				<span
					class="reveal is-visible mb-5 w-fit max-w-full rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-[var(--color-accent)]"
				>
					{$_('hero.eyebrow')}
				</span>

				<h1 class="w-full max-w-full text-balance text-5xl font-black leading-[1.02] text-[var(--color-ink)] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[4.75rem]">
					<span class="block">{pick(profile.name, locale)}</span>
					<span class="mt-3 block w-full max-w-full text-balance text-[1.75rem] leading-snug text-[var(--color-accent)] sm:text-4xl md:text-5xl xl:max-w-3xl xl:text-[3.75rem]">
						{pick(profile.role, locale)}
					</span>
				</h1>

				<p class="mt-7 max-w-xl text-pretty text-lg font-medium text-[var(--color-muted)] md:text-xl">
					{pick(profile.tagline, locale)}
				</p>

				<div class="mt-10 flex flex-wrap items-center gap-3">
					<Button href={localizeHref('/projects', locale)} variant="primary" size="lg">
						{$_('hero.ctaPrimary')} <span aria-hidden="true">→</span>
					</Button>
					<!-- Resume PDF temporarily disabled
					<Button href={profile.resumeUrl} variant="outline" size="lg">
						{$_('hero.ctaSecondary')}
					</Button>
					-->
					<!-- GitHub link temporarily disabled
					<Button href={profile.github} external variant="ghost" size="lg">
						GitHub <span aria-hidden="true">↗</span>
					</Button>
					-->
				</div>

				<div class="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3 xl:hidden">
					{#each signals as item, i}
						<div
							class="rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-3 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]"
						>
							<span class="mr-2 text-[var(--color-accent)]">0{i + 1}</span>
							{$_(`hero.signals.${item}`)}
						</div>
					{/each}
				</div>
			</div>

			<!-- System map board (wide screens only) -->
			<div class="hero-board hidden xl:block" aria-hidden="true">
				<div class="mb-3 flex items-center justify-between">
					<span class="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
						developer console
					</span>
					<span class="rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-2 py-1 text-[10px] font-bold text-[var(--color-muted)]">
						open to work
					</span>
				</div>
				<div class="grid grid-cols-[1fr_0.8fr] gap-3">
					<div class="rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-4 shadow-[0_18px_50px_rgba(16,24,39,0.08)]">
						<div class="mb-4 flex items-center gap-2">
							<span class="h-2.5 w-2.5 rounded-sm bg-[var(--color-accent)]"></span>
							<span class="text-[10px] font-black uppercase tracking-[0.14em] text-[var(--color-muted)]">recent work</span>
						</div>
						<div class="space-y-2">
							<span class="block h-3 w-full rounded-sm bg-[var(--color-surface-blue)]"></span>
							<span class="block h-3 w-5/6 rounded-sm bg-[var(--color-surface-blue)]"></span>
							<span class="block h-3 w-2/3 rounded-sm bg-[var(--color-surface-blue)]"></span>
						</div>
						<div class="mt-6 grid grid-cols-3 gap-2">
							<span class="grid h-16 place-items-center overflow-hidden rounded-md border border-[var(--color-line)] bg-[var(--color-paper)]">
								<img src={profile.photoUrl} alt="" class="h-full w-full object-cover" />
							</span>
							<span class="h-16 rounded-md border border-[var(--color-line)] bg-[var(--color-paper)]"></span>
							<span class="h-16 rounded-md border border-[var(--color-line)] bg-[var(--color-paper)]"></span>
						</div>
					</div>

					<div class="space-y-3">
						<div class="rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-4 shadow-[0_18px_50px_rgba(16,24,39,0.06)]">
							<div class="mb-3 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--color-cyan)]">stack mix</div>
							<div class="grid grid-cols-4 items-end gap-2">
								<span class="h-8 rounded-sm bg-[var(--color-surface-blue)]"></span>
								<span class="h-14 rounded-sm bg-[var(--color-accent)]"></span>
								<span class="h-10 rounded-sm bg-[var(--color-surface-blue)]"></span>
								<span class="h-16 rounded-sm bg-[var(--color-lime)]"></span>
							</div>
						</div>
						<div class="rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-4 shadow-[0_18px_50px_rgba(16,24,39,0.06)]">
							<div class="flex items-center gap-2">
								<span class="h-8 w-8 rounded-lg bg-[var(--color-accent)]"></span>
								<span class="text-[10px] font-black uppercase tracking-[0.14em] text-[var(--color-muted)]">github ready</span>
							</div>
							<div class="mt-4 space-y-2">
								<span class="block h-2 w-full rounded-sm bg-[var(--color-surface-blue)]"></span>
								<span class="block h-2 w-3/4 rounded-sm bg-[var(--color-surface-blue)]"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Pipeline strip, aligned to the container -->
		<div class="hidden border-t border-[var(--color-line)] pb-10 pt-4 md:block">
			<div class="flex justify-between text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-muted)]">
				<span>build</span>
				<span>debug</span>
				<span>ship</span>
			</div>
		</div>
	</Container>
</section>
