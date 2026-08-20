# Labs and case studies

_Nuxt 4 · Nuxt Content · Markdown · English/Spanish_

## Current scope

The first version is deliberately file-based. It has no database, admin panel, authentication, access tokens, or restricted projects. Those can be reconsidered later if a real publishing or privacy requirement appears.

```text
panchoblanco.dev/
├── /work              case-study index and filters
├── /work/[slug]       long-form case study
├── /lab               experiments and interaction demos
└── /cv                 bilingual résumé
```

## Content structure

Every translation is its own Markdown file:

```text
content/
└── work/
    ├── en/
    │   └── file-based-case-studies.md
    └── es/
        └── file-based-case-studies.md
```

Translations use the same `slug` and `translationKey`. The frontmatter contains the metadata needed by the index, filters, article header, and SEO:

```yaml
---
slug: file-based-case-studies
translationKey: file-based-case-studies
locale: en
title: Designing a file-based case-study system
description: A short summary for cards and metadata.
organization: Personal
projectType: personal
sortOrder: 900
publishedAt: 2026-08-19
role: Frontend architect and developer
period: 2026
technologies:
  - Nuxt
  - Vue
  - TypeScript
skills:
  - Frontend architecture
  - Content design
featured: true
draft: false
---
```

The Markdown body is intentionally flexible. A useful narrative shape is:

1. Context and constraints
2. The problem
3. Investigation and evidence
4. Options considered
5. Architectural or system-design decisions
6. POC and its rationale
7. Implementation
8. Outcome
9. What failed or changed
10. What I would do differently

The structure is guidance, not a rigid schema. A story should only include sections that help explain the work.

## Initial case-study backlog

1. SimplyCodes A/B testing
2. SimplyCodes referral system
3. SimplyCodes blog redesign and Contentful migration
4. SimplyCodes gamification
5. Dealspotr legacy maintenance
6. Knoji legacy maintenance
7. Blue House
8. FYM
9. Review recent projects and extend this list

Draft articles are visible locally with a draft badge. Production queries exclude them until `draft` is changed to `false`.

## Language behavior

- The site locale controls which translation is selected.
- English is the content fallback when the requested translation is missing.
- A fallback notice is shown when a Spanish visitor receives English content.
- The article-level EN/ES toggle appears only when both translations exist.
- The global language toggle still controls interface copy across the site.
- Adding a translation requires another Markdown file with the same `slug` and `translationKey`.

## Filtering

The `/work` index combines `technologies` and `skills` into simple client-side filters. This keeps filtering immediate and avoids an API or database. The two frontmatter fields remain separate so the article can distinguish tools used from capabilities demonstrated.

## Images and diagrams

Article images live in `public/img/work/[slug]/` and use normal Markdown image syntax. Small system diagrams or annotated UI flows can later use Nuxt Content components without changing the storage model.

## Deferred work

Access restrictions are explicitly deferred. If private case studies become necessary, design that version from the actual sharing requirements instead of building speculative token and session infrastructure now.
