import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Pin the serverless runtime so local builds work regardless of the local
		// Node version. The site is fully prerendered today; this matters only once
		// server endpoints are added.
		adapter: adapter({ runtime: 'nodejs22.x' })
	}
};

export default config;
