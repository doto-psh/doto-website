<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { site } from '$lib/data/site';

	let name = $state('');
	let email = $state('');
	let message = $state('');

	function submit() {
		const subject = encodeURIComponent(`[doto] Portfolio contact from ${name || 'visitor'}`);
		const body = encodeURIComponent(
			[`Name: ${name}`, `Email: ${email}`, '', message].join('\n')
		);
		window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
	}
</script>

<form class="grid gap-4 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-5 text-left md:p-6" onsubmit={(event) => {
	event.preventDefault();
	submit();
}}>
	<div class="grid gap-2">
		<label for="contact-name" class="text-xs font-black uppercase tracking-[0.14em] text-[var(--color-muted)]">
			{$_('contact.name')}
		</label>
		<input
			id="contact-name"
			bind:value={name}
			type="text"
			autocomplete="name"
			placeholder={$_('contact.namePlaceholder')}
			class="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-4 py-3 text-sm font-semibold text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)]"
		/>
	</div>

	<div class="grid gap-2">
		<label for="contact-email" class="text-xs font-black uppercase tracking-[0.14em] text-[var(--color-muted)]">
			{$_('contact.email')}
		</label>
		<input
			id="contact-email"
			bind:value={email}
			type="email"
			autocomplete="email"
			placeholder={$_('contact.emailPlaceholder')}
			class="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-4 py-3 text-sm font-semibold text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)]"
		/>
	</div>

	<div class="grid gap-2">
		<label for="contact-message" class="text-xs font-black uppercase tracking-[0.14em] text-[var(--color-muted)]">
			{$_('contact.message')}
		</label>
		<textarea
			id="contact-message"
			bind:value={message}
			rows="5"
			placeholder={$_('contact.messagePlaceholder')}
			class="resize-y rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-4 py-3 text-sm font-semibold text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)]"
		></textarea>
	</div>

	<button
		type="submit"
		class="inline-flex items-center justify-center rounded-lg border border-[var(--color-accent)] bg-[var(--color-accent)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--color-accent-strong)]"
	>
		{$_('contact.submit')}
	</button>
</form>
