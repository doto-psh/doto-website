import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const root = new URL('..', import.meta.url).pathname;
const appCss = readFileSync(join(root, 'src/app.css'), 'utf8');

function luminance(hex: string): number {
	const channels = hex
		.match(/[a-f\d]{2}/gi)!
		.map((value) => Number.parseInt(value, 16) / 255)
		.map((value) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4));
	return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrast(foreground: string, background: string): number {
	const lighter = Math.max(luminance(foreground), luminance(background));
	const darker = Math.min(luminance(foreground), luminance(background));
	return (lighter + 0.05) / (darker + 0.05);
}

function color(source: string, token: string): string {
	const match = source.match(new RegExp(`${token}:\\s*(#[0-9a-f]{6})`, 'i'));
	assert.ok(match, `Missing ${token}`);
	return match[1];
}

function sourceFiles(directory: string): string[] {
	return readdirSync(directory).flatMap((entry) => {
		const path = join(directory, entry);
		return statSync(path).isDirectory()
			? sourceFiles(path)
			: /\.(svelte|css)$/.test(entry)
				? [path]
				: [];
	});
}

test('defines every semantic typography role', () => {
	for (const role of [
		'display',
		'page-title',
		'section-title',
		'item-title',
		'lead',
		'body',
		'prose',
		'body-small',
		'meta',
		'meta-decorative',
		'control',
		'code'
	]) {
		assert.match(appCss, new RegExp(`\\.type-${role}\\b`), `Missing .type-${role}`);
	}
});

test('essential secondary text meets WCAG AA contrast in both themes', () => {
	const lightTheme = appCss.slice(appCss.indexOf('.theme-light'));
	const pairs = [
		['dark muted', color(appCss, '--color-muted'), '#070a0f'],
		['dark subtle', color(appCss, '--color-subtle'), '#070a0f'],
		['light muted', color(lightTheme, '--color-muted'), '#eef1f4'],
		['light subtle', color(lightTheme, '--color-subtle'), '#eef1f4']
	] as const;

	for (const [label, foreground, background] of pairs) {
		assert.ok(contrast(foreground, background) >= 4.5, `${label} is below 4.5:1`);
	}
});

test('component styles use the semantic type contract', () => {
	const allowedNumericFontSize = [
		'archive-list i',
		'next-project i',
		'brand-mark',
		'capability-row i',
		'work-open',
		'form > button'
	];

	for (const path of sourceFiles(join(root, 'src'))) {
		if (path.endsWith('app.css')) continue;
		const source = readFileSync(path, 'utf8');
		assert.doesNotMatch(source, /\btext-(?:xs|sm|base|lg|xl|[2-9]xl)\b/, `${path} uses a raw text-size utility`);
		assert.doesNotMatch(source, /var\(--color-faint\)/, `${path} uses decorative color for readable text`);

		for (const line of source.split('\n')) {
			const declaration = line.match(/font-size:\s*([^;]+)/i);
			if (!declaration || declaration[1].trim().startsWith('var(')) continue;
			assert.ok(
				allowedNumericFontSize.some((selector) => line.includes(selector)),
				`${path} contains an unapproved font-size: ${line.trim()}`
			);
		}
	}
});
