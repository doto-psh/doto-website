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
	<div use:reveal class="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
		<span class="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
			{$_('aboutTeaser.eyebrow')}
		</span>
		<h2 class="font-serif text-3xl text-[var(--color-ink)] md:text-4xl lg:text-5xl">
			{$_('aboutTeaser.title')}
		</h2>
		<p class="text-lg leading-relaxed text-[var(--color-muted)]">{$_('aboutTeaser.body')}</p>
		<Button href={localizeHref('/about', locale)} variant="outline">
			{$_('aboutTeaser.cta')} <span aria-hidden="true">→</span>
		</Button>
	</div>
</Section>
