import { content } from '$lib/data/content';
import type {
	Project,
	ProjectCaseStudy,
	ProjectCategory,
	ProjectCompany
} from '$lib/types';

const caseStudies: Record<string, ProjectCaseStudy> = {
	'kbot-document-analysis': {
		problem: {
			ko: '모든 문서를 하나의 텍스트 처리 경로로 보내면서 PDF 페이지 정보, 슬라이드 구조, 여러 페이지에 걸친 표가 사라졌고 검색 결과의 문맥도 함께 약해졌습니다.',
			en: 'A single text-processing path erased PDF page context, slide structure, and cross-page tables, weakening the context available to retrieval.'
		},
		constraints: {
			ko: ['기존 업로드 API와 사용자 흐름을 유지해야 했습니다.', 'PDF·DOCX·PPT/PPTX·Excel·텍스트의 구조 차이를 한 파이프라인 안에서 수용해야 했습니다.', '페이지·슬라이드·시트 단위 출처를 검색 이후까지 보존해야 했습니다.'],
			en: ['The existing upload API and user flow had to remain stable.', 'PDF, DOCX, PPT/PPTX, Excel, and text required different structural handling inside one pipeline.', 'Page, slide, and sheet provenance had to survive through retrieval.']
		},
		decisions: {
			ko: [
				{ title: '문서 유형별 라우팅', detail: '파일 유형과 사용 목적에 따라 파서와 청킹 전략을 선택하도록 진입 경로를 분리했습니다.' },
				{ title: '구조 보존 청킹', detail: '제목과 레이아웃 정보를 기준으로 의미 단위를 만들고, 여러 페이지에 걸친 표는 하나의 검색 단위로 병합했습니다.' },
				{ title: '출처를 데이터로 유지', detail: '페이지·슬라이드·시트 위치를 청크 메타데이터로 저장해 검색 이후에도 근거를 추적할 수 있게 했습니다.' }
			],
			en: [
				{ title: 'Route by document type', detail: 'Parser and chunking strategies are selected from file type and usage context.' },
				{ title: 'Preserve structure while chunking', detail: 'Headings and layout define semantic units, while cross-page tables are merged into one searchable unit.' },
				{ title: 'Keep provenance as data', detail: 'Page, slide, and sheet positions stay in chunk metadata so evidence remains traceable after retrieval.' }
			]
		},
		outcome: {
			ko: ['표·슬라이드·페이지 문서가 각 구조에 맞는 검색 단위로 변환됐습니다.', '새 문서 유형은 업로드 흐름을 바꾸지 않고 전략만 추가할 수 있게 됐습니다.'],
			en: ['Tables, slides, and page-based documents became structure-aware searchable units.', 'New document types can be added as strategies without changing the upload flow.']
		},
		lessons: {
			ko: ['검색 품질은 임베딩 모델보다 먼저, 원문 구조를 얼마나 잃지 않는지에서 갈립니다.'],
			en: ['Retrieval quality starts with how much source structure survives, before the embedding model enters the picture.']
		},
		flows: [
			{
				id: 'document-routing',
				title: { ko: '문서 처리 흐름', en: 'Document processing flow' },
				caption: { ko: '동일한 업로드 진입점 뒤에서 문서 특성에 맞는 전략을 선택합니다.', en: 'One upload entry point selects the strategy that fits each document.' },
				steps: {
					ko: [{ label: 'Upload', detail: '파일 유형 식별' }, { label: 'Route', detail: '처리 전략 선택' }, { label: 'Parse', detail: '레이아웃·표·텍스트 추출' }, { label: 'Chunk', detail: '구조 기반 의미 단위' }, { label: 'Index', detail: '출처 메타데이터와 저장' }],
					en: [{ label: 'Upload', detail: 'Detect file type' }, { label: 'Route', detail: 'Choose strategy' }, { label: 'Parse', detail: 'Extract layout, tables, text' }, { label: 'Chunk', detail: 'Create structural units' }, { label: 'Index', detail: 'Store with provenance' }]
				}
			}
		]
	},
	'kbot-citation-viewer': {
		problem: {
			ko: '검색된 문서 전체가 출처처럼 노출되고 실제 답변에 인용된 문장과 문서 위치를 연결하기 어려워, 사용자가 LLM 답변의 근거를 직접 검증하기 힘들었습니다.',
			en: 'All retrieved documents appeared as sources, while the cited answer text was difficult to connect to an exact document location.'
		},
		constraints: {
			ko: ['LLM의 출처 표기 형식이 매번 완전히 같지 않았습니다.', 'PDF 페이지, Excel 행, 텍스트 문서가 서로 다른 위치 체계를 사용했습니다.', '검색·리랭킹을 거쳐도 본문과 출처 메타데이터가 분리되면 안 됐습니다.'],
			en: ['LLM citation formatting varied between responses.', 'PDF pages, Excel rows, and text documents used different location models.', 'Text and provenance could not separate during retrieval and reranking.']
		},
		decisions: {
			ko: [
				{ title: '청크 단위 출처 모델', detail: '파일·페이지·시트·행 정보를 공통 메타데이터로 정규화했습니다.' },
				{ title: '보완 가능한 매칭', detail: 'LLM 표기를 정규화한 뒤 정확 매칭과 보완 매칭을 순서대로 적용했습니다.' },
				{ title: '인용된 근거만 노출', detail: '검색 후보 전체가 아니라 답변에서 실제로 참조한 출처만 사용자에게 보여줬습니다.' }
			],
			en: [
				{ title: 'Chunk-level provenance model', detail: 'File, page, sheet, and row locations were normalized into shared metadata.' },
				{ title: 'Resilient matching', detail: 'Citation text is normalized before exact and fallback matching run in sequence.' },
				{ title: 'Show only cited evidence', detail: 'Users see the sources actually referenced by the answer, not every retrieval candidate.' }
			]
		},
		outcome: {
			ko: ['답변의 인라인 출처를 PDF 페이지·Excel 행·텍스트 근거까지 연결했습니다.', '사용자는 답변에 실제로 쓰인 근거만 확인할 수 있게 됐습니다.'],
			en: ['Inline citations connect to exact PDF pages, Excel rows, and text evidence.', 'Users can inspect only the evidence actually used in the answer.']
		},
		lessons: {
			ko: ['RAG의 신뢰는 출처 목록의 개수가 아니라 답변과 근거 사이의 연결 정확도에서 만들어집니다.'],
			en: ['RAG trust comes from the accuracy of the answer-to-evidence link, not the number of sources displayed.']
		},
		flows: [
			{
				id: 'citation-trace',
				title: { ko: '출처 추적 흐름', en: 'Citation trace flow' },
				steps: {
					ko: [{ label: 'Retrieve', detail: '본문+출처 검색' }, { label: 'Rerank', detail: '메타데이터 유지' }, { label: 'Generate', detail: '인라인 출처 생성' }, { label: 'Match', detail: '정규화·보완 매칭' }, { label: 'Verify', detail: '실제 문서 위치 열기' }],
					en: [{ label: 'Retrieve', detail: 'Search text + source' }, { label: 'Rerank', detail: 'Preserve metadata' }, { label: 'Generate', detail: 'Create inline citations' }, { label: 'Match', detail: 'Normalize + fallback' }, { label: 'Verify', detail: 'Open exact location' }]
				}
			}
		]
	},
	'kbot-vector-db-migration': {
		problem: {
			ko: '고객과 파일마다 컬렉션·파티션이 늘어나는 구조는 Vector DB 한계에 가까워졌고, 임베딩 모델을 바꾸면 기존 벡터 공간과 차원이 달라져 검색을 그대로 유지할 수 없었습니다.',
			en: 'Collections and partitions grew with every customer and file, while embedding-model changes made the existing vector space incompatible with search.'
		},
		constraints: {
			ko: ['서비스를 중단하지 않고 기존 문서를 새 모델로 다시 임베딩해야 했습니다.', '장시간 작업의 중단·재개·재시도와 동시 실행을 통제해야 했습니다.', '삭제된 문서가 새 컬렉션에 되살아나지 않도록 정합성을 보장해야 했습니다.'],
			en: ['Existing documents had to be re-embedded without stopping the service.', 'Long-running jobs needed pause, resume, retry, and concurrency controls.', 'Deleted documents could not reappear in the new collection.']
		},
		decisions: {
			ko: [
				{ title: '공용 컬렉션과 partition key', detail: '모델·차원 단위 컬렉션을 공유하고 tenant를 partition key로 격리했습니다.' },
				{ title: '설정 변경이 아닌 데이터 이전', detail: '준비→재임베딩→검증→적용의 명시적인 마이그레이션으로 모델 교체를 다뤘습니다.' },
				{ title: '최종 적용 게이트', detail: '새 컬렉션의 검증이 끝나기 전에는 서비스가 기존 컬렉션을 계속 사용하도록 했습니다.' }
			],
			en: [
				{ title: 'Shared collections with partition keys', detail: 'Collections are shared by model and dimension, while tenants stay isolated by partition key.' },
				{ title: 'Data migration, not a setting change', detail: 'Model replacement became an explicit prepare → re-embed → verify → apply workflow.' },
				{ title: 'Final apply gate', detail: 'The service keeps using the old collection until the new one passes verification.' }
			]
		},
		outcome: {
			ko: ['고객·파일 수에 비례한 물리 컬렉션 증가를 차단했습니다.', '운영자가 진행 상태와 실패를 통제하며 서비스 중단 없이 모델을 교체할 수 있게 됐습니다.'],
			en: ['Physical collection growth no longer scales with every customer and file.', 'Operators can control progress and failures while replacing a model without downtime.']
		},
		lessons: {
			ko: ['임베딩 모델 교체는 설정 배포가 아니라 재시도와 정합성이 필요한 데이터 마이그레이션입니다.'],
			en: ['An embedding-model replacement is a data migration with retry and consistency requirements, not a config deployment.']
		},
		flows: [
			{
				id: 'embedding-migration',
				title: { ko: '모델 교체 흐름', en: 'Embedding migration flow' },
				steps: {
					ko: [{ label: 'Prepare', detail: '신규 컬렉션 생성' }, { label: 'Migrate', detail: '배치 재임베딩' }, { label: 'Verify', detail: '개수·정합성 검증' }, { label: 'Apply', detail: '서비스 전환' }, { label: 'Observe', detail: '실패·복구 추적' }],
					en: [{ label: 'Prepare', detail: 'Create collection' }, { label: 'Migrate', detail: 'Batch re-embed' }, { label: 'Verify', detail: 'Check count + consistency' }, { label: 'Apply', detail: 'Switch service' }, { label: 'Observe', detail: 'Track failure + recovery' }]
				}
			}
		]
	}
};

const projects: Project[] = content.projects.map((project) => ({
	...project,
	caseStudyDetails: caseStudies[project.slug]
}));

export const projectCategories: ProjectCategory[] = [...content.projectCategories];
export const projectCompanies: ProjectCompany[] = [...content.projectCompanies];

export function getProjects(): Project[] {
	return projects;
}

export function getFeaturedProjects(limit = 3): Project[] {
	const featured = projects.filter((project) => project.featured);
	if (featured.length !== 3 || featured.some((project) => !project.caseStudyDetails)) {
		throw new Error('Portfolio requires exactly three featured projects with structured case studies.');
	}
	return featured.slice(0, limit);
}

export function getProject(slug: string): Project | undefined {
	return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(slug: string, limit = 3): Project[] {
	const current = getProject(slug);
	if (!current) return [];
	return projects.filter((project) => project.slug !== slug && project.featured).slice(0, limit);
}

export function getNextFeaturedProject(slug: string): Project | undefined {
	const featured = getFeaturedProjects();
	const index = featured.findIndex((project) => project.slug === slug);
	if (index < 0) return undefined;
	return featured[(index + 1) % featured.length];
}
