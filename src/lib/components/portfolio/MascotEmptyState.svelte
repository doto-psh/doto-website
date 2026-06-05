<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { mascotImages } from '$lib/data/portfolio';
	import { reveal } from '$lib/actions/reveal';

	interface Props {
		message: string;
	}

	let { message }: Props = $props();
</script>

<div
	use:reveal
	class="grid items-center gap-6 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-8 text-center sm:grid-cols-[120px_1fr] sm:text-left"
>
	<img
		src={mascotImages.profile}
		alt={$_('mascot.emptyAlt')}
		class="mx-auto aspect-square w-28 rounded-lg border border-[var(--color-line)] bg-[var(--color-paper)] object-cover sm:mx-0"
	/>
	<div class="min-w-0">
		<p class="text-xs font-black uppercase tracking-[0.14em] text-[var(--color-accent)]">
			{$_('mascot.emptyEyebrow')}
		</p>
		<p class="mt-2 text-lg font-black text-[var(--color-ink)]">{message}</p>
		<p class="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{$_('mascot.emptyHint')}</p>
	</div>
</div>
