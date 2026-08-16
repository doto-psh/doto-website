# doto

박수현(doto)의 AI 엔지니어링 포트폴리오입니다. RAG, 문서 처리, Vector DB 마이그레이션처럼 운영 환경에서 해결한 문제를 사례 연구와 짧은 기술 기록으로 보여줍니다.

## Main routes

- `/` — 풀스크린 소개, 대표 시스템, 아키텍처, 역량, 경력, Notes, Ask doto
- `/projects` — 전체 작업과 3개 상세 사례 연구
- `/notes` — 디버깅·설계·배포 기록
- `/about` — 실제 프로필, 기술, 경력, 연락처
- `/ask` — 공개된 포트폴리오 정보를 바탕으로 답하는 Ask doto
- `/en/*` — 영문 버전
- `/blog/*` — 기존 링크 호환을 위해 `/notes/*`로 영구 리다이렉트

## Stack

- SvelteKit 2 / Svelte 5
- TypeScript
- Tailwind CSS 4
- `svelte-i18n` (Korean and English)
- Pretendard Variable + IBM Plex Mono
- Vercel adapter and Analytics
- OpenAI-backed streaming endpoint for Ask doto

## Local development

Node.js 20+가 필요합니다.

```bash
npm install
npm run dev
npm run check
npm run build
```

`npm run dev`의 기본 주소는 `http://localhost:5173`입니다.

## Content

주요 콘텐츠는 코드와 화면을 분리해 관리합니다.

- `src/lib/data/content.ts` — 프로필, 기술, 경력, 프로젝트, 연락처
- `src/lib/data/projects.ts` — 대표 3개 프로젝트의 문제·제약·판단·흐름·결과
- `src/lib/data/posts.ts` — Notes 본문
- `src/lib/i18n/locales/{ko,en}/translation.json` — UI 문구
- `src/app.css` — 디자인 토큰과 전역 스타일
- `DESIGN.md` — UX와 시각 시스템 원칙

프로젝트를 추가하면 `/projects/[slug]`의 정적 경로가 생성됩니다. `featured: true`인 프로젝트는 정확히 3개여야 하며 각 프로젝트에 구조화된 사례 연구가 필요합니다.

## Ask doto

`/ask`는 `/api/chat` 스트리밍 엔드포인트를 사용합니다. 키는 브라우저로 전달되지 않습니다.

```bash
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-4o-mini # optional
```

키가 없어도 포트폴리오의 나머지 페이지는 정상적으로 빌드됩니다. 채팅만 오류와 재시도 상태를 표시합니다.

## Deployment

Vercel 어댑터를 사용합니다. 콘텐츠 페이지는 사전 렌더링되고 `/api/chat`만 동적 서버리스 함수로 실행됩니다. 실제 도메인을 바꿀 때는 `src/lib/data/content.ts`의 `site.url`도 함께 수정해 canonical과 `hreflang`을 맞춰야 합니다.

© doto. All rights reserved.
