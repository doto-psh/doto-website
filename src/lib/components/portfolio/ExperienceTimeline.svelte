<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Locale, TimelineItem } from '$lib/types';
	import { pick } from '$lib/i18n/routing';

	let { items, locale }: { items: TimelineItem[]; locale: Locale } = $props();
	let careers = $derived(items.filter((item) => item.category === 'career'));
</script>

<ol class="timeline">
	{#each careers as item (item.id)}
		<li>
			<span class="period type-meta">{item.period ? pick(item.period, locale) : ''}</span>
			<div>
				<p class="type-meta">{item.organization ? pick(item.organization, locale) : $_(`portfolio.timelineCategories.${item.category}`)}</p>
				<h3 class="type-item-title">{pick(item.title, locale)}</h3>
				{#if item.description}<div class="description type-body">{pick(item.description, locale)}</div>{/if}
				{#if item.stack}<ul>{#each item.stack as stack (stack)}<li class="type-meta">{stack}</li>{/each}</ul>{/if}
			</div>
		</li>
	{/each}
</ol>

<style>
	.timeline { margin: 0; padding: 0; list-style: none; border-top: 1px solid var(--color-line); }
	.timeline > li { display: grid; grid-template-columns: 11rem 1fr; gap: 2.5rem; padding: 2.2rem 0; border-bottom: 1px solid var(--color-line); }
	.period, p { color: var(--color-subtle); }
	p { margin: 0 0 .65rem; text-transform: uppercase; letter-spacing: .08em; }
	h3 { margin: 0; }
	.description { max-width: 50rem; margin-top: 1rem; color: var(--color-muted); }
	ul { display: flex; flex-wrap: wrap; gap: .45rem; margin: 1.25rem 0 0; padding: 0; list-style: none; }
	ul li { padding: .3rem .55rem; border: 1px solid var(--color-line); border-radius: 999px; color: #c8d1dc; }
	@media (max-width: 620px) { .timeline > li { grid-template-columns: 1fr; gap: .8rem; } }
</style>
