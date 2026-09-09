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

export const CvSkillKinds = ['frontend', 'backend', 'architecture', 'e2e', 'product', 'data', 'content', 'legacy'] as const

export const PROJECT_COLORS = {
  SimplyCodes: '#b4ff4b',
  Dealspotr: '#2cd700',
  Knoji: '#009ff4',
  personal: '#f54842',
} as const

export const MOTION_SPRINT_OPTIONS = {
  type: 'spring',
  stiffness: 280,
  damping: 28,
}
/* stiffness: 160,
  damping: 30,
  restDelta: 0.001, */
