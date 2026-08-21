---
slug: simplycodes-blog-contentful-migration
translationKey: simplycodes-blog-contentful-migration
locale: en
title: Building the SimplyCodes blog on a shared Contentful platform
description: How I implemented the SimplyCodes blog frontend on a team-built, reusable content platform that reduced duplicated work and unnecessary origin requests.
project: SimplyCodes
organization: SimplyCodes · Demand.io
projectType: professional
sortOrder: 30
role: Primary Front-End Implementer
period: July 2024–February 2025
technologies:
  - Contentful
  - Nuxt
  - Vue
  - TypeScript
skills:
  - Front-end architecture
  - CMS integration
  - Technical SEO
  - Growth engineering
areas:
  - frontend
  - architecture
  - content
  - e2e
featured: true
draft: false
---

## Context

SimplyCodes needed a blog that could support editorial content without making the web application responsible for fetching, reshaping, and filtering raw CMS data. It also needed to fit a wider company platform: other products published similar content, so rebuilding the same model and delivery path for every site would duplicate engineering and infrastructure work.

I was the primary frontend implementer for SimplyCodes. The backend was built by the team. My responsibility was to turn its Contentful-backed API into the reader-facing experience: article discovery, responsive layouts, rich-content rendering, navigation, metadata, and measurable acquisition surfaces.

The work began with the initial Contentful frontend in July 2024. The migration continued in stages until the application moved to Contentful-only article loading in February 2025.

## The architectural boundary

The most important decision was where CMS complexity should live. The browser did not query Contentful directly. Instead, the frontend requested a product-facing blog API built and operated by the team.

```text
Contentful
    |
    v
Team-built blog API
    +-- apply product filters
    +-- paginate article lists
    +-- normalize shared response shapes
    +-- cache API responses
    |
    v
Nuxt frontend
    +-- render index and article pages
    +-- compose product-specific widgets
    +-- generate navigation and metadata
    +-- measure acquisition interactions
```

This boundary kept credentials and CMS query details out of the client. It also allowed the backend to filter by category or content pillar before returning a page of results, rather than sending the complete article collection to every visitor. The API routes sat behind shared response caching, reducing repeated work against the origin.

## Reusing the blog shape

We treated an article as a company-level contract rather than a SimplyCodes-only object. Shared TypeScript definitions described article lists, authors, images, categories, pillars, metadata, and full article responses. The same shared package also contained blog contracts for another company product.

On the SimplyCodes frontend, I consumed those contracts directly in the query and presentation layers. This gave the frontend and backend one vocabulary while still leaving room for product-specific rendering. SimplyCodes could add its own widgets and visual treatment without forking the underlying author and article shapes.

The reuse saved the company money qualitatively in two ways. Teams did not need to independently model the same blog concepts for each product, and the centralized backend could handle filtering and caching once instead of repeating that work in every frontend. We did not record a defensible dollar amount, so I am not attaching a financial figure to the saving.

## Implementing the reader experience

The frontend had two primary surfaces: an index for discovery and an article page for reading.

The index translated the current route into category and pillar filters, then sent those filters to the API. Server-side prefetching made the initial article set available in rendered HTML, while cursor-based pagination supported loading more without downloading the entire catalogue. Featured content, article cards, and editor's picks were composed from the same typed responses.

The article page combined the normalized response with a responsive three-column layout. Depending on viewport size, readers received a persistent or mobile table of contents, the article body, editor's picks, author context, recent articles, and sharing controls. I separated article presentation data into a composable so date formatting, reading time, author details, image selection, and canonical URL construction did not accumulate inside the page component.

`[Image: SimplyCodes blog index and article page shown at desktop and mobile sizes]`

## Rendering structured content safely

Contentful rich text needed to support more than paragraphs and images. The renderer mapped structured entries to reusable Vue components, with SimplyCodes-specific extensions for interactive or data-rich content. This allowed editors to compose richer articles while the frontend retained control over markup and presentation.

Embedded blocks also exposed a migration edge case: a block-level widget entered as inline content could produce invalid nested HTML and hydration problems. The query layer normalized those entries before rendering, converting known block-level widgets into the correct rich-text node type. That defensive step protected server rendering without forcing the page component to understand malformed CMS structure.

The table of contents was generated from article headings. I later corrected its labels and deduplication behavior so repeated or formatted headings still produced useful navigation rather than ambiguous links.

## Preserving search and SEO behavior

A CMS migration is not complete when article text appears on screen. Blog pages also had to remain useful as search entry points.

I integrated canonical URLs, page titles, descriptions, Open Graph fields, Twitter cards, publication and modification timestamps, and structured article data into the Nuxt rendering path. Because articles were prefetched during server rendering, crawlers and link previews did not depend on a client-only request to understand the page.

I also improved movement through the blog with breadcrumbs, search access, tables of contents, editor's picks, and recent-article links. These features connected migrated content to the rest of the product instead of treating the blog as an isolated CMS output.

## Connecting content to growth

The blog was both an editorial surface and an acquisition channel. After the migration foundation was in place, I added product promotion surfaces within the blog experience and then added campaign attribution to their calls to action.

This made those placements measurable without mixing growth logic into the content model. Contentful remained responsible for editorial structure, the frontend controlled the interaction and presentation, and attribution parameters connected selected calls to action to the analytics path.

## Outcome

The result was a Contentful-backed blog frontend that could render structured articles, product-specific embeds, responsive navigation, and search-oriented metadata on top of a team-built API.

The architecture reduced duplicated implementation across products by sharing blog contracts, and it avoided unnecessary work by filtering, paginating, and caching responses before they reached the frontend. For SimplyCodes, the same foundation supported both editorial reading and measurable paths back into the product.

This case study does not claim a specific traffic increase, cache-hit rate, publishing-time reduction, or dollar saving because those records are not available. The supported outcome is architectural: reuse lowered the amount of product-specific code required, while backend filtering and caching reduced avoidable data transfer and repeated origin work.

## Reflection

The strongest part of this migration was not a single component. It was the separation of concerns between a shared content platform and a product-specific experience.

Keeping Contentful access, normalization, filtering, and caching behind the API made the frontend simpler and gave other products a reusable foundation. Keeping rendering and acquisition behavior in SimplyCodes let me build for its readers without forcing every product into the same interface.

If I approached the migration again, I would add explicit parity checks for URLs, metadata, embeds, and heading structure at the start of the cutover. Those checks would make migration safety as visible and repeatable as the typed contracts that supported the final experience.
