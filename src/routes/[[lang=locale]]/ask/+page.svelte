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
			<h1 class="type-page-title">{$_('chat.pageTitle')}</h1>
			<p class="description type-body">{$_('chat.pageDescription')}</p>
			<div class="scope">
				<span class="type-meta">Context</span><p class="type-meta">Projects · experience · technical decisions</p>
				<span class="type-meta">Response</span><p class="type-meta">Portfolio-grounded answers</p>
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
	h1 { max-width: 9ch; margin: 1.5rem 0 0; }
	.description { max-width: 31rem; margin: 2rem 0 0; color: var(--color-muted); }
	.scope { display: grid; grid-template-columns: 5.5rem 1fr; gap: .75rem 1rem; margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--color-line); }
	.scope span, .scope p { margin: 0; }
	.scope span { color: var(--color-subtle); text-transform: uppercase; }
	.scope p { color: var(--color-muted); }
	@media (max-width: 900px) { .ask-grid { grid-template-columns: 1fr; } header { position: static; } h1 { max-width: 12ch; } }
	@media (max-width: 620px) { .ask-page { padding: 7.5rem 0 4rem; } }
</style>
