<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Locale, Post } from '$lib/types';
	import { localizeHref, pick } from '$lib/i18n/routing';
	import Section from '$lib/components/ui/Section.svelte';
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { reveal } from '$lib/actions/reveal';

	interface Props {
		posts: Post[];
		locale: Locale;
	}

	let { posts, locale }: Props = $props();

	function formatDate(iso: string): string {
		return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short', day: 'numeric' }).format(
			new Date(iso)
		);
	}
</script>

<Section>
	<SectionHeading
		eyebrow={$_('blogPreview.eyebrow')}
		title={$_('blogPreview.title')}
		subtitle={$_('blogPreview.subtitle')}
	/>

	<ul class="mt-12 flex flex-col">
		{#each posts as post, i (post.slug)}
			<li use:reveal={{ delay: i * 80 }}>
				<a
					href={post.url}
					target="_blank"
					rel="noopener noreferrer"
					data-cursor-hover
					class="group grid gap-2 border-t border-[var(--color-line)] py-7 transition-colors last:border-b md:grid-cols-[160px_1fr_auto] md:items-baseline md:gap-8"
				>
					<time class="text-sm text-[var(--color-muted)]" datetime={post.date}>
						{formatDate(post.date)}
					</time>
					<div class="flex flex-col gap-1">
						<h3
							class="font-serif text-xl text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)] md:text-2xl"
						>
							{pick(post.title, locale)}
						</h3>
						<p class="max-w-xl text-sm text-[var(--color-muted)]">{pick(post.excerpt, locale)}</p>
					</div>
					<span
						class="hidden text-sm text-[var(--color-muted)] transition-all group-hover:text-[var(--color-accent)] md:inline-flex"
					>
						{$_('blogPreview.readMore')}
						<span class="ml-1 transition-transform group-hover:translate-x-1">↗</span>
					</span>
				</a>
			</li>
		{/each}
	</ul>

	<div use:reveal class="mt-12">
		<Button href={localizeHref('/blog', locale)} variant="outline">
			{$_('blogPreview.cta')} <span aria-hidden="true">→</span>
		</Button>
	</div>
</Section>
