<script lang="ts">
	import type { Locale, Project } from '$lib/types';
	import { pick } from '$lib/i18n/routing';

	let { project, locale }: { project: Project; locale: Locale } = $props();
	let flow = $derived(project.caseStudyDetails?.flows[0]);
	let steps = $derived(flow ? pick(flow.steps, locale) : []);
</script>

<div class="system-map">
	<div class="system-map-head">
		<span>Migration control plane</span>
		<span class="status"><i></i> Production-safe transition</span>
	</div>
	{#if flow}
		<ol aria-label={pick(flow.title, locale)}>
			{#each steps as step, index (step.label)}
				<li>
					<span class="node-index">{String(index + 1).padStart(2, '0')}</span>
					<div>
						<strong>{step.label}</strong>
						{#if step.detail}<small>{step.detail}</small>{/if}
					</div>
				</li>
			{/each}
		</ol>
	{/if}
	<div class="system-map-foot">
		<span>Old collection remains active</span>
		<span>Switch only after verification</span>
	</div>
</div>

<style>
	.system-map { overflow: hidden; border: 1px solid var(--color-line); border-radius: 1.75rem; background: radial-gradient(circle at 82% 12%, rgba(86,137,255,.19), transparent 18rem), rgba(13,18,26,.8); box-shadow: 0 2.5rem 8rem rgba(0,0,0,.35); }
	.system-map-head, .system-map-foot { display: flex; justify-content: space-between; gap: 1rem; padding: 1.1rem 1.4rem; color: var(--color-faint); font-family: var(--font-mono); font-size: .62rem; letter-spacing: .08em; text-transform: uppercase; }
	.system-map-head { border-bottom: 1px solid var(--color-line); }
	.system-map-foot { border-top: 1px solid var(--color-line); }
	.status { display: flex; align-items: center; gap: .5rem; color: #cbd5e1; }
	.status i { width: .45rem; height: .45rem; border-radius: 50%; background: var(--color-success); box-shadow: 0 0 1rem var(--color-success); }
	ol { display: grid; grid-template-columns: repeat(5, 1fr); margin: 0; padding: 3.25rem 1.5rem; list-style: none; }
	li { position: relative; min-width: 0; padding: 0 .75rem; text-align: center; }
	li:not(:last-child)::after { content: ''; position: absolute; top: 1.5rem; left: calc(50% + 2.2rem); width: calc(100% - 4.4rem); border-top: 1px dashed rgba(148,181,255,.55); }
	.node-index { display: grid; position: relative; z-index: 1; width: 3rem; height: 3rem; margin: 0 auto 1.1rem; place-items: center; border: 1px solid rgba(86,137,255,.65); border-radius: 50%; background: #111823; color: var(--color-secondary); font-family: var(--font-mono); font-size: .66rem; box-shadow: 0 0 1.8rem rgba(86,137,255,.12); }
	strong { display: block; font-size: .86rem; font-weight: 600; }
	small { display: block; margin-top: .35rem; color: var(--color-muted); font-size: .68rem; line-height: 1.45; }
	@media (max-width: 760px) {
		.system-map-head, .system-map-foot { align-items: flex-start; flex-direction: column; }
		ol { grid-template-columns: 1fr; padding: 1.5rem; }
		li { display: grid; grid-template-columns: 3rem 1fr; gap: 1rem; align-items: center; padding: .75rem 0; text-align: left; }
		li:not(:last-child)::after { top: 3.75rem; left: 1.5rem; width: 0; height: 1.5rem; border-top: 0; border-left: 1px dashed rgba(148,181,255,.55); }
		.node-index { margin: 0; }
	}
</style>
