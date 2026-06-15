import type {
	PortfolioData,
	Project,
	ProjectCategory,
	ProjectCompany,
	SkillCategory,
	SocialLink,
	TimelineCategory
} from '$lib/types';

/**
 * Main editable content file.
 *
 * Update this file when you want to change profile, skills, timeline,
 * projects, links, or navigation shown across the portfolio.
 */

const mascotImages = {
	profile: '/images/doto-charactor-only.png',
	characterSheet: '/images/doto-character.png',
	beach: '/images/doto-charactor-beach.png'
} as const;

const contactLinks = {
	email: 'parkdoto@gmail.com',
	github: 'https://github.com/doto-psh',
	resumeUrl: '/resume.pdf'
} as const;

export const content = {
	site: {
		brand: 'doto',
		/** Used for absolute URLs in meta tags; update to the real domain. */
		url: 'https://dotorowoo.com',
		...contactLinks,
		social: [
			// GitHub link temporarily disabled
			// { label: 'GitHub', href: contactLinks.github },
			{ label: 'Email', href: `mailto:${contactLinks.email}` }
		] satisfies SocialLink[]
	},

	/** Top-level navigation. `key` maps to the i18n `nav.*` namespace. */
	navItems: [
		{ key: 'projects', path: '/projects' },
		// Temporarily hidden from the public navigation.
		// { key: 'blog', path: '/blog' },
		{ key: 'about', path: '/about' }
	],

	mascotImages,

	skillCategories: ['AI/LLM', 'backend', 'database', 'devops-infra', 'frontend'] satisfies SkillCategory[],

	timelineCategories: ['career', 'education', 'certification', 'activity'] satisfies TimelineCategory[],

	portfolio: {
		profile: {
			name: { ko: 'doto', en: 'doto' },
			realName: { ko: '박수현', en: 'Suhyun Park' },
			role: {
				ko: 'AI 개발자',
				en: 'AI Engineer'
			},
			tagline: {
				ko: 'LLM과 데이터로 실제 서비스에서 동작하는 AI 기능을 개발합니다.',
				en: 'I build AI features that work in real services, using LLMs and data.'
			},
			bio: {
				ko: '데이터 분석으로 개발을 시작해, 지금은 영림원소프트랩에서 실제 서비스되는 ERP 내 AI 에이전트를 개발하고 있습니다. Python·FastAPI 기반의 백엔드와 Vector DB·임베딩을 활용한 RAG 검색, Azure 기반 데이터 파이프라인을 주로 다루며, 필요할 때는 Svelte·TypeScript로 프론트엔드까지 직접 구현합니다.\n\n기능 하나를 맡으면 문제 재현부터 설계, 구현, 배포까지 끝까지 책임지는 방식을 선호합니다. 문제를 명확히 재현하고, 상태와 경계를 분리하며, 작업 과정을 기록으로 남겨 다시 활용 가능한 형태로 정리합니다.\n\n특정 기술에 머무르기보다 데이터, 백엔드, AI를 연결해 실제 문제를 해결하는 개발자로 성장하고 있습니다. 기술을 단순한 구현 수단이 아니라, 동료와 비즈니스가 겪는 문제를 더 명확하게 해결하기 위한 도구로 다루고자 합니다.',
				en: 'I started out in data analysis and now build an AI agent in ERP, a production AI product, at Younglimwon Soft Lab. I work mainly on Python/FastAPI backends, RAG retrieval with Vector DBs and embeddings, and Azure-based data pipelines — and when needed I build the frontend myself with Svelte and TypeScript.\n\nWhen I take on a feature, I see it through end to end — reproducing the problem, designing, implementing, and shipping. I reproduce issues precisely, separate state from boundaries, and document the process so it can be reused.\n\nRather than staying within a single technology, I am growing into an engineer who connects data, backend, and AI to solve real problems. I want to treat technology not as a mere means of implementation, but as a tool to resolve the problems my teammates and the business face more clearly.'
			},
			location: { ko: 'Seoul, Korea', en: 'Seoul, Korea' },
			photoUrl: mascotImages.profile,
				// TODO: replace with a real photo; using a placeholder avatar for now.
				realPhotoUrl: '/images/doto-profile.jpg',
			...contactLinks
		},
		skills: [
			{
				category: 'AI/LLM',
				title: { ko: 'AI / LLM', en: 'AI / LLM' },
				description: {
					ko: 'RAG 검색 품질을 좌우하는 전처리, 청킹, 임베딩, 출처 추적 흐름을 제품 구조 안에서 설계합니다.',
					en: 'I design the preprocessing, chunking, embedding, and citation flows that drive RAG retrieval quality inside real products.'
				},
				items: [
					{ name: 'RAG', level: 'core' },
					{ name: 'Document Chunking', level: 'core' },
					{ name: 'Embeddings', level: 'core' },
					{ name: 'Vector Search', level: 'core' },
					{ name: 'Hybrid Search / Reranking', level: 'working' },
					{ name: 'Prompt Engineering', level: 'working' },
					{ name: 'MCP / Agent Tooling', level: 'working' }
				]
			},
			{
				category: 'backend',
				title: { ko: 'Backend', en: 'Backend' },
				description: {
					ko: 'API, 데이터 흐름을 재현 가능하고 추적 가능한 구조로 만듭니다.',
					en: 'APIs, data flows built to be reproducible and traceable.'
				},
				items: [
					{ name: 'Python', level: 'core' },
					{ name: 'FastAPI', level: 'core' },
					{ name: 'REST API', level: 'core' },
					{ name: 'OAuth 2.0 / 2.1', level: 'working' },
					{ name: 'Google Workspace / Microsoft Graph API', level: 'working' }
				]
			},
			{
				category: 'database',
				title: { ko: 'Database / Vector DB', en: 'Database / Vector DB' },
				description: {
					ko: '검색, 임베딩를 고려한 저장 구조를 설계하고 마이그레이션합니다.',
					en: 'Storage structures and migrations designed for search, embeddings'
				},
				items: [
					{ name: 'Vector DB', level: 'core' },
					{ name: 'Vector DB Design', level: 'core' },
					{ name: 'PostgreSQL', level: 'working' },
					{ name: 'Schema Design', level: 'working' }
				]
			},
			{
				category: 'devops-infra',
				title: { ko: 'DevOps / Infra', en: 'DevOps / Infra' },
				description: {
					ko: '임베딩 API를 Azure App Service로 배포하고 Logic Apps·Blob으로 문서 인제스트 파이프라인을 구성해, RAG 서비스를 운영 환경에 안정적으로 연결합니다.',
					en: 'I deploy the embedding API on Azure App Service and orchestrate document-ingestion pipelines with Logic Apps and Blob, connecting RAG services reliably to production.'
				},
				items: [
					{ name: 'Docker', level: 'core' },
					{ name: 'Azure (Logic Apps / Blob / App Service)', level: 'core' },
				]
			},
			{
				category: 'frontend',
				title: { ko: 'Frontend', en: 'Frontend' },
				description: {
					ko: 'RAG 답변의 출처 검증처럼 백엔드 흐름을 사용자가 신뢰할 수 있는 UX로 연결합니다.',
					en: 'I connect backend flows into trustworthy UX, such as verifying the sources behind RAG answers.'
				},
				items: [
					{ name: 'Svelte 5 / SvelteKit', level: 'working' },
					{ name: 'TypeScript', level: 'working' },
					{ name: 'Tailwind CSS', level: 'working' }
				]
			}
		],
		timeline: [
			// CAREER
			{
				id: 'career-younglimwon',
				category: 'career',
				title: { ko: 'AI 개발 · ERP 내 AI 에이전트', en: 'AI Engineer · AI Agent in ERP' },
				organization: { ko: '영림원소프트랩 · AIWG', en: 'Younglimwon Soft Lab · AIWG' },
				period: { ko: '2024.08 ~ 재직중 (사원)', en: 'Aug 2024 ~ Present (Employee)' },
				description: {
					ko: '영림원소프트랩 AI ERP에 탑재된 ERP 내 AI 에이전트의 백엔드를 개발하며, 문서 전처리부터 Vector DB 구조 및 메타데이터 설계, RAG 답변 출처 추적까지 RAG 파이프라인 전반을 구현했습니다. 이와 함께 AI 에이전트가 자연어만으로 Google Workspace·Microsoft 365 업무를 수행하도록 하는 MCP 서버도 개발했습니다.',
					en: 'Developed the backend of the AI agent in Younglimwon Soft Lab\'s AI ERP, building the full RAG pipeline from document preprocessing to Vector DB structure and metadata design and RAG answer source tracking. I also built MCP servers that let AI agents perform Google Workspace and Microsoft 365 tasks from natural language alone.'
				},
				highlights: {
					ko: ['문서 유형별 파싱 및 청킹 전략 설계/구현', 'Vector DB 구조 및 메타데이터 설계', 'RAG 후 메타데이터 활용한 문서 출처 추적', 'Azure 활용한 외부 지식 자동 수집 파이프라인 구축', 'AI 에이전트용 MCP 서버 개발(Google Workspace·Microsoft 365)'],
					en: ['Per-type parsing & chunking strategy', 'Vector DB structure & metadata design', 'Metadata-based source tracking after RAG', 'Azure-based external knowledge ingestion pipeline', 'MCP servers for AI agents (Google Workspace · Microsoft 365)']
				},
				stack: ['Python', 'FastAPI', 'Vector DB', 'Azure', 'RAG', 'MCP']
			},
			{
				id: 'career-ls-itc',
				category: 'career',
				title: { ko: '데이터 분석 인턴 · SCR 공정 데이터 진단', en: 'Data Analysis Intern · SCR Process Data Diagnosis' },
				organization: { ko: 'LS ITC · 데이터분석팀', en: 'LS ITC · Data Analytics Team' },
				period: { ko: '2023.11 ~ 2024.02 (인턴)', en: 'Nov 2023 ~ Feb 2024 (Intern)' },
				description: {
					ko: 'LS전선 SCR 단선 영향인자·공정조건 데이터 레디니스 진단 프로젝트에서 데이터 처리·분석을 담당했습니다(기여도 30%). 공정 데이터를 분석해 전선 크랙 발생 원인과 패턴을 규명하고 baseline 예측 모델로 제조 시스템 개선안을 제안했습니다.',
					en: 'Owned data processing and analysis (30% contribution) on an LS Cable project diagnosing data readiness for SCR wire-breakage factors and process conditions. Analyzed process data to identify crack root causes and patterns, and proposed manufacturing improvements with a baseline prediction model.'
				},
				highlights: {
					ko: ['주조속도 이상 공정 필터링 알고리즘 개발', '크랙 발생 원인·공정 패턴 분석 → 최적 제어 조건 도출', '크랙 발생 확률 baseline 모델 구축'],
					en: ['Built a casting-speed anomaly process-filtering algorithm', 'Analyzed crack causes/process patterns to derive optimal control conditions', 'Built a crack-probability baseline model']
				},
				stack: ['Python', 'Data Analysis', 'ML Modeling']
			},
			// EDUCATION
			{
				id: 'education-sejong',
				category: 'education',
				title: { ko: '세종대학교 · 지능기전공학 (학사)', en: 'Sejong University · Intelligent Mechatronics Engineering (BSc)' },
				organization: { ko: '세종대학교', en: 'Sejong University' },
				period: { ko: '2017.03 ~ 2024.02 (졸업)', en: 'Mar 2017 ~ Feb 2024 (Graduated)' }
			},
			// CERTIFICATION
			{
				id: 'certifications',
				category: 'certification',
				title: { ko: '자격증', en: 'Certifications' },
				highlights: {
					ko: [
						'빅데이터분석기사 · 한국데이터산업진흥원 (2023.12)',
						'데이터분석 준전문가(ADsP) · 한국데이터산업진흥원 (2023.11)',
						'파이썬프로그래밍 활용능력 1급 · 한국정보인재개발원 (2023.08)',
						'OPIc Intermediate Mid 1 · 영어 (2024.10)'
					],
					en: [
						'Engineer Big Data Analysis · KDATA (Dec 2023)',
						'ADsP (Advanced Data Analytics Semi-Professional) · KDATA (Nov 2023)',
						'Python Programming Proficiency Level 1 · KIHRD (Aug 2023)',
						'OPIc Intermediate Mid 1 · English (Oct 2024)'
					]
				}
			},
			// ACTIVITY
			{
				id: 'activity-ls-bigdata-school',
				category: 'activity',
				title: { ko: 'LS빅데이터스쿨 수료', en: 'Completed LS Big Data School' },
				organization: { ko: 'LS빅데이터스쿨', en: 'LS Big Data School' },
				period: { ko: '2023.07 ~ 2023.11', en: 'Jul 2023 ~ Nov 2023' },
			}
		]
	} satisfies PortfolioData,

	projectCategories: ['ai', 'backend', 'frontend', 'infra'] satisfies ProjectCategory[],

	projectCompanies: ['younglimwon', 'ls-itc'] satisfies ProjectCompany[],

	projects: [
		{
			slug: 'kbot-document-analysis',
			title: {
				ko: 'ERP 내 AI 에이전트 문서 유형별 파싱·청킹 파이프라인',
				en: 'AI Agent in ERP Per-Type Parsing & Chunking Pipeline'
			},
			tagline: {
				ko: '문서 유형별로 파싱·청킹·임베딩 전략을 분리해 RAG 검색 품질을 끌어올린 전처리 시스템',
				en: 'A preprocessing system that lifts RAG quality by routing parsing, chunking, and embedding per document type'
			},
			description: {
				ko: '모든 문서를 동일하게 처리하던 구조에서 벗어나, PDF·DOCX·PPT/PPTX·Excel·텍스트를 각 구조에 맞는 경로로 처리하도록 재설계했습니다. 표·이미지 문서는 document parser로 레이아웃을 분석하고, 페이지·슬라이드·시트 단위 출처를 보존해 검색 가능한 지식 단위로 변환합니다.',
				en: 'I rebuilt a one-size-fits-all document flow into per-type routing for PDF, DOCX, PPT/PPTX, Excel, and text. Table- and image-heavy documents go through a document parser for layout analysis, and page/slide/sheet-level sources are preserved as searchable knowledge units.'
			},
			org: { ko: 'ERP 내 AI 에이전트 · 영림원', en: 'AI Agent in ERP · Younglimwon' },
			company: 'younglimwon',
			category: ['ai', 'backend'],
			role: { ko: 'Backend · AI/RAG', en: 'Backend · AI/RAG' },
			period: '2025.11 ~ 2026.02',
			stack: ['LangChain', 'Document parser', 'Embeddings', 'Vector DB'],
			impact: {
				ko: [
					'문서 유형과 사용 목적에 따라 전처리 경로를 분리하는 RAG 문서 처리 구조 설계',
				],
				en: [
					'Designed a RAG document-processing structure that separates preprocessing paths by document type and usage context',
				]
			},
			highlights: {
				ko: ['문서 유형별 파싱·청킹 전략 라우팅', 'document parser 기반 레이아웃·표·도형 분석', '페이지를 넘나드는 표 병합'],
				en: ['Per-type parsing/chunking strategy routing', 'Document-parser-based layout/table/figure analysis', 'Cross-page table merging']
			},
			caseStudy: {
				ko: '단일 처리 방식에서는 PDF 페이지 정보가 사라지고, 슬라이드가 일반 텍스트처럼 뭉개지고, 여러 페이지에 걸친 표가 끊겨 검색 품질이 떨어졌습니다. 그래서 전처리를 "문서 특성별 전략 선택" 구조로 재설계하고, 표·이미지 문서는 document parser로 구조 정보를 받아 제목 기반 의미 청킹과 표 병합을 적용했습니다. 그 결과 표·슬라이드·페이지 문서가 검색에서 자연스럽게 활용되고, 새 문서 유형은 기존 업로드 흐름을 건드리지 않고 전략만 추가하면 되는 확장 구조를 갖췄습니다.',
				en: 'A single flow lost PDF page context, flattened slides into plain text, and split multi-page tables, hurting retrieval. I redesigned preprocessing around per-characteristic strategy selection, sending table/image documents through a document parser for structural data, then applying heading-based semantic chunking and table merging. Tables, slides, and page-based documents became usable in retrieval, and new document types can now be added as a strategy without touching the upload flow.'
			},
			featured: true
		},
		{
			slug: 'kbot-citation-viewer',
			title: {
				ko: 'ERP 내 AI 에이전트 RAG 메타데이터 기반 문서 출처 추적',
				en: 'AI Agent in ERP Metadata-Based Document Source Tracking'
			},
			tagline: {
				ko: 'LLM 답변의 인라인 출처 표기를 청크 메타데이터와 매칭해 실제 문서 근거까지 추적하는 end-to-end 그라운딩 시스템',
				en: 'An end-to-end grounding system that traces inline LLM citations back to chunk metadata and the exact source'
			},
			description: {
				ko: '문서 업로드부터 Vector DB 저장, RAG 검색·리랭킹, LLM 응답까지 이어지는 출처 추적 구조를 구현했습니다. 청크마다 파일·페이지·시트·행 메타데이터를 부여하고, LLM이 생성한 인라인 출처 표기를 출처 메타데이터와 정규화 매칭해 답변의 근거를 실제 문서 위치까지 연결했습니다.',
				en: 'I built source tracking that spans upload, Vector DB storage, RAG retrieval and reranking, and the LLM response. Each chunk carries file/page/sheet/row metadata, and inline LLM citations are normalized and matched to that metadata so every answer is grounded to its exact source location.'
			},
			org: { ko: 'ERP 내 AI 에이전트 · 영림원', en: 'AI Agent in ERP · Younglimwon' },
			company: 'younglimwon',
			category: ['backend', 'frontend'],
			role: { ko: 'AI/RAG · Backend', en: 'AI/RAG · Backend' },
			period: '2025.12 ~ 2026.01',
			stack: ['RAG', 'Metadata design', 'Svelte'],
			impact: {
				ko: [
					'RAG 답변의 근거를 실제 문서 위치(페이지·슬라이드·행)와 연결해 검증 가능한 답변으로 개선',
					'검색 후보 전체가 아닌 답변에 실제 인용된 출처만 추출·노출해 출처 정확도 향상'
				],
				en: [
					'Linked answer evidence to exact document locations (page/slide/row), making answers verifiable',
					'Extracted and surfaced only the sources actually cited in the answer, improving citation accuracy'
				]
			},
			highlights: {
				ko: ['청크별 출처 메타데이터 설계', '출처 표기↔메타데이터 정규화·보완 매칭', '답변에 인용된 출처만 추출'],
				en: ['Per-chunk source metadata design', 'Normalized + fallback citation↔metadata matching', 'Extracting only cited sources']
			},
			caseStudy: {
				ko: 'ERP 내 AI 에이전트에서는 답변 내용보다 근거 검증이 더 중요한 경우가 많은데, 기존에는 실제 답변에 안 쓰인 문서까지 출처로 섞이고 정확한 위치를 확인하기 어려웠습니다. 그래서 백엔드에서 청크마다 파일·페이지·시트·행 메타데이터를 부여하고 검색·리랭킹 이후에도 본문·점수·출처가 분리되지 않게 유지했습니다. 프론트엔드에서는 LLM이 다소 다른 형식으로 출처 표기를 생성해도 정규화·보완 매칭으로 실제 출처와 안정적으로 연결하고, 답변에 인용된 출처만 추려 PDF 페이지 이동·Excel 행 하이라이트·텍스트 대체 표시로 확인하도록 했습니다.',
				en: 'For an AI agent in ERP, verifying evidence often matters more than the answer text, yet uncited documents leaked into the source list and exact locations were hard to find. On the backend I attached file/page/sheet/row metadata to each chunk and kept text, score, and source together through retrieval and reranking. On the frontend, normalization and fallback matching reliably link slightly varied LLM citations to real sources, showing only cited evidence via PDF page jumps, Excel row highlighting, and text fallback.'
			},
			featured: true
		},
		{
			slug: 'kbot-vector-db-migration',
			title: {
				ko: 'ERP 내 AI 에이전트 Vector DB 구조 설계 및 임베딩 마이그레이션',
				en: 'AI Agent in ERP Vector DB Structure Design & Embedding Migration'
			},
			tagline: {
				ko: 'partition key 멀티테넌트 구조와, 서비스를 멈추지 않는 임베딩 모델 교체 체계',
				en: 'A partition-key multi-tenant design and an embedding-model swap that never stops the service'
			},
			description: {
				ko: 'Vector DB 컬렉션·파티션 개수 한계를 partition key 기반 멀티테넌트 구조로 해결하고, 임베딩 모델 변경을 "준비→실행→검증→적용" 단계로 나눠 운영 중에도 안전하게 전환하는 마이그레이션 체계를 구현했습니다.',
				en: 'I solved Vector DB collection/partition limits with a partition-key multi-tenant structure, and built an embedding-model migration split into prepare → run → verify → apply so models can be swapped safely while the service is live.'
			},
			org: { ko: 'ERP 내 AI 에이전트 · 영림원', en: 'AI Agent in ERP · Younglimwon' },
			company: 'younglimwon',
			category: ['backend', 'ai'],
			role: { ko: 'Backend · Database', en: 'Backend · Database' },
			period: '2025.11 ~ 2026.04',
			stack: ['Python', 'Vector DB', 'Embeddings', 'WebSocket'],
			impact: {
				ko: [
					'컬렉션/파티션이 고객·파일 수에 비례해 증가하던 구조를 모델·차원 단위 공용 컬렉션으로 전환해 물리 리소스 증가를 차단',
					'서비스 중단 없이 임베딩 모델을 교체하는 마이그레이션 플로우 구축'
				],
				en: [
					'Replaced per-customer/per-file collection growth with model/dimension-based shared collections, capping physical resource growth',
					'Built a migration flow that swaps embedding models with zero service downtime'
				]
			},
			highlights: {
				ko: ['partition key 기반 멀티테넌트 격리', '신규 모델 검증 후 재임베딩', '백그라운드 배치 + 실시간 진행률 UI'],
				en: ['Partition-key multi-tenant isolation', 'Re-embedding after new-model validation', 'Background batches + live progress UI']
			},
			caseStudy: {
				ko: '파일·고객 단위로 컬렉션과 파티션이 계속 늘어나면 Vector DB의 개수 한계에 부딪히고, 임베딩 모델을 바꾸면 기존 벡터 공간과 차원이 달라 검색이 깨집니다. 그래서 저장 구조를 모델·차원 단위 공용 컬렉션 + partition key 격리로 바꾸고, 모델 교체를 단순 설정 변경이 아니라 신규 컬렉션 생성 → 전체 재임베딩 → 검증 → 적용으로 이어지는 데이터 이전 과정으로 다뤘습니다. 장시간 작업을 고려해 동시 실행 방지, 중단·재개, 실패 재시도, 삭제 문서 정합성, 최종 적용 게이트를 두어 운영자가 위험을 통제하며 전환할 수 있게 했습니다.',
				en: 'Growing collections and partitions per file/customer hits Vector DB limits, and changing the embedding model breaks search because vector space and dimensions differ. I moved storage to model/dimension-based shared collections with partition-key isolation, and treated model swaps as a data migration — new collection, full re-embedding, verification, then apply — rather than a config toggle. For long-running jobs I added concurrency locks, pause/resume, retry, deleted-document consistency, and a final apply gate so operators can switch while controlling risk.'
			},
			featured: true
		},
		{
			slug: 'external-knowledge-ingestion',
			title: {
				ko: 'Azure 기반 외부 지식 자동 수집 파이프라인',
				en: 'Azure-Based External Knowledge Ingestion Pipeline'
			},
			tagline: {
				ko: '사내 서비스 포탈과 SharePoint의 문서를 사람 개입 없이 RAG 지식베이스로 자동 지식화하는 이벤트 기반 백엔드',
				en: 'An event-driven backend that turns documents from internal service portals and SharePoint into RAG knowledge with no manual work'
			},
			description: {
				ko: '사내 서비스 포탈과 SharePoint에 흩어진 문서를 RAG 지식으로 모으기 위해, Azure Logic Apps → Blob Storage → App Service API로 이어지는 이벤트 기반 인제스트 파이프라인을 구성했습니다. 각 소스의 문서 변경 이벤트를 Logic Apps가 받아 Azure App Service에 배포한 임베딩·인제스트 API를 호출하고, 유형별 파싱·청킹·임베딩을 거쳐 Vector DB에 반영하며, 기존 인덱스는 신규 처리 성공 이후에만 교체하는 안전 교체 인덱싱으로 데이터 유실을 막았습니다.',
				en: 'To consolidate documents scattered across internal service portals and SharePoint into RAG knowledge, I built an event-driven ingest pipeline: Azure Logic Apps → Blob Storage → an App Service API. Logic Apps catches change events from each source and calls the embedding/ingest API deployed on Azure App Service, which runs per-type parsing/chunking/embedding into a Vector DB and uses safe-replace indexing — swapping the old index only after the new one succeeds — to prevent data loss.'
			},
			org: { ko: 'ERP 내 AI 에이전트 · 영림원', en: 'AI Agent in ERP · Younglimwon' },
			company: 'younglimwon',
			category: ['infra', 'backend'],
			role: { ko: 'Backend · Cloud Infra', en: 'Backend · Cloud Infra' },
			period: '2026.04 ~',
			stack: ['Azure Logic Apps', 'Blob Storage', 'Azure App Service', 'OpenAI', 'Vector DB'],
			impact: {
				ko: [
					'사내 서비스 포탈·SharePoint의 문서 변경을 사람 개입 없이 RAG 지식베이스에 자동 반영',
					'안전 교체 인덱싱과 재시도·오류 처리로 재인덱싱 중 데이터 유실·장애 전파를 차단'
				],
				en: [
					'Auto-reflects document changes from internal service portals and SharePoint into the RAG knowledge base with no manual work',
					'Prevented data loss and failure propagation during reindexing with safe-replace indexing and retry/error handling'
				]
			},
			highlights: {
				ko: ['Logic Apps 이벤트 기반 자동 수집', 'App Service 배포 임베딩 API', '안전 교체 인덱싱'],
				en: ['Logic Apps event-driven ingestion', 'App Service-hosted embedding API', 'Safe-replace indexing']
			},
			caseStudy: {
				ko: '사내 서비스 포탈과 SharePoint에 흩어진 문서를 RAG에 쓰려면 매번 사람이 내려받고 추출·청킹·임베딩해야 했고, 문서가 수정될 때 기존 벡터를 안전하게 교체하지 않으면 옛 내용과 새 내용이 섞였습니다. 그래서 무거운 파싱·임베딩·저장 처리를 Azure App Service에 API로 배포하고, 각 소스의 변경을 감지한 Logic Apps가 Blob을 거쳐 이 API를 호출하도록 구성해 수집을 자동화했습니다. 문서 유형별 라우팅, 토큰 한도 재검증, 외부 의존성(document parser/OpenAI/Vector DB) 오류의 도메인 분류, 기존 인덱스를 신규 처리 성공 후에만 교체하는 전략으로 운영 중에도 안전하게 지식을 확장할 수 있게 했습니다.',
				en: 'Using documents scattered across internal service portals and SharePoint in RAG previously meant manually downloading, extracting, chunking, and embedding each time, and edits mixed old and new content unless vectors were safely replaced. So I deployed the heavy parsing, embedding, and storage work as an API on Azure App Service, and had Logic Apps — triggered by changes from each source — call it through Blob to automate ingestion. With per-type routing, token-limit re-validation, domain classification of external-dependency errors (document parser/OpenAI/Vector DB), and replacing the index only after new processing succeeds, knowledge expands safely while the service runs.'
			},
			featured: false
		},
		{
			slug: 'workspace-mcp-server',
			title: {
				ko: 'AI 에이전트 업무 자동화 MCP 서버 (Google Workspace · Microsoft 365)',
				en: 'LLM Agent Workflow MCP Server (Google Workspace · Microsoft 365)'
			},
			tagline: {
				ko: 'AI 에이전트가 자연어 명령만으로 두 생태계의 업무를 수행하도록, 13개 서비스를 약 100개의 AI 도구로 통합한 MCP 서버',
				en: 'An MCP server that unifies 13 services into ~100 AI tools so an AI agent can run cross-ecosystem work from natural language alone'
			},
			description: {
				ko: 'AI 에이전트가 별도의 API 지식 없이 자연어 명령만으로 Google Workspace와 Microsoft 365 업무를 수행하도록 하는 MCP(Model Context Protocol) 서버를 개발했습니다. Gmail·Drive·Calendar·Teams·Outlook·OneDrive·SharePoint 등 두 생태계 13개 서비스를 약 100개의 AI 도구로 통합하고, 사용자 식별부터 토큰 조회·갱신, 권한 검증, 실제 API 호출까지의 복잡성을 서버가 흡수하도록 설계했습니다. 인증·세션·토큰 갱신 같은 횡단 관심사는 데코레이터로 분리해, 새 도구는 비즈니스 로직만 작성하면 추가되도록 표준화했습니다.',
				en: 'I built an MCP (Model Context Protocol) server that lets an AI agent perform Google Workspace and Microsoft 365 tasks from natural-language commands alone, without any API knowledge. It integrates 13 services across both ecosystems — Gmail, Drive, Calendar, Teams, Outlook, OneDrive, SharePoint, and more — into ~100 AI tools, with the server absorbing everything from user identification to token lookup/refresh, permission checks, and the actual API calls. Cross-cutting concerns such as auth, session, and token refresh are separated via decorators, so a new tool only needs its business logic.'
			},
			org: { ko: 'MCP · 영림원', en: 'MCP · Younglimwon' },
			company: 'younglimwon',
			category: ['ai', 'backend'],
			role: { ko: 'Backend · AI/Agent', en: 'Backend · AI/Agent' },
			period: '2025.03 ~ 2025.07',
			stack: ['Python', 'FastMCP / MCP', 'OAuth 2.0 / 2.1', 'Google Workspace API', 'Microsoft Graph API', 'Docker'],
			impact: {
				ko: [
					'두 생태계 13개 서비스를 약 100개의 AI 도구로 통합(Google 약 60개 · Microsoft 약 40개)',
					'세션–사용자 immutable 바인딩 기반 다중 사용자 격리를 설계해 세션 탈취·교차 계정 접근을 차단',
					'인증·세션·토큰 갱신을 데코레이터로 분리해, 신규 도구를 비즈니스 로직만으로 추가하도록 표준화'
				],
				en: [
					'Integrated 13 services across two ecosystems into ~100 AI tools (~60 Google, ~40 Microsoft)',
					'Designed multi-user isolation on immutable session–user binding, blocking session hijacking and cross-account access',
					'Separated auth/session/token-refresh via decorators so new tools are added with business logic only'
				]
			},
			highlights: {
				ko: ['데코레이터 기반 인증/기능 레이어 분리', '자가 복구형 OAuth 인증 흐름', '세션–사용자 immutable 바인딩 격리', '활성 도구 기반 동적 최소 권한 스코프'],
				en: ['Decorator-based auth/feature separation', 'Self-recovering OAuth auth flow', 'Immutable session–user binding isolation', 'Dynamic least-privilege scopes per active tool']
			},
			caseStudy: {
				ko: 'AI 에이전트가 실제 업무를 수행하려면 서비스마다 다른 API, OAuth 인증, 토큰 갱신, 다중 사용자 권한을 모두 다뤄야 하는데, 이 복잡성을 에이전트에 그대로 노출하면 도구가 늘수록 유지보수가 어려워집니다. 그래서 인증·세션·토큰 갱신·캐싱 같은 횡단 관심사를 데코레이터 계층으로 분리해, 기능 도구는 인증을 전혀 모른 채 주입받은 인증 클라이언트만 사용하도록 설계했습니다. 미인증 시에는 단순 에러 대신 인증 URL을 반환해 에이전트가 스스로 복구하도록 만들고, mcp_session_id–사용자 immutable 바인딩과 활성 도구 기준 동적 스코프 산출로 다중 사용자 환경의 교차 계정 접근과 과도한 권한 요청을 차단했습니다. 그 결과 두 생태계 13개 서비스를 약 100개 도구로 통합하면서도, 새 도구는 비즈니스 로직만 작성하면 동일한 인증·보안 보장을 그대로 적용받는 확장 구조를 갖췄습니다.',
				en: 'For an AI agent to do real work, every service brings a different API, OAuth flow, token refresh, and multi-user permissions — and exposing that complexity to the agent makes maintenance harder as tools grow. So I separated cross-cutting concerns (auth, session, token refresh, caching) into a decorator layer, letting feature tools stay unaware of auth and use only an injected, authenticated client. On failure, the server returns an auth URL instead of a plain error so the agent can self-recover, and immutable mcp_session_id–user binding plus dynamic per-active-tool scopes block cross-account access and over-broad permissions in multi-user settings. The result integrates 13 services into ~100 tools while keeping an extensible structure where new tools inherit the same auth and security guarantees by writing business logic alone.'
			},
			featured: false
		},
		{
			slug: 'ls-scr-crack-prediction',
			title: {
				ko: 'LS전선 SCR 공정 단선 크랙 원인 분석 및 예측 모델',
				en: 'LS Cable SCR Process Crack-Cause Analysis & Prediction Model'
			},
			tagline: {
				ko: '주조속도 이상 구간을 걸러내고 공정 데이터를 분석해 단선 크랙의 원인과 제어 조건을 도출한 데이터 분석 프로젝트',
				en: 'A data analysis project that filtered out abnormal casting-speed segments and analyzed process data to find the causes and control conditions behind wire-breakage cracks'
			},
			description: {
				ko: 'LS전선 SCR(연속 주조·압연) 공정에서 발생하는 단선 크랙의 영향인자와 공정조건 데이터 레디니스를 진단하는 프로젝트에 데이터 처리·분석 담당으로 참여했습니다(기여도 30%). 공정 데이터를 정제·분석해 크랙 발생 원인과 패턴을 규명하고, baseline 예측 모델로 제조 시스템 개선안을 제안했습니다.',
				en: 'I joined an LS Cable project diagnosing data readiness for SCR (continuous casting & rolling) wire-breakage factors and process conditions, owning data processing and analysis (30% contribution). I cleaned and analyzed process data to identify the causes and patterns behind cracks, and proposed manufacturing improvements with a baseline prediction model.'
			},
			org: { ko: 'SCR 공정 진단 · LS ITC', en: 'SCR Diagnosis · LS ITC' },
			company: 'ls-itc',
			category: ['ai'],
			role: { ko: '데이터 분석 인턴', en: 'Data Analysis Intern' },
			period: '2023.11 ~ 2024.02',
			stack: ['Python', 'Pandas', 'Data Analysis', 'ML Modeling'],
			impact: {
				ko: [
					'주조속도 이상 구간 필터링 알고리즘으로 분석 데이터의 신뢰도 확보',
					'크랙 발생 확률 baseline 모델로 제조 공정 개선 방향 제시'
				],
				en: [
					'Improved analysis data reliability with a casting-speed anomaly filtering algorithm',
					'Proposed manufacturing process improvements with a crack-probability baseline model'
				]
			},
			highlights: {
				ko: ['주조속도 이상 공정 필터링 알고리즘 개발', '크랙 발생 원인·공정 패턴 분석 → 최적 제어 조건 도출', '크랙 발생 확률 baseline 모델 구축'],
				en: ['Built a casting-speed anomaly process-filtering algorithm', 'Analyzed crack causes/process patterns to derive optimal control conditions', 'Built a crack-probability baseline model']
			},
			caseStudy: {
				ko: 'SCR 공정에서 발생하는 단선 크랙은 여러 공정 변수가 얽혀 있어 원인을 특정하기 어려웠고, 원본 공정 데이터에는 주조속도 이상 등 정상 조업 범위를 벗어난 구간이 섞여 있어 그대로 분석하면 원인 규명 결과가 왜곡될 위험이 있었습니다. 그래서 먼저 주조속도 이상 구간을 걸러내는 필터링 알고리즘을 만들어 분석 대상 데이터의 신뢰도를 확보하고, 이후 정제된 데이터로 공정 변수와 크랙 발생 이력을 교차 분석해 크랙과 상관관계가 높은 패턴과 제어 조건을 도출했습니다. 도출한 패턴을 바탕으로 크랙 발생 확률을 추정하는 baseline 예측 모델을 구축해, 제조팀이 검토할 수 있는 공정 개선 방향을 제안했습니다.',
				en: 'Wire-breakage cracks in the SCR process were hard to attribute to a single cause because multiple process variables were entangled, and the raw process data contained segments where casting speed deviated from normal operation — analyzing it as-is risked distorting the root-cause findings. I first built a filtering algorithm to remove casting-speed anomaly segments, securing the reliability of the analysis dataset, then cross-analyzed process variables against crack occurrence history on the cleaned data to identify patterns and control conditions strongly correlated with cracks. Based on these patterns, I built a baseline model estimating crack probability, proposing process-improvement directions for the manufacturing team to review.'
			},
			featured: false
		}
	] satisfies Project[]
} as const;
