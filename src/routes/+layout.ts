// Prerender the entire site as static output (Vercel adapter serves it statically).
// Server endpoints / +page.server.ts can opt out later when a backend is added.
export const prerender = true;
export const trailingSlash = 'never';
