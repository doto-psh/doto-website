import { error } from '@sveltejs/kit';
import { getProduct, getProducts, getRelatedProducts } from '$lib/data/products';
import type { EntryGenerator, PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const product = getProduct(params.slug);
	if (!product) throw error(404, 'Template not found');
	return {
		product,
		related: getRelatedProducts(params.slug, 3)
	};
};

// Prerender one page per product slug.
export const entries: EntryGenerator = () => getProducts().map((p) => ({ slug: p.slug }));
