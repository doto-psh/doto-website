import { getFeaturedProjects } from '$lib/data/projects';
// import { getRecentPosts } from '$lib/data/posts';
import { getPortfolio } from '$lib/data/portfolio';
import type { PageLoad } from './$types';

export const load: PageLoad = () => ({
	portfolio: getPortfolio(),
	projects: getFeaturedProjects(3)
	// posts: getRecentPosts(3)
});
