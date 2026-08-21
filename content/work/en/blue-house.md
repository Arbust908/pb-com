---
slug: blue-house
translationKey: blue-house
locale: en
title: Building an Argentine exchange-rate data service
description: How I built Blue House to collect current and historical Argentine dollar rates, expose them through an API, and make their movement easier to understand.
project: Blue House
organization: Personal project
projectType: personal
sortOrder: 70
role: Creator and full-stack developer
period: July - August 2026
technologies:
  - Bun
  - TypeScript
  - PostgreSQL
  - Drizzle ORM
  - Zod
  - Nuxt
  - Vue
  - Tailwind CSS
  - Docker
skills:
  - Product development
  - API design
  - Data engineering
  - System architecture
  - Full-stack development
areas:
  - frontend
  - backend
  - architecture
  - data
  - product
  - e2e
featured: false
draft: true
---

## Project summary

Blue House is a personal project for collecting, querying, and presenting Argentine peso exchange rates against the US dollar. I built it because available sources did not give me one dependable interface for both current quotes and historical changes. The MVP combines live and historical ingestion, PostgreSQL storage, a documented API, and a responsive Nuxt dashboard. It proves the full product path, but not yet the operation or adoption of a mature public service.

## Why one dollar has several rates

In Argentina, asking for "the dollar rate" is not enough. The official rate coexists with the blue, or parallel-market, rate and alternatives including wholesale, securities-based, crypto, and card rates. Each reflects a different way of accessing or valuing dollars.

For most visitors, the first useful comparison is official versus blue. Other rates provide context, but giving all seven equal visual weight would make the product harder to scan. Blue House therefore treats the domain hierarchy as part of the product rather than displaying an undifferentiated table of numbers.

`[Image: official and blue rates shown ahead of the five alternative Argentine dollar rates]`

## The problem

I wanted to find the latest buy and sell values, understand changes over a chosen period, and recover the value available around a historical date. DolarAPI supplied current observations across seven rate categories, while Ambito supplied historical series. Neither source alone covered the complete use case, and their payloads differed in naming, dates, number formats, and whether a series contained separate buy and sell values.

That moved the project beyond wrapping a third-party endpoint. I needed to normalize two providers without erasing provenance, prevent scheduled jobs from duplicating or corrupting data, define Buenos Aires-aware time semantics, and expose the result through an interface that remained useful on a phone.

## Exploration and proof of concept

I used the first vertical slice to test whether I could turn the provider data into a coherent timeline. The initial poller fetched live observations, validated them with Zod, generated deterministic fingerprints, and stored them in PostgreSQL. I then expanded one boundary at a time:

- monthly historical imports tested localized Ambito numbers, dates, and uneven response shapes;
- SQL migrations tested whether the schema could evolve with the product;
- the dashboard tested whether the model supported useful comparisons;
- API routes and an explorer tested access beyond the dashboard;
- ARM64 container work tested deployment to the target environment.

This approach exposed data and operational questions early, before I added accounts, access control, or monetization concepts around an unstable core.

## Choosing the product and system boundaries

### One provider or an internal data layer

Calling DolarAPI directly would have been the smallest current-rate product, but it would not have supplied the historical behavior I needed. I instead made PostgreSQL the internal source of record and retained the provider on every observation.

### One application or a multi-package workspace

I separated collection and presentation into a Bun workspace with a poller, a Nuxt web application, and a shared domain package. This kept provider work out of the request path without duplicating rate definitions across services.

### App-level guards or database-backed coordination

An in-memory lock would protect only one process. PostgreSQL advisory locks coordinate poller invocations through the shared database. Fingerprints and conflict-safe insertion make exact retries idempotent, while run records preserve the status and row counts of each attempt.

## Architecture and data flow

```text
DolarAPI: current observations ----+
                                   |
Ambito: historical monthly data ---+---> Bun poller
                                          |
                                          +-- Zod validation and normalization
                                          +-- provider-aware SHA-256 fingerprints
                                          +-- PostgreSQL advisory locks
                                          +-- transactional insertion and run status
                                          |
                                          v
                                      PostgreSQL
                                          |
                                          v
                                  Nuxt / Nitro API
                                     |          |
                                     v          v
                              Public dashboard  API documentation
                                                and request tester
```

The poller has separate commands and locks for live and historical work. Live polling validates the complete response before writing it. Historical polling processes one calendar month per rate category and invocation, using the latest successful run as its checkpoint. This keeps backfills bounded and retryable, but does not prove that a deployed database contains complete history to the supported January 2002 boundary.

Each observation records its provider, category, source timestamp, buy and sell values, and fingerprint. PostgreSQL uses fixed-scale `numeric(14,4)` values, and current-rate responses retain them as decimal strings. Because the fingerprint includes the provider, timestamp, and values, exact retries are ignored while corrected observations can still be stored.

Observation insertion and successful run finalization share a transaction. If either fails, both roll back and the run is marked failed separately. Unit tests cover the transaction structure; real PostgreSQL rollback and lock-contention tests remain part of deployment verification.

## Turning observations into an API

The Nitro backend separates HTTP validation, repository queries, and service calculations. Its implemented endpoints cover:

- latest rates for all categories or one category;
- raw or Buenos Aires daily-bucketed history;
- change over periods from 24 hours through one year;
- comparison and spread against the official rate;
- single and batch conversion of dated peso amounts into dollars.

Date-only boundaries and daily groups use `America/Argentina/Buenos_Aires` rather than UTC days. Historical conversion first looks for the latest observation available by the requested time. If none exists that day, it searches nearby days and reports whether it used a prior value, a following value, or the simple mean of both. The response includes its source observations, making the estimate inspectable rather than presenting it as an authoritative quote.

I also built browsable documentation and an endpoint tester that generates examples and displays status, duration, and formatted responses. This made API behavior part of the product rather than knowledge held only in source code.

`[Image: interactive API documentation with a request and formatted response]`

## Designing the public view

The dashboard follows a calm "exchange bulletin" direction. Official and blue quotes receive the largest cards, while the other five categories form a secondary group. A seven-series chart shows movement over selectable periods, and freshness remains visible without imitating a trading terminal.

Providers do not update every rate at the same instant, so the chart joins all observation timestamps and carries each category's latest known value forward. The 24-hour view uses raw observations; longer periods use the final observation from each Buenos Aires day.

The interface includes persistent light and dark themes, tabular figures, responsive layouts, visible focus treatment, and reduced-motion handling. These provisions are implemented, but keyboard, contrast, mobile, and assistive-technology audits are still required before claiming WCAG compliance.

`[Image: Blue House dashboard in desktop and mobile layouts, including light and dark themes]`

## Outcome and current state

Blue House now has a working end-to-end MVP:

- a Bun multi-package workspace shared by the poller and web application;
- current and incremental historical ingestion from two providers;
- validated, provenance-aware, deduplicated PostgreSQL observations;
- poll-run tracking, advisory locks, and transactional success finalization;
- current, history, change, comparison, and conversion APIs;
- a responsive dashboard and interactive API documentation;
- multi-stage Dockerfiles for the poller and dashboard, plus a successful ARM64 web-image build and deployment trigger.

Unit tests cover provider validation, fingerprints, historical ranges and time zones, service calculations, conversion fallback, request validation, and chart timelines. Still unverified are current deployment health, scheduler operation, full historical coverage, backup recovery, real-database concurrency, usage, latency, and adoption. Deployment is manually triggered rather than continuous, and the latest demonstrated web deployment does not contain the newest poller changes.

## What changed

The project initially reached into anomaly detection. The available data could not reliably distinguish an error from a delayed update or legitimate market movement, so I removed the feature and simplified the timestamp model rather than exposing a weak signal as trustworthy analysis.

Historical ingestion also changed from an implied all-at-once backfill into monthly checkpoints. Smaller runs made failures observable and retryable.

These changes clarified the MVP: preserve and explain the source data first; add interpretation only when its behavior can be validated.

## Reflection and next steps

Blue House taught me how the boundaries of a small data product fit together: provider adapters, database migrations, scheduled-job semantics, service calculations, container builds, API documentation, and a domain-specific visual system.

The next step is operational proof, not more surface area: repeatable migrations, real-database deduplication and rollback tests, both container builds, scheduler and backup checks, and deployed freshness and reliability measurements.

I have workshopped Redis-backed caching, queues, rate limits, accounts, API keys, webhooks, and possible service tiers. None are shipped. They become useful only when traffic and consumer needs show where caching, asynchronous delivery, or access control solves an observed problem.

This case study remains a draft until the deployment, historical coverage, accessibility, and outcome evidence is complete.
