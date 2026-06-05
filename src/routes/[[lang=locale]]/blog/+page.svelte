<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Seo from '$lib/components/layout/Seo.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import MascotEmptyState from '$lib/components/portfolio/MascotEmptyState.svelte';
	import { localizeHref, pick } from '$lib/i18n/routing';
	import { reveal } from '$lib/actions/reveal';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let query = $state('');

	let filtered = $derived.by(() => {
		const normalized = query.trim().toLowerCase();
		if (!normalized) return data.posts;
		return data.posts.filter((post) =>
			[
				pick(post.title, data.locale),
				pick(post.excerpt, data.locale),
				pick(post.content, data.locale),
				...post.tags
			]
				.join(' ')
				.toLowerCase()
				.includes(normalized)
		);
	});

	function formatDate(iso: string): string {
		return new Intl.DateTimeFormat(data.locale, {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		}).format(new Date(iso));
	}
</script>

<Seo
	title={`${$_('blogPage.title')} — doto`}
	description={$_('blogPage.subtitle')}
	locale={data.locale}
/>

<header class="blueprint-grid border-b border-[var(--color-line)] bg-[var(--color-paper)] py-16 md:py-24">
	<Container>
		<div use:reveal class="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
			<div class="flex max-w-2xl flex-col gap-4">
				<span class="w-fit rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] text-[var(--color-accent)]">
					{$_('blogPage.eyebrow')}
				</span>
				<h1 class="max-w-full text-3xl font-black text-[var(--color-ink)] sm:text-4xl md:text-5xl lg:text-6xl">
					{$_('blogPage.title')}
				</h1>
				<p class="text-lg font-medium text-[var(--color-muted)]">{$_('blogPage.subtitle')}</p>
			</div>

			<div class="rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-4">
				<label for="post-search" class="text-xs font-black uppercase tracking-[0.14em] text-[var(--color-muted)]">
					{$_('blogPage.searchLabel')}
				</label>
				<input
					id="post-search"
					bind:value={query}
					type="search"
					placeholder={$_('blogPage.searchPlaceholder')}
					class="mt-3 w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-4 py-3 text-sm font-semibold text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)]"
				/>
			</div>
		</div>
	</Container>
</header>

<section class="py-12 md:py-16">
	<Container>
		{#if filtered.length}
		<ul class="flex flex-col">
			{#each filtered as post, i (post.slug)}
				<li use:reveal={{ delay: (i % 4) * 70 }}>
					<a
						href={localizeHref(`/blog/${post.slug}`, data.locale)}
						data-cursor-hover
						class="group grid gap-3 border-b border-[var(--color-line)] py-8 transition-colors first:border-t hover:bg-[var(--color-surface)] md:-mx-3 md:grid-cols-[180px_1fr] md:gap-10 md:px-3"
					>
						<div class="flex flex-col gap-2">
							<time class="text-sm font-semibold text-[var(--color-muted)]" datetime={post.date}>
								{formatDate(post.date)}
							</time>
							<div class="flex flex-wrap gap-2">
								{#each post.tags as tag (tag)}
									<span class="text-xs uppercase tracking-wide text-[var(--color-muted)]">#{tag}</span>
								{/each}
							</div>
						</div>
						<div class="flex flex-col gap-2">
							<h2 class="text-2xl font-extrabold text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)] md:text-3xl">
								{pick(post.title, data.locale)}
							</h2>
							<p class="max-w-2xl text-[var(--color-muted)]">{pick(post.excerpt, data.locale)}</p>
							<span
								class="mt-1 inline-flex items-center gap-1 text-sm text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-accent)]"
							>
								{$_('blogPage.readOn')}
								<span class="transition-transform group-hover:translate-x-1">→</span>
							</span>
						</div>
					</a>
				</li>
			{/each}
		</ul>
		{:else}
			<MascotEmptyState message={$_('blogPage.empty')} />
		{/if}
	</Container>
</section>
