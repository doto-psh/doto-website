<script lang="ts">
	import type { ProductCategory } from '$lib/types';

	interface Props {
		title: string;
		category: ProductCategory;
		class?: string;
	}

	let { title, category, class: extra = '' }: Props = $props();

	const accents: Record<ProductCategory, string> = {
		productivity: '#135dff',
		finance: '#16a7c8',
		study: '#9bbf24',
		creator: '#ff6b4a'
	};

	let initial = $derived(title.trim().charAt(0).toUpperCase());
</script>

<div
	class="blueprint-grid-strong relative flex aspect-[4/3] overflow-hidden rounded-lg border border-[var(--color-line)] bg-[var(--color-paper)] {extra}"
	style:--cover-accent={accents[category]}
	aria-hidden="true"
>
	<div class="absolute inset-x-0 top-0 flex h-10 items-center justify-between border-b border-[var(--color-line)] bg-white/90 px-3">
		<div class="flex items-center gap-1.5">
			<span class="h-2 w-2 rounded-sm bg-[var(--cover-accent)]"></span>
			<span class="h-2 w-12 rounded-sm bg-[var(--color-line)]"></span>
		</div>
		<span class="text-[10px] font-black uppercase tracking-[0.14em] text-[var(--cover-accent)]">
			{initial}
		</span>
	</div>

	<div class="grid w-full grid-cols-[0.7fr_1fr] gap-3 p-4 pt-14">
		<div class="space-y-2">
			<span class="block h-3 rounded-sm bg-[var(--cover-accent)]"></span>
			<span class="block h-3 w-5/6 rounded-sm bg-[var(--color-line)]"></span>
			<span class="block h-3 w-2/3 rounded-sm bg-[var(--color-line)]"></span>
			<div class="mt-5 grid grid-cols-2 gap-2">
				<span class="h-12 rounded-md border border-[var(--color-line)] bg-white/90"></span>
				<span class="h-12 rounded-md border border-[var(--color-line)] bg-white/90"></span>
			</div>
		</div>

		<div class="rounded-lg border border-[var(--color-line)] bg-white/90 p-3">
			<div class="mb-3 h-2 w-20 rounded-sm bg-[var(--color-line)]"></div>
			<div class="grid grid-cols-4 items-end gap-1.5">
				<span class="h-11 rounded-sm bg-[var(--color-surface-blue)]"></span>
				<span class="h-16 rounded-sm bg-[var(--cover-accent)]"></span>
				<span class="h-9 rounded-sm bg-[var(--color-surface-blue)]"></span>
				<span class="h-14 rounded-sm bg-[var(--color-surface-blue)]"></span>
			</div>
			<div class="mt-4 space-y-1.5">
				<span class="block h-2 w-full rounded-sm bg-[var(--color-line)]"></span>
				<span class="block h-2 w-3/4 rounded-sm bg-[var(--color-line)]"></span>
			</div>
		</div>
	</div>
</div>
