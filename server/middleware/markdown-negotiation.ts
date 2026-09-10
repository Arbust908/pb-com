import type { ApiResponse, CvExperience, CvLanguage, CvSkillsData } from '~/types'
import { defineEventHandler, getRequestURL, setHeader } from 'h3'
import { SITE_URL } from '../../constants'

function tr(item: { translations: Record<string, Record<string, string>> }, field: string, locale = 'en'): string {
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
    safeFetch<ApiResponse<CvExperience[]>>('/api/cv/experiences'),
    safeFetch<ApiResponse<CvSkillsData>>('/api/cv/skills'),
    safeFetch<ApiResponse<CvLanguage[]>>('/api/cv/languages'),
  ])

  const lines: string[] = []
  lines.push('# Pancho Blanco — Front-End Developer')
  lines.push('')
  lines.push('Senior Front-End Developer with 10+ years of experience, specializing in Vue, Nuxt, and TypeScript, with backend experience across Node.js, Express, Laravel, APIs, and SQL DB.')
  lines.push('')
  lines.push(`- Site: <${SITE_URL}/>`)
  lines.push(`- CV: <${SITE_URL}/cv>`)
  lines.push(`- Work: <${SITE_URL}/work>`)
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
        const role = e.translations?.en?.rol ?? ''
        const desc = e.translations?.en?.description ?? ''
        const end = e.endDate ? new Date(e.endDate).toISOString().slice(0, 10) : 'present'
        const start = new Date(e.startDate).toISOString().slice(0, 10)
        lines.push(`### ${role} @ ${e.company}`)
        lines.push(`*${start} — ${end}*`)
        lines.push('')
        if (desc) {
          lines.push(desc)
          lines.push('')
        }
        const items = e.translations?.en?.list ?? []
        if (items.length > 0) {
          for (const item of items)
            lines.push(`- ${item}`)
          lines.push('')
        }
      }
    }
  }

  const skillGroups = skills?.data.groups ?? []
  const skillBySlug = new Map(skills?.data.skills.map(skill => [skill.slug, skill.name]))
  if (skillGroups.length > 0) {
    lines.push('## Skills')
    lines.push('')
    for (const group of skillGroups) {
      const title = tr(group, 'title')
      lines.push(`### ${title}`)
      const skillList = group.skillSlugs.map(slug => skillBySlug.get(slug)).filter(Boolean).join(', ')
      if (skillList) {
        lines.push('')
        lines.push(skillList)
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

export default defineEventHandler(async (event) => {
  if (event.method !== 'GET' && event.method !== 'HEAD')
    return

  const path = getRequestURL(event).pathname
  const normalized = path !== '/' && path.endsWith('/') ? path.slice(0, -1) : path

  if (normalized !== '/index.md')
    return

  setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=300, s-maxage=300')

  if (event.method === 'HEAD')
    return ''

  return await renderHomepageMarkdown()
})
