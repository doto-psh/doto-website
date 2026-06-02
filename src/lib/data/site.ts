import type { SocialLink } from '$lib/types';

/** Global, non-translated brand configuration. */
export const site = {
	brand: 'doto',
	/** Used for absolute URLs in meta tags; update to the real domain. */
	url: 'https://doto.example',
	email: 'hello@doto.example',
	github: 'https://github.com/doto-psh',
	resumeUrl: '/resume.pdf',
	social: [
		{ label: 'GitHub', href: 'https://github.com/doto-psh' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/' },
		{ label: 'Email', href: 'mailto:hello@doto.example' }
	] satisfies SocialLink[]
};

/** Top-level navigation. `key` maps to the i18n `nav.*` namespace. */
export const navItems = [
	{ key: 'projects', path: '/projects' },
	{ key: 'blog', path: '/blog' },
	{ key: 'about', path: '/about' }
] as const;
