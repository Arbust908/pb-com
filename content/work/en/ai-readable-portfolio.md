---
slug: ai-readable-portfolio
translationKey: ai-readable-portfolio
locale: en
title: Making a portfolio readable by people and AI agents
description: Serving a focused Markdown representation without compromising the visual browser experience.
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
featured: false
draft: false
---

## Context

A visual portfolio is designed for a browser, but recruiters, research tools, and AI agents increasingly consume the same information through automated clients. Sending those clients a page dominated by layout markup makes the important material harder to discover.

## Constraint

The normal website still had to receive HTML. Any alternate representation needed to follow HTTP semantics and avoid maintaining a separate public API.

## Approach

Nitro middleware checks whether a request explicitly accepts `text/markdown`. Browser requests continue through the normal rendering pipeline, while compatible clients receive a concise Markdown representation with the same canonical links.

The behavior is opt-in. A broad `Accept` header does not accidentally downgrade the browser response, and the response varies on that header so caches do not mix representations.

## Outcome

The site keeps its designed interface while offering a smaller, semantic representation to clients that ask for it. The next iteration is to extend the same negotiation to the case-study collection so each narrative has an agent-readable form sourced from the original Markdown.
