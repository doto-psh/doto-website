# 🌊 doto

> Tools for a clearer mind — a personal brand site for Notion templates, writing, and digital products.

**doto** is a multilingual personal-brand website that brings several side projects under one roof:
promoting and selling Notion templates, linking out to a blog, and introducing the person and brand
behind it. It ships as a fully static, prerendered site today, but is architected so a real backend
(API / payments / auth / members) can be added later without rewriting the frontend.

<p>
  <img alt="SvelteKit" src="https://img.shields.io/badge/SvelteKit-Svelte%205-FF3E00?logo=svelte&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss&logoColor=white">
  <img alt="i18n" src="https://img.shields.io/badge/i18n-ko%20%C2%B7%20en%20%C2%B7%20ja-1E78B4">
  <img alt="Deploy" src="https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white">
</p>

---

## ✨ Features

- **Multilingual** — Korean, English, and Japanese, with shareable locale-prefixed URLs (`/`, `/en`, `/ja`).
- **Notion template storefront** — a filterable catalogue with detail pages and external checkout links (swap for real checkout later).
- **Blog & about flow** — content sections that guide visitors from the hero toward templates and writing.
- **"Deep Ocean" design system** — calm, maritime aesthetic driven by central design tokens.
- **Tasteful motion** — a custom cursor, scroll-reveal animations, page transitions, and drifting hero waves — all respecting `prefers-reduced-motion` and touch devices.
- **Fully prerendered & SEO-ready** — static output, per-locale `<html lang>`, `hreflang` alternates, and Open Graph tags.
- **Extensible by design** — an isolated data layer and clean component separation make adding products, posts, languages, or a backend straightforward.

## 🧱 Tech stack

| Area | Choice |
| --- | --- |
| Framework | [SvelteKit](https://svelte.dev/docs/kit) (Svelte 5) |
| Language | TypeScript (strict) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) — tokens in `src/app.css` (`@theme`) |
| i18n | [svelte-i18n](https://github.com/kaisermann/svelte-i18n) — `$_('key')` + per-locale `translation.json` |
| Fonts | Newsreader (display) + Inter (body), self-hosted via `@fontsource` |
| Hosting | [Vercel](https://vercel.com) (`@sveltejs/adapter-vercel`) |

## 🚀 Getting started

**Prerequisites:** Node.js 20+ and npm.

```bash
# install dependencies
npm install

# start the dev server (http://localhost:5173)
npm run dev

# type-check the project
npm run check

# build for production (prerenders every page in ko / en / ja)
npm run build

# preview the production build locally
npm run preview
```

| Script | Description |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Prerender all routes for every locale |
| `npm run preview` | Serve the production build |
| `npm run check` | `svelte-check` type checking |

## 🗂️ Project structure

```
src/
├─ routes/
│  ├─ +layout.svelte            # global shell, imports app.css
│  └─ [[lang=locale]]/          # locale-aware pages
│     ├─ +layout.{ts,svelte}    # i18n init, header/footer/cursor, transitions
│     ├─ +page.svelte           # home (Hero → Pillars → Featured → Blog → About)
│     ├─ templates/             # catalogue + [slug] detail
│     ├─ blog/                  # post list
│     └─ about/                 # brand story
├─ lib/
│  ├─ components/
│  │  ├─ layout/    # Header, Footer, LanguageSwitcher, Seo, Container
│  │  ├─ ui/        # Button, Section, SectionHeading, Tag
│  │  ├─ sections/  # Hero, ValuePillars, FeaturedTemplates, BlogPreview, AboutTeaser
│  │  ├─ product/   # ProductCard, ProductGrid, ProductCover
│  │  └─ effects/   # Cursor
│  ├─ data/         # products.ts, posts.ts, site.ts  ← single source of truth
│  ├─ i18n/         # index.ts, routing.ts, locales/{ko,en,ja}/translation.json
│  ├─ actions/      # reveal.ts (scroll-reveal)
│  └─ types/        # Product, Post, Locale, Localized
├─ params/locale.ts # matcher that limits the [[lang]] param to real locales
├─ hooks.server.ts  # sets <html lang> from the URL
└─ app.css          # design tokens (@theme) + base styles
```

## 🌐 Internationalization

- **UI strings** live in `src/lib/i18n/locales/{ko,en,ja}/translation.json` with namespaced keys
  (`hero.title`, `nav.templates`, …) and are read with `$_('key')`.
- **Translatable content** (product/post titles, descriptions) uses inline `Localized` fields in the
  data files, read with `pick(field, locale)`.
- **URLs** — the default locale (`ko`) has no prefix; others are prefixed (`/en`, `/ja`). This is handled
  by the optional `[[lang=locale]]` route param and the matcher in `src/params/locale.ts`.
- Helpers `localizeHref(path, locale)` and `pick(field, locale)` live in `src/lib/i18n/routing.ts`.
- `<html lang>` is stamped server-side in `src/hooks.server.ts` and kept in sync on client navigation.

### Add a language

1. Create `src/lib/i18n/locales/<code>/translation.json`.
2. `register('<code>', …)` it in `src/lib/i18n/index.ts`.
3. Add the code to `LOCALES` in `src/lib/types`.

## 📝 Managing content

**Add a product** — append one entry to `src/lib/data/products.ts`. It appears in the catalogue
automatically; set `featured: true` to surface it on the home page. The detail page and its prerender
entry are generated from the `slug`. `buyUrl` points to an external store today.

**Add a blog post** — append to `src/lib/data/posts.ts`. Posts link out for now and are ready to become
markdown/CMS-backed later.

**Edit brand info** — name, contact, and social links live in `src/lib/data/site.ts`.

## 🎨 Design — "Deep Ocean"

A calm, maritime palette of cool sea-haze backgrounds, deep ocean-navy text, an ocean-blue accent, and a
teal secondary. Display headings use **Newsreader**; body text uses **Inter**. The hero carries softly
drifting wave layers as a signature motif. All colours and type are defined as tokens in
`src/app.css` — change them in one place to re-theme the whole site:

```
--color-bg | surface | ink | muted | line | accent | accent-strong | teal
--font-serif (display) | --font-sans (body)
```

## ☁️ Deployment

The site is configured for **Vercel** via `@sveltejs/adapter-vercel` and is fully prerendered, so it
deploys as static output. Connect the repo to Vercel (or run `vercel`). The serverless runtime is
pinned to `nodejs22.x` in `svelte.config.js`.

### Chatbot environment variables

The "Ask doto" chatbot (`/api/chat`, served as a Vercel serverless function) needs an OpenAI key.
The key is read server-side via `$env/dynamic/private` and is never exposed to the browser.

- **Local:** copy `.env.example` to `.env` and set `OPENAI_API_KEY` (already gitignored).
- **Production:** add `OPENAI_API_KEY` (and optionally `OPENAI_MODEL`, default `gpt-4o-mini`) in
  **Vercel → Settings → Environment Variables**, then redeploy.

Without the key the rest of the site still builds and runs; only the chatbot returns an error.

## 🛣️ Roadmap / extending to a backend

The data layer is isolated behind functions (`getProducts`, `getProduct`, `getPosts`, …) and pages
already use SvelteKit `load`. To add a backend later:

- Move data calls into `+page.server.ts`, or add `/api/*` endpoints (Vercel runs them as serverless functions).
- Wire real checkout/payments in place of `buyUrl`.
- Add auth/members — the layout already leaves room for account UI.

Components stay unchanged throughout.

## 📄 License

© doto. All rights reserved.
