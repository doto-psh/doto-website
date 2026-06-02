import type { Project, ProjectCategory } from '$lib/types';

const projects: Project[] = [
	{
		slug: 'ai-document-ingestion',
		title: {
			ko: 'AI 문서 인덱싱 파이프라인',
			en: 'AI Document Ingestion Pipeline'
		},
		tagline: {
			ko: 'PDF/PPTX 문서를 검색 가능한 지식베이스로 전환하는 백엔드 파이프라인',
			en: 'Backend pipeline that turns PDF/PPTX files into searchable knowledge bases'
		},
		description: {
			ko: '문서 파싱, 청킹, 임베딩, 벡터 저장, 재색인을 하나의 운영 흐름으로 묶은 AI 인프라 프로젝트입니다.',
			en: 'An AI infrastructure project that connects parsing, chunking, embedding, vector storage, and reindexing into one operator-friendly flow.'
		},
		category: 'ai',
		role: { ko: 'Backend · AI Infra', en: 'Backend · AI Infra' },
		period: '2026',
		stack: ['Python', 'FastAPI', 'Vector DB', 'Embeddings', 'Azure'],
		impact: {
			ko: ['운영자용 재색인 흐름 단순화', '문서 파싱 실패 경로 분리', '벡터 교체 순서 안정화'],
			en: ['Simplified operator reindexing', 'Separated document parsing failure paths', 'Stabilized vector replacement order']
		},
		highlights: {
			ko: ['소스 단위 재색인 API', 'PPTX/PDF 파서 분기', '부분 실패에 강한 처리 순서'],
			en: ['Source-level reindex API', 'PPTX/PDF parser routing', 'Failure-tolerant processing order']
		},
		caseStudy: {
			ko: '운영자가 문서 단위로 재색인을 실행할 수 있도록 진입점을 하나로 모으고, 파싱과 벡터 교체 사이의 위험한 순서를 분리했습니다.',
			en: 'I consolidated reindexing into one operator-facing entry point and separated risky sequencing between parsing and vector replacement.'
		},
		githubUrl: 'https://github.com/doto-psh',
		featured: true
	},
	{
		slug: 'portfolio-system',
		title: {
			ko: '개발자 포트폴리오 시스템',
			en: 'Developer Portfolio System'
		},
		tagline: {
			ko: '경력, 프로젝트, 글, 연락을 한 화면에서 탐색하는 개인 웹사이트',
			en: 'Personal website for browsing career proof, projects, writing, and contact paths'
		},
		description: {
			ko: '마켓플레이스형 초안을 개발자 포트폴리오로 재구성한 SvelteKit 기반 사이트입니다.',
			en: 'A SvelteKit site that turns a marketplace-style draft into a developer-first portfolio.'
		},
		category: 'frontend',
		role: { ko: 'Frontend · Design System', en: 'Frontend · Design System' },
		period: '2026',
		stack: ['SvelteKit', 'Svelte 5', 'Tailwind CSS', 'i18n', 'Vercel'],
		impact: {
			ko: ['다크모드/언어 전환 지원', '프로젝트 필터와 검색 추가', '채용 담당자용 이력서 CTA 정리'],
			en: ['Added dark mode and language switching', 'Added project filtering and search', 'Clarified recruiter resume CTA']
		},
		highlights: {
			ko: ['반응형 대시보드형 히어로', '프로젝트 상세 페이지', 'Markdown 블로그 렌더링'],
			en: ['Responsive dashboard hero', 'Project detail pages', 'Markdown blog rendering']
		},
		caseStudy: {
			ko: '브랜드 색상은 파란색으로 유지하되, 상품 카드 중심의 UX를 개발자의 작업 증거 중심 UX로 바꾸었습니다.',
			en: 'I kept the blue brand signature while moving the UX away from product cards and toward evidence of engineering work.'
		},
		githubUrl: 'https://github.com/doto-psh/doto-website',
		featured: true
	},
	{
		slug: 'rag-model-migration',
		title: {
			ko: 'RAG 모델 마이그레이션 플로우',
			en: 'RAG Model Migration Flow'
		},
		tagline: {
			ko: '기존 문서를 새 임베딩 모델 기준으로 안전하게 이전하는 상태 기반 워크플로우',
			en: 'State-driven workflow for safely migrating documents to a new embedding model'
		},
		description: {
			ko: '사용자 업로드, 지식베이스, 삭제 상태를 고려해 RAG 모델 변경을 추적 가능한 단계로 분리했습니다.',
			en: 'A migration workflow that separates model changes into trackable stages across uploads, knowledge bases, and deletion states.'
		},
		category: 'backend',
		role: { ko: 'Backend · Data Flow', en: 'Backend · Data Flow' },
		period: '2026',
		stack: ['Python', 'SQLAlchemy', 'Milvus', 'RAG', 'REST API'],
		impact: {
			ko: ['마이그레이션 상태를 명시적으로 추적', '삭제된 파일 계산 오류 방지', '적용/정리 경로의 안정성 개선'],
			en: ['Explicit migration status tracking', 'Avoided deleted-file accounting bugs', 'Improved apply/cleanup safety']
		},
		highlights: {
			ko: ['단계별 상태 모델', '부분 삭제 문서 처리', '적용 전 검증 로직'],
			en: ['Stepwise status model', 'Partially deleted document handling', 'Pre-apply validation']
		},
		caseStudy: {
			ko: '시간값 추정보다 명시적 상태를 기준으로 삼아, 재시도와 정리 작업이 데이터 손실로 이어지지 않도록 설계했습니다.',
			en: 'I replaced timestamp inference with explicit state so retries and cleanup paths would not lead to data loss.'
		},
		githubUrl: 'https://github.com/doto-psh',
		featured: true
	},
	{
		slug: 'azure-service-ops',
		title: {
			ko: 'Azure 서비스 운영 진단',
			en: 'Azure Service Operations Debugging'
		},
		tagline: {
			ko: '배포된 API의 헬스체크, 로그, 인증 경로를 빠르게 좁히는 운영 플레이북',
			en: 'Operational playbook for narrowing deployed API health, logs, and auth paths'
		},
		description: {
			ko: 'App Service 배포 후 발생하는 기동, 인증, 엔드포인트 문제를 재현 가능한 순서로 추적했습니다.',
			en: 'A reproducible debugging flow for startup, auth, and endpoint issues after App Service deployment.'
		},
		category: 'infra',
		role: { ko: 'Infra · API Ops', en: 'Infra · API Ops' },
		period: '2026',
		stack: ['Azure App Service', 'Docker', 'FastAPI', 'Shell', 'CI/CD'],
		impact: {
			ko: ['로그 tail부터 직접 curl 재현까지 표준화', '배포 실패 원인 확인 시간 단축', '운영 문서 정리'],
			en: ['Standardized log-tail to curl repro flow', 'Reduced deployment failure triage time', 'Documented operational steps']
		},
		highlights: {
			ko: ['헬스체크 우선 진단', 'API key 재현 요청', 'Portal-first 대체 경로'],
			en: ['Health-check-first diagnosis', 'API-key repro requests', 'Portal-first fallback path']
		},
		caseStudy: {
			ko: '로컬과 배포 환경의 차이를 빠르게 분리하기 위해 로그, 헬스체크, 인증 헤더를 고정된 순서로 검증했습니다.',
			en: 'I used a fixed order of logs, health checks, and auth headers to separate local issues from deployed environment issues.'
		},
		githubUrl: 'https://github.com/doto-psh',
		featured: false
	}
];

export const projectCategories: ProjectCategory[] = ['ai', 'backend', 'frontend', 'infra'];

export function getProjects(): Project[] {
	return projects;
}

export function getFeaturedProjects(limit = 3): Project[] {
	return projects.filter((p) => p.featured).slice(0, limit);
}

export function getProject(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(slug: string, limit = 3): Project[] {
	const current = getProject(slug);
	if (!current) return [];
	return projects
		.filter((p) => p.slug !== slug && p.category === current.category)
		.concat(projects.filter((p) => p.slug !== slug && p.category !== current.category))
		.slice(0, limit);
}
