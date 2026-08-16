import assert from 'node:assert/strict';
import test from 'node:test';
import { createChatCompletionPayload } from '../src/lib/server/openai-request.ts';

test('builds a chat completion payload compatible with current models', () => {
	const messages = [{ role: 'user' as const, content: 'Hello' }];
	const payload = createChatCompletionPayload('gpt-5-mini', messages);

	assert.deepEqual(payload, {
		model: 'gpt-5-mini',
		messages,
		stream: true,
		max_completion_tokens: 600
	});
	assert.equal('max_tokens' in payload, false);
	assert.equal('temperature' in payload, false);
});
