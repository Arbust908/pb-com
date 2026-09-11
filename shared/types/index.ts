export interface ApiResponse<T> {
  success: boolean
  data: T
}

export interface CvExperienceTranslation {
  rol: string
  description: string
  list: string[]
}

export interface CvExperience {
  id: number
  slug: string
  company: string
  location?: string
  startDate: string
  endDate: string | null
  sortOrder: number
  createdAt: string
  updatedAt: string
  skillSlugs?: string[]
  translations: Record<string, CvExperienceTranslation>
}
export interface CvLanguage {
  id: number
  slug: string
  sortOrder: number
  createdAt: string
  updatedAt: string
  translations: Record<string, Record<string, string>>
}

export interface CvStudy {
  id: number
  slug: string
  dateRange: string
  sortOrder: number
  createdAt: string
  updatedAt: string
  translations: Record<string, Record<string, string>>
}

export interface CvSkill {
  id: number
  slug: string
  name: string
  icon: string
  color: string
  aliases: string[]
  translations: Record<string, CvSkillTranslation>
  status?: 'disabled' | 'enabled'
}

export interface CvSkillTranslation {
  description: string
}

export interface CvSkillGroup {
  id: number
  slug: string
  kind: 'category' | 'collection'
  skillSlugs: string[]
  sortOrder: number
  translations: Record<string, Record<string, string>>
}

export interface CvSkillsData {
  skills: CvSkill[]
  groups: CvSkillGroup[]
}
