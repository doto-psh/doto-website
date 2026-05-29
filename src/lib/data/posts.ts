import type { Post } from '$lib/types';

/**
 * Blog posts. For now these link out to an external blog.
 * Later: replace with markdown content collections or a CMS fetch —
 * the getPosts()/getRecentPosts() API stays the same.
 */
const posts: Post[] = [
	{
		slug: 'why-i-subtract',
		title: {
			ko: '나는 왜 더하지 않고 덜어내는가',
			en: 'Why I subtract instead of add',
			ja: 'なぜ足さずに引くのか'
		},
		excerpt: {
			ko: '도구를 늘릴수록 복잡해진다. 단정함은 선택이 아니라 설계의 결과다.',
			en: 'More tools, more noise. Calm is not a choice — it is a design decision.',
			ja: '道具が増えるほど複雑になる。簡潔さは選択ではなく設計の結果だ。'
		},
		date: '2026-04-18',
		url: 'https://blog.example/why-i-subtract',
		tags: ['system', 'mindset']
	},
	{
		slug: 'para-in-practice',
		title: {
			ko: 'PARA를 실제로 쓰는 법',
			en: 'PARA in practice',
			ja: 'PARAの実践'
		},
		excerpt: {
			ko: '구조는 시작일 뿐이다. 매일 쓰는 흐름으로 만드는 작은 습관들.',
			en: 'Structure is only the start. The small habits that turn it into a daily flow.',
			ja: '構造は始まりにすぎない。日々の流れに変える小さな習慣。'
		},
		date: '2026-03-30',
		url: 'https://blog.example/para-in-practice',
		tags: ['notion', 'workflow']
	},
	{
		slug: 'weekly-review',
		title: {
			ko: '주간 리뷰가 일주일을 바꾼다',
			en: 'How a weekly review changes the week',
			ja: '週次レビューが一週間を変える'
		},
		excerpt: {
			ko: '15분의 회고가 다음 7일의 방향을 정한다. 내가 쓰는 질문 5가지.',
			en: 'Fifteen minutes of reflection set the next seven days. The five questions I ask.',
			ja: '15分の振り返りが次の7日を決める。私が使う5つの問い。'
		},
		date: '2026-03-09',
		url: 'https://blog.example/weekly-review',
		tags: ['habit', 'review']
	}
];

export function getPosts(): Post[] {
	return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getRecentPosts(limit = 3): Post[] {
	return getPosts().slice(0, limit);
}
