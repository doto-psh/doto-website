/**
 * Client-side chat widget state (Svelte 5 runes).
 *
 * Holds the open/closed state and the message list, and talks to the
 * `/api/chat` streaming endpoint — appending text deltas to the latest
 * assistant message as they arrive.
 */

export interface UiMessage {
	role: 'user' | 'assistant';
	content: string;
}

class ChatStore {
	open = $state(false);
	messages = $state<UiMessage[]>([]);
	/** True while a response is streaming in. */
	pending = $state(false);

	toggle() {
		this.open = !this.open;
	}

	close() {
		this.open = false;
	}

	/** Seed the greeting once, the first time the panel is opened. */
	ensureGreeting(text: string) {
		if (this.messages.length === 0) {
			this.messages = [{ role: 'assistant', content: text }];
		}
	}

	async send(text: string, errorText: string) {
		const trimmed = text.trim();
		if (!trimmed || this.pending) return;

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

			if (!res.ok || !res.body) throw new Error(`status ${res.status}`);

			const reader = res.body.getReader();
			const decoder = new TextDecoder();
			let acc = '';

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				acc += decoder.decode(value, { stream: true });
				this.updateAt(replyIndex, acc);
			}

			if (!acc.trim()) this.updateAt(replyIndex, errorText);
		} catch {
			this.updateAt(replyIndex, errorText);
		} finally {
			this.pending = false;
		}
	}

	private updateAt(index: number, content: string) {
		this.messages = this.messages.map((m, i) => (i === index ? { ...m, content } : m));
	}
}

export const chat = new ChatStore();
