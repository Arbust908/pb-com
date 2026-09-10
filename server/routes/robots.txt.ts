import { defineEventHandler, setHeader } from 'h3'
import { SITE_URL } from '../../constants'

export default defineEventHandler((event) => {
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=86400, s-maxage=86400')

  const lines = [
    'User-agent: *',
    'Allow: /',
    // Content Signals (https://contentsignals.org/)
    // search=yes  -> allow indexing for search results
    // ai-train=no -> do not use for training generative models
    // ai-input=yes -> allow agent retrieval at query time (RAG / live answers)
    'Content-Signal: search=yes, ai-train=no, ai-input=yes',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ]

  return lines.join('\n')
})
