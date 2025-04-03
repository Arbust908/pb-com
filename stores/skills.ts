import { defineStore } from 'pinia'
import type { SkillGroup, Skill } from '~/types/Skills'

export const useSkillsStore = defineStore('skills', () => {
  // State
  const skillGroups = ref<Record<string, SkillGroup[]>>({})
  const skillsByGroup = ref<Record<string, Skill[]>>({})
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const getSkillGroupsByLanguage = (language: string): SkillGroup[] => {
    return skillGroups.value[language] || []
  }

  const getSkillsByGroupId = (groupId: string): Skill[] => {
    return skillsByGroup.value[groupId] || []
  }

  const isLoading = computed(() => loading.value)
  const hasError = computed(() => !!error.value)
  const errorMessage = computed(() => error.value)

  // Actions
  async function fetchSkillGroups(language = 'en') {
    // If we already have this language cached, return early
    if (skillGroups.value[language]?.length > 0)
      return skillGroups.value[language]

    loading.value = true
    error.value = null

    try {
      const supabase = useSupabaseClient()
      const { data, error: supabaseError } = await supabase
        .from('skill_groups')
        .select('*')
        .eq('language', language)
        .order('title')

      if (supabaseError)
        throw new Error(`Error fetching skill groups: ${supabaseError.message}`)

      // Update cache
      skillGroups.value[language] = data
      return data
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return []
    }
    finally {
      loading.value = false
    }
  }

  async function fetchSkillsByGroupId(groupId: string) {
    // If we already have this group cached, return early
    if (skillsByGroup.value[groupId]?.length > 0)
      return skillsByGroup.value[groupId]

    loading.value = true
    error.value = null

    try {
      const supabase = useSupabaseClient()
      const { data, error: supabaseError } = await supabase
        .from('skills')
        .select('*')
        .eq('parent_group_id', groupId)
        .order('title')

      if (supabaseError)
        throw new Error(`Error fetching skills: ${supabaseError.message}`)

      // Update cache
      skillsByGroup.value[groupId] = data
      return data
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return []
    }
    finally {
      loading.value = false
    }
  }

  async function getSkillGroupById(id: string): Promise<SkillGroup | null> {
    // Check all cached languages first
    for (const groups of Object.values(skillGroups.value)) {
      const found = groups.find(group => group.id === id)
      if (found)
        return found
    }

    loading.value = true
    error.value = null

    try {
      const supabase = useSupabaseClient()
      const { data, error: supabaseError } = await supabase
        .from('skill_groups')
        .select('*')
        .eq('id', id)
        .single()

      if (supabaseError && supabaseError.code !== 'PGRST116') // PGRST116 is "not found"
        throw new Error(`Error fetching skill group: ${supabaseError.message}`)

      return data
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return null
    }
    finally {
      loading.value = false
    }
  }

  async function getSkillById(id: string): Promise<Skill | null> {
    // Check all cached groups first
    for (const skills of Object.values(skillsByGroup.value)) {
      const found = skills.find(skill => skill.id === id)
      if (found)
        return found
    }

    loading.value = true
    error.value = null

    try {
      const supabase = useSupabaseClient()
      const { data, error: supabaseError } = await supabase
        .from('skills')
        .select('*')
        .eq('id', id)
        .single()

      if (supabaseError && supabaseError.code !== 'PGRST116')
        throw new Error(`Error fetching skill: ${supabaseError.message}`)

      return data
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return null
    }
    finally {
      loading.value = false
    }
  }

  function clearCache() {
    skillGroups.value = {}
    skillsByGroup.value = {}
    error.value = null
  }

  return {
    // State
    skillGroups,
    skillsByGroup,
    loading,
    error,

    // Getters
    getSkillGroupsByLanguage,
    getSkillsByGroupId,
    isLoading,
    hasError,
    errorMessage,

    // Actions
    fetchSkillGroups,
    fetchSkillsByGroupId,
    getSkillGroupById,
    getSkillById,
    clearCache,
  }
})
