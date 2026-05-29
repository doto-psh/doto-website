<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Section from '$lib/components/ui/Section.svelte';
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import { reveal } from '$lib/actions/reveal';

	const pillars = ['templates', 'writing', 'projects'] as const;
</script>

<Section>
	<SectionHeading eyebrow={$_('pillars.eyebrow')} title={$_('pillars.title')} />

	<div class="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-line)] md:grid-cols-3">
		{#each pillars as key, i (key)}
			<div
				use:reveal={{ delay: i * 100 }}
				class="flex flex-col gap-3 bg-[var(--color-bg)] p-8 md:p-10"
			>
				<span class="font-serif text-3xl text-[var(--color-accent)]">0{i + 1}</span>
				<h3 class="font-serif text-xl text-[var(--color-ink)]">
					{$_(`pillars.items.${key}.title`)}
				</h3>
				<p class="text-sm leading-relaxed text-[var(--color-muted)]">
					{$_(`pillars.items.${key}.body`)}
				</p>
			</div>
		{/each}
	</div>
</Section>
