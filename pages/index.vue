<script setup lang="ts">
import shuffleLetters from 'shuffle-letters';
// https://github.com/georapbox/shuffle-letters/tree/main
import type { MetaData } from '@/composables/ultimateProtocol'
import { useUP } from '@/composables/ultimateProtocol'
import type { CvExperience } from '@/composables/useCvExperiences'
import type { CvSkill } from '@/composables/useCvSkills'
import type { CvLanguage } from '@/composables/useCvLanguages'

const meta: MetaData = {
  base_url: 'panchoblanco.com',
  title: 'Pancho Blanco :: Desarrollador Creativo',
  description:
          'Hola soy Pancho Blanco, un Desarrollador y Diseñador Grafico. Tengo mas de 8 años en la industria del desarrollo y tengo una pasion por enseñar y aprender.',
}
useHead(useUP(meta))

const { locale } = useI18n()

// ✅ OPTIMIZED: Parallel data fetching for ~3x faster loading
const { data: cvData, pending: pendingCvData, error: cvError } = await useAsyncData('cv-homepage-data', async () => {
  const [experiences, skills, languages] = await Promise.all([
    $fetch('/api/cv/experiences'),
    $fetch('/api/cv/skills'),
    $fetch('/api/cv/languages')
  ])
  return { experiences, skills, languages }
})

const experiences = computed(() => cvData.value?.experiences?.data || [])
const skills = computed(() => cvData.value?.skills?.data || [])
const languages = computed(() => cvData.value?.languages?.data || [])

// Get translation for current locale with fallback to 'en'
function getTranslation(item: CvExperience | CvSkill | CvLanguage, field: string): string {
  const translations = item.translations
  return translations[locale.value]?.[field] || translations.en?.[field] || ''
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(locale.value, { year: 'numeric', month: 'short', day: '2-digit' })
}

// Get current experience + most recent ended experience
const recentExperiences = computed(() => {
  const expList = [...experiences.value]

  // Find current employment (no endDate)
  const currentExp = expList.find(exp => exp.endDate === null)

  // Get all experiences with endDates, sorted by endDate descending
  const endedExps = expList
    .filter(exp => exp.endDate !== null)
    .sort((a, b) => new Date(b.endDate!).getTime() - new Date(a.endDate!).getTime())

  const result = []
  if (currentExp) result.push(currentExp)
  if (endedExps.length > 0) result.push(endedExps[0])

  return result
})

// ✅ OPTIMIZED: Reactive DOM manipulation with proper ref
const heroRef = ref<HTMLElement>()

onMounted(async () => {
  if (heroRef.value) {
    shuffleLetters(heroRef.value)
  }
})

// Loading state for all CV data
const loadingCvData = computed(() => pendingCvData.value)
</script>

<template>
  <section class="flex flex-col items-center gap-4 p-6 text-center">
    <Logo class="w-1/2 fill-current" />
    <h1 class="from-pink-500 to-violet-500 bg-gradient-to-r bg-clip-text text-4xl text-transparent font-light md:(text-6xl -mt-4)">
      Pancho Blanco
    </h1>
    <h2 ref="heroRef" class="text-lg font-bold tracking-widest md:text-3xl min-h-32px">
      {{ $t('rol') }}
    </h2>
    <div class="flex gap-x-4">
      <!-- <NuxtLink
        class="rounded-lg bg-violet-400 px-4 py-1 text-slate-900 transition duration-150 ease-out dark:bg-violet-600 dark:text-slate-100 hover:text-violet-500 hover:shadow dark:hover:bg-violet-800"
        to="/blog"
      >
        Blog
      </NuxtLink> -->
      <NuxtLink
        class="rounded-lg bg-violet-400 px-4 py-1 text-slate-900 transition duration-150 ease-out dark:bg-violet-600 dark:text-slate-100 hover:text-violet-500 hover:shadow dark:hover:bg-violet-800"
        to="/cv"
      >
        Resume
      </NuxtLink>
    </div>
    <!-- <DotHero /> -->
  </section>

  <!-- ✅ OPTIMIZED: Added error handling for API failures -->
  <section v-if="cvError" class="py-8 px-6">
    <div class="max-w-4xl mx-auto text-center">
      <div class="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <h3 class="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
          {{ $t('error_loading_data') || 'Unable to load data' }}
        </h3>
        <p class="text-red-600 dark:text-red-400">
          Please try refreshing the page or contact support.
        </p>
      </div>
    </div>
  </section>

  <!-- CV Overview Section -->
  <section v-else-if="!pendingCvData && (recentExperiences.length > 0 || skills.length > 0 || languages.length > 0)" class="py-8 px-6">
    <div class="max-w-4xl mx-auto space-y-8">

      <!-- Recent Experience -->
      <div v-if="recentExperiences.length > 0">
        <h3 class="text-2xl font-bold mb-6 text-center text-slate-800 dark:text-slate-200">
          {{ $t('recent_work') }}
        </h3>
        <div class="grid grid-cols-1 gap-6">
          <article
            v-for="experience in recentExperiences"
            :key="experience.id"
            class="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4"
          >
            <h4 class="font-semibold text-lg mb-2 flex flex-col gap-1">
              <span class="text-emerald-600 dark:text-emerald-400">{{ getTranslation(experience, 'rol') }}</span>
              <span class="text-slate-700 dark:text-slate-300 text-sm">@ {{ experience.company }}</span>
            </h4>
            <div class="text-sm text-slate-600 dark:text-slate-400 mb-2">
              {{ formatDate(experience.startDate) }} -
              <span v-if="!experience.endDate" class="text-emerald-600 dark:text-emerald-400 font-medium">
                {{ $t('current') }}
              </span>
              <span v-else>{{ formatDate(experience.endDate) }}</span>
            </div>
            <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {{ getTranslation(experience, 'description') }}
            </p>
          </article>
        </div>
      </div>

      <!-- Skills -->
      <div v-if="skills.length > 0">
        <h3 class="text-2xl font-bold mb-6 text-center text-slate-800 dark:text-slate-200">
          {{ $t('skills_title') }}
        </h3>
        <div class="grid grid-cols-1 gap-4">
          <div
            v-for="skill in skills"
            :key="skill.id"
            class="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4"
          >
            <h4 class="font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
              {{ getTranslation(skill, 'title') }}
            </h4>
            <p class="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line">
              {{ skill.skillList }}
            </p>
          </div>
        </div>
      </div>

      <!-- Languages -->
      <div v-if="languages.length > 0">
        <h3 class="text-2xl font-bold mb-6 text-center text-slate-800 dark:text-slate-200">
          {{ $t('lang_title') }}
        </h3>
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="language in languages"
            :key="language.id"
            class="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 text-center"
          >
            <h4 class="font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
              {{ getTranslation(language, 'name') }}
            </h4>
            <p class="text-sm text-slate-700 dark:text-slate-300">
              {{ getTranslation(language, 'level') }}
            </p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
h1 {
  view-transition-name: h1;
}
h2 {
  view-transition-name: h2;
}
div {
  view-transition-name: content;
}
</style>
