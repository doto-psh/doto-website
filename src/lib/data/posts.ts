import type { Post } from '$lib/types';

const posts: Post[] = [
	{
		slug: 'debugging-rag-migrations',
		title: {
			ko: 'RAG 마이그레이션을 디버깅할 때 먼저 보는 것',
			en: 'What I Check First When Debugging RAG Migrations'
		},
		excerpt: {
			ko: '상태, 삭제된 문서, 적용 경로를 나누면 마이그레이션 버그가 훨씬 선명해진다.',
			en: 'Migration bugs become clearer when status, deleted documents, and apply paths are separated.'
		},
		content: {
			ko: `# RAG 마이그레이션을 디버깅할 때 먼저 보는 것

RAG 모델 변경은 단순한 설정 변경처럼 보이지만, 실제로는 기존 문서와 새 임베딩 컬렉션 사이의 데이터 이동 문제입니다.

## 먼저 확인하는 세 가지

- 현재 마이그레이션 상태가 명시적으로 저장되는지 확인한다.
- 삭제된 문서와 활성 문서를 같은 카운터로 계산하지 않는다.
- 적용 단계 전에 재시도 가능한 중간 상태를 만든다.

## 내가 선호하는 흐름

상태를 시간값으로 추론하지 않고, 사용자가 볼 수 있는 진행 상태로 저장합니다. 그래야 실패 후 재시도하거나 정리할 때 데이터 손실 가능성을 줄일 수 있습니다.

\`\`\`ts
type MigrationStatus = 'idle' | 'preparing' | 'ready' | 'applying' | 'done' | 'failed';
\`\`\`

좋은 마이그레이션 코드는 빠른 코드가 아니라, 실패했을 때 어디서 멈췄는지 설명할 수 있는 코드입니다.`,
			en: `# What I Check First When Debugging RAG Migrations

A RAG model change looks like a configuration update, but it is really a data movement problem between existing documents and a new embedding collection.

## Three checks first

- Make sure the current migration status is stored explicitly.
- Do not count deleted and active documents through the same counter.
- Create a retryable intermediate state before applying the result.

## The flow I prefer

I avoid inferring state from timestamps and store progress in a form users can inspect. That reduces the chance of data loss when a retry or cleanup step runs.

\`\`\`ts
type MigrationStatus = 'idle' | 'preparing' | 'ready' | 'applying' | 'done' | 'failed';
\`\`\`

Good migration code is not just fast code. It can explain where it stopped when it fails.`
		},
		date: '2026-05-29',
		tags: ['rag', 'backend', 'debugging']
	},
	{
		slug: 'frontend-proof-over-decoration',
		title: {
			ko: '포트폴리오는 장식보다 증거가 먼저다',
			en: 'A Portfolio Needs Proof Before Decoration'
		},
		excerpt: {
			ko: '개발자 포트폴리오의 첫 화면은 예쁜 문장보다 문제 해결의 흔적을 보여줘야 한다.',
			en: 'A developer portfolio should show traces of problem-solving before pretty copy.'
		},
		content: {
			ko: `# 포트폴리오는 장식보다 증거가 먼저다

좋은 개인 사이트는 자신을 크게 소개하는 페이지가 아니라, 방문자가 빠르게 판단할 수 있게 돕는 인터페이스입니다.

## 채용 담당자가 보고 싶은 것

- 어떤 문제를 풀었는가
- 어떤 기술을 실제로 사용했는가
- 결과가 무엇이었는가
- 코드를 확인할 수 있는가

그래서 프로젝트 카드는 이미지보다 역할, 스택, 임팩트가 먼저 보여야 합니다. 디자인은 그 정보를 빠르게 읽히게 만드는 구조여야 합니다.`,
			en: `# A Portfolio Needs Proof Before Decoration

A good personal site is not a page that introduces you loudly. It is an interface that helps visitors judge quickly.

## What recruiters want to see

- What problem did you solve?
- What technology did you use in practice?
- What changed because of the work?
- Can the code be checked?

That is why project cards should show role, stack, and impact before imagery. Design should make that information easier to scan.`
		},
		date: '2026-05-20',
		tags: ['frontend', 'portfolio', 'design']
	},
	{
		slug: 'deployment-debugging-order',
		title: {
			ko: '배포 문제를 좁히는 순서',
			en: 'The Order I Use to Narrow Deployment Bugs'
		},
		excerpt: {
			ko: '로그, 헬스체크, 인증, 직접 재현을 고정된 순서로 보면 원인 추적이 빨라진다.',
			en: 'Logs, health checks, auth, and direct repros narrow causes faster when checked in a fixed order.'
		},
		content: {
			ko: `# 배포 문제를 좁히는 순서

배포 문제는 막연히 보면 커 보이지만, 대부분은 기동 실패, 설정 누락, 인증 실패, 라우팅 문제 중 하나로 좁혀집니다.

## 고정 순서

1. 로그 tail로 프로세스가 올라왔는지 본다.
2. 헬스체크 엔드포인트를 직접 호출한다.
3. 인증 헤더가 필요한 요청을 최소 curl로 재현한다.
4. 로컬과 배포 환경의 설정 차이를 비교한다.

이 순서를 문서로 남겨두면 다음 장애 때 같은 추론을 반복하지 않아도 됩니다.`,
			en: `# The Order I Use to Narrow Deployment Bugs

Deployment problems feel large when viewed loosely, but most narrow down to startup failure, missing configuration, auth failure, or routing.

## Fixed order

1. Tail logs and check whether the process started.
2. Call the health endpoint directly.
3. Reproduce an authenticated request with the smallest curl command.
4. Compare local and deployed configuration.

Writing this order down prevents repeating the same reasoning during the next incident.`
		},
		date: '2026-05-12',
		tags: ['infra', 'ops', 'debugging']
	}
];

export function getPosts(): Post[] {
	return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getRecentPosts(limit = 3): Post[] {
	return getPosts().slice(0, limit);
}

export function getPost(slug: string): Post | undefined {
	return posts.find((post) => post.slug === slug);
}
