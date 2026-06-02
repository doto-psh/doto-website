import { getFeaturedProjects } from '$lib/data/projects';
import { getRecentPosts } from '$lib/data/posts';
import type { PageLoad } from './$types';

export const load: PageLoad = () => ({
	projects: getFeaturedProjects(3),
	posts: getRecentPosts(3)
});
