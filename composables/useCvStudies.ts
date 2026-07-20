export interface CvStudy {
  id: number
  slug: string
  dateRange: string
  sortOrder: number
  createdAt: string
  updatedAt: string
  translations: Record<string, Record<string, string>>
}

interface ApiResponse<T> {
  success: boolean
  data: T
}

export function useCvStudies() {
  const studies = useState<CvStudy[]>('cv-studies', () => [])
  const loading = useState<boolean>('cv-studies-loading', () => false)
  const error = useState<string | null>('cv-studies-error', () => null)

  const fetch = async (locale?: string) => {
    loading.value = true
    error.value = null
    try {
      const query = locale ? `?locale=${locale}` : ''
      const response = await $fetch<ApiResponse<CvStudy[]>>(`/api/cv/studies${query}`)
      studies.value = response.data || []
      return studies.value
    }
    catch (err: unknown) {
      const e = err as { data?: { statusMessage?: string } }
      error.value = e.data?.statusMessage || 'Failed to fetch studies'
      console.error('Error fetching studies:', err)
      return []
    }
    finally {
      loading.value = false
    }
  }

  return {
    studies: readonly(studies),
    loading: readonly(loading),
    error: readonly(error),
    fetch,
  }
}
