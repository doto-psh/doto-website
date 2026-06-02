<script lang="ts">
	import type { Locale, Project } from '$lib/types';
	import { reveal } from '$lib/actions/reveal';
	import ProjectCard from './ProjectCard.svelte';

	interface Props {
		projects: Project[];
		locale: Locale;
	}

	let { projects, locale }: Props = $props();
</script>

<div class="grid w-full max-w-[calc(100vw-3rem)] min-w-0 grid-cols-1 gap-5 md:max-w-none md:grid-cols-2 lg:grid-cols-3">
	{#each projects as project, i (project.slug)}
		<div use:reveal={{ delay: (i % 3) * 90 }} class="min-w-0">
			<ProjectCard {project} {locale} />
		</div>
	{/each}
</div>
