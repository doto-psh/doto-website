<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: extra = '', children }: Props = $props();
</script>

<div class="container-page {extra}">
	{@render children()}
</div>
