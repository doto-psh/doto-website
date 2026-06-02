/** Supported UI locales. Keep in sync with src/lib/i18n. */
export const LOCALES = ['ko', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'ko';

/** A value that is translated inline within content data (products, posts). */
export type Localized<T = string> = Record<Locale, T> & Partial<Record<string, T>>;

export type ProjectCategory = 'ai' | 'backend' | 'frontend' | 'infra';

export interface Project {
	slug: string;
	title: Localized;
	tagline: Localized;
	description: Localized;
	category: ProjectCategory;
	role: Localized;
	period: string;
	stack: string[];
	impact: Localized<string[]>;
	highlights: Localized<string[]>;
	caseStudy: Localized<string>;
	githubUrl?: string;
	liveUrl?: string;
	featured: boolean;
}

export interface Product {
	/** URL slug, e.g. "second-brain-os" */
	slug: string;
	title: Localized;
	/** Short one-liner used on cards */
	tagline: Localized;
	/** Full description for the detail page */
	description: Localized;
	/** Bullet feature list shown on the detail page */
	features: Localized<string[]>;
	category: ProductCategory;
	price: number;
	currency: 'USD' | 'KRW' | 'JPY';
	coverImage: string;
	gallery: string[];
	/** External purchase URL today (e.g. Gumroad); swappable for internal checkout later */
	buyUrl: string;
	featured: boolean;
}

export type ProductCategory = 'productivity' | 'finance' | 'study' | 'creator';

export interface Post {
	slug: string;
	title: Localized;
	excerpt: Localized;
	content: Localized;
	/** ISO date string */
	date: string;
	tags: string[];
}

export interface SocialLink {
	label: string;
	href: string;
}
