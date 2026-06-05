<script lang="ts">
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';
	import { LOCALES, type Locale } from '$lib/types';
	import { localizeHref } from '$lib/i18n/routing';

	interface Props {
		locale: Locale;
	}

	let { locale }: Props = $props();
	let open = $state(false);

	const languageNames: Record<Locale, string> = {
		ko: '한국어',
		en: 'English'
	};

	/** Current path with any locale prefix stripped, so we can re-localize it. */
	let barePath = $derived.by(() => {
		const segments = $page.url.pathname.split('/').filter(Boolean);
		if (segments.length && (LOCALES as readonly string[]).includes(segments[0])) {
			segments.shift();
		}
		return '/' + segments.join('/');
	});

	$effect(() => {
		const close = (event: MouseEvent) => {
			if (!(event.target as Element | null)?.closest('[data-language-switcher]')) {
				open = false;
			}
		};
		const onKeydown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') open = false;
		};

		document.addEventListener('click', close);
		document.addEventListener('keydown', onKeydown);
		return () => {
			document.removeEventListener('click', close);
			document.removeEventListener('keydown', onKeydown);
		};
	});
</script>

<div class="relative" data-language-switcher>
	<button
		type="button"
		class="inline-flex h-9 min-w-24 items-center justify-between gap-2 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] px-3 text-sm font-bold text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
		aria-label={$_('language.label')}
		aria-haspopup="menu"
		aria-expanded={open}
		onclick={(event) => {
			event.stopPropagation();
			open = !open;
		}}
	>
		<span>{languageNames[locale]}</span>
		<span class="text-[10px] text-[var(--color-muted)] transition-transform {open ? 'rotate-180' : ''}" aria-hidden="true">
			▼
		</span>
	</button>

	{#if open}
		<div
			class="absolute right-0 top-11 z-50 w-36 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-1 shadow-[0_18px_45px_rgba(16,24,39,0.14)]"
			role="menu"
			aria-label={$_('language.label')}
		>
			{#each LOCALES as code (code)}
				<a
					href={localizeHref(barePath, code)}
					hreflang={code}
					aria-current={code === locale ? 'true' : undefined}
					role="menuitem"
					class="flex items-center justify-between rounded-md px-3 py-2 text-sm font-semibold transition-colors {code ===
					locale
						? 'bg-[var(--color-surface-blue)] text-[var(--color-accent)]'
						: 'text-[var(--color-muted)] hover:bg-[var(--color-bg)] hover:text-[var(--color-ink)]'}"
					onclick={() => (open = false)}
				>
					<span>{languageNames[code]}</span>
					<span class="text-xs font-black uppercase">{code}</span>
				</a>
			{/each}
		</div>
	{/if}
</div>
