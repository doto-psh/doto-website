<script lang="ts">
	import { page } from '$app/stores';
	import { onMount, tick } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { LOCALES, type Locale } from '$lib/types';
	import { localizeHref } from '$lib/i18n/routing';
	import { site } from '$lib/data/site';
	import LanguageSwitcher from './LanguageSwitcher.svelte';

	let { locale }: { locale: Locale } = $props();
	let menuOpen = $state(false);
	let scrolled = $state(false);
	let menuButton = $state<HTMLButtonElement | null>(null);
	let menuPanel = $state<HTMLElement | null>(null);

	const navigation = [
		{ key: 'projects', path: '/projects' },
		{ key: 'capabilities', path: '/#capabilities' },
		{ key: 'experience', path: '/about#experience' },
		{ key: 'notes', path: '/notes' },
		{ key: 'about', path: '/about' }
	] as const;

	function barePath(): string {
		const segments = $page.url.pathname.split('/').filter(Boolean);
		if (segments.length && (LOCALES as readonly string[]).includes(segments[0])) segments.shift();
		return '/' + segments.join('/');
	}

	function isActive(path: string): boolean {
		const target = path.split('#')[0] || '/';
		const current = barePath();
		return target === '/' ? current === '/' : current.startsWith(target);
	}

	async function openMenu() {
		menuOpen = true;
		await tick();
		menuPanel?.querySelector<HTMLAnchorElement>('nav a[href]')?.focus();
	}

	function closeMenu(restoreFocus = true) {
		menuOpen = false;
		if (restoreFocus) menuButton?.focus();
	}

	function toggleMenu() {
		if (menuOpen) closeMenu();
		else void openMenu();
	}

	function trapFocus(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			event.preventDefault();
			closeMenu();
			return;
		}
		if (event.key !== 'Tab' || !menuPanel) return;
		const focusable = [...menuPanel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')];
		if (!focusable.length) return;
		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	}

	onMount(() => {
		const update = () => (scrolled = window.scrollY > 16);
		update();
		window.addEventListener('scroll', update, { passive: true });
		return () => window.removeEventListener('scroll', update);
	});

	$effect(() => {
		void $page.url.pathname;
		menuOpen = false;
	});

	$effect(() => {
		document.body.dataset.menuOpen = menuOpen ? 'true' : 'false';
		return () => delete document.body.dataset.menuOpen;
	});
</script>

<header class:scrolled class="site-header">
	<a href="#main-content" class="skip-link">{$_('common.skipToContent')}</a>
	<div class="header-grid">
		<a href={localizeHref('/', locale)} data-no-visited class="brand" aria-label={`${site.brand} home`}>
			<span class="brand-mark">d</span><span>{site.brand}</span><i aria-hidden="true"></i>
		</a>

		<nav class="desktop-nav" aria-label={$_('nav.primary')}>
			{#each navigation as item (item.key)}
				<a href={localizeHref(item.path, locale)} data-no-visited aria-current={isActive(item.path) ? 'page' : undefined}>{$_(`nav.${item.key}`)}</a>
			{/each}
		</nav>

		<div class="header-actions">
			<a class="ask-link" href={localizeHref('/ask', locale)} data-no-visited>{$_('nav.ask')} <span aria-hidden="true">↗</span></a>
			<LanguageSwitcher {locale} />
			<button bind:this={menuButton} type="button" class="menu-button" aria-expanded={menuOpen} aria-controls="mobile-navigation" onclick={toggleMenu}>
				<span aria-hidden="true"></span><span aria-hidden="true"></span><span class="sr-only">{menuOpen ? $_('nav.close') : $_('nav.menu')}</span>
			</button>
		</div>
	</div>
</header>

{#if menuOpen}
	<div bind:this={menuPanel} class="mobile-menu" role="dialog" aria-modal="true" aria-label={$_('nav.primary')} tabindex="-1" onkeydown={trapFocus}>
		<div class="mobile-menu-head">
			<a href={localizeHref('/', locale)} class="brand" data-no-visited><span class="brand-mark">d</span><span>{site.brand}</span><i aria-hidden="true"></i></a>
			<button type="button" onclick={() => closeMenu()}>{$_('nav.close')}</button>
		</div>
		<nav id="mobile-navigation">
			{#each navigation as item, index (item.key)}
				<a href={localizeHref(item.path, locale)} data-no-visited><span>{String(index + 1).padStart(2, '0')}</span>{$_(`nav.${item.key}`)}<i aria-hidden="true">↗</i></a>
			{/each}
			<a href={localizeHref('/ask', locale)} data-no-visited><span>06</span>{$_('nav.ask')}<i aria-hidden="true">↗</i></a>
		</nav>
		<div class="mobile-menu-foot"><p>AI Engineer · Seoul, Korea</p><LanguageSwitcher {locale} /></div>
	</div>
{/if}

<style>
	.site-header { position: fixed; z-index: 80; top: 0; left: 0; right: 0; height: 5rem; border-bottom: 1px solid transparent; transition: background 280ms, border-color 280ms, backdrop-filter 280ms; }
	.site-header.scrolled { border-color: var(--color-line); background: rgba(7,10,15,.76); backdrop-filter: blur(22px); }
	.header-grid { width: min(calc(100% - 4rem), 90rem); height: 100%; margin-inline: auto; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 2rem; }
	.brand { display: inline-flex; width: fit-content; align-items: center; gap: .55rem; color: #f3f6fa; font-size: .93rem; font-weight: 650; letter-spacing: -.02em; }
	.brand-mark { font-size: 1.35rem; font-weight: 500; letter-spacing: -.08em; }
	.brand i { width: .38rem; height: .38rem; border-radius: 50%; background: var(--color-accent); box-shadow: 0 0 1rem var(--color-accent); }
	.desktop-nav { display: flex; align-items: center; gap: 1.75rem; }
	.desktop-nav a { position: relative; padding: 1rem 0; color: #b8c2d0; font-size: .75rem; font-weight: 500; transition: color 180ms; }
	.desktop-nav a:hover, .desktop-nav a[aria-current='page'] { color: #fff; }
	.desktop-nav a[aria-current='page']::after { content: ''; position: absolute; left: 0; right: 0; bottom: .65rem; height: 1px; background: var(--color-accent); }
	.header-actions { justify-self: end; display: flex; align-items: center; gap: .65rem; }
	.ask-link { min-height: 2.55rem; display: inline-flex; align-items: center; gap: .65rem; padding: 0 .9rem; border: 1px solid var(--color-line); border-radius: 999px; color: #e1e7ef; font-size: .72rem; transition: border-color 180ms, background 180ms; }
	.ask-link:hover { border-color: var(--color-accent); background: rgba(86,137,255,.1); }
	.menu-button { display: none; width: 2.75rem; height: 2.75rem; border: 1px solid var(--color-line); border-radius: 50%; background: transparent; }
	.menu-button > span:not(.sr-only) { display: block; width: 1rem; height: 1px; margin: .3rem auto; background: #fff; }
	.skip-link { position: fixed; z-index: 120; left: 1rem; top: -5rem; padding: .75rem 1rem; background: #fff; color: #000; font-weight: 600; }
	.skip-link:focus { top: 1rem; }
	.mobile-menu { position: fixed; z-index: 100; inset: 0; display: flex; flex-direction: column; padding: 0 1rem 1.5rem; background: rgba(7,10,15,.98); backdrop-filter: blur(24px); }
	.mobile-menu-head { height: 5rem; display: flex; align-items: center; justify-content: space-between; }
	.mobile-menu-head button { min-width: 2.75rem; min-height: 2.75rem; border: 0; background: transparent; color: #fff; font-size: .75rem; }
	.mobile-menu nav { border-top: 1px solid var(--color-line); }
	.mobile-menu nav a { display: grid; grid-template-columns: 2.5rem 1fr auto; align-items: baseline; padding: 1.05rem 0; border-bottom: 1px solid var(--color-line); color: #fff; font-size: clamp(1.8rem, 9vw, 3.5rem); font-weight: 550; letter-spacing: -.045em; }
	.mobile-menu nav span, .mobile-menu nav i { color: var(--color-faint); font-family: var(--font-mono); font-size: .64rem; font-style: normal; letter-spacing: 0; }
	.mobile-menu-foot { margin-top: auto; display: flex; justify-content: space-between; align-items: end; border-top: 1px solid var(--color-line); padding-top: 1rem; }
	.mobile-menu-foot p { max-width: 12rem; margin: 0; color: var(--color-muted); font-family: var(--font-mono); font-size: .67rem; }
	@media (max-width: 1120px) { .desktop-nav { display: none; } .menu-button { display: block; } .header-grid { grid-template-columns: 1fr auto; } }
	@media (max-width: 760px) { .site-header { height: 4.5rem; } .header-grid { width: calc(100% - 2rem); } .ask-link, .header-actions :global(div) { display: none; } .menu-button { display: block; } }
</style>
