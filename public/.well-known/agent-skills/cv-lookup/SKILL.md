---
name: cv-lookup
description: Fetch Pancho Blanco's CV data (experiences, skills, studies, languages) as structured JSON.
version: 0.1.0
---

# cv-lookup

Pancho Blanco's CV is available as structured JSON via the public API endpoints listed below. Each endpoint returns `{ success: true, data: [...] }` with translation maps keyed by locale (`en`, `es`).

## Endpoints

- `GET https://panchoblanco.com/api/cv/experiences` — work history with company, role, dates, description.
- `GET https://panchoblanco.com/api/cv/skills` — grouped skill lists (frameworks, languages, tools).
- `GET https://panchoblanco.com/api/cv/studies` — formal education and certifications.
- `GET https://panchoblanco.com/api/cv/languages` — spoken languages with proficiency levels.

The full API catalog is at `https://panchoblanco.com/.well-known/api-catalog`.

## Markdown view

The human pages also support `Accept: text/markdown` for a markdown-formatted version:

- `https://panchoblanco.com/` — landing summary.
- `https://panchoblanco.com/cv` — full CV (HTML only at this time).

## Notes

Translations are nested per locale. Always read `translations[locale]?.[field]` with a fallback to `translations.en?.[field]`.
