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

<aside
	use:reveal
	class="mt-14 grid gap-5 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-6 sm:grid-cols-[96px_1fr] sm:items-center"
>
	<img
		src={profile.photoUrl}
		alt={pick(profile.name, locale)}
		class="aspect-square w-24 rounded-lg border border-[var(--color-line)] bg-[var(--color-paper)] object-cover"
	/>
	<div class="min-w-0">
		<p class="text-xs font-black uppercase tracking-[0.14em] text-[var(--color-accent)]">
			{$_('mascot.authorEyebrow')}
		</p>
		<h2 class="mt-2 text-2xl font-black text-[var(--color-ink)]">{$_('mascot.authorTitle')}</h2>
		<p class="mt-2 max-w-2xl leading-relaxed text-[var(--color-muted)]">{$_('mascot.authorBody')}</p>
		<div class="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
			<Button href={profile.github} variant="outline" external>
				GitHub <span aria-hidden="true">↗</span>
			</Button>
			<Button href={`mailto:${profile.email}`} variant="ghost" external>
				{$_('mascot.authorContact')}
			</Button>
		</div>
	</div>
</aside>
