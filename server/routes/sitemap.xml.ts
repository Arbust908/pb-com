import { defineEventHandler, setHeader } from 'h3'

const SITE_URL = 'https://panchoblanco.com'

interface SitemapEntry {
  loc: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
  lastmod?: string
}

const today = new Date().toISOString().slice(0, 10)

const entries: SitemapEntry[] = [
  { loc: `${SITE_URL}/`, changefreq: 'weekly', priority: 1.0, lastmod: today },
  { loc: `${SITE_URL}/cv`, changefreq: 'weekly', priority: 0.9, lastmod: today },
  { loc: `${SITE_URL}/portfolio`, changefreq: 'weekly', priority: 0.8, lastmod: today },
  { loc: `${SITE_URL}/blog`, changefreq: 'weekly', priority: 0.6, lastmod: today },
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

export default defineEventHandler((event) => {
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=3600')

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries.map(renderEntry).join('\n'),
    '</urlset>',
    '',
  ].join('\n')

  return body
})
