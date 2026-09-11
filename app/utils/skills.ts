export interface SkillCatalogEntry {
  slug: string
  name: string
  aliases: string[]
}

export function normalizeSkillLabel(value: string): string {
  return value.trim().toLowerCase()
}

export function resolveSkillLabel<T extends SkillCatalogEntry>(label: string, skills: readonly T[]): T | undefined {
  const normalizedLabel = normalizeSkillLabel(label)

  return skills.find(skill =>
    [skill.name, skill.slug, ...skill.aliases].some(value => normalizeSkillLabel(value) === normalizedLabel),
  )
}

export function resolveSkillSlugs<T extends SkillCatalogEntry>(slugs: readonly string[], skills: readonly T[]): T[] {
  return slugs.flatMap((slug) => {
    const skill = resolveSkillLabel(slug, skills)
    return skill ? [skill] : []
  })
}

export function resolveCaseStudySkills<T extends SkillCatalogEntry>(labels: readonly string[], skills: readonly T[]): Array<T & { name: string }> {
  return labels.flatMap((label) => {
    const skill = resolveSkillLabel(label, skills)
    return skill ? [{ ...skill, name: label }] : []
  })
}
