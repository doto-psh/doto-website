import type { Action } from 'svelte/action';

interface RevealOptions {
	/** Delay in ms before the element animates in. */
	delay?: number;
	/** Fraction of the element visible before triggering (0-1). */
	threshold?: number;
	/** Re-hide and replay when scrolled out of view. */
	once?: boolean;
}

const reduceMotion = () =>
	typeof window !== 'undefined' &&
	window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Reveal-on-scroll. Adds `is-visible` when the element enters the viewport.
 * Pair with the `.reveal` CSS class (see app usage) for the transition.
 */
export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options = {}) => {
	const { delay = 0, threshold = 0.15, once = true } = options;

	node.classList.add('reveal');
	if (delay) node.style.setProperty('--reveal-delay', `${delay}ms`);

	if (reduceMotion()) {
		node.classList.add('is-visible');
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('is-visible');
					if (once) observer.unobserve(node);
				} else if (!once) {
					node.classList.remove('is-visible');
				}
			}
		},
		{ threshold, rootMargin: '0px 0px -8% 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
