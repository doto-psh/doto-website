<script lang="ts">
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';
	import type { Locale } from '$lib/types';
	import { localizeHref } from '$lib/i18n/routing';
	import { site, navItems } from '$lib/data/site';
	import LanguageSwitcher from './LanguageSwitcher.svelte';

	interface Props {
		locale: Locale;
	}

	let { locale }: Props = $props();

	let scrolled = $state(false);
	let menuOpen = $state(false);

	$effect(() => {
		const onScroll = () => (scrolled = window.scrollY > 16);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	// Close the mobile menu on navigation.
	$effect(() => {
		void $page.url.pathname;
		menuOpen = false;
	});

	function isActive(path: string): boolean {
		const bare = $page.url.pathname.replace(/^\/(en|ja)/, '') || '/';
		return path === '/' ? bare === '/' : bare.startsWith(path);
	}
</script>

<header
	class="fixed inset-x-0 top-0 z-50 transition-all duration-300 {scrolled
		? 'border-b border-[var(--color-line)] bg-[var(--color-bg)]/85 backdrop-blur-md'
		: 'border-b border-transparent'}"
>
	<div class="container-page flex h-16 items-center justify-between md:h-20">
		<a
			href={localizeHref('/', locale)}
			class="font-serif text-xl tracking-tight text-[var(--color-ink)]"
			data-cursor-hover
		>
			{site.brand}<span class="text-[var(--color-accent)]">.</span>
		</a>

		<!-- Desktop nav -->
		<nav class="hidden items-center gap-8 md:flex">
			{#each navItems as item (item.key)}
				<a
					href={localizeHref(item.path, locale)}
					class="text-sm transition-colors hover:text-[var(--color-accent)] {isActive(item.path)
						? 'text-[var(--color-accent)]'
						: 'text-[var(--color-ink)]'}"
				>
					{$_(`nav.${item.key}`)}
				</a>
			{/each}
			<span class="h-4 w-px bg-[var(--color-line)]"></span>
			<LanguageSwitcher {locale} />
		</nav>

		<!-- Mobile toggle -->
		<button
			type="button"
			class="flex h-10 w-10 items-center justify-center md:hidden"
			aria-expanded={menuOpen}
			aria-label={menuOpen ? $_('nav.close') : $_('nav.menu')}
			onclick={() => (menuOpen = !menuOpen)}
		>
			<span class="relative block h-4 w-6">
				<span
					class="absolute left-0 h-px w-6 bg-[var(--color-ink)] transition-all duration-300 {menuOpen
						? 'top-1/2 rotate-45'
						: 'top-0'}"
				></span>
				<span
					class="absolute left-0 top-1/2 h-px w-6 bg-[var(--color-ink)] transition-opacity duration-300 {menuOpen
						? 'opacity-0'
						: 'opacity-100'}"
				></span>
				<span
					class="absolute left-0 h-px w-6 bg-[var(--color-ink)] transition-all duration-300 {menuOpen
						? 'top-1/2 -rotate-45'
						: 'top-full'}"
				></span>
			</span>
		</button>
	</div>

	<!-- Mobile menu -->
	{#if menuOpen}
		<nav
			class="border-t border-[var(--color-line)] bg-[var(--color-bg)] md:hidden"
		>
			<div class="container-page flex flex-col gap-1 py-4">
				{#each navItems as item (item.key)}
					<a
						href={localizeHref(item.path, locale)}
						class="py-2 text-lg text-[var(--color-ink)]"
					>
						{$_(`nav.${item.key}`)}
					</a>
				{/each}
				<div class="mt-3 border-t border-[var(--color-line)] pt-4">
					<LanguageSwitcher {locale} />
				</div>
			</div>
		</nav>
	{/if}
</header>
