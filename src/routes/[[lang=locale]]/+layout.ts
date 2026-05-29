import { loadI18n } from '$lib/i18n';
import { DEFAULT_LOCALE, type Locale } from '$lib/types';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params }) => {
	const locale = (params.lang ?? DEFAULT_LOCALE) as Locale;
	await loadI18n(locale);
	return { locale };
};
