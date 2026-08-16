<script lang="ts">
	import { page } from '$app/stores';
	import { LOCALES, type Locale } from '$lib/types';
	import { localizeHref } from '$lib/i18n/routing';

	let { locale }: { locale: Locale } = $props();

	let barePath = $derived.by(() => {
		const segments = $page.url.pathname.split('/').filter(Boolean);
		if (segments.length && (LOCALES as readonly string[]).includes(segments[0])) segments.shift();
		return '/' + segments.join('/');
	});
</script>

<div class="flex items-center gap-2" aria-label="Language">
	{#each LOCALES as code, index (code)}
		{#if index > 0}<span aria-hidden="true" class="text-[var(--color-line)]">/</span>{/if}
		<a
			href={localizeHref(barePath, code)}
			hreflang={code}
			data-no-visited
			aria-current={locale === code ? 'page' : undefined}
			class="min-h-11 min-w-11 content-center text-center text-xs font-semibold uppercase tracking-[0.1em] transition-colors duration-150 {locale === code
				? 'text-[var(--color-ink)] underline decoration-[var(--color-ink)] underline-offset-4'
				: 'text-[var(--color-muted)] hover:text-[var(--color-accent)]'}"
		>
			{code}
		</a>
	{/each}
</div>
