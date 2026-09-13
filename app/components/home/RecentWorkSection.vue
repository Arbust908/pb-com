<script setup lang="ts">
import type { CvExperience, CvSkill } from '#shared/types'
import { resolveSkillSlugs } from '~/utils/skills'
import SectionBox from './SectionBox.vue'

const props = defineProps<{
  experiences: CvExperience[]
  skills: CvSkill[]
}>()

const { locale } = useI18n()

const { getTranslation } = useCvTranslation()

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

// Get current experience + most recent ended experience
const recentExperiences = computed(() => {
  const expList = [...props.experiences]

  // Find current employment (no endDate)
  const currentExp = expList.find(exp => exp.endDate === null)

  // Get all experiences with endDates, sorted by endDate descending
  const endedExps = expList
    .filter((exp): exp is CvExperience & { endDate: string } => exp.endDate !== null)
    .sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime())

  const result: typeof expList = []
  if (currentExp)
    result.push(currentExp)
  const latestEnded = endedExps.splice(0, 2 - result.length)
  if (latestEnded.length > 0)
    result.push(...latestEnded)

  return result.map(experience => ({
    ...experience,
    rol: getTranslation(experience, 'rol'),
    list: getExperienceList(experience),
    skills: resolveSkillSlugs(experience.skillSlugs ?? [], props.skills),
  }))
})
</script>

<template>
  <SectionBox v-if="recentExperiences.length" :title="$t('recent_work')">
    <template #cards>
      <article v-for="experience in recentExperiences" :key="experience.id" class="min-h-72 flex flex-col border border-slate-300/70 rounded-2xl bg-slate-50/70 p-5 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-800/40 sm:p-7">
        <div class="mb-auto">
          <p class="meta-label-secondary">
            {{ experience.company }}
          </p>
          <h3 class="mt-5 text-[clamp(1.6rem,4vw,2.6rem)] font-extrabold leading-[0.9] tracking-[-0.035em] font-mono">
            {{ experience.rol }}
          </h3>
          <ul class="mt-5 list-disc pl-4 text-sm text-slate-700 leading-relaxed space-y-1 dark:text-slate-300">
            <li v-for="item in experience.list" :key="item">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="mt-8 flex items-center justify-between gap-3 border-t border-slate-300/70 pt-4 dark:border-slate-700/70">
          <p class="text-[0.65rem] text-slate-500 font-mono dark:text-slate-400">
            {{ formatDate(experience.startDate, locale) }} /
            <span v-if="!experience.endDate" class="text-rose-700 dark:text-rose-300">{{ $t('current') }}</span>
            <span v-else>{{ formatDate(experience.endDate, locale) }}</span>
          </p>
          <ul v-if="experience.skills.length" aria-hidden="true" class="flex flex-wrap justify-end gap-1">
            <li v-for="skill in experience.skills" :key="skill.slug">
              <SkillIcon :skill="skill" :size="20" decorative />
            </li>
          </ul>
        </div>
      </article>
    </template>
  </SectionBox>
</template>
