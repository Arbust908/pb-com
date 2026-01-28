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

export interface CreateStudyData {
  slug: string
  dateRange: string
  sortOrder?: number
  translations?: {
    en?: { place?: string; description?: string }
    es?: { place?: string; description?: string }
  }
}

export interface UpdateStudyData extends Partial<CreateStudyData> {}

export const useCvStudies = () => {
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
    } catch (err: unknown) {
      const e = err as { data?: { statusMessage?: string } }
      error.value = e.data?.statusMessage || 'Failed to fetch studies'
      console.error('Error fetching studies:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  const create = async (data: CreateStudyData) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch<ApiResponse<CvStudy>>('/api/cv/studies', {
        method: 'POST',
        body: data,
      })
      await fetch()
      return response.data
    } catch (err: unknown) {
      const e = err as { data?: { statusMessage?: string } }
      error.value = e.data?.statusMessage || 'Failed to create study'
      console.error('Error creating study:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const update = async (id: number, data: UpdateStudyData) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch<ApiResponse<CvStudy>>(`/api/cv/studies/${id}`, {
        method: 'PATCH',
        body: data,
      })
      await fetch()
      return response.data
    } catch (err: unknown) {
      const e = err as { data?: { statusMessage?: string } }
      error.value = e.data?.statusMessage || 'Failed to update study'
      console.error('Error updating study:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const remove = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      await $fetch(`/api/cv/studies/${id}`, {
        method: 'DELETE',
      })
      await fetch()
      return true
    } catch (err: unknown) {
      const e = err as { data?: { statusMessage?: string } }
      error.value = e.data?.statusMessage || 'Failed to delete study'
      console.error('Error deleting study:', err)
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
        body: { entityType: 'study', orderedIds },
      })
      await fetch()
      return true
    } catch (err: unknown) {
      const e = err as { data?: { statusMessage?: string } }
      error.value = e.data?.statusMessage || 'Failed to reorder studies'
      console.error('Error reordering studies:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    studies: readonly(studies),
    loading: readonly(loading),
    error: readonly(error),
    fetch,
    create,
    update,
    remove,
    reorder,
  }
}
