import type { H3Event } from 'h3'
import { queryCollection } from '@nuxt/content/server'
import { defineEventHandler, setHeader } from 'h3'
import { SITE_URL } from '../../constants'

interface SitemapEntry {
  loc: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
  lastmod?: string
}

const today = new Date().toISOString().slice(0, 10)

const staticEntries: SitemapEntry[] = [
  { loc: `${SITE_URL}/`, changefreq: 'weekly', priority: 1.0, lastmod: today },
  { loc: `${SITE_URL}/cv`, changefreq: 'weekly', priority: 0.9, lastmod: today },
  { loc: `${SITE_URL}/work`, changefreq: 'weekly', priority: 0.8, lastmod: today },
  { loc: `${SITE_URL}/about`, changefreq: 'monthly', priority: 0.7, lastmod: today },
  { loc: `${SITE_URL}/privacy`, changefreq: 'yearly', priority: 0.3, lastmod: today },
  { loc: `${SITE_URL}/es`, changefreq: 'weekly', priority: 1.0, lastmod: today },
  { loc: `${SITE_URL}/es/cv`, changefreq: 'weekly', priority: 0.9, lastmod: today },
  { loc: `${SITE_URL}/es/work`, changefreq: 'weekly', priority: 0.8, lastmod: today },
  { loc: `${SITE_URL}/es/about`, changefreq: 'monthly', priority: 0.7, lastmod: today },
  { loc: `${SITE_URL}/es/privacy`, changefreq: 'yearly', priority: 0.3, lastmod: today },
]

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function renderEntry(entry: SitemapEntry): string {
  const parts: string[] = [`    <loc>${escapeXml(entry.loc)}</loc>`]
  if (entry.lastmod)
    parts.push(`    <lastmod>${entry.lastmod}</lastmod>`)
  if (entry.changefreq)
    parts.push(`    <changefreq>${entry.changefreq}</changefreq>`)
  if (typeof entry.priority === 'number')
    parts.push(`    <priority>${entry.priority.toFixed(1)}</priority>`)
  return `  <url>\n${parts.join('\n')}\n  </url>`
}

interface CaseStudyRow {
  slug: string
  locale: 'en' | 'es'
  publishedAt?: string | null
  sortOrder: number
}

async function caseStudyEntries(event: H3Event): Promise<SitemapEntry[]> {
  const docs = await queryCollection(event, 'caseStudies')
    .select('slug', 'locale', 'publishedAt', 'sortOrder')
    .where('draft', '=', false)
    .order('sortOrder', 'ASC')
    .all() as CaseStudyRow[]

  // One URL pair per slug; prefer the English doc's publishedAt when present.
  const publishedAtBySlug = new Map<string, string | undefined>()
  for (const doc of docs) {
    if (doc.locale === 'en' || !publishedAtBySlug.has(doc.slug))
      publishedAtBySlug.set(doc.slug, doc.publishedAt ?? undefined)
  }

  return [...publishedAtBySlug].flatMap(([slug, publishedAt]) => {
    const entries: SitemapEntry[] = [
      { loc: `${SITE_URL}/work/${slug}`, changefreq: 'weekly', priority: 0.7 },
      { loc: `${SITE_URL}/es/work/${slug}`, changefreq: 'weekly', priority: 0.7 },
    ]
    if (publishedAt) {
      for (const entry of entries)
        entry.lastmod = publishedAt.slice(0, 10)
    }
    return entries
  })
}

export default defineEventHandler(async (event) => {
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=3600')

  const caseStudies = await caseStudyEntries(event)

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    [...staticEntries, ...caseStudies].map(renderEntry).join('\n'),
    '</urlset>',
    '',
  ].join('\n')

  return body
})
