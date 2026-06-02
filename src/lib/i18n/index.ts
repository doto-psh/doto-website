import { init, register, locale as $locale, waitLocale } from 'svelte-i18n';
import { DEFAULT_LOCALE, type Locale } from '$lib/types';

register('ko', () => import('./locales/ko/translation.json'));
register('en', () => import('./locales/en/translation.json'));

let initialized = false;

/**
 * Initialise svelte-i18n (once) and switch to the requested locale.
 * Awaits the locale dictionary so SSR/prerender render fully translated markup.
 */
export async function loadI18n(locale: Locale): Promise<void> {
	if (!initialized) {
		init({ fallbackLocale: DEFAULT_LOCALE, initialLocale: locale });
		initialized = true;
	} else {
		$locale.set(locale);
	}
	await waitLocale(locale);
}
