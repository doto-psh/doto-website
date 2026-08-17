<script lang="ts">
	import type { Locale, ProjectFlow } from '$lib/types';
	import { pick } from '$lib/i18n/routing';

	let { flow, locale }: { flow: ProjectFlow; locale: Locale } = $props();
	let steps = $derived(pick(flow.steps, locale));
</script>

<figure class="border-y border-[var(--color-line)] py-7 md:py-9">
	<figcaption class="mb-7">
		<h3 class="type-item-title text-[var(--color-ink)]">{pick(flow.title, locale)}</h3>
		{#if flow.caption}
			<p class="type-body-small mt-2 max-w-2xl text-[var(--color-muted)]">{pick(flow.caption, locale)}</p>
		{/if}
	</figcaption>

	<ol class="grid gap-0 md:grid-cols-5" aria-label={pick(flow.title, locale)}>
		{#each steps as step, index (step.label)}
			<li class="relative border-l border-[var(--color-line)] py-4 pl-6 md:border-l-0 md:border-t md:px-3 md:pb-0 md:pt-6">
				<span class="absolute left-[-0.28rem] top-5 h-2 w-2 rounded-full bg-[var(--color-accent)] md:left-3 md:top-[-0.28rem]"></span>
				<span class="meta-label text-[var(--color-secondary)]">{String(index + 1).padStart(2, '0')}</span>
				<p class="type-body-small mt-2 font-semibold text-[var(--color-ink)]">{step.label}</p>
				{#if step.detail}
					<p class="type-meta mt-1">{step.detail}</p>
				{/if}
			</li>
		{/each}
	</ol>
</figure>
