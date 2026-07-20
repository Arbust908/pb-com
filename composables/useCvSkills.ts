export interface CvSkill {
  id: number
  slug: string
  skillList: string
  sortOrder: number
  createdAt: string
  updatedAt: string
  translations: Record<string, Record<string, string>>
}

interface ApiResponse<T> {
  success: boolean
  data: T
}

export function useCvSkills() {
  const skills = useState<CvSkill[]>('cv-skills', () => [])
  const loading = useState<boolean>('cv-skills-loading', () => false)
  const error = useState<string | null>('cv-skills-error', () => null)

  const fetch = async (locale?: string) => {
    loading.value = true
    error.value = null
    try {
      const query = locale ? `?locale=${locale}` : ''
      const response = await $fetch<ApiResponse<CvSkill[]>>(`/api/cv/skills${query}`)
      skills.value = response.data || []
      return skills.value
    }
    catch (err: unknown) {
      const e = err as { data?: { statusMessage?: string } }
      error.value = e.data?.statusMessage || 'Failed to fetch skills'
      console.error('Error fetching skills:', err)
      return []
    }
    finally {
      loading.value = false
    }
  }

  return {
    skills: readonly(skills),
    loading: readonly(loading),
    error: readonly(error),
    fetch,
  }
}
