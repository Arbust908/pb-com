<script setup lang='ts'>
import type { CvExperience } from '#shared/types'
import { resolveSkillSlugs } from '~/utils/skills'

interface Props {
  experiences: CvExperience[]
}
const props = defineProps<Props>()

const { locale } = useI18n()

const globalStore = useGlobalStore()
const { skillsData } = storeToRefs(globalStore)

const { getTranslation } = useCvTranslation()

const company = computed(() => props.experiences[0]?.company || '')
const location = computed(() => props.experiences.find(experience => experience.location)?.location)
const isCurrent = computed(() => props.experiences.some(experience => !experience.endDate))

function getExperienceSkills(experience: CvExperience) {
  return resolveSkillSlugs(experience.skillSlugs ?? [], skillsData.value.skills)
}
</script>

<template>
  <article
    :key="locale"
    :class="isCurrent ? 'border-rose-500/60 dark:border-rose-400/50' : 'border-slate-300/70 dark:border-slate-700/70'"
    class="grid gap-4 border rounded-lg bg-slate-50/70 p-3 backdrop-blur-xl dark:bg-slate-800/40 sm:p-4"
  >
    <header class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
      <h3 class="text-xl text-rose-700 font-bold tracking-[-0.02em] dark:text-rose-300">
        {{ company }}
      </h3>
      <p v-if="location" class="meta-label">
        {{ location }}
      </p>
    </header>

    <div class="divide-base divide-y">
      <section
        v-for="experience in experiences"
        :key="experience.slug"
        class="grid gap-2 py-4 first:pt-0 last:pb-0"
      >
        <h4 class="text-lg font-bold tracking-[-0.02em]">
          {{ getTranslation(experience, 'rol') }}
        </h4>
        <p class="meta-label leading-relaxed">
          <span>{{ formatDate(experience.startDate, locale) }}</span>
          -
          <span
            v-if="!experience.endDate"
            class="rounded-full bg-rose-400/15 px-2 py-1 text-rose-700 font-bold dark:text-rose-300"
          >
            {{ $t('current') }}
          </span>
          <span v-else>{{ formatDate(experience.endDate, locale) }}</span>
        </p>
        <p class="text-sm text-slate-700 leading-relaxed dark:text-slate-300">
          {{ getTranslation(experience, 'description') }}
        </p>
        <ul v-if="getExperienceSkills(experience).length" aria-hidden="true" class="flex flex-wrap gap-1">
          <li v-for="skill in getExperienceSkills(experience)" :key="skill.slug">
            <SkillIcon :skill="skill" :size="20" decorative />
          </li>
        </ul>
      </section>
    </div>
  </article>
</template>
