import { DEFAULT_LOCALE, type Locale, type Localized } from '$lib/types';

/**
 * Build a locale-aware href. The default locale (ko) has no prefix;
 * other locales are prefixed with /<locale>.
 *   localizeHref('/projects', 'en')  -> '/en/projects'
 *   localizeHref('/', 'ko')          -> '/'
 */
export function localizeHref(path: string, locale: Locale): string {
	const clean = path === '' ? '/' : path.startsWith('/') ? path : `/${path}`;
	if (locale === DEFAULT_LOCALE) return clean;
	return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
}

/** Pick the value for the active locale from a Localized content field. */
export function pick<T>(field: Localized<T>, locale: Locale): T {
	return field[locale] ?? field[DEFAULT_LOCALE];
}
