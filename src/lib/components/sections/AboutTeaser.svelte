<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Locale } from '$lib/types';
	import { localizeHref } from '$lib/i18n/routing';
	import Section from '$lib/components/ui/Section.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { reveal } from '$lib/actions/reveal';

	interface Props {
		locale: Locale;
	}

	let { locale }: Props = $props();
</script>

<Section surface>
	<div
		use:reveal
		class="blueprint-grid grid gap-8 rounded-lg border border-[var(--color-line)] bg-white/78 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8"
	>
		<div class="flex max-w-3xl flex-col gap-4">
			<span class="w-fit rounded-md bg-[var(--color-accent)] px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">
				{$_('aboutTeaser.eyebrow')}
			</span>
			<h2 class="text-3xl font-black text-[var(--color-ink)] md:text-4xl lg:text-5xl">
				{$_('aboutTeaser.title')}
			</h2>
			<p class="text-lg leading-relaxed text-[var(--color-muted)]">{$_('aboutTeaser.body')}</p>
		</div>
		<Button href={localizeHref('/about', locale)} variant="primary">
			{$_('aboutTeaser.cta')} <span aria-hidden="true">→</span>
		</Button>
	</div>
</Section>
