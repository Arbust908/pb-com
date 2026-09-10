# PanchoBlanco.dev

Personal portfolio and CV site for Fran "Pancho" Blanco, a front-end developer based in Buenos Aires, Argentina.

Built with Nuxt 4, Vue 3, TypeScript, UnoCSS, Nuxt Content, Pinia, and `@nuxtjs/i18n`. The site supports English and Spanish, dark mode, case studies, a data-backed CV, and PostHog analytics.

## Routes

| Route         | Description                                                         |
| ------------- | ------------------------------------------------------------------- |
| `/`           | Home page with recent experience, skills, and languages             |
| `/about`      | Profile and contact options                                         |
| `/cv`         | Curriculum vitae                                                    |
| `/work`       | Filterable case-study index                                         |
| `/work/:slug` | Individual case study                                               |
| `/privacy`    | Privacy notice                                                      |
| `/index.md`   | Markdown representation of the home page for agents and CLI clients |

Spanish routes use the `/es` prefix, such as `/es/work`.

The server also exposes health and CV data endpoints under `/api`, plus agent discovery metadata under `/.well-known`.

## Structured Data

Valid HTML pages emit one server-rendered JSON-LD graph through `nuxt-jsonld`. The graph describes the site and its author, plus the current page as a profile, collection, article, or web page. Case studies include only explicit publication dates. Error pages emit no graph and are excluded from indexing.

## Getting Started

```bash
yarn install
yarn dev
```

`yarn dev` runs Nuxt through `portless` using the local `pb-com` domain.

## Environment

Copy `.env.example` to `.env` and set the public PostHog project key when analytics is enabled:

```env
NUXT_PUBLIC_PH_KEY=
```

Public Nuxt runtime configuration is exposed to the browser. Do not put secrets in variables beginning with `NUXT_PUBLIC_`.

## Scripts

| Command               | Purpose                                         |
| --------------------- | ----------------------------------------------- |
| `yarn dev`            | Start the development server through `portless` |
| `yarn build`          | Build the production application                |
| `yarn start`          | Run the built Nuxt server                       |
| `yarn generate`       | Generate a static build                         |
| `yarn start:generate` | Serve the generated static output               |
| `yarn lint`           | Lint the project                                |
| `yarn lint:fix`       | Lint and apply fixes                            |
| `yarn typecheck`      | Type-check with `vue-tsc`                       |

## Project Structure

```
pb-com/
├── components/       # Reusable Vue components
├── composables/      # Shared Composition API logic
├── content/          # English and Spanish Markdown case studies
├── i18n/             # Locale configuration and translations
├── layouts/          # Application layouts
├── pages/            # File-based routes
├── public/           # Static assets and agent skill metadata
├── server/
│   ├── api/          # Health and CV data endpoints
│   ├── data/         # CV JSON data
│   ├── middleware/   # Markdown negotiation and agent link headers
│   └── routes/       # robots.txt, sitemap.xml, and .well-known routes
├── stores/           # Pinia stores
├── types/            # Shared TypeScript types
└── constants/        # Site and case-study constants
```

Case studies are authored in `content/work/{en,es}`. CV data is maintained in `server/data`.

## Author

Fran "Pancho" Blanco: [panchoblanco.dev](https://panchoblanco.dev) · [@Arbust908](https://github.com/Arbust908)
