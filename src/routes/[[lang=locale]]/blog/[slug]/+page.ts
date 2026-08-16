import { redirect } from '@sveltejs/kit';
import { getPosts } from '$lib/data/posts';
import { DEFAULT_LOCALE, type Locale } from '$lib/types';
import { localizeHref } from '$lib/i18n/routing';
import type { EntryGenerator, PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const locale = (params.lang ?? DEFAULT_LOCALE) as Locale;
	throw redirect(308, localizeHref(`/notes/${params.slug}`, locale));
};

export const entries: EntryGenerator = () => getPosts().map((post) => ({ slug: post.slug }));
