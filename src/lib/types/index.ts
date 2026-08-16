/** Supported UI locales. Keep in sync with src/lib/i18n. */
export const LOCALES = ['ko', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'ko';

/** A value that is translated inline within content data (products, posts). */
export type Localized<T = string> = Record<Locale, T> & Partial<Record<string, T>>;

export type ProjectCategory = 'ai' | 'backend' | 'frontend' | 'infra';
export type ProjectCompany = 'younglimwon' | 'ls-itc';
export type TimelineCategory = 'education' | 'certification' | 'career' | 'activity';
export type SkillCategory = 'frontend' | 'backend' | 'AI/LLM' | 'database' | 'devops-infra';

export interface Profile {
	name: Localized;
	/** Optional real name shown alongside the brand handle. */
	realName?: Localized;
	role: Localized;
	tagline: Localized;
	bio: Localized;
	location: Localized;
	photoUrl: string;
	/** Optional alternate photo retained for content compatibility. */
	realPhotoUrl?: string;
	email: string;
	github: string;
	resumeUrl: string;
}

export interface SkillItem {
	name: string;
	level: 'core' | 'working' | 'learning';
	description?: Localized;
}

export interface SkillGroup {
	category: SkillCategory;
	title: Localized;
	description: Localized;
	items: SkillItem[];
	evidenceProjectSlugs: string[];
}

export interface ProofPoint {
	value: string;
	label: Localized;
}

export interface HomeContent {
	proofs: ProofPoint[];
	statement: Localized<string[]>;
	architectureProjectSlug: string;
}

export interface TimelineItem {
	id: string;
	category: TimelineCategory;
	title: Localized;
	/** Optional: omit for entries where the org is redundant (e.g. a certifications list). */
	organization?: Localized;
	/** Optional: omit when a date range adds no value. */
	period?: Localized;
	/** Optional: omit when title + highlights already say enough. */
	description?: Localized;
	highlights?: Localized<string[]>;
	stack?: string[];
	link?: string;
}

export interface PortfolioData {
	profile: Profile;
	skills: SkillGroup[];
	timeline: TimelineItem[];
}

export interface Project {
	slug: string;
	title: Localized;
	tagline: Localized;
	description: Localized;
	/** Optional product/company the work belongs to, shown as a badge (e.g. "AI Agent in ERP · Younglimwon"). */
	org?: Localized;
	/** One or more categories; the first is treated as the primary for cover visuals. */
	category: ProjectCategory[];
	/** Company the work was done for; used for company-based filtering. */
	company: ProjectCompany;
	role: Localized;
	period: string;
	stack: string[];
	impact: Localized<string[]>;
	highlights: Localized<string[]>;
	caseStudy: Localized<string>;
	/** Structured editorial case study used by selected projects. */
	caseStudyDetails?: ProjectCaseStudy;
	githubUrl?: string;
	liveUrl?: string;
	featured: boolean;
}

export interface ProjectCaseStudy {
	problem: Localized;
	constraints?: Localized<string[]>;
	decisions: Localized<Array<{ title: string; detail: string }>>;
	outcome: Localized<string[]>;
	lessons?: Localized<string[]>;
	flows: ProjectFlow[];
}

export interface ProjectFlow {
	id: string;
	title: Localized;
	caption?: Localized;
	steps: Localized<Array<{ label: string; detail?: string }>>;
}

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
