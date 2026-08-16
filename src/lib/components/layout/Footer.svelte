<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Locale } from '$lib/types';
	import { localizeHref } from '$lib/i18n/routing';
	import { site } from '$lib/data/site';

	let { locale }: { locale: Locale } = $props();
	const year = new Date().getFullYear();
</script>

<footer class="site-footer">
	<div class="container-page footer-main">
		<div>
			<p class="meta-label">{$_('contact.eyebrow')}</p>
			<h2>{$_('contact.title')}</h2>
		</div>
		<div class="contact-list">
			<a href={`mailto:${site.email}`}><span>Email</span><strong>{site.email}</strong><i aria-hidden="true">↗</i></a>
			<a href={site.github} target="_blank" rel="noreferrer"><span>GitHub</span><strong>doto-psh</strong><i aria-hidden="true">↗</i></a>
			<a href={site.resumeUrl} target="_blank" rel="noreferrer"><span>Résumé</span><strong>Download PDF</strong><i aria-hidden="true">↓</i></a>
		</div>
	</div>
	<div class="footer-bottom">
		<div class="container-page">
			<span>© {year} {site.brand}</span><span>AI Engineer · Seoul, Korea</span>
			<nav aria-label="Footer"><a href={localizeHref('/projects', locale)}>Work</a><a href={localizeHref('/notes', locale)}>Notes</a><a href={localizeHref('/ask', locale)}>Ask</a></nav>
		</div>
	</div>
</footer>

<style>
	.site-footer { border-top: 1px solid var(--color-line); background: #070a0f; color: var(--color-ink); }
	.footer-main { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; padding-block: clamp(5rem, 9vw, 8rem); }
	h2 { max-width: 12ch; margin: 1.2rem 0 0; font-size: clamp(2.8rem, 5.3vw, 5.7rem); line-height: .98; font-weight: 600; }
	.contact-list { border-top: 1px solid var(--color-line); }
	.contact-list a { display: grid; grid-template-columns: 6rem 1fr 2rem; gap: 1rem; align-items: center; min-height: 5rem; border-bottom: 1px solid var(--color-line); color: var(--color-ink); transition: padding 180ms, color 180ms; }
	.contact-list a:hover { padding-left: .75rem; color: var(--color-secondary); }
	.contact-list span { color: var(--color-faint); font-family: var(--font-mono); font-size: .65rem; text-transform: uppercase; letter-spacing: .12em; }
	.contact-list strong { font-size: .9rem; font-weight: 500; }
	.contact-list i { justify-self: end; font-style: normal; }
	.footer-bottom { border-top: 1px solid var(--color-line); }
	.footer-bottom > div { min-height: 4.5rem; display: grid; grid-template-columns: 1fr 1fr 1fr; align-items: center; gap: 1rem; color: var(--color-faint); font-family: var(--font-mono); font-size: .62rem; }
	.footer-bottom > div > span:nth-child(2) { text-align: center; }
	.footer-bottom nav { display: flex; justify-content: flex-end; gap: 1rem; }
	.footer-bottom a { color: var(--color-muted); }
	@media (max-width: 760px) { .footer-main { grid-template-columns: 1fr; gap: 3rem; } .footer-bottom > div { grid-template-columns: 1fr; padding-block: 1.2rem; } .footer-bottom > div > span:nth-child(2) { text-align: left; } .footer-bottom nav { justify-content: flex-start; } }
</style>
