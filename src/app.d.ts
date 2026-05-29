import type { Locale } from '$lib/types';

// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			locale: Locale;
		}
		// interface PageData {}
		interface PageState {}
		// interface Platform {}
	}
}

export {};
