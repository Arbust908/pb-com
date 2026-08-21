<script setup lang="ts">
import shuffleLetters from 'shuffle-letters'
// https://github.com/georapbox/shuffle-letters/tree/main
import type { MetaData } from '@/composables/ultimateProtocol'
import { useUP } from '@/composables/ultimateProtocol'
import type { CvExperience } from '@/composables/useCvExperiences'
import type { CvSkill } from '@/composables/useCvSkills'
import type { CvLanguage } from '@/composables/useCvLanguages'

const meta: MetaData = {
  base_url: 'https://panchoblanco.dev',
  title: 'Pancho Blanco :: Desarrollador Creativo',
  description:
          'Hola soy Pancho Blanco, un Desarrollador y Diseñador Grafico. Tengo mas de 8 años en la industria del desarrollo y tengo una pasion por enseñar y aprender.',
}
useHead(useUP(meta))

const { locale } = useI18n()
const localePath = useLocalePath()

// ✅ OPTIMIZED: Parallel data fetching for ~3x faster loading
const { data: cvData, pending: pendingCvData, error: cvError } = await useAsyncData('cv-homepage-data', async () => {
  const [experiences, skills, languages] = await Promise.all([
    $fetch('/api/cv/experiences'),
    $fetch('/api/cv/skills'),
    $fetch('/api/cv/languages'),
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

  const result: typeof expList = []
  if (currentExp)
    result.push(currentExp)
  const latestEnded = endedExps[0]
  if (latestEnded)
    result.push(latestEnded)

  return result
})

// ✅ OPTIMIZED: Reactive DOM manipulation with proper ref
const heroRef = ref<HTMLElement>()

onMounted(async () => {
  if (heroRef.value && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    shuffleLetters(heroRef.value)
  }
})
</script>

<template>
  <div class="relative w-full overflow-hidden layout-grid-full">
    <div aria-hidden="true" class="pointer-events-none absolute right--20 top--24 size-120 rounded-full ambient-secondary filter-blur-3xl" />
    <div aria-hidden="true" class="pointer-events-none absolute left--32 top-80 size-96 rounded-full ambient-primary filter-blur-3xl" />

    <header class="relative grid content-container gap-10 pb-16 pt-14 lg:grid-cols-12 lg:items-end lg:pb-24 lg:pt-24 sm:pt-18">
      <div class="lg:col-span-9">
        <p class="mb-5 meta-label-primary">
          Portfolio / Buenos Aires
        </p>
        <h1 class="display-heading text-[clamp(3.5rem,13vw,8rem)]">
          Pancho Blanco
        </h1>
        <h2 ref="heroRef" class="mt-5 max-w-3xl min-h-8 text-lg text-body leading-snug sm:text-2xl">
          {{ $t('rol') }}
        </h2>
      </div>
      <nav class="flex flex-wrap gap-2 lg:col-span-3 lg:justify-end" aria-label="Portfolio destinations">
        <NuxtLink class="control-primary" :to="localePath({ name: 'work' })">
          {{ $t('work') }} <span aria-hidden="true" class="ml-2">↗</span>
        </NuxtLink>
        <NuxtLink class="pill-control text-body hover:(border-primary text-primary)" :to="localePath({ name: 'cv' })">
          {{ $t('resume') }}
        </NuxtLink>
      </nav>
    </header>

    <section v-if="cvError" class="content-container pb-16">
      <div class="border border-red-400/40 rounded-2xl bg-red-400/8 p-6">
        <h3 class="text-xl text-red-800 font-semibold dark:text-red-200">
          {{ $t('error_loading_data') || 'Unable to load data' }}
        </h3>
        <p class="mt-2 text-red-700 dark:text-red-300">
          Please try refreshing the page or contact support.
        </p>
      </div>
    </section>

    <section v-else-if="!pendingCvData && (recentExperiences.length > 0 || skills.length > 0 || languages.length > 0)" class="content-container pb-18 lg:pb-28">
      <div v-if="recentExperiences.length > 0" class="border-t border-base py-10 lg:grid lg:grid-cols-12 lg:gap-8 lg:py-16">
        <div class="mb-7 lg:col-span-3 lg:mb-0">
          <p class="meta-label-primary">
            01 / {{ $t('recent_work') }}
          </p>
        </div>
        <div class="grid gap-3 lg:col-span-9 md:grid-cols-2">
          <article v-for="experience in recentExperiences" :key="experience.id" class="min-h-72 flex flex-col surface-frosted rounded-2xl p-5 sm:p-7">
            <div class="mb-auto">
              <p class="meta-label-secondary">
                {{ experience.company }}
              </p>
              <h3 class="display-heading mt-5 text-[clamp(1.6rem,4vw,2.6rem)]">
                {{ getTranslation(experience, 'rol') }}
              </h3>
              <p class="mt-5 text-sm text-body leading-relaxed">
                {{ getTranslation(experience, 'description') }}
              </p>
            </div>
            <p class="mt-8 border-t border-base pt-4 text-[0.65rem] text-muted font-mono">
              {{ formatDate(experience.startDate) }} /
              <span v-if="!experience.endDate" class="text-primary">{{ $t('current') }}</span>
              <span v-else>{{ formatDate(experience.endDate) }}</span>
            </p>
          </article>
        </div>
      </div>

      <div v-if="skills.length > 0" class="border-t border-base py-10 lg:grid lg:grid-cols-12 lg:gap-8 lg:py-16">
        <div class="mb-7 lg:col-span-3 lg:mb-0">
          <p class="meta-label-primary">
            02 / {{ $t('skills_title') }}
          </p>
        </div>
        <div class="grid gap-x-8 gap-y-10 lg:col-span-9 sm:grid-cols-2">
          <article v-for="skill in skills" :key="skill.id" class="border-l border-primary pl-5">
            <h3 class="text-lg font-bold tracking-[-0.02em]">
              {{ getTranslation(skill, 'title') }}
            </h3>
            <p class="mt-3 whitespace-pre-line text-sm text-body leading-relaxed">
              {{ skill.skillList }}
            </p>
          </article>
        </div>
      </div>

      <div v-if="languages.length > 0" class="border-t border-base py-10 lg:grid lg:grid-cols-12 lg:gap-8 lg:py-16">
        <div class="mb-7 lg:col-span-3 lg:mb-0">
          <p class="meta-label-primary">
            03 / {{ $t('lang_title') }}
          </p>
        </div>
        <dl class="grid overflow-hidden border border-base rounded-2xl surface-bg lg:col-span-9 sm:grid-cols-2">
          <div v-for="(language, index) in languages" :key="language.id" class="p-5 sm:p-7" :class="index ? 'border-t border-base sm:border-l sm:border-t-0' : ''">
            <dt class="meta-label-secondary">
              {{ getTranslation(language, 'name') }}
            </dt>
            <dd class="mt-3 text-xl font-medium">
              {{ getTranslation(language, 'level') }}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  </div>
</template>

<style scoped>
h1 {
  view-transition-name: h1;
}
h2 {
  view-transition-name: h2;
}
</style>
