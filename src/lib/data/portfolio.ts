import { content } from '$lib/data/content';
import type { PortfolioData, SkillCategory, TimelineCategory, TimelineItem } from '$lib/types';

export const skillCategories: SkillCategory[] = [...content.skillCategories];
export const timelineCategories: TimelineCategory[] = [...content.timelineCategories];
export const mascotImages = content.mascotImages;
export const portfolio: PortfolioData = content.portfolio;

export function getPortfolio(): PortfolioData {
	return portfolio;
}

export function getTimeline(limit?: number): TimelineItem[] {
	const items = portfolio.timeline;
	return typeof limit === 'number' ? items.slice(0, limit) : items;
}
