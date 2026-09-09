import { defineStore } from 'pinia'
import type { ApiResponse, CvExperience, CvLanguage, CvSkillsData, CvStudy } from '~/types'

export const useGlobalStore = defineStore('global', () => {
  const experiences = ref<CvExperience[]>([])
  const languages = ref<CvLanguage[]>([])
  const studies = ref<CvStudy[]>([])
  const skillsData = ref<CvSkillsData>({
    skills: [],
    groups: [],
  })

  async function fetchExperiences() {
    const response = await $fetch<ApiResponse<CvExperience[]>>('/api/cv/experiences')
    experiences.value = response.data || []
  }

  async function fetchLanguages() {
    const response = await $fetch<ApiResponse<CvLanguage[]>>('/api/cv/languages')
    languages.value = response.data || []
  }

  async function fetchSkills() {
    const response = await $fetch<ApiResponse<CvSkillsData>>('/api/cv/skills')
    skillsData.value = response.data || { skills: [], groups: [] }
  }

  async function fetchStudies() {
    const response = await $fetch<ApiResponse<CvStudy[]>>('/api/cv/studies')
    studies.value = response.data || []
  }

  async function fetchAll() {
    await Promise.all([
      fetchExperiences(),
      fetchLanguages(),
      fetchSkills(),
      fetchStudies(),
    ])
  }

  return {
    experiences,
    languages,
    studies,
    skillsData,
    fetchExperiences,
    fetchLanguages,
    fetchSkills,
    fetchStudies,
    fetchAll,
  }
})
