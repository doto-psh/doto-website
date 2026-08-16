<script lang="ts">
	import { renderMarkdown } from '$lib/utils/markdown';
	import type { UiMessage } from '$lib/chat/store.svelte';

	let { message, typing = false }: { message: UiMessage; typing?: boolean } = $props();
	let isUser = $derived(message.role === 'user');
	let html = $derived(isUser ? '' : renderMarkdown(message.content));
</script>

<div class="grid gap-3 md:grid-cols-[5rem_minmax(0,1fr)]">
	{#if isUser}
		<p class="meta-label pt-1 text-[var(--color-secondary)]">You</p>
	{:else}
		<p class="meta-label pt-1 text-[var(--color-accent)]">doto</p>
	{/if}

	<div class="max-w-3xl border-l border-[var(--color-line)] pl-4 text-[0.96rem] leading-7 text-[var(--color-ink)]">
		{#if isUser}
			<p class="whitespace-pre-wrap font-medium">{message.content}</p>
		{:else if typing && !message.content}
			<span class="inline-flex gap-1 py-2" aria-label="typing"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></span>
		{:else}
			<div class="chat-md">{@html html}</div>
		{/if}
	</div>
</div>

<style>
	.typing-dot { width: 5px; height: 5px; border-radius: 999px; background: var(--color-muted); animation: pulse 1s infinite alternate; }
	.typing-dot:nth-child(2) { animation-delay: 0.15s; }
	.typing-dot:nth-child(3) { animation-delay: 0.3s; }
	@keyframes pulse { to { opacity: 0.25; transform: translateY(-2px); } }
	@media (prefers-reduced-motion: reduce) { .typing-dot { animation: none; } }
	.chat-md :global(:first-child) { margin-top: 0; }
	.chat-md :global(:last-child) { margin-bottom: 0; }
	.chat-md :global(h1), .chat-md :global(h2), .chat-md :global(h3), .chat-md :global(h4) { margin: 1.1rem 0 0.35rem; font-family: var(--font-sans); font-weight: 700; color: var(--color-ink); }
	.chat-md :global(p) { margin: 0.45rem 0; }
	.chat-md :global(ul) { margin: 0.5rem 0; padding-left: 1.2rem; list-style: disc; }
	.chat-md :global(a) { color: var(--color-accent); text-decoration: underline; }
	.chat-md :global(code) { background: var(--color-bg); padding: 0.08rem 0.3rem; }
	.chat-md :global(pre) { margin: 0.75rem 0; overflow-x: auto; background: var(--color-ink); padding: 0.8rem; color: var(--color-surface); }
	.chat-md :global(pre code) { background: transparent; padding: 0; }
</style>
