<script lang="ts">
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';
	import { LOCALES, type Locale } from '$lib/types';
	import { localizeHref } from '$lib/i18n/routing';

	interface Props {
		locale: Locale;
	}

	let { locale }: Props = $props();

	/** Current path with any locale prefix stripped, so we can re-localize it. */
	let barePath = $derived.by(() => {
		const segments = $page.url.pathname.split('/').filter(Boolean);
		if (segments.length && (LOCALES as readonly string[]).includes(segments[0])) {
			segments.shift();
		}
		return '/' + segments.join('/');
	});
</script>

<div class="flex items-center gap-1" role="group" aria-label={$_('language.label')}>
	{#each LOCALES as code (code)}
		<a
			href={localizeHref(barePath, code)}
			hreflang={code}
			aria-current={code === locale ? 'true' : undefined}
			class="rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-wide transition-colors {code ===
			locale
				? 'text-[var(--color-accent)]'
				: 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'}"
		>
			{code}
		</a>
	{/each}
</div>
