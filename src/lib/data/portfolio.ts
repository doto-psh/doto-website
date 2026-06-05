import type { PortfolioData, SkillCategory, TimelineCategory, TimelineItem } from '$lib/types';

export const skillCategories: SkillCategory[] = [
	'frontend',
	'backend',
	'database',
	'devops',
	'infra',
	'tools'
];

export const timelineCategories: TimelineCategory[] = [
	'career',
	'education',
	'certification',
	'activity'
];

export const mascotImages = {
	profile: '/images/doto-charactor-only.png',
	characterSheet: '/images/doto-character.png',
	beach: '/images/doto-charactor-beach.png'
} as const;

export const portfolio: PortfolioData = {
	profile: {
		name: { ko: 'doto', en: 'doto' },
		role: {
			ko: 'AI와 백엔드 흐름을 다루는 풀스택 개발자',
			en: 'Full-stack developer working across AI and backend workflows'
		},
		tagline: {
			ko: '문제를 구조화하고 작동하는 제품으로 만듭니다.',
			en: 'I structure problems and ship working products.'
		},
		bio: {
			ko: 'AI 문서 처리, 백엔드 데이터 흐름, 프론트엔드 경험, 배포 운영을 연결해 실제 사용 가능한 시스템을 만드는 데 집중합니다. 문제를 재현하고, 상태를 명확히 나누고, 운영자가 따라갈 수 있는 흐름으로 정리하는 방식을 선호합니다.',
			en: 'I focus on building usable systems by connecting AI document workflows, backend data flows, frontend experience, and deployment operations. I prefer reproducible debugging, explicit state, and flows that operators can follow.'
		},
		location: { ko: 'Seoul, Korea', en: 'Seoul, Korea' },
		photoUrl: mascotImages.profile,
		email: 'hello@doto.example',
		github: 'https://github.com/doto-psh',
		resumeUrl: '/resume.pdf'
	},
	skills: [
		{
			category: 'frontend',
			title: { ko: 'Frontend', en: 'Frontend' },
			description: {
				ko: '반응형 UI, 상태 흐름, 다국어 경험을 구현합니다.',
				en: 'Responsive UI, state flow, and multilingual product experience.'
			},
			items: [
				{ name: 'SvelteKit', level: 'core' },
				{ name: 'Svelte 5', level: 'core' },
				{ name: 'TypeScript', level: 'core' },
				{ name: 'Tailwind CSS', level: 'working' },
				{ name: 'i18n', level: 'working' }
			]
		},
		{
			category: 'backend',
			title: { ko: 'Backend', en: 'Backend' },
			description: {
				ko: 'API, 인증, 데이터 처리 흐름을 추적 가능한 구조로 만듭니다.',
				en: 'APIs, auth, and data-processing flows with traceable structure.'
			},
			items: [
				{ name: 'Python', level: 'core' },
				{ name: 'FastAPI', level: 'core' },
				{ name: 'REST API', level: 'core' },
				{ name: 'SQLAlchemy', level: 'working' },
				{ name: 'RAG', level: 'working' }
			]
		},
		{
			category: 'database',
			title: { ko: 'Database', en: 'Database' },
			description: {
				ko: '검색, 임베딩, 문서 상태를 다루는 저장 구조를 설계합니다.',
				en: 'Storage structures for search, embeddings, and document state.'
			},
			items: [
				{ name: 'PostgreSQL', level: 'working' },
				{ name: 'Milvus', level: 'working' },
				{ name: 'Vector DB', level: 'working' },
				{ name: 'Schema Design', level: 'working' }
			]
		},
		{
			category: 'devops',
			title: { ko: 'DevOps', en: 'DevOps' },
			description: {
				ko: '빌드, 배포, 헬스체크, 장애 재현 경로를 정리합니다.',
				en: 'Builds, deployments, health checks, and incident repro flows.'
			},
			items: [
				{ name: 'Vercel', level: 'working' },
				{ name: 'GitHub Actions', level: 'working' },
				{ name: 'Docker', level: 'working' },
				{ name: 'Shell', level: 'working' }
			]
		},
		{
			category: 'infra',
			title: { ko: 'Infra', en: 'Infra' },
			description: {
				ko: '클라우드 서비스의 운영 진단과 설정 차이를 좁힙니다.',
				en: 'Operational diagnosis and configuration gaps in cloud services.'
			},
			items: [
				{ name: 'Azure App Service', level: 'working' },
				{ name: 'API Ops', level: 'working' },
				{ name: 'Logging', level: 'core' },
				{ name: 'Monitoring', level: 'learning' }
			]
		},
		{
			category: 'tools',
			title: { ko: 'Tools', en: 'Tools' },
			description: {
				ko: '문제 재현, 문서화, 협업 속도를 높이는 도구를 사용합니다.',
				en: 'Tools for reproduction, documentation, and collaboration speed.'
			},
			items: [
				{ name: 'Git', level: 'core' },
				{ name: 'Notion', level: 'working' },
				{ name: 'Markdown', level: 'core' },
				{ name: 'Playwright', level: 'working' }
			]
		}
	],
	timeline: [
		{
			id: 'portfolio-system',
			category: 'activity',
			title: { ko: '개발자 포트폴리오 시스템 구축', en: 'Built developer portfolio system' },
			organization: { ko: 'Personal Project', en: 'Personal Project' },
			period: { ko: '2026', en: '2026' },
			description: {
				ko: '프로젝트, 블로그, 스킬, 타임라인, Contact를 한 곳에서 관리하는 포트폴리오 구조를 설계했습니다.',
				en: 'Designed a portfolio structure that manages projects, blog posts, skills, timeline, and contact paths in one place.'
			},
			highlights: {
				ko: ['반응형 UI', '다크모드', '다국어 드롭다운', '프로젝트 검색/필터'],
				en: ['Responsive UI', 'Dark mode', 'Language dropdown', 'Project search/filter']
			},
			stack: ['SvelteKit', 'TypeScript', 'Tailwind CSS']
		},
		{
			id: 'rag-migration',
			category: 'career',
			title: { ko: 'RAG 모델 마이그레이션 설계', en: 'Designed RAG model migration flow' },
			organization: { ko: 'Backend / AI Workflow', en: 'Backend / AI Workflow' },
			period: { ko: '2026', en: '2026' },
			description: {
				ko: '문서 상태, 삭제 처리, 적용 단계를 분리해 안전하게 임베딩 모델을 전환하는 흐름을 정리했습니다.',
				en: 'Separated document state, deletion handling, and apply steps to migrate embedding models safely.'
			},
			highlights: {
				ko: ['상태 기반 진행 관리', '삭제 문서 계산 오류 방지', '적용 전 검증'],
				en: ['State-driven progress', 'Deleted-document accounting', 'Pre-apply validation']
			},
			stack: ['Python', 'Milvus', 'RAG']
		},
		{
			id: 'azure-ops',
			category: 'career',
			title: { ko: 'Azure 배포 운영 진단', en: 'Azure deployment operations debugging' },
			organization: { ko: 'API Ops', en: 'API Ops' },
			period: { ko: '2026', en: '2026' },
			description: {
				ko: '로그, 헬스체크, 인증 헤더, 직접 재현 순서로 배포 문제를 좁히는 운영 흐름을 정리했습니다.',
				en: 'Organized an operations flow that narrows deployment issues through logs, health checks, auth headers, and direct repros.'
			},
			stack: ['Azure', 'FastAPI', 'Docker']
		},
		{
			id: 'education-main',
			category: 'education',
			title: { ko: '컴퓨터공학 기반 학습', en: 'Computer science foundation' },
			organization: { ko: 'Education', en: 'Education' },
			period: { ko: '업데이트 예정', en: 'To be updated' },
			description: {
				ko: '학교명, 전공, 학위, 기간은 이 항목을 수정해 관리합니다.',
				en: 'Update this item with school, major, degree, and dates.'
			}
		},
		{
			id: 'certification-main',
			category: 'certification',
			title: { ko: '자격증 정보', en: 'Certification record' },
			organization: { ko: 'Issuer', en: 'Issuer' },
			period: { ko: '업데이트 예정', en: 'To be updated' },
			description: {
				ko: '자격증 이름, 발급기관, 취득일, 링크는 이 항목을 수정해 관리합니다.',
				en: 'Update this item with certification name, issuer, date, and link.'
			}
		}
	]
};

export function getPortfolio(): PortfolioData {
	return portfolio;
}

export function getTimeline(limit?: number): TimelineItem[] {
	const items = portfolio.timeline;
	return typeof limit === 'number' ? items.slice(0, limit) : items;
}
