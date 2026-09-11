<script setup lang="ts">
import type { CvExperience, CvSkillGroup } from '#shared/types'
import shuffleLetters from 'shuffle-letters'
import { usePageSeo } from '~/composables/usePageSeo'
import { resolveSkillSlugs } from '~/utils/skills'
import { createPageGraph } from '~/utils/structuredData'

const { locale, t } = useI18n()

const globalStore = useGlobalStore()
await useAsyncData('global-data', () => globalStore.fetchAll())
const { experiences, skillsData, languages } = storeToRefs(globalStore)
const skillGroups = computed(() => skillsData.value.groups)

const skillsGridRef = useTemplateRef<HTMLElement>('skillsGrid')
const skillGroupRefs = useTemplateRef<HTMLElement[]>('skillGroupElements')
const activeSkillGroup = shallowRef<number | null>(null)
const canHoverSkills = useMediaQuery('(min-width: 640px) and (hover: hover) and (pointer: fine)')
const skillHighlightStyle = shallowRef({})
const { start: scheduleSkillReset, stop: cancelSkillReset } = useTimeoutFn(() => {
  activeSkillGroup.value = null
}, 200, { immediate: false })

function activateSkillGroup(index: number) {
  cancelSkillReset()
  activeSkillGroup.value = index
}

function updateSkillHighlight() {
  if (!canHoverSkills.value)
    return

  const grid = skillsGridRef.value
  const group = activeSkillGroup.value === null
    ? grid
    : grid?.querySelectorAll<HTMLElement>(':scope > article')[activeSkillGroup.value]
  if (!group)
    return

  const padding = 16
  skillHighlightStyle.value = {
    width: `${group.offsetWidth + padding * 2}px`,
    height: `${group.offsetHeight + padding * 2}px`,
    left: `${(group === grid ? 0 : group.offsetLeft) - padding}px`,
    top: `${(group === grid ? 0 : group.offsetTop) - padding}px`,
  }
}

watch([activeSkillGroup, canHoverSkills, skillGroups, locale], updateSkillHighlight, { flush: 'post' })
useResizeObserver(() => [skillsGridRef.value, ...(skillGroupRefs.value ?? [])], updateSkillHighlight)

const { getTranslation } = useCvTranslation()

usePageSeo({
  title: () => t('home_meta.title'),
  description: () => t('home_meta.description'),
  structuredData: context => createPageGraph({
    type: 'WebPage',
    mainEntity: true,
    url: context.canonicalUrl,
    name: t('home_meta.title'),
    description: t('home_meta.description'),
    person: {
      jobTitle: t('rol'),
      knowsAbout: skillsData.value.skills.map(skill => skill.name),
    },
  }),
})

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

function getGroupSkills(group: CvSkillGroup) {
  return resolveSkillSlugs(group.skillSlugs, skillsData.value.skills)
}

function getExperienceSkills(experience: CvExperience) {
  return resolveSkillSlugs(experience.skillSlugs ?? [], skillsData.value.skills)
}

const orbitSkills = computed(() => {
  const stack = skillGroups.value.find(group => group.slug === 'my-stack')
  return stack ? resolveSkillSlugs(stack.skillSlugs, skillsData.value.skills) : []
})

// Get current experience + most recent ended experience
const recentExperiences = computed(() => {
  const expList = [...experiences.value]

  // Find current employment (no endDate)
  const currentExp = expList.find(exp => exp.endDate === null)

  // Get all experiences with endDates, sorted by endDate descending
  const endedExps = expList
    .filter((exp): exp is CvExperience & { endDate: string } => exp.endDate !== null)
    .sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime())

  const result: typeof expList = []
  if (currentExp)
    result.push(currentExp)
  const latestEnded = endedExps[0]
  if (latestEnded)
    result.push(latestEnded)

  return result
})

const heroRef = useTemplateRef<HTMLElement>('hero')

onMounted(async () => {
  if (heroRef.value && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    shuffleLetters(heroRef.value)
  }
})
</script>

<template>
  <div class="relative w-full overflow-hidden layout-grid-full">
    <div aria-hidden="true" class="pointer-events-none fixed right--20 top--24 size-120 rounded-full bg-purple-400/15 filter-blur-3xl dark:bg-purple-400/10" />
    <div aria-hidden="true" class="pointer-events-none fixed left--32 top-80 size-96 rounded-full bg-rose-400/15 filter-blur-3xl dark:bg-rose-400/10" />

    <header class="relative grid mx-auto max-w-360 w-full gap-10 px-4 pb-16 pt-14 lg:grid-cols-12 lg:items-end lg:px-10 sm:px-6 lg:pb-24 lg:pt-24 sm:pt-18">
      <div class="lg:col-span-9">
        <h1 class="text-[clamp(3.5rem,13vw,8rem)] font-extrabold leading-[0.9] tracking-[-0.035em] font-mono">
          Francisco<br>
          <span class="text-rose-700 font-normal italic dark:text-rose-300">
            Pancho
          </span><br>
          Blanco
        </h1>
        <h2 ref="hero" class="mt-5 min-h-8 text-lg text-slate-700 leading-snug sm:text-2xl dark:text-slate-300">
          {{ $t('rol') }}
        </h2>
      </div>
      <div v-if="orbitSkills.length" class="hidden lg:col-span-3 lg:block lg:justify-self-center">
        <SkillOrbitRing :skills="orbitSkills" />
      </div>
    </header>

    <div v-if="recentExperiences.length > 0 || skillGroups.length > 0 || languages.length > 0" class="mx-auto max-w-360 w-full px-4 pb-18 lg:px-10 sm:px-6 lg:pb-28">
      <div v-if="recentExperiences.length > 0" class="overflow-clip border-t-4 border-slate-300 pb-10 lg:grid lg:grid-cols-12 lg:gap-8 dark:border-slate-700 lg:pb-16">
        <div class="col-span-full ml-2 -mt-2.5">
          <p class="text-4xl text-slate-300 font-mono uppercase italic dark:text-slate-700">
            {{ $t('recent_work') }}
          </p>
        </div>
        <div class="grid gap-3 lg:col-span-9 lg:col-start-4 md:grid-cols-2">
          <article v-for="experience in recentExperiences" :key="experience.id" class="min-h-72 flex flex-col border border-slate-300/70 rounded-2xl bg-slate-50/70 p-5 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-800/40 sm:p-7">
            <div class="mb-auto">
              <p class="meta-label-secondary">
                {{ experience.company }}
              </p>
              <h3 class="mt-5 text-[clamp(1.6rem,4vw,2.6rem)] font-extrabold leading-[0.9] tracking-[-0.035em] font-mono">
                {{ getTranslation(experience, 'rol') }}
              </h3>
              <ul class="mt-5 list-disc pl-4 text-sm text-slate-700 leading-relaxed space-y-1 dark:text-slate-300">
                <li v-for="item in getExperienceList(experience)" :key="item">
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
              <ul v-if="getExperienceSkills(experience).length" aria-hidden="true" class="flex flex-wrap justify-end gap-1">
                <li v-for="skill in getExperienceSkills(experience)" :key="skill.slug">
                  <SkillIcon :skill="skill" :size="20" decorative />
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>

      <div v-if="skillGroups.length > 0" class="border-t border-slate-300/70 py-10 lg:grid lg:grid-cols-12 lg:gap-8 dark:border-slate-700/70 lg:py-16">
        <div class="mb-7 lg:col-span-3 lg:mb-0">
          <p class="meta-label-primary">
            {{ $t('skills_title') }}
          </p>
        </div>
        <div
          ref="skillsGrid"
          class="relative isolate grid gap-x-8 gap-y-10 lg:col-span-9 sm:grid-cols-2"
        >
          <aside
            aria-hidden="true"
            class="skill-group-highlight pointer-events-none absolute left-0 top-0 z-under border border-slate-300/70 rounded-2xl bg-slate-50/70 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-800/40"
            :style="skillHighlightStyle"
          />
          <article
            v-for="(group, index) in skillGroups"
            :key="group.id"
            ref="skillGroupElements"
            class="skill-group relative z-above"
            @mouseenter="activateSkillGroup(index)"
            @mouseleave="scheduleSkillReset()"
            @focusin="activateSkillGroup(index)"
            @focusout="scheduleSkillReset()"
          >
            <h3 class="text-lg font-bold tracking-[-0.02em]">
              {{ getTranslation(group, 'title') }}
            </h3>
            <ul class="mt-3 flex flex-wrap gap-2">
              <li v-for="skill in getGroupSkills(group)" :key="skill.slug">
                <SkillChip :skill="skill" />
              </li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skill-group-highlight {
  display: none;
  transition:
    left 250ms ease,
    width 250ms ease,
    top 250ms ease 250ms,
    height 250ms ease 250ms;
}

@media (min-width: 640px) and (hover: hover) and (pointer: fine) {
  .skill-group::after {
    position: absolute;
    z-index: -1;
    inset: -16px;
    content: '';
  }

  .skill-group-highlight {
    display: block;
  }
}

@media (prefers-reduced-motion: reduce) {
  .skill-group-highlight {
    transition: none;
  }
}
</style>
