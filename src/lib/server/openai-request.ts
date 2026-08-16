export interface OpenAIChatMessage {
	role: 'system' | 'user' | 'assistant';
	content: string;
}

const MAX_COMPLETION_TOKENS = 600;

/** Build a request shared by GPT-4o and current reasoning-capable chat models. */
export function createChatCompletionPayload(model: string, messages: OpenAIChatMessage[]) {
	return {
		model,
		messages,
		stream: true,
		max_completion_tokens: MAX_COMPLETION_TOKENS
	};
}
