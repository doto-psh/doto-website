<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Locale, Profile, ProofPoint } from '$lib/types';
	import { pick } from '$lib/i18n/routing';

	let { profile, proofs, locale }: { profile: Profile; proofs: ProofPoint[]; locale: Locale } = $props();
</script>

<section class="hero-stage">
	<div class="hero-media" aria-hidden="true">
		<img src={profile.photoUrl} alt="" fetchpriority="high" />
	</div>
	<div class="hero-shade" aria-hidden="true"></div>

	<div class="container-page hero-content">
		<div class="hero-kicker">
			<span>{$_('hero.kicker')}</span>
			<span>{$_('hero.status')}</span>
		</div>

		<div class="hero-copy">
			<p class="meta-label !text-[#b8c4d4]">{pick(profile.realName ?? profile.name, locale)} · doto</p>
			<h1>{$_('hero.title')}</h1>
			<div class="hero-bottom">
				<p>{$_('hero.subtitle')}</p>
				<div class="hero-actions">
					<a class="hero-button hero-button-primary" href="#selected-work">{$_('hero.ctaPrimary')} <span aria-hidden="true">↓</span></a>
					<a class="hero-button hero-button-ghost" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">{$_('hero.ctaSecondary')} <span aria-hidden="true">↗</span></a>
				</div>
			</div>
		</div>

		<dl class="proof-strip">
			{#each proofs as proof (proof.value)}
				<div>
					<dt>{proof.value}</dt>
					<dd>{pick(proof.label, locale)}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>

<style>
	.hero-stage { position: relative; min-height: 100svh; overflow: hidden; border-bottom: 1px solid var(--color-line); display: flex; align-items: flex-end; }
	.hero-media, .hero-shade { position: absolute; inset: 0; }
	.hero-media img { width: 100%; height: 100%; object-fit: cover; object-position: 62% 43%; filter: contrast(1.04) brightness(.82); transform: scale(1.01); }
	.hero-shade { background: linear-gradient(90deg, rgba(4,7,11,.99) 0%, rgba(4,7,11,.92) 38%, rgba(4,7,11,.46) 65%, rgba(4,7,11,.18) 100%), linear-gradient(0deg, rgba(4,7,11,.92) 0%, transparent 44%, rgba(4,7,11,.2) 100%); }
	.hero-content { position: relative; z-index: 1; display: flex; min-height: 100svh; flex-direction: column; justify-content: flex-end; padding-top: 8rem; padding-bottom: 2.5rem; }
	.hero-kicker { position: absolute; top: 7.3rem; left: 0; right: 0; display: flex; justify-content: space-between; gap: 1.5rem; color: #c4cedb; font-family: var(--font-mono); font-size: .67rem; letter-spacing: .13em; text-transform: uppercase; }
	.hero-copy { max-width: 70rem; }
	h1 { max-width: 12ch; margin: 1.4rem 0 0; font-size: clamp(3.4rem, 7.2vw, 7.5rem); line-height: .96; letter-spacing: -.065em; font-weight: 650; text-wrap: balance; }
	.hero-bottom { margin-top: 2.5rem; display: grid; grid-template-columns: minmax(18rem, 37rem) 1fr; gap: 4rem; align-items: end; }
	.hero-bottom p { margin: 0; color: #c4cedb; font-size: clamp(1rem, 1.35vw, 1.25rem); line-height: 1.65; }
	.hero-actions { display: flex; justify-content: flex-end; gap: .75rem; flex-wrap: wrap; }
	.hero-button { display: inline-flex; min-height: 3.25rem; align-items: center; justify-content: center; gap: 1.25rem; padding: 0 1.35rem; border: 1px solid transparent; border-radius: 999px; color: #fff; font-size: .84rem; font-weight: 650; transition: transform 180ms var(--ease-cinematic), background 180ms, border-color 180ms; }
	.hero-button:hover { transform: translateY(-3px); }
	.hero-button-primary { background: var(--color-accent); box-shadow: 0 1rem 3rem rgba(86,137,255,.22); }
	.hero-button-primary:hover { background: var(--color-accent-strong); }
	.hero-button-ghost { border-color: var(--color-line-strong); background: rgba(7,10,15,.36); backdrop-filter: blur(12px); }
	.proof-strip { width: min(54rem, 100%); margin: 3.4rem 0 0; display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--color-line); }
	.proof-strip div { padding: 1.2rem 1.25rem .25rem 0; border-right: 1px solid var(--color-line); }
	.proof-strip div:not(:first-child) { padding-left: 1.25rem; }
	.proof-strip div:last-child { border-right: 0; }
	.proof-strip dt { font-size: clamp(1.45rem, 2.2vw, 2.35rem); font-weight: 650; letter-spacing: -.045em; }
	.proof-strip dd { margin: .3rem 0 0; color: var(--color-muted); font-size: .72rem; line-height: 1.45; }
	@media (max-width: 760px) {
		.hero-stage { min-height: 58rem; align-items: stretch; }
		.hero-media img { object-position: 50% 28%; filter: contrast(1.02) brightness(.76); }
		.hero-shade { background: linear-gradient(0deg, rgba(4,7,11,.99) 4%, rgba(4,7,11,.92) 45%, rgba(4,7,11,.35) 72%, rgba(4,7,11,.18) 100%); }
		.hero-content { min-height: 58rem; padding-top: 6rem; padding-bottom: 1.5rem; }
		.hero-kicker { top: 5.5rem; left: 0; flex-direction: column; gap: .45rem; }
		h1 { font-size: clamp(3.05rem, 13vw, 5rem); }
		.hero-bottom { grid-template-columns: 1fr; gap: 1.5rem; margin-top: 1.5rem; }
		.hero-actions { justify-content: flex-start; }
		.hero-button { min-height: 3rem; padding-inline: 1rem; }
		.proof-strip { grid-template-columns: repeat(2, 1fr); margin-top: 2rem; }
		.proof-strip div:nth-child(2) { border-right: 0; }
		.proof-strip div:nth-child(n+3) { border-top: 1px solid var(--color-line); }
		.proof-strip div:nth-child(3) { padding-left: 0; }
	}
</style>
