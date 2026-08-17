<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Seo from '$lib/components/layout/Seo.svelte';
	import { localizeHref, pick } from '$lib/i18n/routing';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	function formatDate(iso: string): string {
		return new Intl.DateTimeFormat(data.locale, { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(iso));
	}
</script>

<Seo title={`${$_('notesPage.title')} — doto`} description={$_('notesPage.subtitle')} locale={data.locale} />

<header class="notes-hero">
	<div class="container-page hero-grid">
		<div><p class="meta-label">{$_('notesPage.eyebrow')} · LOG</p><h1 class="type-page-title">{$_('notesPage.title')}</h1></div>
		<p class="type-body">{$_('notesPage.subtitle')}</p>
	</div>
</header>

<section class="notes-section">
	<div class="container-page">
		{#if data.posts.length}
			<ol class="notes-list">
				{#each data.posts as post, index (post.slug)}
					<li><a href={localizeHref(`/notes/${post.slug}`, data.locale)}>
						<span class="index type-meta-decorative">{String(index + 1).padStart(2, '0')}</span>
						<div class="date"><time class="type-meta" datetime={post.date}>{formatDate(post.date)}</time><small class="type-meta">{post.tags.join(' / ')}</small></div>
						<div class="copy"><h2 class="type-item-title">{pick(post.title, data.locale)}</h2><p class="type-body-small">{pick(post.excerpt, data.locale)}</p></div>
						<i aria-hidden="true">↗</i>
					</a></li>
				{/each}
			</ol>
		{:else}
			<div class="empty"><p class="type-lead">{$_('notesPage.empty')}</p><a class="text-link" href={localizeHref('/projects', data.locale)}>{$_('notesPage.emptyCta')} →</a></div>
		{/if}
	</div>
</section>

<style>
	.notes-hero { padding: 10rem 0 5rem; border-bottom: 1px solid var(--color-line); }
	.hero-grid { display: grid; grid-template-columns: 1.2fr .8fr; gap: 4rem; align-items: end; }
	.meta-label { color: var(--color-secondary); }
	h1 { margin: 1.25rem 0 0; }
	.hero-grid > p { max-width: 32rem; margin: 0; color: var(--color-muted); }
	.notes-section { padding: 5rem 0 8rem; }
	.notes-list { margin: 0; padding: 0; list-style: none; border-top: 1px solid var(--color-line); }
	.notes-list a { display: grid; grid-template-columns: 3rem 10rem minmax(0,1fr) 3rem; gap: 2rem; padding: 2.5rem 0; border-bottom: 1px solid var(--color-line); color: var(--color-ink); transition: padding 220ms, background 220ms; }
	.notes-list a:hover { padding-inline: 1rem; background: linear-gradient(90deg,rgba(86,137,255,.09),transparent); }
	.date time { display: block; }
	.date small { display: block; margin-top: .75rem; text-transform: uppercase; }
	.copy h2 { max-width: 25ch; margin: 0; }
	.copy p { max-width: 46rem; margin: 1rem 0 0; color: var(--color-muted); }
	.notes-list i { font-style: normal; }
	.empty { padding: 4rem 0; border-block: 1px solid var(--color-line); }
	.empty p { color: var(--color-ink); }
	@media (max-width: 800px) { .hero-grid { grid-template-columns: 1fr; gap: 2.5rem; } .notes-list a { grid-template-columns: 2rem 1fr 2rem; gap: 1rem; } .date { grid-column: 2; } .copy { grid-column: 2; } .notes-list i { grid-column: 3; grid-row: 1 / span 3; } }
	@media (max-width: 620px) { .notes-hero { padding: 8rem 0 4rem; } .notes-section { padding: 3.5rem 0 5rem; } }
</style>
