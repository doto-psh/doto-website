/** Supported UI locales. Keep in sync with src/lib/i18n. */
export const LOCALES = ['ko', 'en', 'ja'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'ko';

/** A value that is translated inline within content data (products, posts). */
export type Localized<T = string> = Record<Locale, T>;

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
	/** ISO date string */
	date: string;
	/** External canonical URL (blog lives elsewhere for now) */
	url: string;
	tags: string[];
}

export interface SocialLink {
	label: string;
	href: string;
}
