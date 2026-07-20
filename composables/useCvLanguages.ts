export interface CvLanguage {
  id: number
  slug: string
  sortOrder: number
  createdAt: string
  updatedAt: string
  translations: Record<string, Record<string, string>>
}

interface ApiResponse<T> {
  success: boolean
  data: T
}

export function useCvLanguages() {
  const languages = useState<CvLanguage[]>('cv-languages', () => [])
  const loading = useState<boolean>('cv-languages-loading', () => false)
  const error = useState<string | null>('cv-languages-error', () => null)

  const fetch = async (locale?: string) => {
    loading.value = true
    error.value = null
    try {
      const query = locale ? `?locale=${locale}` : ''
      const response = await $fetch<ApiResponse<CvLanguage[]>>(`/api/cv/languages${query}`)
      languages.value = response.data || []
      return languages.value
    }
    catch (err: unknown) {
      const e = err as { data?: { statusMessage?: string } }
      error.value = e.data?.statusMessage || 'Failed to fetch languages'
      console.error('Error fetching languages:', err)
      return []
    }
    finally {
      loading.value = false
    }
  }

  return {
    languages: readonly(languages),
    loading: readonly(loading),
    error: readonly(error),
    fetch,
  }
}
