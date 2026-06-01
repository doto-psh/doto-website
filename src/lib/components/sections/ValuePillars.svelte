<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Section from '$lib/components/ui/Section.svelte';
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import { reveal } from '$lib/actions/reveal';

	const pillars = ['templates', 'writing', 'projects'] as const;
</script>

<Section class="!pt-4 md:!pt-4">
	<SectionHeading eyebrow={$_('pillars.eyebrow')} title={$_('pillars.title')} />

	<div class="mt-14 grid gap-4 md:grid-cols-3">
		{#each pillars as key, i (key)}
			<div
				use:reveal={{ delay: i * 100 }}
				class="relative flex min-h-64 flex-col justify-between rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] md:p-7"
			>
				<div class="flex items-center justify-between">
					<span class="text-xs font-black uppercase tracking-[0.14em] text-[var(--color-accent)]">
						0{i + 1}
					</span>
					<span class="h-3 w-3 rounded-sm {i === 1 ? 'bg-[var(--color-lime)]' : i === 2 ? 'bg-[var(--color-coral)]' : 'bg-[var(--color-accent)]'}"></span>
				</div>
				<div class="mt-12 flex flex-col gap-3">
					<h3 class="text-xl font-extrabold text-[var(--color-ink)]">
						{$_(`pillars.items.${key}.title`)}
					</h3>
					<p class="text-sm leading-relaxed text-[var(--color-muted)]">
						{$_(`pillars.items.${key}.body`)}
					</p>
				</div>
			</div>
		{/each}
	</div>
</Section>
