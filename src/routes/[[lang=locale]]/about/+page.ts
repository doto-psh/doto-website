import { getPortfolio } from '$lib/data/portfolio';
import type { PageLoad } from './$types';

export const load: PageLoad = () => ({
	portfolio: getPortfolio()
});
