import { defineEventHandler, getHeader, getRequestURL, setHeader } from 'h3'

interface CvTranslations { [locale: string]: { [field: string]: string } }
interface CvExperience { id: number, company: string, startDate: string, endDate: string | null, translations: CvTranslations }
interface CvSkill { id: number, skillList: string, translations: CvTranslations }
interface CvLanguage { id: number, translations: CvTranslations }
interface CvListResponse<T> { success: boolean, data: T[] }

const SITE_URL = 'https://panchoblanco.com'

function acceptsMarkdown(accept: string): boolean {
  // Return markdown only when the client explicitly asks for it. Browsers send
  // `text/html,...` and never `text/markdown`, so we won't downgrade them.
  return accept.toLowerCase().includes('text/markdown')
}

function tr(item: { translations: CvTranslations }, field: string, locale = 'en'): string {
  return item.translations?.[locale]?.[field] ?? item.translations?.en?.[field] ?? ''
}

async function safeFetch<T>(url: string): Promise<T | null> {
  try {
    const fetcher = $fetch as unknown as (input: string) => Promise<unknown>
    return (await fetcher(url)) as T
  }
  catch {
    return null
  }
}

async function renderHomepageMarkdown(): Promise<string> {
  const [experiences, skills, languages] = await Promise.all([
    safeFetch<CvListResponse<CvExperience>>('/api/cv/experiences'),
    safeFetch<CvListResponse<CvSkill>>('/api/cv/skills'),
    safeFetch<CvListResponse<CvLanguage>>('/api/cv/languages'),
  ])

  const lines: string[] = []
  lines.push('# Pancho Blanco — Desarrollador Creativo')
  lines.push('')
  lines.push('Hola, soy Pancho Blanco — desarrollador y diseñador gráfico con más de 8 años en la industria. Apasionado por enseñar y aprender.')
  lines.push('')
  lines.push(`- Site: <${SITE_URL}/>`)
  lines.push(`- CV: <${SITE_URL}/cv>`)
  lines.push(`- Blog: <${SITE_URL}/blog>`)
  lines.push(`- Portfolio: <${SITE_URL}/portfolio>`)
  lines.push(`- API catalog: <${SITE_URL}/.well-known/api-catalog>`)
  lines.push('')

  const exp = experiences?.data ?? []
  if (exp.length > 0) {
    const current = exp.find(e => e.endDate === null)
    const ended = exp.filter(e => e.endDate !== null)
      .sort((a, b) => new Date(b.endDate as string).getTime() - new Date(a.endDate as string).getTime())
    const recent = [current, ended[0]].filter(Boolean) as CvExperience[]

    if (recent.length > 0) {
      lines.push('## Recent work')
      lines.push('')
      for (const e of recent) {
        const role = tr(e, 'rol')
        const desc = tr(e, 'description')
        const end = e.endDate ? new Date(e.endDate).toISOString().slice(0, 10) : 'present'
        const start = new Date(e.startDate).toISOString().slice(0, 10)
        lines.push(`### ${role} @ ${e.company}`)
        lines.push(`*${start} — ${end}*`)
        lines.push('')
        if (desc) {
          lines.push(desc)
          lines.push('')
        }
      }
    }
  }

  const sk = skills?.data ?? []
  if (sk.length > 0) {
    lines.push('## Skills')
    lines.push('')
    for (const s of sk) {
      const title = tr(s, 'title')
      lines.push(`### ${title}`)
      if (s.skillList) {
        lines.push('')
        lines.push(s.skillList)
        lines.push('')
      }
    }
  }

  const langs = languages?.data ?? []
  if (langs.length > 0) {
    lines.push('## Languages')
    lines.push('')
    for (const l of langs)
      lines.push(`- **${tr(l, 'name')}** — ${tr(l, 'level')}`)
    lines.push('')
  }

  return lines.join('\n')
}

const handlers: Record<string, () => Promise<string>> = {
  '/': renderHomepageMarkdown,
}

export default defineEventHandler(async (event) => {
  if (event.method !== 'GET' && event.method !== 'HEAD')
    return

  const accept = getHeader(event, 'accept') ?? ''
  if (!acceptsMarkdown(accept))
    return

  const path = getRequestURL(event).pathname
  const normalized = path !== '/' && path.endsWith('/') ? path.slice(0, -1) : path

  const handler = handlers[normalized]
  if (!handler)
    return

  setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
  setHeader(event, 'Vary', 'Accept')
  setHeader(event, 'Cache-Control', 'public, max-age=300, s-maxage=300')

  if (event.method === 'HEAD')
    return ''

  return await handler()
})
