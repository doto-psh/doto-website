<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Seo from '$lib/components/layout/Seo.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import { localizeHref, pick } from '$lib/i18n/routing';
	import { renderMarkdown } from '$lib/utils/markdown';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let title = $derived(pick(data.post.title, data.locale));
	let html = $derived(renderMarkdown(pick(data.post.content, data.locale)));

	function formatDate(iso: string): string {
		return new Intl.DateTimeFormat(data.locale, {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		}).format(new Date(iso));
	}
</script>

<Seo title={`${title} — doto`} description={pick(data.post.excerpt, data.locale)} locale={data.locale} />

<article class="py-12 md:py-20">
	<Container>
		<a
			href={localizeHref('/blog', data.locale)}
			class="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2 text-sm font-semibold text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
		>
			<span aria-hidden="true">←</span> {$_('blogPage.backToBlog')}
		</a>

		<header class="mt-10 max-w-3xl border-b border-[var(--color-line)] pb-10">
			<div class="mb-4 flex flex-wrap items-center gap-2">
				<time class="text-sm font-bold text-[var(--color-muted)]" datetime={data.post.date}>
					{formatDate(data.post.date)}
				</time>
				{#each data.post.tags as tag (tag)}
					<span class="rounded-md border border-[var(--color-line)] px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-[var(--color-muted)]">
						#{tag}
					</span>
				{/each}
			</div>
			<h1 class="text-4xl font-black leading-tight text-[var(--color-ink)] md:text-5xl">{title}</h1>
			<p class="mt-5 text-lg font-medium leading-relaxed text-[var(--color-muted)]">
				{pick(data.post.excerpt, data.locale)}
			</p>
		</header>

		<div class="markdown-body mt-10 max-w-3xl">
			{@html html}
		</div>
	</Container>
</article>

<style>
	.markdown-body :global(h1) {
		margin-bottom: 1.5rem;
		font-size: clamp(2rem, 4vw, 3rem);
		color: var(--color-ink);
	}

	.markdown-body :global(h2) {
		margin-top: 2.5rem;
		margin-bottom: 0.875rem;
		font-size: 1.5rem;
		color: var(--color-ink);
	}

	.markdown-body :global(p),
	.markdown-body :global(li) {
		font-size: 1.05rem;
		line-height: 1.85;
		color: var(--color-muted);
	}

	.markdown-body :global(p + p) {
		margin-top: 1rem;
	}

	.markdown-body :global(ul) {
		margin: 1rem 0 1.25rem;
		padding-left: 1.25rem;
	}

	.markdown-body :global(li) {
		list-style: disc;
		padding-left: 0.25rem;
	}

	.markdown-body :global(strong) {
		color: var(--color-ink);
	}

	.markdown-body :global(code) {
		border: 1px solid var(--color-line);
		border-radius: 6px;
		background: var(--color-surface-blue);
		padding: 0.1rem 0.35rem;
		color: var(--color-ink);
		font-size: 0.92em;
	}

	.markdown-body :global(pre) {
		margin: 1.5rem 0;
		overflow-x: auto;
		border: 1px solid var(--color-line);
		border-radius: 8px;
		background: var(--color-ink);
		padding: 1rem;
	}

	.markdown-body :global(pre code) {
		border: 0;
		background: transparent;
		padding: 0;
		color: var(--color-bg);
	}
</style>
