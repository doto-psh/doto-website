import { getProducts } from '$lib/data/products';
import type { PageLoad } from './$types';

export const load: PageLoad = () => ({
	products: getProducts()
});
