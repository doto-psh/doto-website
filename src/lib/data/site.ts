import type { SocialLink } from '$lib/types';

/** Global, non-translated brand configuration. */
export const site = {
	brand: 'doto',
	/** Used for absolute URLs in meta tags; update to the real domain. */
	url: 'https://doto.example',
	email: 'hello@doto.example',
	social: [
		{ label: 'Notion', href: 'https://www.notion.so/' },
		{ label: 'X', href: 'https://x.com/' },
		{ label: 'Instagram', href: 'https://instagram.com/' },
		{ label: 'Email', href: 'mailto:hello@doto.example' }
	] satisfies SocialLink[]
};

/** Top-level navigation. `key` maps to the i18n `nav.*` namespace. */
export const navItems = [
	{ key: 'templates', path: '/templates' },
	{ key: 'blog', path: '/blog' },
	{ key: 'about', path: '/about' }
] as const;
