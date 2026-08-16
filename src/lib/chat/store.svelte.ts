/**
 * Client-side state for the dedicated Ask doto page (Svelte 5 runes).
 *
 * Holds the message list and request state, and talks to the
 * `/api/chat` streaming endpoint — appending text deltas to the latest
 * assistant message as they arrive.
 */

export interface UiMessage {
	role: 'user' | 'assistant';
	content: string;
}

class ChatStore {
	messages = $state<UiMessage[]>([]);
	/** True while a response is streaming in. */
	pending = $state(false);
	errorKind = $state<'rate-limit' | 'generic' | null>(null);
	lastFailedText = $state('');

	/** Seed the greeting once and keep it in sync before a conversation starts. */
	ensureGreeting(text: string) {
		if (this.messages.length === 0) {
			this.messages = [{ role: 'assistant', content: text }];
		} else if (this.messages.length === 1 && this.messages[0].role === 'assistant') {
			this.messages = [{ role: 'assistant', content: text }];
		}
	}

	async send(text: string) {
		const trimmed = text.trim();
		if (!trimmed || this.pending) return;

		this.errorKind = null;
		this.lastFailedText = '';
		this.messages = [...this.messages, { role: 'user', content: trimmed }];
		this.pending = true;

		// Only send real user/assistant turns to the API (skip nothing — greeting
		// is a valid assistant turn that gives the model context).
		const payload = this.messages.map((m) => ({ role: m.role, content: m.content }));

		// Add an empty assistant message we stream into.
		this.messages = [...this.messages, { role: 'assistant', content: '' }];
		const replyIndex = this.messages.length - 1;

		try {
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ messages: payload })
			});

			if (!res.ok || !res.body) {
				const kind = res.status === 429 ? 'rate-limit' : 'generic';
				throw new ChatRequestError(kind);
			}

			const reader = res.body.getReader();
			const decoder = new TextDecoder();
			let acc = '';

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				acc += decoder.decode(value, { stream: true });
				this.updateAt(replyIndex, acc);
			}

			if (!acc.trim()) throw new ChatRequestError('generic');
		} catch (error) {
			this.messages = this.messages.filter((_, index) => index !== replyIndex);
			this.errorKind = error instanceof ChatRequestError ? error.kind : 'generic';
			this.lastFailedText = trimmed;
		} finally {
			this.pending = false;
		}
	}

	retry() {
		if (!this.lastFailedText || this.pending) return;
		const text = this.lastFailedText;
		const failedUserIndex = this.messages.findLastIndex(
			(message) => message.role === 'user' && message.content === text
		);
		if (failedUserIndex >= 0) this.messages = this.messages.filter((_, index) => index !== failedUserIndex);
		void this.send(text);
	}

	private updateAt(index: number, content: string) {
		this.messages = this.messages.map((m, i) => (i === index ? { ...m, content } : m));
	}
}

class ChatRequestError extends Error {
	constructor(public kind: 'rate-limit' | 'generic') {
		super(kind);
	}
}

export const chat = new ChatStore();
