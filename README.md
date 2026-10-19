# Sidharth S S · Portfolio

Personal portfolio of Sidharth S S, Technical Consultant & Developer.
Live at **https://sidharthsanjay.github.io/Sidharth-Portfolio/**.

## Stack

- **Next.js 16** (App Router, static export) · **React 19** · **TypeScript**
- **Tailwind CSS 4** for styling, with design tokens in `app/globals.css`
- **Motion** for animation (scroll reveals, layout transitions, the stacking project cards) and **Lenis** for smooth scrolling
- `next/font` for self-hosted Geist, Geist Mono and Instrument Serif
- SEO: metadata and Open Graph image, JSON-LD `Person` schema, `sitemap.xml`, `robots.txt`
- Accessibility: semantic landmarks, skip link, keyboard-operable dialogs with focus return, and `prefers-reduced-motion` respected throughout

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run lint        # ESLint (next/core-web-vitals + TypeScript)
npm run typecheck   # tsc --noEmit
npm run build       # static export to ./out
npm run preview     # serve ./out
```

## Updating content

Everything the page says lives in [`lib/site.ts`](lib/site.ts): contact links, the featured
case studies, the project grid, skills and stats. Add a project by adding an entry to `projects`;
the filter tabs pick it up from its `category`.

| Section | Component |
|---|---|
| Nav, scroll progress | `components/nav.tsx` |
| Hero and the live "ops" widget | `components/hero.tsx`, `components/hero-widget.tsx` |
| Featured work (stacking cards, case-study dialog) | `components/featured-work.tsx` |
| Animated project illustrations | `components/visuals.tsx` |
| Project grid with filters and screenshot lightbox | `components/projects.tsx` |
| Skills, approach, about, contact, footer | `components/sections.tsx` |
| Shared animation helpers | `components/motion-primitives.tsx` |

The featured-work illustrations use invented sample data on purpose: the real systems hold a
client's figures.

## Deployment

`.github/workflows/deploy.yml` lints, type-checks and builds every push and pull request, and
deploys `main` to GitHub Pages. The base path (`/Sidharth-Portfolio`) comes from the Pages
configuration, so the same build works on a custom domain.

One-time setup: in the repository's **Settings → Pages**, set **Source** to **GitHub Actions**.
