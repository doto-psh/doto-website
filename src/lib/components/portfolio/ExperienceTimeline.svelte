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
			<span class="period">{item.period ? pick(item.period, locale) : ''}</span>
			<div>
				<p>{item.organization ? pick(item.organization, locale) : $_(`portfolio.timelineCategories.${item.category}`)}</p>
				<h3>{pick(item.title, locale)}</h3>
				{#if item.description}<div class="description">{pick(item.description, locale)}</div>{/if}
				{#if item.stack}<ul>{#each item.stack as stack (stack)}<li>{stack}</li>{/each}</ul>{/if}
			</div>
		</li>
	{/each}
</ol>

<style>
	.timeline { margin: 0; padding: 0; list-style: none; border-top: 1px solid var(--color-line); }
	.timeline > li { display: grid; grid-template-columns: 11rem 1fr; gap: 2.5rem; padding: 2.2rem 0; border-bottom: 1px solid var(--color-line); }
	.period, p { color: var(--color-faint); font-family: var(--font-mono); font-size: .67rem; line-height: 1.55; }
	p { margin: 0 0 .65rem; text-transform: uppercase; letter-spacing: .08em; }
	h3 { margin: 0; font-size: clamp(1.55rem, 2.6vw, 2.7rem); font-weight: 600; }
	.description { max-width: 50rem; margin-top: 1rem; color: var(--color-muted); font-size: .9rem; line-height: 1.7; }
	ul { display: flex; flex-wrap: wrap; gap: .45rem; margin: 1.25rem 0 0; padding: 0; list-style: none; }
	ul li { padding: .3rem .55rem; border: 1px solid var(--color-line); border-radius: 999px; color: #c8d1dc; font-family: var(--font-mono); font-size: .6rem; }
	@media (max-width: 620px) { .timeline > li { grid-template-columns: 1fr; gap: .8rem; } }
</style>
