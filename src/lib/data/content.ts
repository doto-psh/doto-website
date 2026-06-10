import type {
	PortfolioData,
	Project,
	ProjectCategory,
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
				ko: '데이터에서 AI 프로덕트까지 만드는 개발자',
				en: 'Engineer building from data to AI products'
			},
			tagline: {
				ko: '실제 서비스되는 AI 프로덕트를 만들며, 데이터와 백엔드, AI를 잇는 개발자입니다.',
				en: 'I build AI products that ship, connecting data, backend, and AI.'
			},
			bio: {
				ko: '데이터 분석으로 개발을 시작해, 지금은 영림원소프트랩에서 실제 서비스되는 AI 프로덕트 K-Bot을 개발하고 있습니다. Python·FastAPI 기반의 백엔드와 Milvus/Zilliz·임베딩을 활용한 RAG 검색, Azure 기반 데이터 파이프라인을 주로 다루며, 필요할 때는 Svelte·TypeScript로 프론트엔드까지 직접 구현합니다.\n\n기능 하나를 맡으면 문제 재현부터 설계, 구현, 배포까지 끝까지 책임지는 방식을 선호합니다. 문제를 명확히 재현하고, 상태와 경계를 분리하며, 작업 과정을 기록으로 남겨 다시 활용 가능한 형태로 정리합니다.\n\n특정 기술에 머무르기보다 데이터, 백엔드, AI를 연결해 실제 문제를 해결하는 개발자로 성장하고 있습니다. 기술을 단순한 구현 수단이 아니라, 동료와 비즈니스가 겪는 문제를 더 명확하게 해결하기 위한 도구로 다루고자 합니다.',
				en: 'I started out in data analysis and now build K-Bot, a production AI product, at Younglimwon Soft Lab. I work mainly on Python/FastAPI backends, RAG retrieval with Milvus/Zilliz and embeddings, and Azure-based data pipelines — and when needed I build the frontend myself with Svelte and TypeScript.\n\nWhen I take on a feature, I see it through end to end — reproducing the problem, designing, implementing, and shipping. I reproduce issues precisely, separate state from boundaries, and document the process so it can be reused.\n\nRather than staying within a single technology, I am growing into an engineer who connects data, backend, and AI to solve real problems. I want to treat technology not as a mere means of implementation, but as a tool to resolve the problems my teammates and the business face more clearly.'
			},
			location: { ko: 'Seoul, Korea', en: 'Seoul, Korea' },
			photoUrl: mascotImages.profile,
				// TODO: replace with a real photo; using a placeholder avatar for now.
				realPhotoUrl: '/profile.svg',
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
					{ name: 'Prompt Engineering', level: 'working' }
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
					{ name: 'Milvus / Zilliz', level: 'core' },
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
				title: { ko: 'AI 개발 · RAG 프로덕트(K-Bot)', en: 'AI Engineer · RAG Product (K-Bot)' },
				organization: { ko: '영림원소프트랩 · AIWG', en: 'Younglimwon Soft Lab · AIWG' },
				period: { ko: '2024.08 ~ 재직중 (사원)', en: 'Aug 2024 ~ Present (Employee)' },
				description: {
					ko: '영림원소프트랩 AI ERP에 탑재된 업무용 AI 챗봇 K-Bot의 백엔드를 개발하며, 문서 전처리부터 Vector DB 구조 및 메타데이터 설계, RAG 답변 출처 추적까지 RAG 파이프라인 전반을 구현했습니다.',
					en: 'Developed the backend of K-Bot, the in-product AI assistant in Younglimwon Soft Lab\'s AI ERP, building the full RAG pipeline from document preprocessing to Vector DB structure and metadata design and RAG answer source tracking.'
				},
				highlights: {
					ko: ['문서 유형별 파싱 및 청킹 전략 설계/구현', 'Vector DB 구조 및 메타데이터 설계', 'RAG 후 메타데이터 활용한 문서 출처 추적', 'Azure 활용한 외부 지식 자동 수집 파이프라인 구축'],
					en: ['Per-type parsing & chunking strategy', 'Vector DB structure & metadata design', 'Metadata-based source tracking after RAG', 'Azure-based external knowledge ingestion pipeline']
				},
				stack: ['Python', 'FastAPI', 'Milvus/Zilliz', 'Azure', 'RAG']
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

	projects: [
		{
			slug: 'kbot-document-analysis',
			title: {
				ko: 'K-Bot 문서 유형별 파싱·청킹 파이프라인',
				en: 'K-Bot Per-Type Parsing & Chunking Pipeline'
			},
			tagline: {
				ko: '문서 유형별로 파싱·청킹·임베딩 전략을 분리해 RAG 검색 품질을 끌어올린 전처리 시스템',
				en: 'A preprocessing system that lifts RAG quality by routing parsing, chunking, and embedding per document type'
			},
			description: {
				ko: '모든 문서를 동일하게 처리하던 구조에서 벗어나, PDF·DOCX·PPT/PPTX·Excel·텍스트를 각 구조에 맞는 경로로 처리하도록 재설계했습니다. 표·이미지 문서는 Upstage Document Parse로 레이아웃을 분석하고, 페이지·슬라이드·시트 단위 출처를 보존해 검색 가능한 지식 단위로 변환합니다.',
				en: 'I rebuilt a one-size-fits-all document flow into per-type routing for PDF, DOCX, PPT/PPTX, Excel, and text. Table- and image-heavy documents go through Upstage Document Parse for layout analysis, and page/slide/sheet-level sources are preserved as searchable knowledge units.'
			},
			org: { ko: 'K-Bot · 영림원', en: 'K-Bot · Younglimwon' },
			category: ['ai', 'backend'],
			role: { ko: 'Backend · AI/RAG', en: 'Backend · AI/RAG' },
			period: '2025.11 ~ 2026.02',
			stack: ['LangChain', 'Document parser', 'Embeddings', 'Milvus/Zilliz'],
			impact: {
				ko: [
					'PDF·DOCX·PPT·Excel·텍스트 5종 이상 문서 포맷을 단일 검색 단위로 통합 처리'
				],
				en: [
					'Unified 5+ document formats (PDF, DOCX, PPT, Excel, text) into a single retrieval unit'
				]
			},
			highlights: {
				ko: ['문서 유형별 parser/chunker 라우팅', 'Upstage 레이아웃·표·도형 분석 연동', '페이지 넘나드는 table 병합'],
				en: ['Per-type parser/chunker routing', 'Upstage layout/table/figure analysis', 'Cross-page table merging']
			},
			caseStudy: {
				ko: '단일 처리 방식에서는 PDF 페이지 정보가 사라지고, 슬라이드가 일반 텍스트처럼 뭉개지고, 여러 페이지에 걸친 표가 끊겨 검색 품질이 떨어졌습니다. 그래서 전처리를 "문서 특성별 전략 선택" 구조로 재설계하고, 표·이미지 문서는 Upstage로 구조 정보를 받아 heading 기반 의미 청킹과 table 병합을 적용했습니다. 그 결과 표·슬라이드·페이지 문서가 검색에서 자연스럽게 활용되고, 새 문서 유형은 기존 업로드 흐름을 건드리지 않고 전략만 추가하면 되는 확장 구조를 갖췄습니다.',
				en: 'A single flow lost PDF page context, flattened slides into plain text, and split multi-page tables, hurting retrieval. I redesigned preprocessing around per-characteristic strategy selection, sending table/image documents through Upstage for structural data, then applying heading-based semantic chunking and table merging. Tables, slides, and page-based documents became usable in retrieval, and new document types can now be added as a strategy without touching the upload flow.'
			},
			featured: true
		},
		{
			slug: 'kbot-citation-viewer',
			title: {
				ko: 'K-Bot RAG 메타데이터 기반 문서 출처 추적',
				en: 'K-Bot Metadata-Based Document Source Tracking'
			},
			tagline: {
				ko: 'LLM 답변의 인라인 citation을 청크 metadata와 매칭해 실제 문서 근거까지 추적하는 end-to-end 그라운딩 시스템',
				en: 'An end-to-end grounding system that traces inline LLM citations back to chunk metadata and the exact source'
			},
			description: {
				ko: '문서 업로드부터 Vector DB 저장, RAG 검색·리랭킹, LLM 응답까지 이어지는 출처 추적 구조를 구현했습니다. 청크마다 파일·페이지·시트·행 metadata를 부여하고, LLM이 생성한 인라인 citation을 source metadata와 정규화 매칭해 답변의 근거를 실제 문서 위치까지 연결했습니다.',
				en: 'I built source tracking that spans upload, Vector DB storage, RAG retrieval and reranking, and the LLM response. Each chunk carries file/page/sheet/row metadata, and inline LLM citations are normalized and matched to that metadata so every answer is grounded to its exact source location.'
			},
			org: { ko: 'K-Bot · 영림원', en: 'K-Bot · Younglimwon' },
			category: ['ai', 'frontend'],
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
				ko: ['청크별 출처 metadata 설계', 'citation↔metadata 정규화·fallback 매칭', '답변에 인용된 출처만 추출'],
				en: ['Per-chunk source metadata design', 'Normalized + fallback citation↔metadata matching', 'Extracting only cited sources']
			},
			caseStudy: {
				ko: '업무용 챗봇에서는 답변 내용보다 근거 검증이 더 중요한 경우가 많은데, 기존에는 실제 답변에 안 쓰인 문서까지 출처로 섞이고 정확한 위치를 확인하기 어려웠습니다. 그래서 백엔드에서 청크마다 파일·페이지·시트·행 metadata를 부여하고 검색·리랭킹 이후에도 본문·점수·출처가 분리되지 않게 유지했습니다. 프론트엔드에서는 LLM이 다소 다른 형식으로 citation을 생성해도 정규화·fallback 매칭으로 실제 source와 안정적으로 연결하고, 답변에 인용된 출처만 추려 PDF 페이지 이동·Excel 행 하이라이트·텍스트 fallback으로 확인하도록 했습니다.',
				en: 'In business chatbots, verifying evidence often matters more than the answer text, yet uncited documents leaked into the source list and exact locations were hard to find. On the backend I attached file/page/sheet/row metadata to each chunk and kept text, score, and source together through retrieval and reranking. On the frontend, normalization and fallback matching reliably link slightly varied LLM citations to real sources, showing only cited evidence via PDF page jumps, Excel row highlighting, and text fallback.'
			},
			featured: true
		},
		{
			slug: 'kbot-vector-db-migration',
			title: {
				ko: 'K-Bot Vector DB 구조 설계 및 임베딩 마이그레이션',
				en: 'K-Bot Vector DB Structure Design & Embedding Migration'
			},
			tagline: {
				ko: 'partition key 멀티테넌트 구조와, 서비스를 멈추지 않는 임베딩 모델 교체 체계',
				en: 'A partition-key multi-tenant design and an embedding-model swap that never stops the service'
			},
			description: {
				ko: 'Milvus/Zilliz 컬렉션·파티션 개수 한계를 partition key 기반 멀티테넌트 구조로 해결하고, 임베딩 모델 변경을 "준비→실행→검증→적용" 단계로 나눠 운영 중에도 안전하게 전환하는 마이그레이션 체계를 구현했습니다.',
				en: 'I solved Milvus/Zilliz collection/partition limits with a partition-key multi-tenant structure, and built an embedding-model migration split into prepare → run → verify → apply so models can be swapped safely while the service is live.'
			},
			org: { ko: 'K-Bot · 영림원', en: 'K-Bot · Younglimwon' },
			category: ['backend', 'ai'],
			role: { ko: 'Backend · Database', en: 'Backend · Database' },
			period: '2025.06 ~ 2026.06',
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
				ko: '파일·고객 단위로 컬렉션과 파티션이 계속 늘어나면 Milvus의 개수 한계에 부딪히고, 임베딩 모델을 바꾸면 기존 벡터 공간과 차원이 달라 검색이 깨집니다. 그래서 저장 구조를 모델·차원 단위 공용 컬렉션 + partition key 격리로 바꾸고, 모델 교체를 단순 설정 변경이 아니라 신규 컬렉션 생성 → 전체 재임베딩 → 검증 → 적용으로 이어지는 데이터 이전 과정으로 다뤘습니다. 장시간 작업을 고려해 동시 실행 방지, 중단·재개, 실패 재시도, 삭제 문서 정합성, 최종 적용 게이트를 두어 운영자가 위험을 통제하며 전환할 수 있게 했습니다.',
				en: 'Growing collections and partitions per file/customer hits Milvus limits, and changing the embedding model breaks search because vector space and dimensions differ. I moved storage to model/dimension-based shared collections with partition-key isolation, and treated model swaps as a data migration — new collection, full re-embedding, verification, then apply — rather than a config toggle. For long-running jobs I added concurrency locks, pause/resume, retry, deleted-document consistency, and a final apply gate so operators can switch while controlling risk.'
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
				ko: '사내 서비스 포탈과 SharePoint에 흩어진 문서를 RAG 지식으로 모으기 위해, Azure Logic Apps → Blob Storage → App Service API로 이어지는 이벤트 기반 인제스트 파이프라인을 구성했습니다. 각 소스의 문서 변경 이벤트를 Logic Apps가 받아 Azure App Service에 배포한 임베딩·인제스트 API를 호출하고, 유형별 파싱·청킹·임베딩을 거쳐 Milvus/Zilliz에 반영하며, 기존 색인은 신규 처리 성공 이후에만 교체하는 safe replace 방식으로 데이터 유실을 막았습니다.',
				en: 'To consolidate documents scattered across internal service portals and SharePoint into RAG knowledge, I built an event-driven ingest pipeline: Azure Logic Apps → Blob Storage → an App Service API. Logic Apps catches change events from each source and calls the embedding/ingest API deployed on Azure App Service, which runs per-type parsing/chunking/embedding into Milvus/Zilliz and uses safe-replace indexing — swapping the old index only after the new one succeeds — to prevent data loss.'
			},
			org: { ko: 'K-Bot · 영림원', en: 'K-Bot · Younglimwon' },
			category: ['infra', 'backend'],
			role: { ko: 'Backend · Cloud Infra', en: 'Backend · Cloud Infra' },
			period: '2026.04 ~',
			stack: ['Azure Logic Apps', 'Blob Storage', 'Azure App Service', 'OpenAI', 'Milvus/Zilliz'],
			impact: {
				ko: [
					'사내 서비스 포탈·SharePoint의 문서 변경을 사람 개입 없이 RAG 지식베이스에 자동 반영',
					'safe replace indexing과 재시도·오류 처리로 재색인 중 데이터 유실·장애 전파를 차단'
				],
				en: [
					'Auto-reflects document changes from internal service portals and SharePoint into the RAG knowledge base with no manual work',
					'Prevented data loss and failure propagation during reindexing with safe-replace indexing and retry/error handling'
				]
			},
			highlights: {
				ko: ['Logic Apps 이벤트 기반 자동 수집', 'App Service 배포 임베딩 API', 'safe replace indexing'],
				en: ['Logic Apps event-driven ingestion', 'App Service-hosted embedding API', 'Safe-replace indexing']
			},
			caseStudy: {
				ko: '사내 서비스 포탈과 SharePoint에 흩어진 문서를 RAG에 쓰려면 매번 사람이 내려받고 추출·청킹·임베딩해야 했고, 문서가 수정될 때 기존 벡터를 안전하게 교체하지 않으면 옛 내용과 새 내용이 섞였습니다. 그래서 무거운 파싱·임베딩·저장 처리를 Azure App Service에 API로 배포하고, 각 소스의 변경을 감지한 Logic Apps가 Blob을 거쳐 이 API를 호출하도록 구성해 수집을 자동화했습니다. 문서 유형별 라우팅, token 한도 재검증, 외부 의존성(Upstage/OpenAI/Milvus) 오류의 도메인 분류, 기존 색인을 신규 처리 성공 후에만 교체하는 전략으로 운영 중에도 안전하게 지식을 확장할 수 있게 했습니다.',
				en: 'Using documents scattered across internal service portals and SharePoint in RAG previously meant manually downloading, extracting, chunking, and embedding each time, and edits mixed old and new content unless vectors were safely replaced. So I deployed the heavy parsing, embedding, and storage work as an API on Azure App Service, and had Logic Apps — triggered by changes from each source — call it through Blob to automate ingestion. With per-type routing, token-limit re-validation, domain classification of external-dependency errors (Upstage/OpenAI/Milvus), and replacing the index only after new processing succeeds, knowledge expands safely while the service runs.'
			},
			featured: false
		}
	] satisfies Project[]
} as const;
