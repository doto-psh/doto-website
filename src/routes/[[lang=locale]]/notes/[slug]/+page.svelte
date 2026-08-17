<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Seo from '$lib/components/layout/Seo.svelte';
	import { localizeHref, pick } from '$lib/i18n/routing';
	import { renderMarkdown } from '$lib/utils/markdown';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let title = $derived(pick(data.post.title, data.locale));
	let html = $derived(renderMarkdown(pick(data.post.content, data.locale)));
	function formatDate(iso: string): string {
		return new Intl.DateTimeFormat(data.locale, { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(iso));
	}
</script>

<Seo title={`${title} — doto`} description={pick(data.post.excerpt, data.locale)} locale={data.locale} />

<article>
	<header class="article-hero">
		<div class="container-reading">
			<a href={localizeHref('/notes', data.locale)} class="text-link">← {$_('notesPage.back')}</a>
			<div class="article-meta type-meta"><time datetime={data.post.date}>{formatDate(data.post.date)}</time><span>{data.post.tags.join(' / ')}</span></div>
			<h1 class="type-page-title">{title}</h1>
			<p class="type-lead">{pick(data.post.excerpt, data.locale)}</p>
		</div>
	</header>
	<div class="theme-light article-body">
		<div class="container-reading">
			<div class="markdown-body prose-reading type-prose">{@html html}</div>
			<footer><a href={localizeHref('/notes', data.locale)} class="text-link">← {$_('notesPage.back')}</a></footer>
		</div>
	</div>
</article>

<style>
	.article-hero { padding: 8.5rem 0 5rem; border-bottom: 1px solid var(--color-line); }
	.article-meta { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 4rem; text-transform: uppercase; }
	h1 { max-width: 17ch; margin: 1.5rem 0 0; }
	.article-hero p { max-width: 46rem; margin: 2rem 0 0; color: var(--color-muted); }
	.article-body { padding: 5rem 0 7rem; }
	.markdown-body :global(h1) { display: none; }
	.markdown-body :global(h2) { margin: 4rem 0 1.1rem; font-size: var(--type-item-title-size); font-weight: 650; line-height: 1.22; letter-spacing: -.03em; color: var(--color-ink); }
	.markdown-body :global(h3), .markdown-body :global(h4) { margin: 2.75rem 0 .8rem; font-size: var(--type-lead-size); line-height: 1.35; font-weight: 650; color: var(--color-ink); }
	.markdown-body :global(p), .markdown-body :global(li) { color: var(--color-muted); }
	.markdown-body :global(p + p) { margin-top: 1.35rem; }
	.markdown-body :global(ul) { margin: 1.3rem 0; padding-left: 1.3rem; }
	.markdown-body :global(li) { margin: .45rem 0; list-style: disc; padding-left: .3rem; }
	.markdown-body :global(strong) { color: var(--color-ink); }
	.markdown-body :global(a) { color: var(--color-accent); text-decoration: underline; text-underline-offset: .2em; }
	.markdown-body :global(code) { border: 1px solid var(--color-line); background: var(--color-surface); padding: .1rem .35rem; color: var(--color-ink); font-family: var(--font-mono); font-size: var(--type-code-size); }
	.markdown-body :global(pre) { margin: 2rem 0; overflow-x: auto; border-left: 3px solid var(--color-accent); background: #0b1017; padding: 1.35rem; }
	.markdown-body :global(pre code) { border: 0; background: transparent; padding: 0; color: #dce4ee; }
	footer { margin-top: 5rem; padding-top: 2rem; border-top: 1px solid var(--color-line); }
	@media (max-width: 620px) { .article-hero { padding: 7.5rem 0 4rem; } .article-meta { margin-top: 3rem; } .article-body { padding: 3.5rem 0 5rem; } }
</style>
