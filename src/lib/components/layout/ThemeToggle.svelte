<script lang="ts">
	import { _ } from 'svelte-i18n';

	let theme = $state<'light' | 'dark'>('light');

	$effect(() => {
		const stored = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		theme = stored === 'dark' || (!stored && prefersDark) ? 'dark' : 'light';
		document.documentElement.classList.toggle('dark', theme === 'dark');
	});

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		localStorage.setItem('theme', theme);
		document.documentElement.classList.toggle('dark', theme === 'dark');
	}
</script>

<button
	type="button"
	class="grid h-9 w-9 place-items-center rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] text-sm font-black text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
	aria-label={$_('theme.toggle')}
	onclick={toggleTheme}
>
	{theme === 'dark' ? '☀' : '◐'}
</button>
