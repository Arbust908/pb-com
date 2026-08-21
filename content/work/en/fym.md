---
slug: fym
translationKey: fym
locale: en
title: Keeping FYM useful while planning its replacement
description: How I took ownership of a decade-old dental-practice system, stabilized its delivery, introduced recoverable deletion, and designed a lower-risk path toward replacement
project: FYM
organization: Dental practice
projectType: professional
sortOrder: 80
role: Legacy application maintainer and modernization lead
period: 2025 - present
technologies:
  - Symfony 2.8
  - PHP
  - PostgreSQL 11
  - Doctrine
  - Twig
  - GitHub Actions
  - Hono
  - Nuxt
skills:
  - Legacy modernization
  - Data lifecycle design
  - Deployment engineering
  - Interface design
  - Migration architecture
areas:
  - frontend
  - backend
  - architecture
  - data
  - legacy
featured: false
draft: false
---

## Inheriting FYM

FYM is the operating system for a dental practice. It connects patient records, appointments, clinical histories, odontograms, X-rays, treatment plans, laboratory work, billing, and staff access. When I inherited it from its previous developer, the application had been largely static for roughly ten years, but the company still depended on it for daily work.

It ran on Symfony 2.8, Doctrine 2, Twig, AdminLTE 2, Bower, and Assetic, with a manually managed dependency tree and PostgreSQL 11. Packages could not be upgraded safely, automatic schema updates were prohibited, and clinical images and financial records made data loss unacceptable.

My responsibility had two horizons: keep the existing application reliable and useful now, while creating an incremental route away from a stack that could no longer be conventionally updated.

## Rebuilding delivery

The first assignment was moving FYM onto a new server setup without interrupting the practice. I reconstructed how the application ran, preserved its frozen dependencies, and configured PHP, Nginx, PostgreSQL, permissions, cache behavior, and asset generation.

I then established a GitHub Actions deployment path adapted to Symfony 2's console layout, manual cache handling, filesystem permissions, and the server's PHP and OPcache behavior. This replaced undocumented server state with a repeatable production-target process. The original cutover and database-transfer logs still need to be recovered before I present the complete migration as independently verified.

This established the rule for everything that followed: FYM could be improved, but every change had to preserve clinical and administrative continuity.

## Recoverable deletion as a system change

The strongest example was patient deletion. A destructive delete was too risky for a record connected to appointments, care history, treatments, payments, and images. Hiding a patient in one screen was also insufficient; the same patient could reappear through search, calendars, reports, or related records.

I introduced a recoverable lifecycle for patient records:

- deletion and recovery timestamps;
- the staff member responsible for each action;
- restricted deletion and recovery actions;
- a separate view for deleted patients;
- confirmation and recovery interfaces;
- functional test cases covering the intended lifecycle.

The initial feature exposed how cross-cutting deletion really was. Follow-up work added PostgreSQL-compatible migration SQL, registered Doctrine's soft-delete filter, removed deleted patients from ordinary listings, and corrected counts, search, pagination, and care-record queries.

I later propagated the same boundary into professional selectors, user management, and the treatment catalog. This was less a delete button than a gradual definition of what an "active" record meant across the application.

```text
Delete request
     |
     v
record marked deleted + actor/time retained
     |
     +----> ordinary queries exclude it
     |
     +----> related appointments and care views tolerate its absence
     |
     +----> restricted recovery view can restore it
```

## Improving daily use

Once deployment and record lifecycle behavior were safer, I worked through smaller problems that affected routine use of the company system.

- Patient, treatment, laboratory, login, profile, and user-management screens received clearer actions, more consistent tables and forms, and responsive presentation improvements.
- Appointment views and event feeds were hardened against deleted or missing patients.
- Argentine currency presentation, input parsing, and financial-value precision were corrected.
- Unbounded appointment loading was replaced with date-range queries matching the visible calendar interval.

These changes avoid known failure modes and express daily workflows more clearly. Usability studies, accounting reconciliation, and performance measurements would be needed before claiming a quantified effect.

## Choosing an incremental migration

There were three broad options:

1. Keep patching it indefinitely. This protected short-term continuity but left the practice on frozen dependencies and server-specific knowledge.
2. Rewrite it in one cutover. This offered a clean target, but coupled product redesign, data migration, image transfer, workflow parity, and infrastructure replacement into one high-risk event.
3. Separate data egress from product replacement. Stabilize the legacy application, expose a read-only migration boundary, verify copies independently, and replace workflows in controlled increments.

I chose the third direction. The final stack is intentionally not locked yet. First I need a trustworthy data inventory, a repeatable copy process, and evidence about which workflows must be preserved. That keeps a framework decision from becoming the migration strategy.

## Proving the migration boundary

To test that boundary, I built a local prototype alongside the legacy repository. A standalone TypeScript service uses Hono and an introspected PostgreSQL schema to provide authenticated, read-only access to 29 legacy entities. A serialization layer translates Spanish database names into English API names without changing FYM.

The prototype also inventories patient uploads and returns original image files. A Nuxt explorer makes entity counts, fields, relationships, and paginated records inspectable while keeping the API credential on the server.

```text
Legacy FYM
Symfony 2.8 + PostgreSQL + patient images
              |
              | read-only, authenticated access
              v
Migration API prototype
Hono + field translation + image inventory
              |
              v
Nuxt inspection UI
schema, relationships, counts, sample records
              |
              v
Future verified copy and replacement workflows
target stack still to be determined
```

This resolves one architectural uncertainty: FYM's data can be inspected through a separate boundary without changing the production application or schema. It does not yet prove a safe migration. Contract tests, safer image handling, checksums, reliable update tracking, deployment, and a sanitized end-to-end copy remain outstanding.

The planned backup interface and SQLite synchronization receiver are design work only. No backup GUI, receiver, replacement clinical application, or production cutover has been delivered through this modernization workspace.

## Where the work stands

### Legacy delivery

**Work:** Server compatibility and repeatable deployment. **Evidence:** Committed, remotely published, and supported by successful production-target automation runs.

### Record lifecycle and daily workflows

**Work:** Recoverable deletion, active-record filtering, interface improvements, financial corrections, appointment fixes, and bounded calendar queries. **Evidence:** Committed and remotely published; production use and measured outcomes still need verification.

### Migration boundary

**Work:** Read-only Hono API, field translation, image inventory, and Nuxt inspection interface. **Evidence:** Implemented as a local, uncommitted prototype; not delivered or deployed.

### Future migration

**Work:** Backup interface, synchronization receiver, replacement application, and cutover. **Evidence:** Architecture plans only; none are claimed as built or completed.

## Continuity now, replacement later

FYM now has a repeatable deployment path, recoverable deletion semantics, safer inactive-record handling, bounded appointment queries, and clearer interfaces. In parallel, the prototype demonstrates a way to inspect legacy data without making the old application the foundation of every future decision.

The value is reducing risk in stages rather than hiding it behind a rewrite announcement. The company can continue using FYM while the migration path is tested against its real data and operating constraints.

## What the work exposed

The first soft-delete implementation was not the final one. Its original SQL used MySQL-specific syntax despite FYM running on PostgreSQL, and filtering was not initially applied everywhere. Each related workflow exposed another route by which inactive data could return.

The prototype exposed similar gaps: the generated schema has 29 entities while older plans describe 30, several proposed sync fields cannot capture every update, and image transfer needs stronger path validation and streaming.

These findings reinforced the migration approach: use prototypes to expose unknowns, but do not confuse a plausible architecture with a verified transfer.

## What comes next

FYM best demonstrates stewardship under constraint. The engineering challenge was not merely writing newer code; it was learning where an old system encoded the practice's real operating rules, improving those rules without losing data, and creating seams through which the system can eventually be replaced.

The next decision is not simply "which framework should replace Symfony?" It is whether the migration boundary can produce a complete, repeatable, and independently verifiable copy. Only then should the replacement stack and workflow-by-workflow cutover be finalized.

This case study remains a draft until my public role, publication permission, production deployment evidence, and sanitized validation material are confirmed.
