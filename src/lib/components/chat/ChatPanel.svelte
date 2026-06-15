<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { mascotImages } from '$lib/data/portfolio';
	import { chat } from '$lib/chat/store.svelte';
	import ChatMessage from './ChatMessage.svelte';

	let input = $state('');
	let scroller = $state<HTMLDivElement | null>(null);
	let textarea = $state<HTMLTextAreaElement | null>(null);

	let messages = $derived(chat.messages);
	let pending = $derived(chat.pending);
	let lastIndex = $derived(messages.length - 1);
	// Show starter chips until the visitor sends their first message.
	let showSuggestions = $derived(!messages.some((m) => m.role === 'user'));
	let suggestions = $derived([
		$_('chat.suggest1'),
		$_('chat.suggest2'),
		$_('chat.suggest3'),
		$_('chat.suggest4')
	]);

	function ask(text: string) {
		chat.send(text, $_('chat.error'));
	}

	// Auto-scroll to the bottom as messages stream in.
	$effect(() => {
		// Touch the values we want to react to.
		void messages.length;
		void messages.at(-1)?.content;
		if (scroller) scroller.scrollTop = scroller.scrollHeight;
	});

	$effect(() => {
		if (chat.open) textarea?.focus();
	});

	function submit() {
		const text = input;
		input = '';
		chat.send(text, $_('chat.error'));
	}

	function onkeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			submit();
		}
	}
</script>

<section
	class="fixed right-0 bottom-0 z-50 flex h-[100dvh] w-full flex-col overflow-hidden border-[var(--color-line)] bg-[var(--color-bg)] shadow-[0_20px_60px_rgba(8,17,31,0.28)] sm:right-4 sm:bottom-24 sm:h-[min(560px,calc(100dvh-8rem))] sm:w-[380px] sm:rounded-2xl sm:border md:right-6"
	aria-label={$_('chat.title')}
>
	<!-- Header -->
	<header
		class="flex items-center gap-3 border-b border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3"
	>
		<img
			src={mascotImages.profile}
			alt=""
			aria-hidden="true"
			class="h-9 w-9 rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] object-cover"
		/>
		<div class="min-w-0 flex-1">
			<p class="truncate text-sm font-black text-[var(--color-ink)]">{$_('chat.title')}</p>
			<p class="truncate text-xs text-[var(--color-muted)]">{$_('chat.subtitle')}</p>
		</div>
		<button
			type="button"
			onclick={() => chat.close()}
			aria-label={$_('chat.close')}
			class="grid h-8 w-8 place-items-center rounded-lg text-[var(--color-muted)] transition-colors hover:bg-[var(--color-surface-blue)] hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.2"
				stroke-linecap="round"
				class="h-5 w-5"
				aria-hidden="true"
			>
				<path d="M6 6l12 12M18 6L6 18" />
			</svg>
		</button>
	</header>

	<!-- Messages -->
	<div bind:this={scroller} class="flex-1 space-y-3.5 overflow-y-auto px-4 py-4">
		{#each messages as message, i (i)}
			<ChatMessage {message} typing={pending && i === lastIndex} />
		{/each}

		{#if showSuggestions}
			<div class="space-y-2 pt-1 pl-9">
				<p class="text-xs font-bold tracking-wide text-[var(--color-muted)]">
					{$_('chat.suggestionsTitle')}
				</p>
				<div class="flex flex-wrap gap-2">
					{#each suggestions as suggestion (suggestion)}
						<button
							type="button"
							onclick={() => ask(suggestion)}
							disabled={pending}
							class="rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
						>
							{suggestion}
						</button>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<!-- Composer -->
	<div class="border-t border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-3">
		<form
			class="flex items-end gap-2"
			onsubmit={(e) => {
				e.preventDefault();
				submit();
			}}
		>
			<textarea
				bind:this={textarea}
				bind:value={input}
				{onkeydown}
				rows="1"
				placeholder={$_('chat.placeholder')}
				class="max-h-28 min-h-[2.75rem] flex-1 resize-none rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] px-3.5 py-2.5 text-sm text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)]"
			></textarea>
			<button
				type="submit"
				aria-label={$_('chat.send')}
				disabled={pending || !input.trim()}
				class="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[var(--color-accent)] bg-[var(--color-accent)] text-white transition-colors hover:bg-[var(--color-accent-strong)] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="h-5 w-5"
					aria-hidden="true"
				>
					<path d="M3.4 20.4l17.45-7.48a1 1 0 000-1.84L3.4 3.6a.993.993 0 00-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
				</svg>
			</button>
		</form>
	</div>
</section>
