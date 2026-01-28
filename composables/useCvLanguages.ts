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

export interface CreateLanguageData {
  slug: string
  sortOrder?: number
  translations?: {
    en?: { name?: string; level?: string }
    es?: { name?: string; level?: string }
  }
}

export interface UpdateLanguageData extends Partial<CreateLanguageData> {}

export const useCvLanguages = () => {
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
    } catch (err: unknown) {
      const e = err as { data?: { statusMessage?: string } }
      error.value = e.data?.statusMessage || 'Failed to fetch languages'
      console.error('Error fetching languages:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  const create = async (data: CreateLanguageData) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch<ApiResponse<CvLanguage>>('/api/cv/languages', {
        method: 'POST',
        body: data,
      })
      await fetch()
      return response.data
    } catch (err: unknown) {
      const e = err as { data?: { statusMessage?: string } }
      error.value = e.data?.statusMessage || 'Failed to create language'
      console.error('Error creating language:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const update = async (id: number, data: UpdateLanguageData) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch<ApiResponse<CvLanguage>>(`/api/cv/languages/${id}`, {
        method: 'PATCH',
        body: data,
      })
      await fetch()
      return response.data
    } catch (err: unknown) {
      const e = err as { data?: { statusMessage?: string } }
      error.value = e.data?.statusMessage || 'Failed to update language'
      console.error('Error updating language:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const remove = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      await $fetch(`/api/cv/languages/${id}`, {
        method: 'DELETE',
      })
      await fetch()
      return true
    } catch (err: unknown) {
      const e = err as { data?: { statusMessage?: string } }
      error.value = e.data?.statusMessage || 'Failed to delete language'
      console.error('Error deleting language:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const reorder = async (orderedIds: number[]) => {
    loading.value = true
    error.value = null
    try {
      await $fetch('/api/cv/reorder', {
        method: 'PATCH',
        body: { entityType: 'language', orderedIds },
      })
      await fetch()
      return true
    } catch (err: unknown) {
      const e = err as { data?: { statusMessage?: string } }
      error.value = e.data?.statusMessage || 'Failed to reorder languages'
      console.error('Error reordering languages:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    languages: readonly(languages),
    loading: readonly(loading),
    error: readonly(error),
    fetch,
    create,
    update,
    remove,
    reorder,
  }
}
