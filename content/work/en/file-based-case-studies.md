---
slug: file-based-case-studies
translationKey: file-based-case-studies
locale: en
title: Designing a file-based case-study system
description: Simplifying a portfolio publishing model around Markdown, structured metadata, and predictable bilingual fallback.
organization: Personal
projectType: personal
sortOrder: 900
publishedAt: 2026-08-19
role: Frontend architect and developer
period: 2026
technologies:
  - Nuxt Content
  - Vue
  - TypeScript
  - Markdown
skills:
  - Frontend architecture
  - Content design
  - Internationalization
featured: true
draft: false
---

## Context

My portfolio needed to explain more than finished screens. A useful case study has to preserve how a problem was understood, which constraints shaped the work, why a proof of concept was justified, and what changed after the first solution met reality.

The first proposal used a database with fixed content blocks and several access levels. That design could support an admin interface and private links, but neither was necessary for the first release.

## The problem

The publishing system needed enough structure to make projects searchable without forcing every story into the same template. It also had to support English and Spanish while allowing a case study to ship before both translations were complete.

Those requirements pull in different directions: rigid schemas make filtering easy, while long-form narratives benefit from flexibility.

## Options considered

### Database records with fixed blocks

This made metadata and access rules explicit, but introduced hosting, migrations, an editing interface, and operational work before the first article existed.

### Unstructured Markdown

Plain Markdown made writing easy, but offered no reliable fields for filters, article cards, translation matching, or consistent metadata.

### Markdown with validated frontmatter

Nuxt Content provided the useful middle ground. Markdown owns the narrative, while a small frontmatter schema owns the information the application needs to query.

## Decision

Each language is stored as a separate Markdown document. Translations share a stable key and public slug. Technology and skill metadata remain separate: one describes the tools involved, while the other describes the capabilities the work demonstrates.

> Prefer the smallest publishing system that protects the quality of the story.

English is the fallback language. When Spanish content is missing, the interface says so instead of silently presenting the wrong language. The article-level language control appears only when it has somewhere meaningful to go.

## Outcome

Adding a case study now means adding a Markdown file. Adding its translation means adding one more file with the same identity. Filtering and language selection happen from validated metadata, with no runtime database or administration surface.

## What comes later

Private access remains a possible second version, not a hidden requirement inside the first one. If sensitive case studies become necessary, their access model can be designed from real recipients, expiration rules, and deployment constraints.
