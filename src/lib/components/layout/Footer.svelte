<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Locale } from '$lib/types';
	import { localizeHref } from '$lib/i18n/routing';
	import { site, navItems } from '$lib/data/site';

	interface Props {
		locale: Locale;
	}

	let { locale }: Props = $props();
	const year = new Date().getFullYear();
</script>

<footer class="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
	<div class="container-page grid gap-10 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:py-20">
		<div class="flex flex-col gap-3">
			<a href={localizeHref('/', locale)} class="font-serif text-2xl text-[var(--color-ink)]">
				{site.brand}<span class="text-[var(--color-accent)]">.</span>
			</a>
			<p class="max-w-xs text-sm text-[var(--color-muted)]">{$_('footer.tagline')}</p>
		</div>

		<div class="flex flex-col gap-3">
			<span class="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-muted)]">
				{$_('footer.explore')}
			</span>
			{#each navItems as item (item.key)}
				<a
					href={localizeHref(item.path, locale)}
					class="text-sm text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent)]"
				>
					{$_(`nav.${item.key}`)}
				</a>
			{/each}
		</div>

		<div class="flex flex-col gap-3">
			<span class="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-muted)]">
				{$_('footer.connect')}
			</span>
			{#each site.social as link (link.label)}
				<a
					href={link.href}
					target="_blank"
					rel="noopener noreferrer"
					class="text-sm text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent)]"
				>
					{link.label}
				</a>
			{/each}
		</div>
	</div>

	<div class="border-t border-[var(--color-line)]">
		<div
			class="container-page flex flex-col gap-2 py-6 text-xs text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between"
		>
			<span>© {year} {site.brand}. {$_('footer.rights')}</span>
			<span>{$_('footer.madeWith')} · Seoul</span>
		</div>
	</div>
</footer>
