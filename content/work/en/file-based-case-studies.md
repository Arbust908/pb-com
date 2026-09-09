---
slug: file-based-case-studies
translationKey: file-based-case-studies
locale: en
title: Designing a file-based case-study system
description: How I replaced a proposed database with Markdown, validated metadata, and an explicit bilingual fallback.
project: Portfolio
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
areas:
  - frontend
  - architecture
  - content
  - e2e
featured: true
draft: false
---

## Context

My portfolio needed to explain the work behind the finished screens. Each case study had to record the problem, constraints, reason for a proof of concept, and changes made after the first implementation.

The first proposal used a database with fixed content blocks and several access levels. That design could support an admin interface and private links, but neither was necessary for the first release.

## The problem

The publishing system needed enough structure to make projects searchable without forcing every story into the same template. It also had to support English and Spanish while allowing a case study to ship before both translations were complete.

Rigid schemas make filtering easy, but long-form case studies need flexibility.

## Options considered

### Database records with fixed blocks

This made metadata and access rules explicit, but introduced hosting, migrations, an editing interface, and operational work before the first article existed.

### Unstructured Markdown

Plain Markdown made writing easy, but offered no reliable fields for filters, article cards, translation matching, or consistent metadata.

### Markdown with validated frontmatter

Nuxt Content provided both. Markdown stores the narrative, while a small frontmatter schema stores the fields the application needs to query.

## Decision

Each language is stored as a separate Markdown document. Translations share a stable key and public slug. Technology and skill metadata remain separate: one describes the tools involved, while the other describes the capabilities the work demonstrates.

> Prefer the smallest publishing system that protects the quality of the story.

English is the fallback language. When Spanish content is missing, the interface says so instead of silently presenting the wrong language. The article-level language control appears only when a translation exists.

## Outcome

Adding a case study now means adding a Markdown file. Adding its translation means adding one more file with the same identity. Filtering and language selection happen from validated metadata, with no runtime database or administration surface.

## What comes later

Private access can wait until a case study requires it. At that point, I can design access around known recipients, expiration rules, and deployment constraints.
