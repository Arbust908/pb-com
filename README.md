# PanchoBlanco.dev

> Personal portfolio of **Fran "Pancho" Blanco** — full-stack developer and creative technologist based in Buenos Aires, Argentina.

---

## ★ Pillars

| Section | Route | Description |
|----------|-------|-------------|
| **Work** | `/work` | Case studies with problem→solution storytelling. Real projects, real constraints, real outcomes. |
| **Lab** | `/lab` | Polished, finished component experiments. Animations, micro-interactions, CSS-only demos, and API explorations. No half-baked ideas. |
| **CV** | `/cv` | Interactive, bilingual (EN/ES), mobile-first, print-friendly resume. |

## Tech Stack

**Nuxt 3** · Vue 3 · TypeScript · **UnoCSS** · i18n (`@nuxtjs/i18n`) · Pinia · PostHog · PWA (`@vite-pwa/nuxt`)

**Rendering:** Hybrid (ISR + SSR) · **Deploy:** Vercel · **Fonts:** Space Grotesk, DM Serif Display, Space Mono

## Standout Features

- **View Transition API** — smooth animated transitions for theme toggle and language switch (circular clip-path reveal)
- **Shuffle Letters** — text scrambling effect on the homepage hero
- **AI-Ready** — Content-Signal headers (`ai-train=no`), RFC 8288 Link headers for agent discovery, markdown content negotiation (`Accept: text/markdown`)
- **Print-Optimized CV** — dedicated print stylesheet, hidden navigation, clean layout
- **PWA** — offline support, installable, multiple icon resolutions
- **Dark Mode** — persisted preference with animated toggle
- **Bilingual** — English and Spanish, with View Transition-animated language switch

## Getting Started

```bash
git clone https://github.com/Arbust908/pb-com.git
cd pb-com
yarn install
yarn dev      # requires portless (local dev with custom domain)
yarn build    # production build
```

### Environment

Minimal env needed — only `NUXT_APP_NAME` is actively used:

```env
NUXT_APP_NAME=Pancho Blanco
```

Other integration keys may be present in `.env`, but they are currently unused by any live feature.

### Scripts

| Command | Purpose |
|---------|---------|
| `yarn dev` | Start dev server via `portless` |
| `yarn build` | Production build |
| `yarn start` | Run production server |
| `yarn generate` | Static site generation |
| `yarn lint` / `yarn lint:fix` | Lint with `@antfu/eslint-config` |
| `yarn typecheck` | Type-check with `vue-tsc` |

## Project Structure

```
pb-com/
├── components/      # Vue components (auto-imported)
│   ├── bloby/       # Decorative SVG blob backgrounds
│   ├── cv/          # CV section components
│   └── general/     # NavBar, Footer, LangToggle, DarkToggle
├── composables/     # Shared stateful logic (auto-imported)
├── constants/       # App name, description
├── content/         # Markdown case studies, grouped by language
├── content.config.ts # Validated case-study frontmatter schema
├── layouts/         # Page layouts (default, home, none)
├── locales/         # i18n translations (en, es)
├── middleware/       # Route middleware
├── pages/           # File-based routing
├── public/          # Static assets, PWA icons, favicons
├── server/
│   ├── api/         # API endpoints (CV data)
│   ├── data/        # Static JSON (experiences, skills, languages, studies)
│   ├── middleware/   # Agent discovery, markdown negotiation
│   └── routes/       # robots.txt, sitemap.xml
└── utils/           # Format helpers, ratio calculations
```

CV data lives in `server/data/*.json` — edited directly, no database required. The admin panel and ORM layer (Turso/Drizzle) have been removed in favor of a slimmer, more maintainable approach.

## Author

**Fran "Pancho" Blanco** — `me@panchoblanco.dev`

- GitHub: [@Arbust908](https://github.com/Arbust908)
- Web: [panchoblanco.dev](https://panchoblanco.dev)

## License

MIT
