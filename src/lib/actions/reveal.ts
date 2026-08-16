export function reveal(node: HTMLElement, options: { threshold?: number } = {}) {
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reducedMotion || !('IntersectionObserver' in window)) {
		node.dataset.visible = 'true';
		return;
	}

	const observer = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) return;
			node.dataset.visible = 'true';
			observer.unobserve(node);
		},
		{ threshold: options.threshold ?? 0.12 }
	);

	observer.observe(node);
	return { destroy: () => observer.disconnect() };
}
