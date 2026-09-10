---
slug: ai-readable-portfolio
translationKey: ai-readable-portfolio
locale: en
title: Negotiating Markdown for an AI-readable portfolio homepage
description: How I added an optional Markdown response and route discovery without changing the browser experience.
project: Portfolio
organization: Personal
projectType: personal
sortOrder: 910
publishedAt: 2026-08-12
role: Full-stack developer
period: 2026
technologies:
  - Nuxt
  - Nitro
  - HTTP
  - Markdown
skills:
  - Progressive enhancement
  - API design
  - Technical SEO
areas:
  - backend
  - architecture
  - content
  - e2e
featured: false
draft: true
---

## Context

A portfolio must work for people and automated clients. People use its navigation, typography, motion, and responsive layout. Automated clients need the same facts in a format they can discover and parse.

I did not want to replace the website or maintain a second content system. I wanted the homepage to return Markdown when a client explicitly requested it.

## Constraints

- Normal browser requests still had to receive the designed HTML page.
- The alternate response had to reuse existing CV data rather than duplicate it.
- Caches needed a signal that HTML and Markdown were different representations.
- Discovery could cover several public routes, but Markdown support had to be advertised precisely.

## Approach

I added content negotiation at the server middleware layer. For `GET` and `HEAD` requests to `/`, the middleware checks for an explicit `text/markdown` media type. Matching `GET` requests receive Markdown; matching `HEAD` requests receive the same headers without a body. Other requests continue through the normal Nuxt rendering pipeline.

The Markdown is assembled at request time from the existing experience, skill, and language endpoints. It includes a profile summary, links to the main site sections and API catalog, two recent roles, skill groups, and spoken languages. If one data request fails, the remaining sections can still render.

Only the homepage currently has a Markdown representation. `/cv`, `/work`, and individual case studies remain HTML even when a client sends `Accept: text/markdown`.

## Protocol

A local production build returned the following response to an explicit request:

```http
GET / HTTP/1.1
Accept: text/markdown

HTTP/1.1 200 OK
Content-Type: text/markdown; charset=utf-8
Vary: Accept
Cache-Control: public, max-age=300, s-maxage=300
```

The equivalent `HEAD` request returned the Markdown headers and no body. Alternating local HTML and Markdown requests also returned the requested representation each time. Browser-style `Accept: text/html` requests received HTML as before.

The current parser intentionally stays small, but it is not a standards-complete `Accept` parser. It looks for the `text/markdown` substring, so `Accept: text/markdown;q=0` still returns Markdown. Quality values and media-range precedence need to be implemented before the negotiation can be described as fully compliant.

## Representation

Measured against the same locally built homepage on 21 August 2026:

| Representation | Response body | Content carried                                                                        |
| -------------- | ------------: | -------------------------------------------------------------------------------------- |
| HTML           |  34,401 bytes | Visual document, styles, application state, and CV content                             |
| Markdown       |   1,732 bytes | 222 words covering the profile, two recent roles, five skill groups, and two languages |

That is a 95.0% smaller response body for the focused representation. The comparison is a local payload measurement, not a claim about latency, model accuracy, or production bandwidth savings.

## Discovery

Negotiation works alongside route discovery. The homepage, CV, and work index expose RFC 8288 `Link` headers that point clients to:

- a linkset catalog describing the structured CV endpoints;
- an agent-skill index with a content hash for its CV lookup instructions;
- the XML sitemap.

The site also serves crawler rules that distinguish search indexing, model training, and retrieval-time AI use. These resources let a client find the machine-readable documentation and structured JSON without guessing route names.

`[Image: request flow from HTML or Markdown negotiation to CV data and discovery resources]`

## Verification status

The source implementation and local production build behave as described, but the deployed environment does not yet preserve negotiation end to end. The apex domain redirects to `www`; on that host, an explicit Markdown request currently receives cached HTML without `Vary: Accept`. The discovery endpoints are deployed, but their response bodies still advertise the obsolete `.com` domain, and the deployed sitemap still references the former `/portfolio` route.

For that reason, this case study remains a draft and the measured reduction is not presented as a deployed result.

## Outcome

In the local implementation, one URL serves the visual browser page or a compact Markdown response from the same data. Production verification also exposed a problem: correct application headers do not help when the edge cache ignores the negotiation header.

The next steps are to correct production cache behavior and domain advertising, replace substring matching with proper `Accept` parsing, and then extend negotiation to file-based case studies without creating a second source of truth.
