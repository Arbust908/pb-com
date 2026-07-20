export interface CvExperience {
  id: number
  slug: string
  company: string
  startDate: string
  endDate: string | null
  sortOrder: number
  createdAt: string
  updatedAt: string
  translations: Record<string, Record<string, string>>
}

interface ApiResponse<T> {
  success: boolean
  data: T
}

export function useCvExperiences() {
  const experiences = useState<CvExperience[]>('cv-experiences', () => [])
  const loading = useState<boolean>('cv-experiences-loading', () => false)
  const error = useState<string | null>('cv-experiences-error', () => null)

  const fetch = async (locale?: string) => {
    loading.value = true
    error.value = null
    try {
      const query = locale ? `?locale=${locale}` : ''
      const response = await $fetch<ApiResponse<CvExperience[]>>(`/api/cv/experiences${query}`)
      experiences.value = response.data || []
      return experiences.value
    }
    catch (err: unknown) {
      const e = err as { data?: { statusMessage?: string } }
      error.value = e.data?.statusMessage || 'Failed to fetch experiences'
      console.error('Error fetching experiences:', err)
      return []
    }
    finally {
      loading.value = false
    }
  }

  return {
    experiences: readonly(experiences),
    loading: readonly(loading),
    error: readonly(error),
    fetch,
  }
}
