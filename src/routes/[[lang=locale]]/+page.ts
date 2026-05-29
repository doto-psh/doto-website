import { getFeaturedProducts } from '$lib/data/products';
import { getRecentPosts } from '$lib/data/posts';
import type { PageLoad } from './$types';

export const load: PageLoad = () => ({
	products: getFeaturedProducts(3),
	posts: getRecentPosts(3)
});
