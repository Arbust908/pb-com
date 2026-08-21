---
slug: knoji-legacy-maintenance
translationKey: knoji-legacy-maintenance
locale: en
title: Modernizing Knoji codebase
description: How I led an incremental structured-data expansion inside an SEO-sensitive procedural PHP platform without rewriting its page pipeline
project: Knoji
organization: Knoji · Demand.io
projectType: professional
sortOrder: 60
role: Technical Lead and Primary Implementer
period: "October 2024 - June 2025; team follow-up through November 2025"
technologies:
  - PHP
  - JSON-LD
  - Schema.org
  - MySQL
  - ezSQL
  - Server-rendered HTML
skills:
  - Structured data
  - Technical SEO
  - Legacy modernization
  - Data normalization
  - Defensive serialization
areas:
  - frontend
  - backend
  - architecture
  - data
  - legacy
featured: false
draft: false
---

## Context and constraints

Knoji's merchant pages combine coupon codes, offers, merchant policies, ratings, FAQs, and checkout guidance. The same information serves two audiences: people deciding whether to trust and use a promotion, and machines trying to understand the page.

I led the team responsible for evolving this area of the platform and was the primary implementer of the structured-data work described here. The implementation happened in two phases: FAQ consolidation in October 2024, then a broader merchant-schema expansion from May to June 2025. The team continued maintaining adjacent SEO and schema behavior through November 2025.

This was not a greenfield application. Merchant pages were assembled from large procedural PHP templates, shared variables, direct database results, and many conditional commercial modules. During the first phase, two near-duplicate merchant layouts were active. Promotion ordering was also business logic: a code's position depended on health, type, placement rules, and the modules already rendered above it.

Rewriting that pipeline would have mixed an SEO change with a much larger product migration. The practical constraint was therefore to create a safer machine-readable path while preserving the visible page and its existing ordering behavior.

## The problem

The initial problem was duplicated FAQ semantics. Merchant templates contained a static coupon FAQ, while dynamic Merchant Information Questions (MIQs) were fetched and rendered separately. Structured markup reflected those separate paths instead of presenting one coherent FAQ entity.

The first attempt exposed the real maintenance problem. Adding an `FAQPage` wrapper was easy; determining when all questions were available, keeping both layouts aligned, and safely serializing dynamic answers was not. Hand-interpolated JSON could be broken by punctuation or HTML in merchant content, and emitting too early meant the MIQ records had not yet been collected.

That episode revealed a broader gap. Knoji already emitted some page-level schema, but merchant policies, normalized offers, coupon tables, and checkout instructions remained disconnected from the structured-data layer.

## Investigation

I traced the rendered page backward from `views/header-head.php`, which globally included `views/schema.php`, into both merchant layouts and their shared components. The useful domain model was implicit in template variables rather than represented by classes or services:

- Static questions were defined where their HTML was rendered.
- MIQ answers arrived from a separate query and component.
- Promotion groups such as healthy codes, old codes, link deals, and sticky placements were mutated while the page was assembled.
- Merchant policies, customer discounts, ratings, sidebar products, and coupon-table data each used different structures.

The working hypothesis was that structured data should adapt to the existing rendering pipeline, not compete with it. Shared FAQ records could feed both visible and machine-readable output. Promotions needed a normalized intermediate representation before they could be mapped to `Offer` entities.

```text
Before

static FAQ template --------> visible FAQ
MIQ query + component ------> visible MIQ markup
promotion arrays -----------> procedural placement
schema.php -----------------> limited independent JSON-LD blocks

After

static FAQ records --+------> visible FAQ
MIQ records ---------+------> one FAQPage encoder

promotion arrays ---> normalized display records ---> Offer / ItemList schemas
merchant data -------------------------------------> Organization / Product
visible tables and instructions -------------------> Dataset / HowTo
```

## Options considered

I considered three boundaries for the work:

1. Patch each template independently. This minimized initial movement but preserved duplicate FAQ logic and would make every schema addition layout-specific.
2. Replace the merchant-page pipeline. This could produce a cleaner architecture, but it dramatically increased the regression surface around promotion ordering, seasonal modules, tracking links, and SEO-sensitive output.
3. Add a compatibility seam. Keep the established rendering flow, normalize the data needed by structured output, and centralize JSON-LD serialization.

I chose the third option. It improved one cross-cutting concern without pretending the surrounding codebase had already been modernized.

## Architecture decision

The decision had two parts.

First, represent FAQs as records with a `question` and an `answer`, where an answer could be a string or a closure over page data. Static records still drove their visible HTML. MIQ records were collected during rendering, then both sets were passed to a shared `faq_lds.php` emitter after the required data existed.

Second, introduce a normalization step for promotions. `_code_sorter.php` copied heterogeneous promotion objects and added common schema-facing fields such as `name`, `description`, `url`, `couponCode`, discount values, validity dates, display type, and display order. `schema.php` could then map those records into Schema.org arrays without rewriting the visible placement system.

All blocks flowed through an `outputJsonLd()` helper backed by `json_encode`, rather than assembling JSON fragments by string interpolation. A separate numeric formatter forced a dot decimal separator and removed locale-dependent thousands separators from schema prices.

The visible rendering pipeline, database access, and existing merchant variables deliberately stayed in place. This constrained the blast radius, although it also left coupling between schema generation and template globals that a later migration should remove.

## Implementation and rollout

### Phase 1: one FAQ representation

Across six commits from [October 7](https://github.com/demandio/knoji/commit/77b2414461391cbb4d6b7aa30eed0b2803a3eeff) to [October 10, 2024](https://github.com/demandio/knoji/commit/7efd0cea3731af73b205250d5dce0ed97b8b89a5), I moved from an initial MIQ Microdata wrapper to a shared `FAQPage` JSON-LD emitter. The sequence matters because it records the corrections:

- Consolidated static and MIQ entries instead of emitting competing FAQ blocks.
- Moved emission to the bottom of each layout so all dynamic answers were available.
- Added the shared path to the legacy layout after initially covering only the newer variant.
- Replaced interpolated entry fragments with `json_encode`.
- Removed a temporary 12-question cap so the output represented the full combined FAQ.

The experimental layout was later removed when the team rolled back its split test. Because the old layout already used the shared emitter, the active page retained the consolidated behavior.

### Phase 2: merchant schema expansion

The [May 2025 consolidation](https://github.com/demandio/knoji/commit/0530f80394a221499b5d62c315645d7a6c47562d) extended the same approach beyond FAQs. Merchant pages gained structured representations for:

- the merchant as an `Organization`;
- coupon availability as a `Product` with `AggregateOffer` and individual `Offer` records;
- ordered promotions as an `ItemList`;
- page identity as a `WebPage`;
- related sidebar products and their offers.

Follow-up work mapped merchant policies and customer discounts to `PropertyValue` records, modeled the two visible coupon tables as `Dataset` structures, and mirrored the three visible checkout instructions as `HowToStep` records. The Dataset and HowTo changes were co-authored with GitHub Copilot; I remained responsible for integrating and reviewing them in the legacy page flow.

The rollout was incremental rather than a schema rewrite in one release. Small follow-up commits corrected output structure and, in [`22669787`](https://github.com/demandio/knoji/commit/22669787d795eab2e13236bbfd8d968a80a78786), hardened decimal serialization after identifying locale-sensitive prices.

### Team follow-up

The work continued as team ownership rather than ending with my last implementation commit. Teammates added seasonal content that flowed through the shared FAQ representation, separated sitemap inclusion from page indexability, corrected visible coupon counts, and revised reliability language for compliance. Because visible FAQs and JSON-LD shared data, the August 2025 copy correction updated both representations together. In November, the team also hardened date handling for Article schema in the central schema file.

## Outcome

The result was broader and more consistent machine-readable coverage of merchant pages without replacing the procedural page system. The work established three useful seams:

- FAQs could be updated once and reflected in visible and structured representations.
- Heterogeneous promotions passed through a normalized shape before schema mapping.
- JSON-LD encoding and decimal formatting had shared output rules.

This is an architecture and coverage outcome, not a claim about search performance. I do not yet have Search Console, rich-result, traffic, conversion, or revenue evidence that would support attributing an external SEO result to these changes.

## What did not work

The implementation was intentionally iterative, and several early choices did not survive contact with the full page lifecycle:

- The first commit called the change JSON-LD but implemented a Microdata wrapper.
- The first combined JSON block was hand-built and vulnerable to invalid punctuation and trailing commas.
- The emitter initially ran before every dynamic FAQ was available.
- The newer merchant layout was covered before the legacy layout, requiring a follow-up.
- A temporary FAQ limit was introduced and then removed.
- The promotion normalizer duplicated only part of a much larger placement pipeline, so equivalence with every visible ordering rule still needs rendered verification.

The current evidence review also found issues that prevent me from presenting the implementation as fully validated: an unsafe outer FAQ interpolation, mismatched FAQ closure arguments, an `ItemList` construction mismatch, and defects in the Dataset description helper. These are concrete follow-up work, not reasons to hide the broader design, but the case study remains a draft until representative pages and every emitted block are revalidated.

## Validation still required

Before publishing this case study, I need to recover the original PR and ENG ticket context and test a matrix of merchant pages across present, missing, and edge-case data. The rendered JSON-LD should be extracted and checked with Schema.org and relevant Google tooling, including values above and below 1,000, duplicate entities, and parity with visible FAQs, policies, coupon tables, offer order, and instructions.

Only Search Console or comparable production evidence could support claims about indexing or search appearance. Google also limits the practical visibility of FAQ and HowTo rich results, so syntactic validity and semantic coverage should not be confused with guaranteed presentation in search.

## Reflection

The hard part was not knowing how to produce JSON-LD. It was finding a boundary that improved machine-readable output without destabilizing a revenue- and SEO-sensitive page assembled from years of implicit rules.

A greenfield design would likely start with typed domain objects and derive both HTML and structured data from them. Knoji required the reverse approach: discover the domain model hidden in template state, add normalization at the narrowest useful seam, and preserve behavior until each dependency could be verified. Leading the work also meant treating later corrections by the team as part of the system's evolution, rather than reducing the story to only the commits under my name.
