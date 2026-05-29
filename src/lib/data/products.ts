import type { Product } from '$lib/types';

/**
 * Product catalogue. This is the single source of truth today.
 * To add a product: append one entry below.
 * To move to a CMS/API later: keep these function signatures and swap the
 * implementation (e.g. fetch in a +page.server.ts) — components stay unchanged.
 */
const products: Product[] = [
	{
		slug: 'second-brain-os',
		title: { ko: '세컨드 브레인 OS', en: 'Second Brain OS', ja: 'セカンドブレインOS' },
		tagline: {
			ko: '모든 메모와 할 일을 한 곳에서',
			en: 'Every note and task in one calm place',
			ja: 'すべてのメモとタスクをひとつに'
		},
		description: {
			ko: '노트, 작업, 프로젝트, 자료를 하나의 흐름으로 연결하는 올인원 Notion 시스템입니다. PARA 구조를 기반으로 매일의 정리를 가볍게 만듭니다.',
			en: 'An all-in-one Notion system that connects notes, tasks, projects, and resources into one flow. Built on PARA so daily tidying stays light.',
			ja: 'ノート・タスク・プロジェクト・資料をひとつの流れにつなぐオールインワンのNotionシステム。PARA構造で日々の整理を軽やかに。'
		},
		features: {
			ko: ['PARA 기반 대시보드', '작업·프로젝트 연동', '주간 리뷰 템플릿', '모바일 최적화'],
			en: ['PARA dashboard', 'Linked tasks & projects', 'Weekly review template', 'Mobile-ready'],
			ja: ['PARAダッシュボード', 'タスクとプロジェクト連携', '週次レビュー', 'モバイル対応']
		},
		category: 'productivity',
		price: 29,
		currency: 'USD',
		coverImage: '',
		gallery: [],
		buyUrl: 'https://gumroad.com/',
		featured: true
	},
	{
		slug: 'money-flow',
		title: { ko: '머니 플로우', en: 'Money Flow', ja: 'マネーフロー' },
		tagline: {
			ko: '돈의 흐름이 한눈에 보이는 가계부',
			en: 'See where your money flows',
			ja: 'お金の流れがひと目でわかる家計簿'
		},
		description: {
			ko: '수입과 지출, 예산과 자산을 자동으로 집계하는 Notion 가계부입니다. 차트와 월간 리포트로 흐름을 직관적으로 파악합니다.',
			en: 'A Notion finance tracker that rolls up income, spending, budgets, and assets automatically — with charts and monthly reports.',
			ja: '収入・支出・予算・資産を自動集計するNotion家計簿。チャートと月次レポートで流れを直感的に。'
		},
		features: {
			ko: ['자동 월간 집계', '예산 대비 현황', '자산 추적', '연간 리포트'],
			en: ['Automatic monthly rollups', 'Budget vs. actual', 'Asset tracking', 'Yearly report'],
			ja: ['月次自動集計', '予算対比', '資産トラッキング', '年間レポート']
		},
		category: 'finance',
		price: 19,
		currency: 'USD',
		coverImage: '',
		gallery: [],
		buyUrl: 'https://gumroad.com/',
		featured: true
	},
	{
		slug: 'deep-study',
		title: { ko: '딥 스터디', en: 'Deep Study', ja: 'ディープスタディ' },
		tagline: {
			ko: '집중과 복습을 설계하는 학습 시스템',
			en: 'Designed for focus and review',
			ja: '集中と復習を設計する学習システム'
		},
		description: {
			ko: '강의, 과제, 시험을 한 곳에서 관리하고 간격 반복으로 복습을 자동화하는 학습 템플릿입니다.',
			en: 'A study template to manage courses, assignments, and exams in one place — with spaced-repetition review built in.',
			ja: '講義・課題・試験をひとつで管理し、間隔反復で復習を自動化する学習テンプレート。'
		},
		features: {
			ko: ['과목별 대시보드', '간격 반복 복습', '시험 카운트다운', '성적 추적'],
			en: ['Course dashboards', 'Spaced repetition', 'Exam countdowns', 'Grade tracking'],
			ja: ['科目別ダッシュボード', '間隔反復', '試験カウントダウン', '成績トラッキング']
		},
		category: 'study',
		price: 15,
		currency: 'USD',
		coverImage: '',
		gallery: [],
		buyUrl: 'https://gumroad.com/',
		featured: true
	},
	{
		slug: 'creator-hub',
		title: { ko: '크리에이터 허브', en: 'Creator Hub', ja: 'クリエイターハブ' },
		tagline: {
			ko: '콘텐츠 기획부터 발행까지',
			en: 'From idea to publish',
			ja: '企画から公開まで'
		},
		description: {
			ko: '아이디어, 대본, 일정, 채널을 한 흐름으로 묶는 콘텐츠 제작 템플릿입니다. 발행 캘린더로 꾸준함을 만듭니다.',
			en: 'A content-production template that links ideas, scripts, schedules, and channels into one flow, with a publishing calendar for consistency.',
			ja: 'アイデア・台本・スケジュール・チャンネルをひとつの流れに束ねる制作テンプレート。公開カレンダーで継続を。'
		},
		features: {
			ko: ['아이디어 보관함', '발행 캘린더', '채널별 보드', '성과 기록'],
			en: ['Idea inbox', 'Publishing calendar', 'Per-channel boards', 'Performance log'],
			ja: ['アイデア受信箱', '公開カレンダー', 'チャンネル別ボード', '成果ログ']
		},
		category: 'creator',
		price: 24,
		currency: 'USD',
		coverImage: '',
		gallery: [],
		buyUrl: 'https://gumroad.com/',
		featured: false
	}
];

export function getProducts(): Product[] {
	return products;
}

export function getFeaturedProducts(limit = 3): Product[] {
	return products.filter((p) => p.featured).slice(0, limit);
}

export function getProduct(slug: string): Product | undefined {
	return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(slug: string, limit = 3): Product[] {
	const current = getProduct(slug);
	if (!current) return [];
	return products
		.filter((p) => p.slug !== slug && p.category === current.category)
		.concat(products.filter((p) => p.slug !== slug && p.category !== current.category))
		.slice(0, limit);
}
