import { error } from '@sveltejs/kit';
import { getPost, getPosts } from '$lib/data/posts';
import type { EntryGenerator, PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const post = getPost(params.slug);
	if (!post) throw error(404, 'Post not found');
	return { post };
};

export const entries: EntryGenerator = () => getPosts().map((post) => ({ slug: post.slug }));
