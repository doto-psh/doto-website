<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { fly, fade } from 'svelte/transition';
	import type { Locale } from '$lib/types';
	import { chat } from '$lib/chat/store.svelte';
	import ChatLauncher from './ChatLauncher.svelte';
	import ChatPanel from './ChatPanel.svelte';

	// locale is accepted for parity with the rest of the layout; the greeting and
	// all UI strings follow the active svelte-i18n locale automatically.
	let { locale }: { locale: Locale } = $props();

	let reduce = $state(false);
	$effect(() => {
		reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	// Seed the greeting the first time the panel opens (in the current language).
	$effect(() => {
		void locale;
		if (chat.open) chat.ensureGreeting($_('chat.greeting'));
	});
</script>

<ChatLauncher />

{#if chat.open}
	<div transition:fade={{ duration: reduce ? 0 : 150 }}>
		<div transition:fly={{ y: reduce ? 0 : 16, duration: reduce ? 0 : 240 }}>
			<ChatPanel />
		</div>
	</div>
{/if}
