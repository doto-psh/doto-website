import { error } from '@sveltejs/kit';
import { getNextFeaturedProject, getProject, getProjects } from '$lib/data/projects';
import type { EntryGenerator, PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const project = getProject(params.slug);
	if (!project) throw error(404, 'Project not found');
	return {
		project,
		next: getNextFeaturedProject(params.slug)
	};
};

export const entries: EntryGenerator = () => getProjects().map((project) => ({ slug: project.slug }));
