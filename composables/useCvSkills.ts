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

export interface CreateSkillData {
  slug: string
  skillList: string
  sortOrder?: number
  translations?: {
    en?: { title?: string }
    es?: { title?: string }
  }
}

export interface UpdateSkillData extends Partial<CreateSkillData> {}

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

  const create = async (data: CreateSkillData) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch<ApiResponse<CvSkill>>('/api/cv/skills', {
        method: 'POST',
        body: data,
      })
      await fetch()
      return response.data
    }
    catch (err: unknown) {
      const e = err as { data?: { statusMessage?: string } }
      error.value = e.data?.statusMessage || 'Failed to create skill'
      console.error('Error creating skill:', err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const update = async (id: number, data: UpdateSkillData) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch<ApiResponse<CvSkill>>(`/api/cv/skills/${id}`, {
        method: 'PATCH',
        body: data,
      })
      await fetch()
      return response.data
    }
    catch (err: unknown) {
      const e = err as { data?: { statusMessage?: string } }
      error.value = e.data?.statusMessage || 'Failed to update skill'
      console.error('Error updating skill:', err)
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
      await $fetch(`/api/cv/skills/${id}`, {
        method: 'DELETE',
      })
      await fetch()
      return true
    }
    catch (err: unknown) {
      const e = err as { data?: { statusMessage?: string } }
      error.value = e.data?.statusMessage || 'Failed to delete skill'
      console.error('Error deleting skill:', err)
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
        body: { entityType: 'skill', orderedIds },
      })
      await fetch()
      return true
    }
    catch (err: unknown) {
      const e = err as { data?: { statusMessage?: string } }
      error.value = e.data?.statusMessage || 'Failed to reorder skills'
      console.error('Error reordering skills:', err)
      throw err
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
    create,
    update,
    remove,
    reorder,
  }
}
