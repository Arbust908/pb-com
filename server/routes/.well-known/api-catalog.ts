import { defineEventHandler, setHeader } from 'h3'

const SITE_URL = 'https://panchoblanco.com'

interface LinkAttribute { href: string, type?: string, title?: string }
interface LinksetEntry {
  'anchor': string
  'service-doc'?: LinkAttribute[]
  'service-desc'?: LinkAttribute[]
  'status'?: LinkAttribute[]
}

const linkset: LinksetEntry[] = [
  {
    'anchor': `${SITE_URL}/api/cv/experiences`,
    'service-doc': [{ href: `${SITE_URL}/cv`, type: 'text/html', title: 'CV experiences (human view)' }],
  },
  {
    'anchor': `${SITE_URL}/api/cv/skills`,
    'service-doc': [{ href: `${SITE_URL}/cv`, type: 'text/html', title: 'CV skills (human view)' }],
  },
  {
    'anchor': `${SITE_URL}/api/cv/studies`,
    'service-doc': [{ href: `${SITE_URL}/cv`, type: 'text/html', title: 'CV studies (human view)' }],
  },
  {
    'anchor': `${SITE_URL}/api/cv/languages`,
    'service-doc': [{ href: `${SITE_URL}/cv`, type: 'text/html', title: 'CV languages (human view)' }],
  },
]

export default defineEventHandler((event) => {
  setHeader(event, 'Content-Type', 'application/linkset+json; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=86400, s-maxage=86400')
  return { linkset }
})
