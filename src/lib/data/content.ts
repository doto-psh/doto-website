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
	email: 'shaprk5612@naver.com',
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
			{ label: 'GitHub', href: contactLinks.github },
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
				ko: 'RAG·LLM 프로덕트를 전처리부터 서빙까지 다루는 AI 백엔드 개발자',
				en: 'AI backend engineer building RAG·LLM products from preprocessing to serving'
			},
			tagline: {
				ko: '문제를 구조화하고 운영 가능한 제품으로 만듭니다.',
				en: 'I structure problems and turn them into operable products.'
			},
			bio: {
				ko: '문서 전처리, 임베딩과 Vector DB 운영, RAG 검색 품질, 출처 검증 UX, LLM 서빙·배포까지 RAG 프로덕트의 전 구간을 end-to-end로 다룹니다. 실제로 운영 중인 K-Bot에서 문서 유형별 전처리 전략을 설계해 연말정산 시즌 단순 반복 문의를 약 15% 줄이는 데 기여했고, 서비스를 멈추지 않고 임베딩 모델을 교체하는 마이그레이션 체계를 구축했습니다. 문제를 재현하고, 상태를 명확히 나누고, 운영자가 따라갈 수 있는 흐름으로 정리하는 방식을 선호합니다.',
				en: 'I work end-to-end across the full RAG product surface: document preprocessing, embeddings and Vector DB operations, RAG retrieval quality, citation-verification UX, and LLM serving and deployment. On K-Bot in production, I designed document-type-specific preprocessing that helped cut about 15% of repetitive year-end tax inquiries, and I built a migration system that swaps embedding models without service downtime. I prefer reproducible debugging, explicit state, and flows that operators can follow.'
			},
			location: { ko: 'Seoul, Korea', en: 'Seoul, Korea' },
			photoUrl: mascotImages.profile,
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
					{ name: 'Upstage Document AI', level: 'working' },
					{ name: 'Prompt Engineering', level: 'working' }
				]
			},
			{
				category: 'backend',
				title: { ko: 'Backend', en: 'Backend' },
				description: {
					ko: 'API, 비동기 처리, 데이터 흐름을 재현 가능하고 추적 가능한 구조로 만듭니다.',
					en: 'APIs, async processing, and data flows built to be reproducible and traceable.'
				},
				items: [
					{ name: 'Python', level: 'core' },
					{ name: 'FastAPI', level: 'core' },
					{ name: 'REST API', level: 'core' },
					{ name: 'Background Jobs / Queue', level: 'core' },
					{ name: 'Async Processing', level: 'working' },
					{ name: 'SQLAlchemy', level: 'working' }
				]
			},
			{
				category: 'database',
				title: { ko: 'Database / Vector DB', en: 'Database / Vector DB' },
				description: {
					ko: '검색, 임베딩, 멀티테넌트 격리를 고려한 저장 구조를 설계하고 마이그레이션합니다.',
					en: 'Storage structures and migrations designed for search, embeddings, and multi-tenant isolation.'
				},
				items: [
					{ name: 'Milvus / Zilliz', level: 'core' },
					{ name: 'Vector DB Design', level: 'core' },
					{ name: 'Partition Key (multi-tenant)', level: 'working' },
					{ name: 'PostgreSQL', level: 'working' },
					{ name: 'Schema Design', level: 'working' }
				]
			},
			{
				category: 'devops-infra',
				title: { ko: 'DevOps / Infra', en: 'DevOps / Infra' },
				description: {
					ko: 'LLM 서빙과 문서 인제스트 파이프라인을 운영 환경에서 안정적으로 배포·관리합니다.',
					en: 'Deploys and operates LLM serving and document-ingestion pipelines in production environments.'
				},
				items: [
					{ name: 'Docker', level: 'core' },
					{ name: 'Azure (Logic Apps / Blob / Queue)', level: 'working' },
					{ name: 'vLLM / LiteLLM Serving', level: 'working' },
					{ name: 'GPU Serving', level: 'working' },
					{ name: 'Healthcheck / systemd', level: 'working' }
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
					{ name: 'TypeScript', level: 'core' },
					{ name: 'SSE / Streaming UI', level: 'working' },
					{ name: 'PDF Viewer / SheetJS', level: 'working' },
					{ name: 'Tailwind CSS', level: 'working' },
					{ name: 'i18n', level: 'working' }
				]
			}
		],
		timeline: [
			// CAREER
			{
				id: 'career-younglimwon',
				category: 'career',
				title: { ko: 'AI 백엔드 개발 · RAG 프로덕트(K-Bot)', en: 'AI Backend Engineer · RAG Product (K-Bot)' },
				organization: { ko: '영림원소프트랩 · AIWG', en: 'Younglimwon Soft Lab · AIWG' },
				period: { ko: '2024.08 ~ 재직중 (사원)', en: 'Aug 2024 ~ Present (Employee)' },
				description: {
					ko: '영림원소프트랩 AI ERP에 탑재된 업무용 AI 챗봇 K-Bot의 백엔드를 개발하며, 문서 전처리부터 Vector DB 운영과 임베딩 모델 마이그레이션, 출처 추적, LLM 서빙·배포까지 RAG 파이프라인 전반을 구현했습니다.',
					en: 'Developed the backend of K-Bot, the in-product AI assistant in Younglimwon Soft Lab\'s AI ERP, building the full RAG pipeline from document preprocessing to Vector DB operations, embedding-model migration, source tracking, and LLM serving and deployment.'
				},
				highlights: {
					ko: ['문서 유형별 전처리 전략', 'Vector DB 마이그레이션', 'RAG 출처 추적', 'LLM 서빙 운영'],
					en: ['Document-type preprocessing', 'Vector DB migration', 'RAG source tracking', 'LLM serving operations']
				},
				stack: ['Python', 'FastAPI', 'Milvus/Zilliz', 'Azure', 'vLLM']
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
				ko: 'K-Bot 문서 정밀 분석 파이프라인',
				en: 'K-Bot Document Analysis Pipeline'
			},
			tagline: {
				ko: '문서 유형별로 파싱·청킹·임베딩 전략을 분리해 RAG 검색 품질을 끌어올린 전처리 시스템',
				en: 'A preprocessing system that lifts RAG quality by routing parsing, chunking, and embedding per document type'
			},
			description: {
				ko: 'K-Bot은 영림원소프트랩 AI ERP에 탑재된 업무용 AI 챗봇입니다. 모든 문서를 동일하게 처리하던 구조에서 벗어나, PDF·DOCX·PPT/PPTX·Excel·텍스트를 각 구조에 맞는 경로로 처리하도록 재설계했습니다. 표·이미지 문서는 Upstage Document Parse로 레이아웃을 분석하고, 페이지·슬라이드·시트 단위 출처를 보존해 검색 가능한 지식 단위로 변환합니다.',
				en: 'K-Bot is the in-product AI assistant in Younglimwon Soft Lab\'s AI ERP. I rebuilt a one-size-fits-all document flow into per-type routing for PDF, DOCX, PPT/PPTX, Excel, and text. Table- and image-heavy documents go through Upstage Document Parse for layout analysis, and page/slide/sheet-level sources are preserved as searchable knowledge units.'
			},
			category: 'ai',
			role: { ko: 'Backend · AI/RAG', en: 'Backend · AI/RAG' },
			period: '2026',
			stack: ['Python', 'RAG', 'Upstage Document AI', 'Embeddings', 'Milvus/Zilliz'],
			impact: {
				ko: [
					'연말정산 시즌 단순 반복 문의를 약 15% 감소시키는 데 기여',
					'PDF·DOCX·PPT·Excel·텍스트 5종 이상 문서 포맷을 단일 검색 단위로 통합 처리',
					'페이지·슬라이드·시트 단위 출처 추적 기반을 마련해 RAG 답변의 출처 정확도 향상'
				],
				en: [
					'Contributed to roughly a 15% drop in repetitive year-end tax inquiries',
					'Unified 5+ document formats (PDF, DOCX, PPT, Excel, text) into a single retrieval unit',
					'Established page/slide/sheet-level source tracking, improving RAG citation accuracy'
				]
			},
			highlights: {
				ko: ['문서 유형별 parser/chunker 라우팅', 'Upstage 레이아웃·표·도형 분석 연동', '페이지 넘나드는 table 병합', 'Vision 기반 이미지/차트 설명 생성'],
				en: ['Per-type parser/chunker routing', 'Upstage layout/table/figure analysis', 'Cross-page table merging', 'Vision-based image/chart captioning']
			},
			caseStudy: {
				ko: '단일 처리 방식에서는 PDF 페이지 정보가 사라지고, 슬라이드가 일반 텍스트처럼 뭉개지고, 여러 페이지에 걸친 표가 끊겨 검색 품질이 떨어졌습니다. 그래서 전처리를 "문서 특성별 전략 선택" 구조로 재설계하고, 표·이미지 문서는 Upstage로 구조 정보를 받아 heading 기반 의미 청킹과 table 병합을 적용했습니다. 그 결과 표·슬라이드·페이지 문서가 검색에서 자연스럽게 활용되고, 새 문서 유형은 기존 업로드 흐름을 건드리지 않고 전략만 추가하면 되는 확장 구조를 갖췄습니다.',
				en: 'A single flow lost PDF page context, flattened slides into plain text, and split multi-page tables, hurting retrieval. I redesigned preprocessing around per-characteristic strategy selection, sending table/image documents through Upstage for structural data, then applying heading-based semantic chunking and table merging. Tables, slides, and page-based documents became usable in retrieval, and new document types can now be added as a strategy without touching the upload flow.'
			},
			featured: true
		},
		{
			slug: 'kbot-vector-db-migration',
			title: {
				ko: 'K-Bot Vector DB 구조 개선 및 무중단 임베딩 마이그레이션',
				en: 'K-Bot Vector DB Restructuring & Zero-Downtime Embedding Migration'
			},
			tagline: {
				ko: 'partition key 멀티테넌트 구조와, 서비스를 멈추지 않는 임베딩 모델 교체 체계',
				en: 'A partition-key multi-tenant design and an embedding-model swap that never stops the service'
			},
			description: {
				ko: '영림원소프트랩 AI ERP의 업무용 챗봇 K-Bot에서, Milvus/Zilliz 컬렉션·파티션 개수 한계를 partition key 기반 멀티테넌트 구조로 해결하고, 임베딩 모델 변경을 "준비→실행→검증→적용" 단계로 나눠 운영 중에도 안전하게 전환하는 마이그레이션 체계를 구현했습니다.',
				en: 'For K-Bot, the in-product AI assistant in Younglimwon Soft Lab\'s AI ERP, I solved Milvus/Zilliz collection/partition limits with a partition-key multi-tenant structure, and built an embedding-model migration split into prepare → run → verify → apply so models can be swapped safely while the service is live.'
			},
			category: 'backend',
			role: { ko: 'Backend · Database', en: 'Backend · Database' },
			period: '2026',
			stack: ['Python', 'Milvus/Zilliz', 'Embeddings', 'Background Jobs', 'WebSocket'],
			impact: {
				ko: [
					'컬렉션/파티션이 고객·파일 수에 비례해 증가하던 구조를 모델·차원 단위 공용 컬렉션으로 전환해 물리 리소스 증가를 차단',
					'서비스 중단 없이 임베딩 모델을 교체하는 마이그레이션 플로우 구축',
					'중단·재개·실패 재시도·삭제 정합성 처리까지 포함한 운영형 복구 체계 제공'
				],
				en: [
					'Replaced per-customer/per-file collection growth with model/dimension-based shared collections, capping physical resource growth',
					'Built a migration flow that swaps embedding models with zero service downtime',
					'Delivered an operational recovery system covering pause, resume, retry, and deleted-data consistency'
				]
			},
			highlights: {
				ko: ['partition key 기반 멀티테넌트 격리', '신규 모델 검증 후 재임베딩', '백그라운드 배치 + 실시간 진행률 UI', '삭제 파일 정합성 처리'],
				en: ['Partition-key multi-tenant isolation', 'Re-embedding after new-model validation', 'Background batches + live progress UI', 'Deleted-file consistency handling']
			},
			caseStudy: {
				ko: '파일·고객 단위로 컬렉션과 파티션이 계속 늘어나면 Milvus의 개수 한계에 부딪히고, 임베딩 모델을 바꾸면 기존 벡터 공간과 차원이 달라 검색이 깨집니다. 그래서 저장 구조를 모델·차원 단위 공용 컬렉션 + partition key 격리로 바꾸고, 모델 교체를 단순 설정 변경이 아니라 신규 컬렉션 생성 → 전체 재임베딩 → 검증 → 적용으로 이어지는 데이터 이전 과정으로 다뤘습니다. 장시간 작업을 고려해 동시 실행 방지, 중단·재개, 실패 재시도, 삭제 문서 정합성, 최종 적용 게이트를 두어 운영자가 위험을 통제하며 전환할 수 있게 했습니다.',
				en: 'Growing collections and partitions per file/customer hits Milvus limits, and changing the embedding model breaks search because vector space and dimensions differ. I moved storage to model/dimension-based shared collections with partition-key isolation, and treated model swaps as a data migration — new collection, full re-embedding, verification, then apply — rather than a config toggle. For long-running jobs I added concurrency locks, pause/resume, retry, deleted-document consistency, and a final apply gate so operators can switch while controlling risk.'
			},
			featured: true
		},
		{
			slug: 'kbot-citation-viewer',
			title: {
				ko: 'K-Bot RAG 출처 검증 UX',
				en: 'K-Bot RAG Citation & Verification UX'
			},
			tagline: {
				ko: '답변의 근거를 실제 문서 위치까지 클릭해 확인하는 end-to-end 출처 시스템',
				en: 'An end-to-end citation system that lets users click through to the exact source location'
			},
			description: {
				ko: '영림원소프트랩 AI ERP의 업무용 챗봇 K-Bot에서, 문서 업로드부터 Vector DB 저장, RAG 검색, LLM 응답, 프론트엔드 렌더링, 문서 뷰어까지 이어지는 출처 추적 구조를 구현했습니다. LLM 답변의 인라인 citation을 백엔드 source metadata와 매칭해 클릭 가능한 번호 버튼으로 만들고, 클릭 시 해당 페이지·슬라이드·행으로 이동하는 뷰어를 연결했습니다.',
				en: 'For K-Bot, the in-product AI assistant in Younglimwon Soft Lab\'s AI ERP, I built source tracking that spans upload, Vector DB storage, RAG retrieval, LLM response, frontend rendering, and the document viewer. Inline LLM citations are matched to backend source metadata, rendered as clickable numbered buttons that open a viewer at the exact page, slide, or row.'
			},
			category: 'frontend',
			role: { ko: 'Frontend · RAG UX', en: 'Frontend · RAG UX' },
			period: '2026',
			stack: ['Svelte', 'SSE/Streaming', 'PDF Viewer', 'SheetJS', 'Metadata'],
			impact: {
				ko: [
					'RAG 답변의 근거를 실제 문서 위치(페이지·슬라이드·행)와 연결해 검증 가능한 답변으로 개선',
					'검색 후보 전체가 아닌 답변에 실제 인용된 출처만 노출해 출처 정확도 향상',
					'PDF·PPT·Excel·일반 문서의 서로 다른 확인 방식을 단일 citation 경험으로 통합'
				],
				en: [
					'Linked answer evidence to exact document locations (page/slide/row), making answers verifiable',
					'Surfaced only sources actually cited in the answer, not the full retrieval set',
					'Unified different review flows for PDF, PPT, Excel, and text into one citation experience'
				]
			},
			highlights: {
				ko: ['인라인 citation 파싱→클릭 버튼', '문서 유형별 뷰어 연결', 'citation↔metadata 정규화 매칭', '출처 중복 제거·번호 재정렬'],
				en: ['Inline citation parsing → buttons', 'Per-type viewer routing', 'Normalized citation↔metadata matching', 'Dedup & renumber of sources']
			},
			caseStudy: {
				ko: '업무용 챗봇에서는 답변 내용보다 근거 검증이 더 중요한 경우가 많은데, 기존에는 실제 답변에 안 쓰인 문서까지 출처로 섞이고 정확한 위치를 확인하기 어려웠습니다. 그래서 백엔드에서 청크마다 파일·페이지·시트·행 metadata를 부여하고 검색·리랭킹 이후에도 본문·점수·출처가 분리되지 않게 유지했습니다. 프론트엔드에서는 LLM이 다소 다른 형식으로 citation을 생성해도 정규화·fallback 매칭으로 실제 source와 안정적으로 연결하고, 답변에 인용된 출처만 추려 PDF 페이지 이동·Excel 행 하이라이트·텍스트 fallback으로 확인하도록 했습니다.',
				en: 'In business chatbots, verifying evidence often matters more than the answer text, yet uncited documents leaked into the source list and exact locations were hard to find. On the backend I attached file/page/sheet/row metadata to each chunk and kept text, score, and source together through retrieval and reranking. On the frontend, normalization and fallback matching reliably link slightly varied LLM citations to real sources, showing only cited evidence via PDF page jumps, Excel row highlighting, and text fallback.'
			},
			featured: true
		},
		{
			slug: 'sharepoint-knowledge-ingestion',
			title: {
				ko: 'SharePoint 지식 확장 파이프라인',
				en: 'SharePoint Knowledge Ingestion Pipeline'
			},
			tagline: {
				ko: 'SharePoint 문서 변경을 사람 개입 없이 RAG 지식베이스에 반영하는 이벤트 기반 백엔드',
				en: 'An event-driven backend that reflects SharePoint changes into the RAG knowledge base with no manual work'
			},
			description: {
				ko: 'Azure Logic Apps → Blob Storage → Storage Queue → worker로 이어지는 비동기 인제스트 파이프라인을 구성했습니다. 문서 변경 이벤트를 받아 유형별 파싱·청킹·임베딩을 거쳐 Milvus/Zilliz에 반영하며, 기존 색인은 신규 처리 성공 이후에만 교체하는 safe replace 방식으로 데이터 유실을 막았습니다.',
				en: 'Built an async ingest pipeline: Azure Logic Apps → Blob Storage → Storage Queue → worker. It ingests change events, runs per-type parsing/chunking/embedding into Milvus/Zilliz, and uses safe-replace indexing — swapping the old index only after the new one succeeds — to prevent data loss.'
			},
			category: 'infra',
			role: { ko: 'Backend · Cloud Infra', en: 'Backend · Cloud Infra' },
			period: '2026',
			stack: ['Azure Logic Apps', 'Blob Storage', 'Azure Queue', 'OpenAI', 'Milvus/Zilliz'],
			impact: {
				ko: [
					'SharePoint 문서 변경을 사람 개입 없이 RAG 지식베이스에 자동 반영',
					'API와 인덱싱 작업을 Queue로 분리해 HTTP 응답 지연을 최소화',
					'safe replace indexing과 retry/poison queue로 재색인 중 데이터 유실·장애 전파를 차단'
				],
				en: [
					'Auto-reflects SharePoint document changes into the RAG knowledge base with no manual work',
					'Decoupled API from indexing via a queue, minimizing HTTP response latency',
					'Prevented data loss and failure propagation during reindexing with safe-replace indexing and retry/poison queue'
				]
			},
			highlights: {
				ko: ['Blob 이벤트 기반 ingest API', 'Queue worker 비동기 처리', 'safe replace indexing', 'token-aware chunking guard'],
				en: ['Blob-event ingest API', 'Async queue worker', 'Safe-replace indexing', 'Token-aware chunking guard']
			},
			caseStudy: {
				ko: 'SharePoint 문서를 RAG에 쓰려면 매번 사람이 내려받고 추출·청킹·임베딩해야 했고, 문서가 수정될 때 기존 벡터를 안전하게 교체하지 않으면 옛 내용과 새 내용이 섞였습니다. 그래서 HTTP 요청은 Queue에 적재하고 즉시 반환한 뒤, worker가 무거운 파싱·임베딩·저장을 담당하도록 분리했습니다. 문서 유형별 라우팅, token 한도 재검증, 외부 의존성(Upstage/OpenAI/Milvus) 오류의 도메인 분류, 기존 색인을 신규 처리 성공 후에만 교체하는 전략으로 운영 중에도 안전하게 지식을 확장할 수 있게 했습니다.',
				en: 'Using SharePoint docs in RAG previously meant manually downloading, extracting, chunking, and embedding each time, and edits mixed old and new content unless vectors were safely replaced. I queued HTTP requests and returned immediately, letting a worker handle heavy parsing, embedding, and storage. With per-type routing, token-limit re-validation, domain classification of external-dependency errors (Upstage/OpenAI/Milvus), and replacing the index only after new processing succeeds, knowledge expands safely while the service runs.'
			},
			featured: false
		},
		{
			slug: 'gemma4-llm-serving',
			title: {
				ko: 'Gemma4 LLM 모델 배포 및 운영',
				en: 'Gemma4 LLM Deployment & Operations'
			},
			tagline: {
				ko: 'vLLM과 LiteLLM을 분리해 구성한 OpenAI 호환 자체 모델 서빙 환경',
				en: 'A self-hosted, OpenAI-compatible serving stack with vLLM and LiteLLM separated'
			},
			description: {
				ko: 'Gemma4 계열 모델을 GPU 서버에서 운영하기 위해 추론(vLLM)·API 프록시(LiteLLM)·설정 저장소(Postgres)·헬스체크를 분리한 Docker Compose 기반 배포 구조를 구성했습니다. 클라이언트는 LiteLLM의 일관된 OpenAI 호환 API로 접근하고, 내부에서는 vLLM이 GPU 추론을 담당합니다.',
				en: 'Built a Docker Compose deployment for serving Gemma4-family models on GPU servers, separating inference (vLLM), API proxy (LiteLLM), config store (Postgres), and health checks. Clients hit a consistent OpenAI-compatible API via LiteLLM while vLLM handles GPU inference internally.'
			},
			category: 'infra',
			role: { ko: 'Infra · LLM Ops', en: 'Infra · LLM Ops' },
			period: '2026',
			stack: ['vLLM', 'LiteLLM', 'Docker Compose', 'PostgreSQL', 'GPU'],
			impact: {
				ko: [
					'vLLM/LiteLLM 분리 구조로 OpenAI 호환 모델 호출 인터페이스를 표준화',
					'모델명·GPU 수·컨텍스트 길이·이미지 버전 등 운영 파라미터를 환경변수화해 환경별 배포 유연성 확보',
					'healthcheck·자동 재시작·모델 캐시 볼륨으로 대형 모델 재시작 안정성 개선'
				],
				en: [
					'Standardized the OpenAI-compatible calling interface via a vLLM/LiteLLM split',
					'Externalized model name, GPU count, context length, and image version as env vars for per-environment flexibility',
					'Improved large-model restart stability with health checks, auto-restart, and a model cache volume'
				]
			},
			highlights: {
				ko: ['vLLM 추론 서버 구성', 'LiteLLM 프록시·인증 계층', 'Postgres 설정 영속화', 'systemd LB ping 서버'],
				en: ['vLLM inference server', 'LiteLLM proxy & auth layer', 'Postgres config persistence', 'systemd LB ping server']
			},
			caseStudy: {
				ko: '모델 서버를 직접 호출하면 인터페이스가 모델마다 달라지고 교체가 어려워, API 프록시(LiteLLM)와 추론 엔진(vLLM)을 분리했습니다. LiteLLM은 외부 진입점·인증·라우팅을 맡고 설정은 Postgres에 영속화해 재시작 후에도 유지되며, vLLM은 tool/reasoning parser, tensor parallel, GPU 메모리 사용률 같은 옵션으로 Gemma4 특성에 맞춰 서빙합니다. Hugging Face 캐시 볼륨 분리, 컨테이너 healthcheck, 로드밸런서용 systemd ping 서버로 대형 모델 로딩 지연과 장애를 운영 관점에서 다뤘습니다.',
				en: 'Calling the model server directly made the interface vary per model and swaps hard, so I split the API proxy (LiteLLM) from the inference engine (vLLM). LiteLLM owns the external entry point, auth, and routing, persisting config in Postgres so it survives restarts, while vLLM serves Gemma4 with tool/reasoning parsers, tensor parallel, and GPU-memory-utilization tuning. A separate Hugging Face cache volume, container health checks, and a systemd ping server for the load balancer address large-model startup delay and failures operationally.'
			},
			featured: false
		}
	] satisfies Project[]
} as const;
