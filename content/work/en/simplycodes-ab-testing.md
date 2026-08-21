---
slug: simplycodes-ab-testing
translationKey: simplycodes-ab-testing
locale: en
title: Building Data-Driven Engine
description: How we made product experiments measurable across analytics, server rendering, hydration, and variant-aware page caching.
project: SimplyCodes
organization: SimplyCodes · Demand.io
projectType: professional
sortOrder: 10
role: Full-stack lead
period: November 2025
technologies:
  - Nuxt
  - TypeScript
  - Nitro
  - Redis
  - GTM
  - GA4
skills:
  - Experiment infrastructure
  - Product analytics
  - SSR architecture
  - Technical leadership
areas:
  - frontend
  - architecture
  - data
  - product
  - e2e
featured: true
draft: false
---

## Context

The SimplyCodes team wanted product decisions to come from user behavior rather than intuition. A/B testing could also give us a neutral way to resolve competing product opinions: define the expected behavior, expose comparable groups to a controlled change, and use the result to decide what shipped.

The immediate opportunity was Peelie, the interaction used to reveal a coupon code on merchant pages. We hypothesized that a clearer, more deliberate slider would increase meaningful engagement while reducing accidental reveals. Coupon copy rate was the primary metric, but the interaction's prominence also made an unreliable experiment risky. As full-stack lead, I led the team building the delivery and measurement path needed to test it safely.

## The first experiment

We began with a third-party Nuxt split-testing module. The first Peelie test used weighted assignment to preserve the existing interface for most visitors while sending smaller groups to “Unlock” and “Show Code” treatments. We connected the selected variant to coupon impressions and copy interactions, then made the experiment identifier available to the wider analytics pipeline.

That implementation gave us a fast way to test the UI and instrumentation, but it did not give us enough control over assignment in our production architecture. Merchant pages were server rendered and their HTML was cached. A variant selected only in the browser could disagree with the server response, change during hydration, or inherit markup generated for another group.

We reverted the treatment rather than collect data from an experiment whose delivery path we did not trust.

## Validate the measurement before the treatment

The revert changed the next question. Before asking whether a new coupon interaction performed better, we needed to know whether assignment and analytics worked correctly when the visible experience did not change.

We introduced hidden A/A-style groups and sent their assignment through the same analytics events planned for the treatment. This work exposed instrumentation defects, including event selection and the exact `test_variant` field name. Fixing those issues before evaluating the UI prevented reporting problems from becoming product conclusions.

The A/A step confirmed that experiment context reached analytics. It also established a team practice: validate the measurement path before trusting differences between treatments.

## Requirements exposed by the prototype

The first implementation turned a UI experiment into a systems problem. A trustworthy tool needed to provide:

- weighted allocation for controlled rollouts;
- a stable assignment persisted between requests;
- validation when an old or invalid variant cookie returned;
- assignment early enough to participate in server rendering;
- the same variant during hydration and client navigation;
- experiment context on analytics events;
- route targeting so a test ran only where intended;
- one HTML-cache partition per variant.

We replaced the dependency with a small local TypeScript implementation so those rules were explicit and testable inside the application.

## The page-cache constraint

Caching was the requirement that changed the architecture most.

Store pages used Nitro and Redis to cache server-rendered HTML. Without variant-aware caching, the first rendered response for a URL could become the shared response for every visitor to that page. A visitor assigned to a control could receive challenger markup, or the analytics assignment could disagree with the interface that was actually shown. Either outcome would damage the experience and the experiment data.

Varying the cache on the complete `Cookie` header would isolate responses, but it would also create excessive cache fragmentation because unrelated cookies would produce new entries. We iterated from broad cookie variance, through a dedicated variant header, to a test-specific `peelie-a-b` cookie. That gave each experiment variant its own page-cache partition without giving every unrelated cookie a separate copy of the page.

```text
Request
  -> read peelie-a-b cookie
  -> select the variant cache partition
  -> assign a weighted variant when the cookie is absent or invalid
  -> store the assignment in Nuxt server state
  -> render variant-specific HTML
  -> hydrate with the same assignment
  -> attach test_variant to analytics events
```

## Architecture and implementation

A centralized configuration defined each experiment's name, cookie, routes, variants, and weights. Server-side route middleware checked that configuration before rendering a matching page.

For a returning visitor, the middleware validated and reused the persisted variant. For a new visitor, it combined available analytics identity with a random fallback, selected from cumulative variant weights, and wrote the result to a 30-day cookie. Persistence, rather than the initial seed alone, kept later requests stable.

The middleware also wrote the selected name to Nuxt `useState`. The split-test composable could therefore render the correct treatment during SSR and reuse the serialized state during hydration. On the client, the composable read the same cookie for later navigation. The application store exposed the formatted variant to the GTM data layer so GA4 events could be interpreted in the context of the interface shown.

Tests covered weighted boundaries, uneven allocations, missing analytics cookies, fallback seeds, valid and invalid persisted variants, route matching, and configuration shape. The goal was not to test random outcomes; it was to protect the invariants that made the resulting data meaningful.

## Peelie as the pilot

The local pilot used four equally weighted groups: two controls and two slider treatments, one retaining the merchant logo and another simplifying the mobile presentation. The duplicate controls gave us another baseline comparison while the challengers tested whether a more explicit gesture produced clearer, higher-intent coupon engagement.

We refined the treatments across desktop and mobile without changing the assignment contract underneath them. In parallel, another engineer on the team used split testing while developing PostClick V2, adding variant context to its impression, copy, and vote events. That work was a separate implementation path, but it reinforced that experimentation was becoming a team capability rather than one component's special case.

## Outcome

The control produced a statistically significant win on coupon copy rate, so we removed the Peelie treatments and retained the existing interaction. That was a successful product decision: the purpose of experimentation was not to justify shipping a redesign, but to make either changing or retaining the experience defensible with evidence.

The reusable outcome was the testing capability itself. The team had an explicit path from hypothesis to weighted delivery, analytics validation, SSR-consistent rendering, variant-aware caching, and cleanup after a decision. Experiments could now inform disagreements with behavioral data instead of asking one opinion to win by default.

```text
Product question
  -> hypothesis
  -> A/A instrumentation check
  -> controlled treatment
  -> GTM and GA4 evidence
  -> keep, promote, revise, or remove
```

## What did not work

The fastest initial implementation was not suitable for the system that had to host it. The third-party module helped us prototype, but its abstraction did not account for the level of SSR and cache control our merchant pages required.

Our first instrumentation was also not ready to support a decision. Event and field-name corrections found during A/A validation showed why analytics should be tested as part of the product path, not treated as a reporting task after launch.

Finally, varying cached HTML on every cookie was technically simple but operationally wasteful. Narrowing cache identity to the experiment variant preserved both assignment isolation and the value of page caching.

## Reflection

Being data-driven starts before reading a dashboard. If assignment changes across rendering boundaries, cached pages mix treatments, or exposure events describe a different interface from the one a visitor saw, more data only creates more confidence in the wrong conclusion.

The most important result of the Peelie experiment was therefore broader than its winning control. It gave the team a repeatable way to turn a product disagreement into a testable question, verify the measurement system, and accept the answer even when that answer was to keep what we already had.
