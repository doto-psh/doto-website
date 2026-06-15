<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { mascotImages } from '$lib/data/portfolio';
	import { chat } from '$lib/chat/store.svelte';

	let open = $derived(chat.open);
</script>

<button
	type="button"
	onclick={() => chat.toggle()}
	aria-label={$_('chat.launcherLabel')}
	aria-expanded={open}
	class="group fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)] shadow-[0_12px_28px_rgba(19,93,255,0.32)] transition-transform duration-300 ease-[var(--ease-soft)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] md:right-6 md:bottom-6"
>
	{#if open}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2.4"
			stroke-linecap="round"
			class="h-6 w-6 text-white"
			aria-hidden="true"
		>
			<path d="M6 6l12 12M18 6L6 18" />
		</svg>
	{:else}
		<img
			src={mascotImages.profile}
			alt=""
			aria-hidden="true"
			class="h-10 w-10 rounded-full bg-white/95 object-cover p-0.5"
		/>
	{/if}
</button>
