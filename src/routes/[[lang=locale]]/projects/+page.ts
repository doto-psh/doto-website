import { getProjects } from '$lib/data/projects';
import type { PageLoad } from './$types';

export const load: PageLoad = () => ({
	projects: getProjects()
});
