import { getPosts } from '$lib/data/posts';
import { getProjects } from '$lib/data/projects';
import { site } from '$lib/data/site';
import { localizeHref } from '$lib/i18n/routing';
import { LOCALES } from '$lib/types';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = () => {
	const staticPaths = ['/', '/projects', '/notes', '/about', '/ask'];
	const urls: Array<{ path: string; lastmod?: string }> = [
		...staticPaths.map((path) => ({ path })),
		...getProjects().map((project) => ({ path: `/projects/${project.slug}` })),
		...getPosts().map((post) => ({ path: `/notes/${post.slug}`, lastmod: post.date }))
	];

	const entries = LOCALES.flatMap((locale) =>
		urls.map(({ path, lastmod }) => {
			const lastModified = lastmod ? `<lastmod>${lastmod}</lastmod>` : '';
			return `<url><loc>${site.url}${localizeHref(path, locale)}</loc>${lastModified}</url>`;
		})
	).join('');

	return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' }
	});
};
