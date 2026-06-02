import type { ParamMatcher } from '@sveltejs/kit';
import { LOCALES } from '$lib/types';

/** Only treat /en and /ko as locale prefixes — everything else is a normal route. */
export const match = ((param): param is (typeof LOCALES)[number] =>
	(LOCALES as readonly string[]).includes(param)) satisfies ParamMatcher;
