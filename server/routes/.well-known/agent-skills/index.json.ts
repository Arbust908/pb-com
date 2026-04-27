import { createHash } from 'node:crypto'
import { defineEventHandler, setHeader } from 'h3'

const SITE_URL = 'https://panchoblanco.com'
const SCHEMA_URL
  = 'https://raw.githubusercontent.com/cloudflare/agent-skills-discovery-rfc/main/schema/v0.2.0.json'

interface SkillEntry {
  name: string
  type: 'markdown'
  description: string
  url: string
  sha256: string
}

const skillFiles: Array<{
  name: string
  description: string
  // Path served as a static asset from /public, used to fetch the file at runtime.
  path: string
}> = [
  {
    name: 'cv-lookup',
    description: 'Fetch Pancho Blanco\'s CV data (experiences, skills, studies, languages).',
    path: '/.well-known/agent-skills/cv-lookup/SKILL.md',
  },
]

let cached: { skills: SkillEntry[], expires: number } | null = null
const CACHE_MS = 5 * 60 * 1000

async function loadSkills(): Promise<SkillEntry[]> {
  if (cached && cached.expires > Date.now())
    return cached.skills

  const skills = await Promise.all(
    skillFiles.map(async (s) => {
      // Pull the raw markdown via internal $fetch so we don't depend on filesystem
      // layout in the build output. Returns string for text responses.
      const body = await $fetch<string>(s.path, { responseType: 'text' })
      const sha256 = createHash('sha256').update(body).digest('hex')
      return {
        name: s.name,
        type: 'markdown' as const,
        description: s.description,
        url: `${SITE_URL}${s.path}`,
        sha256,
      }
    }),
  )

  cached = { skills, expires: Date.now() + CACHE_MS }
  return skills
}

export default defineEventHandler(async (event) => {
  setHeader(event, 'Content-Type', 'application/json; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=3600')

  let skills: SkillEntry[] = []
  try {
    skills = await loadSkills()
  }
  catch {
    // If skill files cannot be fetched at runtime (e.g. cold start race),
    // return a valid index with no entries rather than 500ing discovery.
    skills = []
  }

  return {
    $schema: SCHEMA_URL,
    skills,
  }
})
