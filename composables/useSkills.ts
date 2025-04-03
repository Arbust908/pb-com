import type { SkillGroup, Skill } from '~/types/Skills'

export const useSkills = () => {
  const store = useSkillsStore()

  const getSkillGroups = async (language = 'en'): Promise<SkillGroup[]> => {
    return await store.fetchSkillGroups(language)
  }

  const getSkillGroupById = async (id: string): Promise<SkillGroup | null> => {
    return await store.getSkillGroupById(id)
  }

  const getSkillsByGroupId = async (groupId: string): Promise<Skill[]> => {
    return await store.fetchSkillsByGroupId(groupId)
  }

  const getSkillById = async (id: string): Promise<Skill | null> => {
    return await store.getSkillById(id)
  }

  const clearCache = () => {
    store.clearCache()
  }

  return {
    getSkillGroups,
    getSkillGroupById,
    getSkillsByGroupId,
    getSkillById,
    clearCache,
    isLoading: computed(() => store.isLoading),
    hasError: computed(() => store.hasError),
    errorMessage: computed(() => store.errorMessage),
  }
}
