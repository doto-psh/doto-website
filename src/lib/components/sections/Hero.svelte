<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Locale } from '$lib/types';
	import { localizeHref } from '$lib/i18n/routing';
	import Container from '$lib/components/ui/Container.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	interface Props {
		locale: Locale;
	}

	let { locale }: Props = $props();
</script>

<section class="relative overflow-hidden">
	<!-- Soft editorial background motion -->
	<div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
		<div
			class="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[var(--color-accent)]/12 blur-3xl motion-safe:animate-[drift_18s_ease-in-out_infinite]"
		></div>
		<div
			class="absolute right-0 top-40 h-80 w-80 rounded-full bg-[var(--color-teal)]/16 blur-3xl motion-safe:animate-[drift_22s_ease-in-out_infinite_reverse]"
		></div>
	</div>

	<Container>
		<div class="flex min-h-[78vh] flex-col justify-center py-20 md:py-28">
			<span
				class="reveal is-visible mb-6 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]"
			>
				{$_('hero.eyebrow')}
			</span>

			<h1
				class="max-w-4xl whitespace-pre-line text-5xl leading-[1.05] text-[var(--color-ink)] sm:text-6xl md:text-7xl lg:text-[5.25rem]"
			>
				{$_('hero.title')}
			</h1>

			<p class="mt-7 max-w-xl text-lg text-[var(--color-muted)] md:text-xl">
				{$_('hero.subtitle')}
			</p>

			<div class="mt-10 flex flex-wrap items-center gap-4">
				<Button href={localizeHref('/templates', locale)} variant="primary" size="lg">
					{$_('hero.ctaPrimary')} <span aria-hidden="true">→</span>
				</Button>
				<Button href={localizeHref('/blog', locale)} variant="ghost" size="lg">
					{$_('hero.ctaSecondary')}
				</Button>
			</div>
		</div>
	</Container>

	<div
		class="container-page relative z-10 hidden items-center gap-3 pb-10 text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] md:flex"
	>
		<span class="h-px w-10 bg-[var(--color-line)]"></span>
		{$_('hero.scroll')}
	</div>

	<!-- Tide: layered waves anchored to the foot of the hero -->
	<div class="pointer-events-none absolute inset-x-0 bottom-0 -z-10 overflow-hidden" aria-hidden="true">
		<svg
			class="wave block h-24 w-[200%] text-[var(--color-teal)] md:h-32"
			viewBox="0 0 1440 120"
			preserveAspectRatio="none"
			fill="currentColor"
		>
			<path
				opacity="0.12"
				d="M0 60c180-40 360-40 540 0s360 40 540 0 360-40 540 0v60H0z"
			/>
		</svg>
		<svg
			class="wave-slow absolute bottom-0 left-0 block h-20 w-[200%] text-[var(--color-accent)] md:h-28"
			viewBox="0 0 1440 120"
			preserveAspectRatio="none"
			fill="currentColor"
		>
			<path
				opacity="0.1"
				d="M0 80c160-32 320-32 480 0s320 32 480 0 320-32 480 0v40H0z"
			/>
		</svg>
	</div>
</section>

<style>
	@keyframes drift {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		50% {
			transform: translate(30px, -20px) scale(1.08);
		}
	}

	@keyframes tide {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	.wave {
		animation: tide 24s linear infinite;
	}
	.wave-slow {
		animation: tide 36s linear infinite reverse;
	}

	@media (prefers-reduced-motion: reduce) {
		.wave,
		.wave-slow {
			animation: none;
		}
	}
</style>
