import { env } from '$env/dynamic/private';
import {
	createChatCompletionPayload,
	type OpenAIChatMessage
} from '$lib/server/openai-request';

/**
 * Server-only OpenAI helper. This module reads the secret API key from the
 * private environment and MUST NEVER be imported from client code — SvelteKit
 * enforces this for anything under `$lib/server`.
 */

export interface ChatMessage {
	role: 'user' | 'assistant';
	content: string;
}

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const DEFAULT_MODEL = 'gpt-4o-mini';

/** Thrown when the server is missing its OpenAI key (config error, not user error). */
export class MissingApiKeyError extends Error {
	constructor() {
		super('OPENAI_API_KEY is not configured');
		this.name = 'MissingApiKeyError';
	}
}

/**
 * Call OpenAI's chat completions API with streaming enabled and return a stream
 * of plain UTF-8 text deltas (the SSE envelope is parsed away here).
 */
export async function streamChat(
	messages: OpenAIChatMessage[]
): Promise<ReadableStream<Uint8Array>> {
	const apiKey = env.OPENAI_API_KEY;
	if (!apiKey) throw new MissingApiKeyError();

	const upstream = await fetch(OPENAI_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify(
			createChatCompletionPayload(env.OPENAI_MODEL || DEFAULT_MODEL, messages)
		)
	});

	if (!upstream.ok || !upstream.body) {
		// Surface a generic error; never leak the upstream body / key to callers.
		const detail = await upstream.text().catch(() => '');
		throw new Error(`OpenAI request failed (${upstream.status}): ${detail.slice(0, 200)}`);
	}

	const reader = upstream.body.getReader();
	const decoder = new TextDecoder();
	const encoder = new TextEncoder();

	return new ReadableStream<Uint8Array>({
		// Drain the upstream continuously (not gated by consumer pull) so the
		// whole answer streams through and the stream closes promptly on [DONE].
		async start(controller) {
			let buffer = '';
			try {
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;

					buffer += decoder.decode(value, { stream: true });
					// SSE events are newline-delimited; each line starts with "data: ".
					const lines = buffer.split('\n');
					buffer = lines.pop() ?? '';

					for (const line of lines) {
						const trimmed = line.trim();
						if (!trimmed.startsWith('data:')) continue;
						const data = trimmed.slice(5).trim();
						if (data === '[DONE]') {
							controller.close();
							return;
						}
						try {
							const json = JSON.parse(data);
							const delta: string | undefined = json.choices?.[0]?.delta?.content;
							if (delta) controller.enqueue(encoder.encode(delta));
						} catch {
							// Ignore keep-alive / partial fragments.
						}
					}
				}
				controller.close();
			} catch (err) {
				controller.error(err);
			}
		},
		cancel() {
			reader.cancel().catch(() => {});
		}
	});
}

/**
 * Best-effort, per-IP sliding-window rate limiter held in module memory.
 * Note: on serverless this resets on cold start and is not shared across
 * instances, so it only deters casual abuse — that's acceptable for a
 * portfolio chatbot. Returns true when the request is allowed.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 12;
const hits = new Map<string, number[]>();

export function rateLimit(ip: string): boolean {
	const now = Date.now();
	const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
	if (recent.length >= MAX_PER_WINDOW) {
		hits.set(ip, recent);
		return false;
	}
	recent.push(now);
	hits.set(ip, recent);
	return true;
}
