<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Locale, TimelineCategory, TimelineItem } from '$lib/types';
	import { pick } from '$lib/i18n/routing';
	import { reveal } from '$lib/actions/reveal';

	interface Props {
		items: TimelineItem[];
		locale: Locale;
		limit?: number;
	}

	let { items, locale, limit }: Props = $props();

	const accent: Record<TimelineCategory, string> = {
		career: 'bg-[var(--color-accent)]',
		education: 'bg-[var(--color-cyan)]',
		certification: 'bg-[var(--color-lime)]',
		activity: 'bg-[var(--color-coral)]'
	};

	let visibleItems = $derived(typeof limit === 'number' ? items.slice(0, limit) : items);
</script>

<div class="relative">
	<div class="absolute left-4 top-0 hidden h-full w-px bg-[var(--color-line)] md:block" aria-hidden="true"></div>
	<div class="flex flex-col gap-4">
		{#each visibleItems as item, i (item.id)}
			<article
				use:reveal={{ delay: (i % 4) * 70 }}
				class="relative rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-5 md:ml-12"
			>
				<span class="absolute -left-[3.2rem] top-6 hidden h-3 w-3 rounded-sm {accent[item.category]} md:block"></span>
				<div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
					<div>
						<div class="flex flex-wrap items-center gap-2">
							<span class="rounded-md border border-[var(--color-line)] bg-[var(--color-surface-blue)] px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[var(--color-accent)]">
								{$_(`portfolio.timelineCategories.${item.category}`)}
							</span>
							<span class="text-xs font-bold text-[var(--color-muted)]">{pick(item.period, locale)}</span>
						</div>
						<h3 class="mt-3 text-xl font-black text-[var(--color-ink)]">{pick(item.title, locale)}</h3>
						<p class="mt-1 text-sm font-bold text-[var(--color-muted)]">{pick(item.organization, locale)}</p>
					</div>
					{#if item.link}
						<a
							href={item.link}
							target="_blank"
							rel="noopener noreferrer"
							class="text-sm font-bold text-[var(--color-accent)]"
						>
							{$_('portfolio.openLink')} ↗
						</a>
					{/if}
				</div>

				<p class="mt-4 leading-relaxed text-[var(--color-muted)]">{pick(item.description, locale)}</p>

				{#if item.highlights?.[locale]?.length}
					<ul class="mt-4 grid gap-2">
						{#each pick(item.highlights, locale) as highlight (highlight)}
							<li class="flex items-start gap-2 text-sm text-[var(--color-ink)]">
								<span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"></span>
								{highlight}
							</li>
						{/each}
					</ul>
				{/if}

				{#if item.stack?.length}
					<div class="mt-4 flex flex-wrap gap-2">
						{#each item.stack as tech (tech)}
							<span class="rounded-md border border-[var(--color-line)] px-2 py-1 text-[11px] font-semibold text-[var(--color-muted)]">
								{tech}
							</span>
						{/each}
					</div>
				{/if}
			</article>
		{/each}
	</div>
</div>
