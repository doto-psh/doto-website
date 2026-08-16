<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { DEFAULT_LOCALE, type Locale } from '$lib/types';
	import { localizeHref } from '$lib/i18n/routing';
	import { chat } from '$lib/chat/store.svelte';
	import ChatMessage from './ChatMessage.svelte';

	let {
		variant = 'full',
		locale = DEFAULT_LOCALE
	}: { variant?: 'full' | 'compact'; locale?: Locale } = $props();
	let input = $state('');
	let scroller = $state<HTMLDivElement | null>(null);
	let messages = $derived(chat.messages);
	let pending = $derived(chat.pending);
	let lastIndex = $derived(messages.length - 1);
	let hasQuestion = $derived(messages.some((message) => message.role === 'user'));
	let showSuggestions = $derived(!hasQuestion);
	let suggestions = $derived([$_('chat.suggest1'), $_('chat.suggest2'), $_('chat.suggest3')]);

	onMount(() => chat.ensureGreeting($_('chat.greeting')));

	$effect(() => {
		void messages.length;
		void messages.at(-1)?.content;
		if (scroller) scroller.scrollTop = scroller.scrollHeight;
	});

	function ask(text: string) {
		void chat.send(text);
	}

	function submit() {
		const text = input.trim();
		if (!text) return;
		input = '';
		void chat.send(text);
	}

	function onkeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			submit();
		}
	}
</script>

<section class:compact={variant === 'compact'} class="chat-panel" aria-label={$_('chat.title')}>
	<header>
		<div><span class="status-dot" aria-hidden="true"></span><h2>{$_('chat.title')}</h2></div>
		<span class="meta-label !text-[var(--color-success)]">{$_('chat.scopeLabel')}</span>
	</header>

	<div bind:this={scroller} class="chat-log" aria-live="polite" aria-busy={pending}>
		{#each messages as message, index (index)}
			<ChatMessage {message} typing={pending && index === lastIndex} />
		{/each}

		{#if showSuggestions}
			<div class="suggestions">
				<p class="meta-label">{$_('chat.suggestionsTitle')}</p>
				<div>
					{#each suggestions as suggestion (suggestion)}
						<button type="button" onclick={() => ask(suggestion)} disabled={pending}>{suggestion}</button>
					{/each}
				</div>
			</div>
		{/if}

		{#if chat.errorKind}
			<div class="chat-error" role="alert">
				<p>{chat.errorKind === 'rate-limit' ? $_('chat.rateLimited') : $_('chat.error')}</p>
				<button type="button" onclick={() => chat.retry()}>{$_('chat.retry')} →</button>
			</div>
		{/if}
	</div>

	<form onsubmit={(event) => { event.preventDefault(); submit(); }}>
		<label for={`ask-doto-input-${variant}`} class="sr-only">{$_('chat.placeholder')}</label>
		<textarea id={`ask-doto-input-${variant}`} bind:value={input} {onkeydown} rows={variant === 'compact' ? 1 : 2} maxlength="2000" placeholder={$_('chat.placeholder')}></textarea>
		<button type="submit" disabled={pending || !input.trim()} aria-label={$_('chat.send')}>{pending ? '…' : '↑'}</button>
	</form>

	{#if variant === 'compact' && hasQuestion}
		<a class="continue-link" href={localizeHref('/ask', locale)}>{$_('askPreview.continue')} <span aria-hidden="true">↗</span></a>
	{/if}
</section>

<style>
	.chat-panel { overflow: hidden; border: 1px solid var(--color-line); border-radius: 1.75rem; background: rgba(10,14,21,.76); box-shadow: 0 2.5rem 8rem rgba(0,0,0,.28); }
	header { min-height: 4.5rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 0 1.4rem; border-bottom: 1px solid var(--color-line); }
	header > div { display: flex; align-items: center; gap: .75rem; }
	header h2 { margin: 0; font-size: .95rem; letter-spacing: -.02em; }
	.status-dot { width: .45rem; height: .45rem; border-radius: 50%; background: var(--color-success); box-shadow: 0 0 1rem var(--color-success); }
	.chat-log { min-height: 28rem; max-height: 60vh; display: flex; flex-direction: column; gap: 1.5rem; overflow-y: auto; padding: 1.5rem; }
	.compact .chat-log { min-height: 22rem; max-height: 28rem; }
	.suggestions { margin-top: auto; padding-top: 1.2rem; border-top: 1px solid var(--color-line); }
	.suggestions > div { display: grid; grid-template-columns: repeat(3, 1fr); gap: .5rem; margin-top: .8rem; }
	.suggestions button { min-height: 3.5rem; padding: .65rem .75rem; border: 1px solid var(--color-line); background: rgba(255,255,255,.025); color: var(--color-muted); text-align: left; font-size: .74rem; line-height: 1.45; transition: border-color 180ms, color 180ms; }
	.suggestions button:hover { border-color: var(--color-accent); color: var(--color-ink); }
	.chat-error { padding: 1rem; border-left: 2px solid var(--color-error); background: rgba(255,116,108,.06); }
	.chat-error p { margin: 0; color: var(--color-ink); font-size: .8rem; }
	.chat-error button { margin-top: .5rem; border: 0; background: transparent; color: var(--color-secondary); font-size: .76rem; }
	form { display: grid; grid-template-columns: 1fr 3.25rem; gap: .6rem; padding: .75rem; border-top: 1px solid var(--color-line); }
	textarea { width: 100%; min-height: 3.25rem; resize: vertical; border: 1px solid var(--color-line); border-radius: 1.6rem; background: rgba(255,255,255,.045); color: var(--color-ink); padding: .85rem 1rem; outline: 0; }
	textarea:focus { border-color: var(--color-accent); }
	textarea::placeholder { color: var(--color-faint); }
	form > button { width: 3.25rem; height: 3.25rem; border: 0; border-radius: 50%; background: var(--color-accent); color: #fff; font-size: 1.1rem; }
	form > button:disabled { cursor: not-allowed; opacity: .4; }
	.continue-link { display: flex; justify-content: space-between; align-items: center; min-height: 3.5rem; padding: 0 1.25rem; border-top: 1px solid var(--color-line); color: var(--color-secondary); font-size: .76rem; font-weight: 600; }
	@media (max-width: 620px) { .suggestions > div { grid-template-columns: 1fr; } .chat-log { min-height: 25rem; padding: 1rem; } header { align-items: flex-start; flex-direction: column; justify-content: center; padding-block: .9rem; } }
</style>
