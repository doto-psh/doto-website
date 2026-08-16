import { getFeaturedProjects, getProject, getProjects } from '$lib/data/projects';
import { getRecentPosts } from '$lib/data/posts';
import { getHomeContent, getPortfolio } from '$lib/data/portfolio';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const home = getHomeContent();
	const architectureProject = getProject(home.architectureProjectSlug);
	if (!architectureProject) throw new Error(`Missing architecture project: ${home.architectureProjectSlug}`);

	return {
		home,
		portfolio: getPortfolio(),
		projects: getFeaturedProjects(3),
		allProjects: getProjects(),
		architectureProject,
		posts: getRecentPosts(3)
	};
};
