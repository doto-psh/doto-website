<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { mascotImages } from '$lib/data/portfolio';
	import { reveal } from '$lib/actions/reveal';

	const items = ['curiosity', 'recording', 'craft'] as const;
</script>

<section class="border-y border-[var(--color-line)] bg-[var(--color-paper)] py-12 md:py-16">
	<div class="mx-auto grid w-full max-w-6xl gap-8 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
		<div use:reveal class="overflow-hidden rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)]">
			<img
				src={mascotImages.beach}
				alt={$_('mascot.noteImageAlt')}
				class="aspect-[16/10] w-full object-cover"
			/>
		</div>
		<div use:reveal={{ delay: 90 }} class="flex min-w-0 flex-col gap-5">
			<span class="w-fit rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] text-[var(--color-accent)]">
				{$_('mascot.noteEyebrow')}
			</span>
			<h2 class="text-3xl font-black leading-tight text-[var(--color-ink)] md:text-4xl">
				{$_('mascot.noteTitle')}
			</h2>
			<p class="max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">{$_('mascot.noteBody')}</p>
			<div class="flex flex-wrap gap-2">
				{#each items as item (item)}
					<span class="rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-[var(--color-muted)]">
						{$_(`mascot.noteItems.${item}`)}
					</span>
				{/each}
			</div>
		</div>
	</div>
</section>
