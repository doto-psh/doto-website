import { json, type RequestHandler } from '@sveltejs/kit';
import { buildSystemPrompt, buildLanguageDirective } from '$lib/chat/knowledge';
import { rateLimit, streamChat, type ChatMessage } from '$lib/server/openai';

// Opt this route out of the site-wide prerender (it's a dynamic serverless function).
export const prerender = false;

const MAX_MESSAGES = 12;
const MAX_CONTENT_LENGTH = 2000;

function isValidMessage(value: unknown): value is ChatMessage {
	if (!value || typeof value !== 'object') return false;
	const m = value as Record<string, unknown>;
	return (
		(m.role === 'user' || m.role === 'assistant') &&
		typeof m.content === 'string' &&
		m.content.trim().length > 0 &&
		m.content.length <= MAX_CONTENT_LENGTH
	);
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	// Best-effort abuse protection.
	if (!rateLimit(getClientAddress())) {
		return json({ error: 'rate_limited' }, { status: 429 });
	}

	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return json({ error: 'invalid_json' }, { status: 400 });
	}

	const raw = (body as { messages?: unknown })?.messages;
	if (!Array.isArray(raw) || raw.length === 0 || !raw.every(isValidMessage)) {
		return json({ error: 'invalid_messages' }, { status: 400 });
	}

	// Keep only the most recent turns to cap token usage.
	const history = (raw as ChatMessage[]).slice(-MAX_MESSAGES);

	// Pin the reply language to the latest user message (the knowledge base is
	// Korean-heavy, so the model otherwise defaults to Korean).
	const lastUser = [...history].reverse().find((m) => m.role === 'user');

	const messages: Array<ChatMessage | { role: 'system'; content: string }> = [
		{ role: 'system', content: buildSystemPrompt() },
		...history,
		{ role: 'system', content: buildLanguageDirective(lastUser?.content ?? '') }
	];

	try {
		const stream = await streamChat(messages);
		return new Response(stream, {
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
				'Cache-Control': 'no-store'
			}
		});
	} catch (err) {
		// Log server-side; return a generic message so no internal detail leaks.
		console.error('[api/chat]', err);
		return json({ error: 'server_error' }, { status: 500 });
	}
};
