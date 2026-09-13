export interface SkillTranslation {
  description?: string
}

export interface SkillRecord {
  id: number | string
  slug: string
  name: string
  icon: string
  color: string
  aliases: string[]
  translations: Record<string, SkillTranslation>
  status?: 'disabled' | 'enabled'
}
