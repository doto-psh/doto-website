<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Seo from '$lib/components/layout/Seo.svelte';
	import ChatPanel from '$lib/components/chat/ChatPanel.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<Seo title={`${$_('chat.pageTitle')} — doto`} description={$_('chat.pageDescription')} locale={data.locale} />

<main class="ask-page">
	<div class="container-page ask-grid">
		<header>
			<p class="meta-label">{$_('chat.pageEyebrow')} · ONLINE</p>
			<h1>{$_('chat.pageTitle')}</h1>
			<p class="description">{$_('chat.pageDescription')}</p>
			<div class="scope">
				<span>Context</span><p>Projects · experience · technical decisions</p>
				<span>Response</span><p>Portfolio-grounded answers</p>
			</div>
		</header>
		<ChatPanel locale={data.locale} />
	</div>
</main>

<style>
	.ask-page { min-height: 100vh; padding: 9rem 0 6rem; }
	.ask-grid { display: grid; grid-template-columns: minmax(18rem,.72fr) minmax(0,1.28fr); gap: clamp(3rem,7vw,8rem); align-items: start; }
	header { position: sticky; top: 8rem; }
	.meta-label { color: var(--color-secondary); }
	h1 { max-width: 9ch; margin: 1.5rem 0 0; font-size: clamp(3.8rem,7vw,7.2rem); line-height: .9; font-weight: 600; letter-spacing: -.065em; }
	.description { max-width: 31rem; margin: 2rem 0 0; color: var(--color-muted); line-height: 1.8; }
	.scope { display: grid; grid-template-columns: 5.5rem 1fr; gap: .75rem 1rem; margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--color-line); }
	.scope span, .scope p { margin: 0; font-family: var(--font-mono); font-size: .64rem; line-height: 1.6; }
	.scope span { color: var(--color-faint); text-transform: uppercase; }
	.scope p { color: var(--color-muted); }
	@media (max-width: 900px) { .ask-grid { grid-template-columns: 1fr; } header { position: static; } h1 { max-width: 12ch; } }
	@media (max-width: 620px) { .ask-page { padding: 7.5rem 0 4rem; } h1 { font-size: 3.7rem; } }
</style>
