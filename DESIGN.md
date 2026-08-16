# doto Design System

## Direction

doto is a cinematic systems portfolio for a backend-focused AI engineer. The visual language borrows the confidence and pacing of an independent creative portfolio, then replaces decorative showcase content with system evidence: architecture, constraints, decisions, outcomes, and operating context.

The site should feel authored rather than assembled. It uses a dark, continuous home narrative with two deliberate light interruptions for capabilities and profile context. Ripan Halder's portfolio informed the sense of scale and editorial pacing; layout, content, components, and motion are original to doto.

## Principles

- Lead with one clear claim, then support it with specific systems and decisions.
- Use scale, contrast, rules, and spacing before adding containers or effects.
- Treat every project as a system: problem, boundary, flow, failure, recovery, outcome.
- Keep proof close to claims. Capability rows link directly to project evidence.
- Use motion only to clarify entry and state change; respect reduced motion.
- Keep navigation familiar and the Ask doto experience visibly separate from the work narrative.

## Tokens

- Background: `#070a0f`
- Surface: `#0d121a`
- Panel: `#111823`
- Primary text: `#f3f6fa`
- Muted text: `#98a4b5`
- Accent: `#5689ff`
- Secondary accent: `#94b5ff`
- Light section background: `#edf0f3`
- Light section text: `#10141a`
- Success: `#62d89b`
- Error: `#ff746c`

The source of truth is `src/app.css`.

## Typography

- Display and body: Pretendard Variable.
- System metadata and technical labels: IBM Plex Mono.
- Hero titles use compact line height, tight tracking, and sentence-case language.
- Reading pages keep a narrow measure and relaxed line height.
- Metadata is small, uppercase, and never carries essential meaning by itself.

## Layout

- Page container: `90rem` maximum.
- Reading container: `48rem` maximum.
- Desktop side margin: `2rem`; mobile side margin: `1rem`.
- Home is a long-form sequence: Hero → statement → work → architecture → capabilities → experience → notes → about → Ask.
- Project and Notes indexes use full-width rows rather than card grids.
- Project detail alternates dark narrative sections with light evidence sections.

## Components

- Header: fixed transparent frame that gains blur and a rule after scrolling; full-screen mobile menu.
- Hero stage: portrait-led viewport, direct positioning statement, and factual proof strip.
- Work row: oversized project title, one outcome, role/period, technology context, and direct case-study link.
- Architecture spotlight: semantic system sequence showing preparation, verification, and cutover.
- Capability accordion: one open row at a time with linked project evidence.
- Chat: compact homepage entry and full `/ask` workspace using the same streaming endpoint and recovery states.
- Footer: large contact statement, navigation, location, and external links.

## Motion

- Section reveals use a short opacity/translate transition and IntersectionObserver.
- Hover movement stays under `1.25rem` and never blocks navigation.
- No custom cursor, scroll hijacking, infinite marquee, or mandatory animation.
- `prefers-reduced-motion: reduce` disables reveals and smooth scrolling.

## Avoid

- Generic card grids, glass panels everywhere, decorative blobs, and fake dashboards.
- Floating badges, excessive pills, and icon collections used as filler.
- Unsupported metrics or vague claims such as "scalable" without evidence.
- Copying the reference site's composition, copy, assets, or signature interactions.
- Hidden navigation, novelty scrolling, or effects that make technical content harder to inspect.
