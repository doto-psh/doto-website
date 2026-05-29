import type { Handle } from '@sveltejs/kit';
import { DEFAULT_LOCALE, LOCALES, type Locale } from '$lib/types';

/** Resolve the locale from the URL prefix and stamp it onto <html lang>. */
export const handle: Handle = async ({ event, resolve }) => {
	const seg = event.url.pathname.split('/')[1];
	const locale: Locale = (LOCALES as readonly string[]).includes(seg)
		? (seg as Locale)
		: DEFAULT_LOCALE;

	event.locals.locale = locale;

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', locale)
	});
};
