<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Locale, SkillGroup } from '$lib/types';
	import { pick } from '$lib/i18n/routing';
	import { reveal } from '$lib/actions/reveal';

	interface Props {
		skills: SkillGroup[];
		locale: Locale;
		compact?: boolean;
	}

	let { skills, locale, compact = false }: Props = $props();

	const levelClass = {
		core: 'border-[var(--color-accent)] bg-[var(--color-surface-blue)] text-[var(--color-accent)]',
		working: 'border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-ink)]',
		learning: 'border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-muted)]'
	};
</script>

<div class="grid gap-4 {compact ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'}">
	{#each skills as group, i (group.category)}
		<div
			use:reveal={{ delay: (i % 3) * 80 }}
			class="flex min-h-full flex-col rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-5"
		>
			<div class="flex items-start justify-between gap-4">
				<div>
					<span class="text-xs font-black uppercase tracking-[0.14em] text-[var(--color-accent)]">
						{group.category}
					</span>
					<h3 class="mt-2 text-xl font-black text-[var(--color-ink)]">{pick(group.title, locale)}</h3>
				</div>
				<span class="rounded-md border border-[var(--color-line)] px-2 py-1 text-[10px] font-black uppercase text-[var(--color-muted)]">
					{group.items.length}
				</span>
			</div>
			<p class="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{pick(group.description, locale)}</p>
			<div class="mt-5 flex flex-wrap gap-2">
				{#each group.items as item (item.name)}
					<span class="rounded-md border px-2.5 py-1.5 text-xs font-bold {levelClass[item.level]}">
						{item.name}
					</span>
				{/each}
			</div>
			<div class="mt-auto pt-5 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--color-muted)]">
				{$_(`portfolio.skillLevels.${group.items[0]?.level ?? 'working'}`)}
			</div>
		</div>
	{/each}
</div>
