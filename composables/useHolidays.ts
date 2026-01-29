export interface Holiday {
  id?: number
  name: string
  date: string
  endDate?: string | null
  createdAt?: string
  updatedAt?: string
}

interface ApiResponse<T> {
  success: boolean
  data: T
}

export function useHolidays() {
  const holidays = useState<Holiday[]>('holidays', () => [])
  const loading = useState<boolean>('holidays-loading', () => false)
  const error = useState<string | null>('holidays-error', () => null)

  const fetchHolidays = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch<ApiResponse<Holiday[]>>('/api/holidays')
      holidays.value = response.data || []
      return holidays.value
    }
    catch (err: any) {
      error.value = err.data?.statusMessage || 'Failed to fetch holidays'
      console.error('Error fetching holidays:', err)
      return []
    }
    finally {
      loading.value = false
    }
  }

  const createHoliday = async (holiday: Omit<Holiday, 'id' | 'createdAt' | 'updatedAt'>) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch<ApiResponse<Holiday>>('/api/holidays', {
        method: 'POST',
        body: holiday,
      })
      await fetchHolidays() // Refresh the list
      return response.data
    }
    catch (err: any) {
      error.value = err.data?.statusMessage || 'Failed to create holiday'
      console.error('Error creating holiday:', err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const updateHoliday = async (id: number, updates: Partial<Holiday>) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch<ApiResponse<Holiday>>(`/api/holidays/${id}`, {
        method: 'PATCH',
        body: updates,
      })
      await fetchHolidays() // Refresh the list
      return response.data
    }
    catch (err: any) {
      error.value = err.data?.statusMessage || 'Failed to update holiday'
      console.error('Error updating holiday:', err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const deleteHoliday = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      await $fetch(`/api/holidays/${id}`, {
        method: 'DELETE',
      })
      await fetchHolidays() // Refresh the list
      return true
    }
    catch (err: any) {
      error.value = err.data?.statusMessage || 'Failed to delete holiday'
      console.error('Error deleting holiday:', err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  return {
    holidays: readonly(holidays),
    loading: readonly(loading),
    error: readonly(error),
    fetchHolidays,
    createHoliday,
    updateHoliday,
    deleteHoliday,
  }
}
