function escapeHtml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#039;');
}

function renderInline(value: string): string {
	return escapeHtml(value)
		.replaceAll(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
		.replaceAll(/`([^`]+)`/g, '<code>$1</code>');
}

export function renderMarkdown(markdown: string): string {
	const lines = markdown.trim().split(/\r?\n/);
	const html: string[] = [];
	let inList = false;
	let inCode = false;
	let codeLines: string[] = [];

	function closeList() {
		if (inList) {
			html.push('</ul>');
			inList = false;
		}
	}

	for (const line of lines) {
		if (line.startsWith('```')) {
			closeList();
			if (inCode) {
				html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
				codeLines = [];
				inCode = false;
			} else {
				inCode = true;
			}
			continue;
		}

		if (inCode) {
			codeLines.push(line);
			continue;
		}

		if (!line.trim()) {
			closeList();
			continue;
		}

		if (line.startsWith('## ')) {
			closeList();
			html.push(`<h2>${renderInline(line.slice(3))}</h2>`);
			continue;
		}

		if (line.startsWith('# ')) {
			closeList();
			html.push(`<h1>${renderInline(line.slice(2))}</h1>`);
			continue;
		}

		if (line.startsWith('- ')) {
			if (!inList) {
				html.push('<ul>');
				inList = true;
			}
			html.push(`<li>${renderInline(line.slice(2))}</li>`);
			continue;
		}

		const orderedMatch = line.match(/^\d+\.\s+(.*)$/);
		if (orderedMatch) {
			closeList();
			html.push(`<p><strong>${renderInline(line.split('.')[0])}.</strong> ${renderInline(orderedMatch[1])}</p>`);
			continue;
		}

		closeList();
		html.push(`<p>${renderInline(line)}</p>`);
	}

	closeList();
	if (inCode) {
		html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
	}

	return html.join('\n');
}
