import { expect, test, type Page } from '@playwright/test';

async function waitForHydration(page: Page) {
	await expect(page.locator('body')).toHaveAttribute('data-menu-open', 'false');
}

const representativeRoutes = [
	'/',
	'/projects',
	'/projects/kbot-vector-db-migration',
	'/notes',
	'/notes/debugging-rag-migrations',
	'/about',
	'/ask'
];

const primaryViewports = [
	{ name: 'mobile', width: 390, height: 844 },
	{ name: 'desktop', width: 1440, height: 1000 }
];

async function assertReadableContract(page: Page) {
	const overflow = await page.evaluate(() => ({
		clientWidth: document.documentElement.clientWidth,
		scrollWidth: document.documentElement.scrollWidth
	}));
	expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);

	const minimums: Record<string, number> = {
		'.type-prose': 18,
		'.type-body': 17,
		'.type-body-small': 16,
		'.type-control': 16,
		'.type-meta': 14
	};

	for (const [selector, minimum] of Object.entries(minimums)) {
		const sizes = await page.locator(selector).evaluateAll((elements) =>
			elements
				.filter((element) => {
					const style = getComputedStyle(element);
					return style.display !== 'none' && style.visibility !== 'hidden';
				})
				.map((element) => Number.parseFloat(getComputedStyle(element).fontSize))
		);
		for (const size of sizes) expect(size, `${selector} rendered below ${minimum}px`).toBeGreaterThanOrEqual(minimum);
	}

	const controlSelectors = [
		'.hero-button',
		'.ask-link',
		'.menu-button',
		'.capability-row',
		'.suggestions button',
		'form > button'
	];
	for (const selector of controlSelectors) {
		const boxes = await page.locator(selector).evaluateAll((elements) =>
			elements
				.filter((element) => {
					const style = getComputedStyle(element);
					return style.display !== 'none' && style.visibility !== 'hidden';
				})
				.map((element) => {
					const rect = element.getBoundingClientRect();
					return { width: rect.width, height: rect.height };
				})
		);
		for (const box of boxes) {
			expect(box.width, `${selector} is narrower than 44px`).toBeGreaterThanOrEqual(44);
			expect(box.height, `${selector} is shorter than 44px`).toBeGreaterThanOrEqual(44);
		}
	}
}

for (const locale of ['ko', 'en']) {
	for (const route of representativeRoutes) {
		for (const viewport of primaryViewports) {
			test(`${locale}${route} is readable at ${viewport.name}`, async ({ page }) => {
				await page.setViewportSize(viewport);
				await page.emulateMedia({ reducedMotion: 'reduce' });
				await page.goto(`/${locale}${route === '/' ? '' : route}`);
				await expect(page.locator('main#main-content')).toBeVisible();
				await assertReadableContract(page);
			});
		}
	}
}

for (const viewport of [
	{ width: 360, height: 800 },
	{ width: 640, height: 900 },
	{ width: 768, height: 900 },
	{ width: 1024, height: 900 }
]) {
	test(`critical reading routes reflow at ${viewport.width}px`, async ({ page }) => {
		await page.setViewportSize(viewport);
		await page.emulateMedia({ reducedMotion: 'reduce' });
		for (const route of [
			'/ko',
			'/ko/projects/kbot-vector-db-migration',
			'/ko/notes/debugging-rag-migrations'
		]) {
			await page.goto(route);
			await assertReadableContract(page);
		}
	});
}

test('mobile menu traps and restores keyboard focus', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/ko');
	await waitForHydration(page);
	const trigger = page.locator('.menu-button');
	await trigger.focus();
	await trigger.press('Enter');
	await expect(page.locator('.mobile-menu')).toBeVisible();
	await expect(page.locator('.mobile-menu nav a').first()).toBeFocused();
	await page.keyboard.press('Escape');
	await expect(page.locator('.mobile-menu')).toBeHidden();
	await expect(trigger).toBeFocused();
});

test('capability accordion remains keyboard operable', async ({ page }) => {
	await page.setViewportSize({ width: 1024, height: 900 });
	await page.goto('/en');
	await waitForHydration(page);
	const rows = page.locator('.capability-row');
	await rows.nth(1).focus();
	await rows.nth(1).press('Enter');
	await expect(rows.nth(1)).toHaveAttribute('aria-expanded', 'true');
	await expect(page.locator('.capability-detail')).toBeVisible();
});

test('hero metadata keeps a clear vertical rhythm on mobile', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/ko');
	await waitForHydration(page);

	const spacing = await page.evaluate(() => {
		const identityElement = document.querySelector<HTMLElement>('.hero-identity')!;
		const identity = identityElement.getBoundingClientRect();
		const title = document.querySelector<HTMLElement>('.hero-copy h1')!.getBoundingClientRect();
		const metaStyle = getComputedStyle(identityElement);

		return {
			identity: identityElement.textContent?.trim(),
			identityToTitleGap: title.top - identity.bottom,
			metaLineHeightRatio:
				Number.parseFloat(metaStyle.lineHeight) / Number.parseFloat(metaStyle.fontSize)
		};
	});

	expect(spacing.identity).toContain('박수현 · AI Engineer · Seoul, Korea');
	expect(spacing.identityToTitleGap).toBeGreaterThanOrEqual(24);
	expect(spacing.metaLineHeightRatio).toBeGreaterThanOrEqual(1.6);
});
