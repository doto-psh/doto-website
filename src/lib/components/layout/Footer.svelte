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

<footer class="border-t border-[var(--color-footer-line)] bg-[var(--color-footer-bg)] text-white">
	<div class="container-page grid gap-10 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:py-20">
		<div class="flex flex-col gap-3">
			<a href={localizeHref('/', locale)} class="inline-flex items-center gap-2 text-2xl font-black text-white">
				<span class="grid h-8 w-8 place-items-center rounded-lg bg-[var(--color-accent)] text-sm">d</span>
				{site.brand}
			</a>
			<p class="max-w-xs text-sm text-white/72">{$_('footer.tagline')}</p>
		</div>

		<div class="flex flex-col gap-3">
			<span class="text-xs font-black uppercase tracking-[0.16em] text-white/64">
				{$_('footer.explore')}
			</span>
			{#each navItems as item (item.key)}
				<a
					href={localizeHref(item.path, locale)}
					class="text-sm font-semibold text-white/84 transition-colors hover:text-white"
				>
					{$_(`nav.${item.key}`)}
				</a>
			{/each}
		</div>

		<div class="flex flex-col gap-3">
			<span class="text-xs font-black uppercase tracking-[0.16em] text-white/64">
				{$_('footer.connect')}
			</span>
			{#each site.social as link (link.label)}
				<a
					href={link.href}
					target="_blank"
					rel="noopener noreferrer"
					class="text-sm font-semibold text-white/84 transition-colors hover:text-white"
				>
					{link.label}
				</a>
			{/each}
		</div>
	</div>

	<div class="border-t border-[var(--color-footer-line)]">
		<div
			class="container-page flex flex-col gap-2 py-6 text-xs text-white/64 sm:flex-row sm:items-center sm:justify-between"
		>
			<span>© {year} {site.brand}. {$_('footer.rights')}</span>
			<span>{$_('footer.madeWith')} · Seoul</span>
		</div>
	</div>
</footer>
