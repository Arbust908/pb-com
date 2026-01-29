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

export interface CreateExperienceData {
  slug: string
  company: string
  startDate: string
  endDate?: string | null
  sortOrder?: number
  translations?: {
    en?: { rol?: string, description?: string, more?: string }
    es?: { rol?: string, description?: string, more?: string }
  }
}

export interface UpdateExperienceData extends Partial<CreateExperienceData> {}

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

  const create = async (data: CreateExperienceData) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch<ApiResponse<CvExperience>>('/api/cv/experiences', {
        method: 'POST',
        body: data,
      })
      await fetch()
      return response.data
    }
    catch (err: unknown) {
      const e = err as { data?: { statusMessage?: string } }
      error.value = e.data?.statusMessage || 'Failed to create experience'
      console.error('Error creating experience:', err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const update = async (id: number, data: UpdateExperienceData) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch<ApiResponse<CvExperience>>(`/api/cv/experiences/${id}`, {
        method: 'PATCH',
        body: data,
      })
      await fetch()
      return response.data
    }
    catch (err: unknown) {
      const e = err as { data?: { statusMessage?: string } }
      error.value = e.data?.statusMessage || 'Failed to update experience'
      console.error('Error updating experience:', err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const remove = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      await $fetch(`/api/cv/experiences/${id}`, {
        method: 'DELETE',
      })
      await fetch()
      return true
    }
    catch (err: unknown) {
      const e = err as { data?: { statusMessage?: string } }
      error.value = e.data?.statusMessage || 'Failed to delete experience'
      console.error('Error deleting experience:', err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const reorder = async (orderedIds: number[]) => {
    loading.value = true
    error.value = null
    try {
      await $fetch('/api/cv/reorder', {
        method: 'PATCH',
        body: { entityType: 'experience', orderedIds },
      })
      await fetch()
      return true
    }
    catch (err: unknown) {
      const e = err as { data?: { statusMessage?: string } }
      error.value = e.data?.statusMessage || 'Failed to reorder experiences'
      console.error('Error reordering experiences:', err)
      throw err
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
    create,
    update,
    remove,
    reorder,
  }
}
