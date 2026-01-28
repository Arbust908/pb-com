<script setup lang="ts">
import type { CvExperience } from '~/composables/useCvExperiences'
import type { CvStudy } from '~/composables/useCvStudies'
import type { CvSkill } from '~/composables/useCvSkills'
import type { CvLanguage } from '~/composables/useCvLanguages'

definePageMeta({
  middleware: 'auth',
})

// Composables
const experienceStore = useCvExperiences()
const studyStore = useCvStudies()
const skillStore = useCvSkills()
const languageStore = useCvLanguages()

// Tab state
const activeTab = ref<'experiences' | 'studies' | 'skills' | 'languages'>('experiences')
const tabs = [
  { key: 'experiences', label: 'Experiences' },
  { key: 'studies', label: 'Studies' },
  { key: 'skills', label: 'Skills' },
  { key: 'languages', label: 'Languages' },
] as const

// UI state
const showForm = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Form states
const editingItem = ref<CvExperience | CvStudy | CvSkill | CvLanguage | null>(null)

const experienceForm = ref({
  slug: '',
  company: '',
  startDate: '',
  endDate: '',
  translations: {
    en: { rol: '', description: '', more: '' },
    es: { rol: '', description: '', more: '' },
  },
})

const studyForm = ref({
  slug: '',
  dateRange: '',
  translations: {
    en: { place: '', description: '' },
    es: { place: '', description: '' },
  },
})

const skillForm = ref({
  slug: '',
  skillList: '',
  translations: {
    en: { title: '' },
    es: { title: '' },
  },
})

const languageForm = ref({
  slug: '',
  translations: {
    en: { name: '', level: '' },
    es: { name: '', level: '' },
  },
})

// Initialize data
onMounted(async () => {
  await Promise.all([
    experienceStore.fetch(),
    studyStore.fetch(),
    skillStore.fetch(),
    languageStore.fetch(),
  ])
})

// Form field definitions
const experienceFields = [
  { key: 'rol', label: 'Role/Title', type: 'input' as const },
  { key: 'description', label: 'Description', type: 'textarea' as const },
  { key: 'more', label: 'More Details', type: 'textarea' as const },
]

const studyFields = [
  { key: 'place', label: 'Institution', type: 'input' as const },
  { key: 'description', label: 'Description', type: 'input' as const },
]

const skillFields = [{ key: 'title', label: 'Category Title', type: 'input' as const }]

const languageFields = [
  { key: 'name', label: 'Language Name', type: 'input' as const },
  { key: 'level', label: 'Proficiency Level', type: 'input' as const },
]

// Helpers
function resetForms() {
  experienceForm.value = {
    slug: '',
    company: '',
    startDate: '',
    endDate: '',
    translations: { en: { rol: '', description: '', more: '' }, es: { rol: '', description: '', more: '' } },
  }
  studyForm.value = {
    slug: '',
    dateRange: '',
    translations: { en: { place: '', description: '' }, es: { place: '', description: '' } },
  }
  skillForm.value = {
    slug: '',
    skillList: '',
    translations: { en: { title: '' }, es: { title: '' } },
  }
  languageForm.value = {
    slug: '',
    translations: { en: { name: '', level: '' }, es: { name: '', level: '' } },
  }
  editingItem.value = null
  showForm.value = false
}

function openCreateForm() {
  resetForms()
  showForm.value = true
}

function openEditExperience(item: CvExperience) {
  editingItem.value = item
  experienceForm.value = {
    slug: item.slug,
    company: item.company,
    startDate: item.startDate,
    endDate: item.endDate || '',
    translations: {
      en: {
        rol: item.translations?.en?.rol || '',
        description: item.translations?.en?.description || '',
        more: item.translations?.en?.more || '',
      },
      es: {
        rol: item.translations?.es?.rol || '',
        description: item.translations?.es?.description || '',
        more: item.translations?.es?.more || '',
      },
    },
  }
  showForm.value = true
}

function openEditStudy(item: CvStudy) {
  editingItem.value = item
  studyForm.value = {
    slug: item.slug,
    dateRange: item.dateRange,
    translations: {
      en: {
        place: item.translations?.en?.place || '',
        description: item.translations?.en?.description || '',
      },
      es: {
        place: item.translations?.es?.place || '',
        description: item.translations?.es?.description || '',
      },
    },
  }
  showForm.value = true
}

function openEditSkill(item: CvSkill) {
  editingItem.value = item
  skillForm.value = {
    slug: item.slug,
    skillList: item.skillList,
    translations: {
      en: { title: item.translations?.en?.title || '' },
      es: { title: item.translations?.es?.title || '' },
    },
  }
  showForm.value = true
}

function openEditLanguage(item: CvLanguage) {
  editingItem.value = item
  languageForm.value = {
    slug: item.slug,
    translations: {
      en: {
        name: item.translations?.en?.name || '',
        level: item.translations?.en?.level || '',
      },
      es: {
        name: item.translations?.es?.name || '',
        level: item.translations?.es?.level || '',
      },
    },
  }
  showForm.value = true
}

// Submit handlers
async function handleExperienceSubmit() {
  errorMessage.value = ''
  successMessage.value = ''
  try {
    const data = {
      ...experienceForm.value,
      endDate: experienceForm.value.endDate || undefined,
    }
    if (editingItem.value) {
      await experienceStore.update((editingItem.value as CvExperience).id, data)
      successMessage.value = 'Experience updated!'
    } else {
      await experienceStore.create(data)
      successMessage.value = 'Experience created!'
    }
    resetForms()
    setTimeout(() => (successMessage.value = ''), 3000)
  } catch (err: unknown) {
    const e = err as { data?: { statusMessage?: string } }
    errorMessage.value = e.data?.statusMessage || 'An error occurred'
    setTimeout(() => (errorMessage.value = ''), 5000)
  }
}

async function handleStudySubmit() {
  errorMessage.value = ''
  successMessage.value = ''
  try {
    if (editingItem.value) {
      await studyStore.update((editingItem.value as CvStudy).id, studyForm.value)
      successMessage.value = 'Study updated!'
    } else {
      await studyStore.create(studyForm.value)
      successMessage.value = 'Study created!'
    }
    resetForms()
    setTimeout(() => (successMessage.value = ''), 3000)
  } catch (err: unknown) {
    const e = err as { data?: { statusMessage?: string } }
    errorMessage.value = e.data?.statusMessage || 'An error occurred'
    setTimeout(() => (errorMessage.value = ''), 5000)
  }
}

async function handleSkillSubmit() {
  errorMessage.value = ''
  successMessage.value = ''
  try {
    if (editingItem.value) {
      await skillStore.update((editingItem.value as CvSkill).id, skillForm.value)
      successMessage.value = 'Skill updated!'
    } else {
      await skillStore.create(skillForm.value)
      successMessage.value = 'Skill created!'
    }
    resetForms()
    setTimeout(() => (successMessage.value = ''), 3000)
  } catch (err: unknown) {
    const e = err as { data?: { statusMessage?: string } }
    errorMessage.value = e.data?.statusMessage || 'An error occurred'
    setTimeout(() => (errorMessage.value = ''), 5000)
  }
}

async function handleLanguageSubmit() {
  errorMessage.value = ''
  successMessage.value = ''
  try {
    if (editingItem.value) {
      await languageStore.update((editingItem.value as CvLanguage).id, languageForm.value)
      successMessage.value = 'Language updated!'
    } else {
      await languageStore.create(languageForm.value)
      successMessage.value = 'Language created!'
    }
    resetForms()
    setTimeout(() => (successMessage.value = ''), 3000)
  } catch (err: unknown) {
    const e = err as { data?: { statusMessage?: string } }
    errorMessage.value = e.data?.statusMessage || 'An error occurred'
    setTimeout(() => (errorMessage.value = ''), 5000)
  }
}

// Delete handlers
async function handleDeleteExperience(item: CvExperience) {
  if (!confirm(`Delete experience at ${item.company}?`)) return
  try {
    await experienceStore.remove(item.id)
    successMessage.value = 'Experience deleted!'
    setTimeout(() => (successMessage.value = ''), 3000)
  } catch (err: unknown) {
    const e = err as { data?: { statusMessage?: string } }
    errorMessage.value = e.data?.statusMessage || 'Failed to delete'
    setTimeout(() => (errorMessage.value = ''), 5000)
  }
}

async function handleDeleteStudy(item: CvStudy) {
  if (!confirm(`Delete study ${item.slug}?`)) return
  try {
    await studyStore.remove(item.id)
    successMessage.value = 'Study deleted!'
    setTimeout(() => (successMessage.value = ''), 3000)
  } catch (err: unknown) {
    const e = err as { data?: { statusMessage?: string } }
    errorMessage.value = e.data?.statusMessage || 'Failed to delete'
    setTimeout(() => (errorMessage.value = ''), 5000)
  }
}

async function handleDeleteSkill(item: CvSkill) {
  if (!confirm(`Delete skill ${item.slug}?`)) return
  try {
    await skillStore.remove(item.id)
    successMessage.value = 'Skill deleted!'
    setTimeout(() => (successMessage.value = ''), 3000)
  } catch (err: unknown) {
    const e = err as { data?: { statusMessage?: string } }
    errorMessage.value = e.data?.statusMessage || 'Failed to delete'
    setTimeout(() => (errorMessage.value = ''), 5000)
  }
}

async function handleDeleteLanguage(item: CvLanguage) {
  if (!confirm(`Delete language ${item.slug}?`)) return
  try {
    await languageStore.remove(item.id)
    successMessage.value = 'Language deleted!'
    setTimeout(() => (successMessage.value = ''), 3000)
  } catch (err: unknown) {
    const e = err as { data?: { statusMessage?: string } }
    errorMessage.value = e.data?.statusMessage || 'Failed to delete'
    setTimeout(() => (errorMessage.value = ''), 5000)
  }
}

// Reorder handlers
async function handleReorderExperiences(ids: number[]) {
  try {
    await experienceStore.reorder(ids)
  } catch {
    errorMessage.value = 'Failed to reorder'
    setTimeout(() => (errorMessage.value = ''), 3000)
  }
}

async function handleReorderStudies(ids: number[]) {
  try {
    await studyStore.reorder(ids)
  } catch {
    errorMessage.value = 'Failed to reorder'
    setTimeout(() => (errorMessage.value = ''), 3000)
  }
}

async function handleReorderSkills(ids: number[]) {
  try {
    await skillStore.reorder(ids)
  } catch {
    errorMessage.value = 'Failed to reorder'
    setTimeout(() => (errorMessage.value = ''), 3000)
  }
}

async function handleReorderLanguages(ids: number[]) {
  try {
    await languageStore.reorder(ids)
  } catch {
    errorMessage.value = 'Failed to reorder'
    setTimeout(() => (errorMessage.value = ''), 3000)
  }
}

// Logout handler
function handleLogout() {
  if (confirm('Are you sure you want to log out?')) {
    const userStore = useUserStore()
    userStore.logout()
    navigateTo('/auth')
  }
}

// Watch for tab changes to close form
watch(activeTab, () => {
  resetForms()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-800 py-8">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8 flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">CV Management</h1>
          <p class="mt-2 text-gray-600 dark:text-gray-400">Manage your CV content with bilingual support</p>
        </div>
        <button
          @click="handleLogout"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <svg class="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v.1" />
          </svg>
          Logout
        </button>
      </div>

      <!-- Messages -->
      <div
        v-if="successMessage"
        class="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 dark:bg-green-900 dark:border-green-800 dark:text-green-300 rounded"
      >
        {{ successMessage }}
      </div>
      <div
        v-if="errorMessage"
        class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 dark:bg-red-900 dark:border-red-800 dark:text-red-300 rounded"
      >
        {{ errorMessage }}
      </div>

      <!-- Tabs -->
      <div class="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav class="-mb-px flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            type="button"
            class="py-4 px-1 border-b-2 font-medium text-sm transition-colors"
            :class="
              activeTab === tab.key
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            "
            @click="activeTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </nav>
      </div>

      <!-- EXPERIENCES TAB -->
      <template v-if="activeTab === 'experiences'">
        <!-- Form -->
        <div v-if="showForm" class="mb-8 bg-white dark:bg-gray-900 shadow rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            {{ editingItem ? 'Edit Experience' : 'Add New Experience' }}
          </h2>
          <form class="space-y-4" @submit.prevent="handleExperienceSubmit">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Slug *</label>
                <input
                  v-model="experienceForm.slug"
                  type="text"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border dark:bg-gray-800 dark:border-gray-600"
                  placeholder="e.g. demandio"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Company *</label>
                <input
                  v-model="experienceForm.company"
                  type="text"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border dark:bg-gray-800 dark:border-gray-600"
                  placeholder="e.g. Demand.io"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date *</label>
                <input
                  v-model="experienceForm.startDate"
                  type="date"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border dark:bg-gray-800 dark:border-gray-600"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
                <input
                  v-model="experienceForm.endDate"
                  type="date"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border dark:bg-gray-800 dark:border-gray-600"
                />
              </div>
            </div>

            <AdminCvTranslationFields v-model="experienceForm.translations" :fields="experienceFields" />

            <div class="flex gap-2">
              <button
                type="submit"
                :disabled="experienceStore.loading.value"
                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {{ experienceStore.loading.value ? 'Saving...' : editingItem ? 'Update' : 'Create' }}
              </button>
              <button
                type="button"
                class="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                @click="resetForms"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <!-- Add Button -->
        <div v-if="!showForm" class="mb-6">
          <button
            class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            @click="openCreateForm"
          >
            <svg class="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
            Add Experience
          </button>
        </div>

        <!-- List -->
        <AdminCvReorderList
          :items="experienceStore.experiences.value as unknown as { id: number; [key: string]: unknown }[]"
          label-key="company"
          sublabel-key="slug"
          :loading="experienceStore.loading.value"
          @edit="openEditExperience($event as unknown as CvExperience)"
          @delete="handleDeleteExperience($event as unknown as CvExperience)"
          @reorder="handleReorderExperiences"
        />
      </template>

      <!-- STUDIES TAB -->
      <template v-if="activeTab === 'studies'">
        <div v-if="showForm" class="mb-8 bg-white dark:bg-gray-900 shadow rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            {{ editingItem ? 'Edit Study' : 'Add New Study' }}
          </h2>
          <form class="space-y-4" @submit.prevent="handleStudySubmit">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Slug *</label>
                <input
                  v-model="studyForm.slug"
                  type="text"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border dark:bg-gray-800 dark:border-gray-600"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Date Range *</label>
                <input
                  v-model="studyForm.dateRange"
                  type="text"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border dark:bg-gray-800 dark:border-gray-600"
                  placeholder="e.g. 2009 - 2013"
                />
              </div>
            </div>

            <AdminCvTranslationFields v-model="studyForm.translations" :fields="studyFields" />

            <div class="flex gap-2">
              <button
                type="submit"
                :disabled="studyStore.loading.value"
                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
              >
                {{ studyStore.loading.value ? 'Saving...' : editingItem ? 'Update' : 'Create' }}
              </button>
              <button
                type="button"
                class="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                @click="resetForms"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div v-if="!showForm" class="mb-6">
          <button
            class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            @click="openCreateForm"
          >
            <svg class="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Add Study
          </button>
        </div>

        <AdminCvReorderList
          :items="studyStore.studies.value as unknown as { id: number; [key: string]: unknown }[]"
          label-key="slug"
          sublabel-key="dateRange"
          :loading="studyStore.loading.value"
          @edit="openEditStudy($event as unknown as CvStudy)"
          @delete="handleDeleteStudy($event as unknown as CvStudy)"
          @reorder="handleReorderStudies"
        />
      </template>

      <!-- SKILLS TAB -->
      <template v-if="activeTab === 'skills'">
        <div v-if="showForm" class="mb-8 bg-white dark:bg-gray-900 shadow rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            {{ editingItem ? 'Edit Skill' : 'Add New Skill' }}
          </h2>
          <form class="space-y-4" @submit.prevent="handleSkillSubmit">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Slug *</label>
                <input
                  v-model="skillForm.slug"
                  type="text"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border dark:bg-gray-800 dark:border-gray-600"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Skill List *</label>
                <input
                  v-model="skillForm.skillList"
                  type="text"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border dark:bg-gray-800 dark:border-gray-600"
                  placeholder="Comma-separated skills"
                />
              </div>
            </div>

            <AdminCvTranslationFields v-model="skillForm.translations" :fields="skillFields" />

            <div class="flex gap-2">
              <button
                type="submit"
                :disabled="skillStore.loading.value"
                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
              >
                {{ skillStore.loading.value ? 'Saving...' : editingItem ? 'Update' : 'Create' }}
              </button>
              <button
                type="button"
                class="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                @click="resetForms"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div v-if="!showForm" class="mb-6">
          <button
            class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            @click="openCreateForm"
          >
            <svg class="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Add Skill
          </button>
        </div>

        <AdminCvReorderList
          :items="skillStore.skills.value as unknown as { id: number; [key: string]: unknown }[]"
          label-key="slug"
          sublabel-key="skillList"
          :loading="skillStore.loading.value"
          @edit="openEditSkill($event as unknown as CvSkill)"
          @delete="handleDeleteSkill($event as unknown as CvSkill)"
          @reorder="handleReorderSkills"
        />
      </template>

      <!-- LANGUAGES TAB -->
      <template v-if="activeTab === 'languages'">
        <div v-if="showForm" class="mb-8 bg-white dark:bg-gray-900 shadow rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            {{ editingItem ? 'Edit Language' : 'Add New Language' }}
          </h2>
          <form class="space-y-4" @submit.prevent="handleLanguageSubmit">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Slug *</label>
              <input
                v-model="languageForm.slug"
                type="text"
                required
                class="mt-1 block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border dark:bg-gray-800 dark:border-gray-600"
                placeholder="e.g. en, es"
              />
            </div>

            <AdminCvTranslationFields v-model="languageForm.translations" :fields="languageFields" />

            <div class="flex gap-2">
              <button
                type="submit"
                :disabled="languageStore.loading.value"
                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
              >
                {{ languageStore.loading.value ? 'Saving...' : editingItem ? 'Update' : 'Create' }}
              </button>
              <button
                type="button"
                class="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                @click="resetForms"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div v-if="!showForm" class="mb-6">
          <button
            class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            @click="openCreateForm"
          >
            <svg class="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Add Language
          </button>
        </div>

        <AdminCvReorderList
          :items="languageStore.languages.value as unknown as { id: number; [key: string]: unknown }[]"
          label-key="slug"
          :loading="languageStore.loading.value"
          @edit="openEditLanguage($event as unknown as CvLanguage)"
          @delete="handleDeleteLanguage($event as unknown as CvLanguage)"
          @reorder="handleReorderLanguages"
        />
      </template>

      <!-- Footer -->
      <div class="mt-8 text-center">
        <NuxtLink to="/cv" class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 font-medium">
          View CV Page
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
