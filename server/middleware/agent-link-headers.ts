import { appendHeader, defineEventHandler, getRequestURL } from 'h3'

// Routes that get RFC 8288 Link headers pointing to discovery resources.
// Limited to user-facing landing pages so we don't pollute API responses or assets.
const linkedPaths = new Set<string>(['/', '/cv', '/portfolio', '/blog'])

const links = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
  '</.well-known/agent-skills/index.json>; rel="https://agentskills.io/rels/skills-index"; type="application/json"',
]

export default defineEventHandler((event) => {
  if (event.method !== 'GET' && event.method !== 'HEAD')
    return

  const path = getRequestURL(event).pathname
  // Normalize trailing slash for comparison (except root).
  const normalized = path !== '/' && path.endsWith('/') ? path.slice(0, -1) : path
  if (!linkedPaths.has(normalized))
    return

  for (const link of links)
    appendHeader(event, 'Link', link)
})
