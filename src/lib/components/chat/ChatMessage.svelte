<script lang="ts">
	import { mascotImages } from '$lib/data/portfolio';
	import { renderMarkdown } from '$lib/utils/markdown';
	import type { UiMessage } from '$lib/chat/store.svelte';

	interface Props {
		message: UiMessage;
		/** Show the typing indicator when this assistant message is still empty. */
		typing?: boolean;
	}

	let { message, typing = false }: Props = $props();

	let isUser = $derived(message.role === 'user');
	// renderMarkdown escapes all input before formatting, so {@html} is XSS-safe.
	let html = $derived(isUser ? '' : renderMarkdown(message.content));
</script>

<div class="flex gap-2.5 {isUser ? 'flex-row-reverse' : 'flex-row'}">
	{#if !isUser}
		<img
			src={mascotImages.profile}
			alt="doto"
			class="mt-0.5 h-7 w-7 shrink-0 rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] object-cover"
		/>
	{/if}

	<div
		class="max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed {isUser
			? 'rounded-tr-sm bg-[var(--color-accent)] whitespace-pre-wrap text-white'
			: 'chat-md rounded-tl-sm border border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-ink)]'}"
	>
		{#if isUser}
			{message.content}
		{:else if typing && !message.content}
			<span class="inline-flex items-center gap-1 py-0.5" aria-label="typing">
				<span class="typing-dot"></span>
				<span class="typing-dot" style="animation-delay:0.15s"></span>
				<span class="typing-dot" style="animation-delay:0.3s"></span>
			</span>
		{:else}
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html html}
		{/if}
	</div>
</div>

<style>
	.typing-dot {
		width: 6px;
		height: 6px;
		border-radius: 9999px;
		background: var(--color-muted);
		animation: typing-bounce 1s var(--ease-soft) infinite;
	}
	@keyframes typing-bounce {
		0%,
		60%,
		100% {
			opacity: 0.3;
			transform: translateY(0);
		}
		30% {
			opacity: 1;
			transform: translateY(-3px);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.typing-dot {
			animation: none;
		}
	}

	/* Markdown rendering inside assistant bubbles — compact, design-token themed. */
	.chat-md :global(h1),
	.chat-md :global(h2),
	.chat-md :global(h3),
	.chat-md :global(h4) {
		font-weight: 800;
		line-height: 1.25;
		color: var(--color-ink);
	}
	.chat-md :global(h1) {
		font-size: 1.02rem;
		margin: 0.5rem 0 0.3rem;
	}
	.chat-md :global(h2) {
		font-size: 0.97rem;
		margin: 0.55rem 0 0.3rem;
	}
	.chat-md :global(h3) {
		font-size: 0.9rem;
		margin: 0.6rem 0 0.25rem;
		color: var(--color-accent);
	}
	.chat-md :global(h4) {
		font-size: 0.85rem;
		margin: 0.5rem 0 0.2rem;
	}
	.chat-md :global(:first-child) {
		margin-top: 0;
	}
	.chat-md :global(:last-child) {
		margin-bottom: 0;
	}
	.chat-md :global(p) {
		margin: 0.35rem 0;
	}
	.chat-md :global(ul) {
		margin: 0.35rem 0;
		padding-left: 1.05rem;
		list-style: disc;
	}
	.chat-md :global(li) {
		margin: 0.15rem 0;
	}
	.chat-md :global(strong) {
		font-weight: 750;
		color: var(--color-ink);
	}
	.chat-md :global(a) {
		color: var(--color-accent);
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.chat-md :global(code) {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.85em;
		background: var(--color-surface-blue);
		padding: 0.05rem 0.3rem;
		border-radius: 0.3rem;
	}
	.chat-md :global(pre) {
		margin: 0.4rem 0;
		padding: 0.6rem 0.75rem;
		background: var(--color-surface-blue);
		border: 1px solid var(--color-line);
		border-radius: 0.6rem;
		overflow-x: auto;
	}
	.chat-md :global(pre code) {
		background: none;
		padding: 0;
	}
</style>
