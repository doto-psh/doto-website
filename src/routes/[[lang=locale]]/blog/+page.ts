import { getPosts } from '$lib/data/posts';
import type { PageLoad } from './$types';

export const load: PageLoad = () => ({
	posts: getPosts()
});
