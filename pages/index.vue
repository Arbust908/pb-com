<script setup lang="ts">
import shuffleLetters from 'shuffle-letters'
import type { MetaData } from '@/composables/ultimateProtocol'
import { useUP } from '@/composables/ultimateProtocol'
import { SITE_URL } from '~/constants'
import type { CvExperience, CvLanguage, CvSkillGroup } from '~/types'

// All this info should be i18n driven
const meta: MetaData = {
  base_url: SITE_URL,
  title: 'Pancho Blanco :: Senior Front-End Developer',
  description:
          'Senior Front-End Developer specializing in Vue, Nuxt, and TypeScript, with backend experience across Node.js, Express, Laravel, APIs, and SQL DB.',
}
useHead(useUP(meta, useRoute().fullPath))

const { locale } = useI18n()

const globalStore = useGlobalStore()
const { experiences, skillsData, languages } = storeToRefs(globalStore)
const skillGroups = computed(() => skillsData.value.groups)

// Get translation for current locale with fallback to 'en'
function getTranslation(item: CvExperience | CvSkillGroup | CvLanguage, field: string): string {
  const translations = item.translations as Record<string, Record<string, string>>
  return translations[locale.value]?.[field] || translations.en?.[field] || ''
}

function getExperienceList(experience: CvExperience): string[] {
  const localizedList = experience.translations[locale.value]?.list?.filter(Boolean) ?? []
  const englishList = experience.translations.en?.list?.filter(Boolean) ?? []

  if (localizedList.length)
    return localizedList
  if (englishList.length)
    return englishList

  const description = getTranslation(experience, 'description')
  return description ? [description] : []
}

function getGroupSkillList(group: CvSkillGroup): string {
  const skillBySlug = new Map(skillsData.value.skills.map(skill => [skill.slug, skill.name]))
  return group.skillSlugs.map(slug => skillBySlug.get(slug)).filter(Boolean).join(', ')
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
    <div aria-hidden="true" class="pointer-events-none fixed right--20 top--24 size-120 rounded-full ambient-secondary filter-blur-3xl" />
    <div aria-hidden="true" class="pointer-events-none fixed left--32 top-80 size-96 rounded-full ambient-primary filter-blur-3xl" />

    <header class="relative grid content-container gap-10 pb-16 pt-14 lg:items-end lg:pb-24 lg:pt-24 sm:pt-18">
      <div class="lg:col-span-9">
        <h1 class="display-heading text-[clamp(3.5rem,13vw,8rem)]">
          Francisco<br>
          <span class="text-primary font-normal italic">
            Pancho
          </span><br>
          Blanco
        </h1>
        <h2 ref="heroRef" class="mt-5 min-h-8 text-lg text-body leading-snug sm:text-2xl">
          {{ $t('rol') }}
        </h2>
      </div>
    </header>

    <section v-if="recentExperiences.length > 0 || skillGroups.length > 0 || languages.length > 0" class="content-container pb-18 lg:pb-28">
      <div v-if="recentExperiences.length > 0" class="border-t border-base py-10 lg:grid lg:grid-cols-12 lg:gap-8 lg:py-16">
        <div class="mb-7 lg:col-span-3 lg:mb-0">
          <p class="meta-label-primary">
            {{ $t('recent_work') }}
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
              <ul class="mt-5 list-disc pl-4 text-sm text-body leading-relaxed space-y-1">
                <li v-for="item in getExperienceList(experience)" :key="item">
                  {{ item }}
                </li>
              </ul>
            </div>
            <p class="mt-8 border-t border-base pt-4 text-[0.65rem] text-muted font-mono">
              {{ formatDate(experience.startDate) }} /
              <span v-if="!experience.endDate" class="text-primary">{{ $t('current') }}</span>
              <span v-else>{{ formatDate(experience.endDate) }}</span>
            </p>
          </article>
        </div>
      </div>

      <div v-if="skillGroups.length > 0" class="border-t border-base py-10 lg:grid lg:grid-cols-12 lg:gap-8 lg:py-16">
        <div class="mb-7 lg:col-span-3 lg:mb-0">
          <p class="meta-label-primary">
            {{ $t('skills_title') }}
          </p>
        </div>
        <div class="grid gap-x-8 gap-y-10 lg:col-span-9 sm:grid-cols-2">
          <article v-for="group in skillGroups" :key="group.id" class="border-l border-primary pl-5">
            <h3 class="text-lg font-bold tracking-[-0.02em]">
              {{ getTranslation(group, 'title') }}
            </h3>
            <p class="mt-3 whitespace-pre-line text-sm text-body leading-relaxed">
              {{ getGroupSkillList(group) }}
            </p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
