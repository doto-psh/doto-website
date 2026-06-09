<script lang="ts">
	import type { ProjectCategory } from '$lib/types';

	interface Props {
		title: string;
		category: ProjectCategory[];
		stack: string[];
	}

	let { title, category, stack }: Props = $props();

	const labels: Record<ProjectCategory, string> = {
		ai: 'AI',
		backend: 'API',
		frontend: 'UI',
		infra: 'OPS'
	};
</script>

<div
	class="blueprint-grid-strong aspect-[4/3] w-full min-w-0 overflow-hidden rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-4 shadow-[0_18px_50px_rgba(16,24,39,0.08)]"
>
	<div class="flex h-full min-w-0 flex-col justify-between rounded-md border border-[var(--color-line)] bg-[var(--color-paper)] p-4">
		<div class="flex items-center justify-between">
			<span class="rounded-md bg-[var(--color-accent)] px-2 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">
				{labels[category[0]]}
			</span>
			<span class="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-muted)]">case</span>
		</div>

		<div class="space-y-3">
			<div class="h-2 w-20 rounded-sm bg-[var(--color-accent)]"></div>
			<h3 class="max-w-full text-xl font-black leading-tight text-[var(--color-ink)] md:text-2xl">{title}</h3>
			<div class="grid grid-cols-3 gap-2">
				<span class="h-12 rounded-md border border-[var(--color-line)] bg-[var(--color-surface)]"></span>
				<span class="h-12 rounded-md border border-[var(--color-line)] bg-[var(--color-surface-blue)]"></span>
				<span class="h-12 rounded-md border border-[var(--color-line)] bg-[var(--color-surface)]"></span>
			</div>
		</div>

		<div class="flex flex-wrap gap-2">
			{#each stack.slice(0, 3) as item (item)}
				<span class="rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-2 py-1 text-[10px] font-bold text-[var(--color-muted)]">
					{item}
				</span>
			{/each}
		</div>
	</div>
</div>
