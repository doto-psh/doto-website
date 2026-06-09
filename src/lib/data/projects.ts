import { content } from '$lib/data/content';
import type { Project, ProjectCategory } from '$lib/types';

const projects: Project[] = content.projects;

export const projectCategories: ProjectCategory[] = [...content.projectCategories];

export function getProjects(): Project[] {
	return projects;
}

export function getFeaturedProjects(limit = 3): Project[] {
	return projects.filter((p) => p.featured).slice(0, limit);
}

export function getProject(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(slug: string, limit = 3): Project[] {
	const current = getProject(slug);
	if (!current) return [];
	const shares = (p: Project) => p.category.some((c) => current.category.includes(c));
	return projects
		.filter((p) => p.slug !== slug && shares(p))
		.concat(projects.filter((p) => p.slug !== slug && !shares(p)))
		.slice(0, limit);
}
