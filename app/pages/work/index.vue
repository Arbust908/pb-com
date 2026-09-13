<script setup lang="ts">
import type { ApiResponse, CvSkillsData } from '#shared/types'
import { LayoutGroup, motion, MotionConfig } from 'motion-v'
import { CASE_STUDY_AREAS, MOTION_SPRINT_OPTIONS, PROJECT_COLORS } from '#shared/constants'
import { usePageSeo } from '@/composables/usePageSeo'
import { resolveCaseStudySkills } from '~/utils/skills'
import { createCollectionGraph } from '~/utils/structuredData'

const { locale, t } = useI18n()
const localePath = useLocalePath()
const activeFilter = shallowRef<string | null>(null)
const filterDialog = useTemplateRef<HTMLDialogElement>('filterDialog')
const isFiltersOpen = shallowRef(false)
const lockTarget = shallowRef<HTMLElement | null>(null)
const isLocked = useScrollLock(() => lockTarget.value)
const { data: skillsResponse } = await useFetch<ApiResponse<CvSkillsData>>('/api/cv/skills', { key: 'cv-skills' })
const catalogSkills = computed(() => skillsResponse.value?.data?.skills ?? [])

onMounted(() => {
  lockTarget.value = document.documentElement
})

watch(isFiltersOpen, (open) => {
  isLocked.value = open
})

const { data: documents } = await useAsyncData('case-study-index', () => {
  const query = queryCollection('caseStudies')
    .order('sortOrder', 'ASC')

  if (!import.meta.dev)
    query.where('draft', '=', false)

  return query.all()
})

const studies = computed(() => {
  const groups = new Map<string, NonNullable<typeof documents.value>>()

  for (const document of documents.value ?? []) {
    const group = groups.get(document.translationKey) ?? []
    group.push(document)
    groups.set(document.translationKey, group)
  }

  return [...groups.values()].flatMap((translations) => {
    const selected = translations.find(document => document.locale === locale.value)
      ?? translations.find(document => document.locale === 'en')
      ?? translations[0]

    return selected
      ? [{
          ...selected,
          isFallback: selected.locale !== locale.value,
        }]
      : []
  })
})

const filters = computed(() => {
  const availableAreas = new Set(studies.value.flatMap(study => study.areas ?? []))
  return CASE_STUDY_AREAS.filter(area => availableAreas.has(area))
})

const filteredStudies = computed(() => activeFilter.value
  ? studies.value.filter(study => study.areas?.includes(activeFilter.value as typeof CASE_STUDY_AREAS[number]))
  : studies.value)

function getPreviewSkills(study: NonNullable<typeof studies.value>[number]) {
  const labels = study.technologies.length ? study.technologies : study.skills
  return resolveCaseStudySkills(labels, catalogSkills.value).slice(0, 4)
}

function cardStyle(project: string) {
  const color = PROJECT_COLORS[project as keyof typeof PROJECT_COLORS] ?? PROJECT_COLORS.personal
  return { '--card-color': color }
}

function openFilters() {
  filterDialog.value?.showModal()
  isFiltersOpen.value = filterDialog.value?.open ?? false
}

function closeFilters() {
  filterDialog.value?.close()
}

function closeFiltersFromBackdrop(event: MouseEvent) {
  if (event.target === event.currentTarget)
    closeFilters()
}

function gridClass(index: number) {
  if (index === 0)
    return 'md:col-span-2 xl:col-span-7'
  if (index === 1)
    return 'xl:col-span-5'
  return 'xl:col-span-4'
}

usePageSeo({
  title: () => `${t('case_studies.title')} :: Pancho Blanco`,
  description: () => t('case_studies.introduction'),
  structuredData: context => createCollectionGraph({
    url: context.canonicalUrl,
    name: t('case_studies.title'),
    description: t('case_studies.introduction'),
    breadcrumbs: [
      { name: t('home'), url: context.localeUrl(context.locale) },
      { name: t('case_studies.title'), url: context.canonicalUrl },
    ],
    items: studies.value.map(study => ({
      name: study.title,
      url: context.absoluteUrl(`${context.locale === 'es' ? '/es' : ''}/work/${study.slug}`),
    })),
  }),
})
</script>

<template>
  <MotionConfig reduced-motion="user" :transition="MOTION_SPRINT_OPTIONS">
    <div class="relative w-full overflow-hidden bg-slate-100 text-slate-950 layout-grid-full dark:bg-slate-900 dark:text-slate-50">
      <div aria-hidden="true" class="pointer-events-none absolute right--20 top--24 size-120 rounded-full bg-purple-400/15 filter-blur-3xl dark:bg-purple-400/10" />
      <div aria-hidden="true" class="pointer-events-none absolute right-48 top-16 size-72 rounded-full bg-rose-400/15 filter-blur-3xl dark:bg-rose-400/10" />

      <header class="relative mx-auto max-w-360 w-full px-4 pb-10 pt-12 lg:px-10 sm:px-6 lg:pb-18 lg:pt-24 sm:pb-16 sm:pt-16">
        <div class="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <motion.div
            :initial="{ opacity: 0, y: 24 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ delay: 0.06 }"
          >
            <h1 class="max-w-5xl text-[clamp(3.2rem,14vw,7rem)] font-extrabold leading-[0.88] tracking-[-0.035em] font-mono capitalize">
              {{ $t('case_studies.title') }}
            </h1>
            <p class="mt-2 max-w-2xl text-slate-700 leading-relaxed lg:text-xl sm:text-lg dark:text-slate-300">
              {{ $t('case_studies.introduction') }}
            </p>
          </motion.div>
        </div>
      </header>

      <section class="relative border-y border-slate-300/70 bg-slate-50/90 backdrop-blur-xl lg:sticky lg:top-0 lg:z-sticky dark:border-slate-700/70 dark:bg-slate-800/75">
        <div class="mx-auto max-w-360 w-full px-4 py-3 lg:px-10 sm:px-6">
          <button
            class="w-full inline-flex items-center justify-between border border-slate-300/70 rounded-full px-4 py-2 text-xs text-slate-700 font-mono transition sm:hidden dark:border-slate-700/70 hover:border-rose-500/60 dark:text-slate-300 hover:text-rose-700 dark:hover:border-rose-400/50 dark:hover:text-rose-300"
            type="button"
            :aria-expanded="isFiltersOpen"
            aria-controls="work-filter-dialog"
            @click="openFilters"
          >
            <span class="flex items-center gap-2">
              <span class="i-ph-funnel-simple text-slate-950 dark:text-slate-50" aria-hidden="true" />
              {{ $t('case_studies.filters_button') }}
            </span>
            <span class="text-rose-700 dark:text-rose-300">
              {{ activeFilter ? $t(`case_studies.areas.${activeFilter}`) : $t('case_studies.filter_all') }}
            </span>
          </button>

          <div class="hidden gap-2 overflow-x-auto no-scrollbar sm:flex" role="group" :aria-label="$t('case_studies.filters_label')">
            <button
              class="relative shrink-0 rounded-full px-4 py-1 text-xs font-mono transition-colors"
              :class="activeFilter === null ? 'text-slate-950' : 'inline-flex items-center border border-slate-300/70 text-slate-700 dark:border-slate-700/70 dark:text-slate-300 hover:border-rose-500/60 hover:text-rose-700 dark:hover:border-rose-400/50 dark:hover:text-rose-300'"
              :aria-pressed="activeFilter === null"
              type="button"
              @click="activeFilter = null"
            >
              <motion.span v-if="activeFilter === null" layout-id="active-work-filter" class="absolute inset-0 rounded-full bg-rose-400" />
              <span class="relative z-above">{{ $t('case_studies.filter_all') }}</span>
            </button>
            <button
              v-for="filter in filters"
              :key="filter"
              class="relative shrink-0 rounded-full px-4 py-1 text-xs font-mono transition-colors"
              :class="activeFilter === filter ? 'text-slate-950' : 'inline-flex items-center border border-slate-300/70 text-slate-700 dark:border-slate-700/70 dark:text-slate-300 hover:border-rose-500/60 hover:text-rose-700 dark:hover:border-rose-400/50 dark:hover:text-rose-300'"
              :aria-pressed="activeFilter === filter"
              type="button"
              @click="activeFilter = filter"
            >
              <motion.span v-if="activeFilter === filter" layout-id="active-work-filter" class="absolute inset-0 rounded-full bg-rose-400" />
              <span class="relative z-above">{{ $t(`case_studies.areas.${filter}`) }}</span>
            </button>
          </div>
        </div>
      </section>

      <dialog
        id="work-filter-dialog"
        ref="filterDialog"
        class="work-filter-dialog fixed inset-x-0 bottom-0 top-auto m-0 max-h-[85dvh] max-w-none w-full overflow-hidden border-x-0 border-b-0 rounded-t-3xl bg-slate-50/90 p-0 text-slate-950 sm:hidden dark:bg-slate-800/75 dark:text-slate-50"
        :aria-label="$t('case_studies.filters_label')"
        @click="closeFiltersFromBackdrop"
        @close="isFiltersOpen = false"
      >
        <div class="mx-auto mt-2 h-1 w-10 rounded-full bg-slate-300 dark:bg-slate-600" aria-hidden="true" />
        <div class="flex items-center justify-between px-5 pb-4 pt-3">
          <h2 class="text-xl font-extrabold leading-[0.9] tracking-[-0.035em] font-mono">
            {{ $t('case_studies.filters_button') }}
          </h2>
          <button class="size-9 inline-flex items-center justify-center border border-slate-300/70 rounded-full text-slate-700 transition dark:border-slate-700/70 hover:border-rose-500/60 dark:text-slate-300 hover:text-rose-700 dark:hover:border-rose-400/50 dark:hover:text-rose-300" type="button" :aria-label="$t('case_studies.close_filters')" @click="closeFilters">
            <span class="i-ph-x text-lg" aria-hidden="true" />
          </button>
        </div>

        <div class="grid max-h-[calc(85dvh-8rem)] gap-2 overflow-y-auto px-4 pb-4" role="group" :aria-label="$t('case_studies.filters_label')">
          <button
            class="w-full flex items-center justify-between border border-slate-300/70 rounded-2xl px-4 py-3 text-left text-sm font-mono transition-colors dark:border-slate-700/70"
            :class="activeFilter === null ? 'bg-rose-400 text-slate-950' : 'text-slate-700 dark:text-slate-300 hover:border-rose-500/60 dark:hover:border-rose-400/50 hover:text-rose-700 dark:hover:text-rose-300'"
            :aria-pressed="activeFilter === null"
            type="button"
            @click="activeFilter = null"
          >
            {{ $t('case_studies.filter_all') }}
            <span v-if="activeFilter === null" class="i-ph-check text-lg" aria-hidden="true" />
          </button>
          <button
            v-for="filter in filters"
            :key="filter"
            class="w-full flex items-center justify-between border border-slate-300/70 rounded-2xl px-4 py-3 text-left text-sm font-mono transition-colors dark:border-slate-700/70"
            :class="activeFilter === filter ? 'bg-rose-400 text-slate-950' : 'text-slate-700 dark:text-slate-300 hover:border-rose-500/60 dark:hover:border-rose-400/50 hover:text-rose-700 dark:hover:text-rose-300'"
            :aria-pressed="activeFilter === filter"
            type="button"
            @click="activeFilter = filter"
          >
            {{ $t(`case_studies.areas.${filter}`) }}
            <span v-if="activeFilter === filter" class="i-ph-check text-lg" aria-hidden="true" />
          </button>
        </div>

        <div class="work-filter-actions border-t border-slate-300/70 p-4 dark:border-slate-700/70">
          <button class="w-full inline-flex items-center justify-center rounded-full bg-rose-400 px-4 py-3 text-xs text-slate-950 font-mono transition active:bg-rose-500 hover:bg-rose-300 focus-visible:outline-2 focus-visible:outline-rose-400 focus-visible:outline-offset-2" type="button" @click="closeFilters">
            {{ $t('case_studies.show_projects') }}
          </button>
        </div>
      </dialog>

      <section class="relative mx-auto max-w-360 w-full px-4 py-6 lg:px-10 lg:py-14 sm:px-6 sm:py-10">
        <div class="mb-5 flex items-center justify-between meta-label">
          <span>{{ $t('case_studies.showing') }}</span>
          <span>{{ filteredStudies.length.toString().padStart(2, '0') }}</span>
        </div>

        <LayoutGroup>
          <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-12 lg:gap-4">
            <motion.article
              v-for="(study, index) in filteredStudies"
              :key="study.translationKey"
              layout
              class="project-card group relative min-h-74 overflow-hidden border rounded-[1.5rem] backdrop-blur-xl transition duration-200 focus-within:z-raised hover:z-raised"
              :class="gridClass(index)"
              :style="cardStyle(study.project)"
              :initial="{ opacity: 0, y: 24, scale: 0.98 }"
              :animate="{ opacity: 1, y: 0, scale: 1 }"
              :transition="{ delay: Math.min(index * 0.035, 0.2), scale: { delay: 0, duration: 0.16 }, layout: { duration: 0.35 } }"
              :while-hover="{ scale: 1.015 }"
            >
              <NuxtLink
                :to="localePath({ name: 'work-slug', params: { slug: study.slug } })"
                class="relative h-full flex flex-col p-5 focus-visible:outline-2 focus-visible:outline-rose-400 focus-visible:outline-offset--2"
              >
                <span aria-hidden="true" class="[word-spacing:0.04em] absolute max-w-[72%] text-(right [clamp(2.25rem,5vw,4.75rem)]) font-extrabold leading-[0.86] tracking-[-0.04em] font-mono italic opacity-15 -bottom-2 -right-2" :style="{ color: 'var(--card-color)' }">
                  {{ study.project }}
                </span>

                <div class="relative flex items-start justify-between gap-4">
                  <div class="flex flex-wrap items-center gap-2 text-[0.65rem] font-mono">
                    <span
                      :style="{ color: 'var(--card-color)' }"
                    >{{ study.organization }}</span>
                    <span class="text-slate-400 dark:text-slate-500">/</span>
                    <span class="text-slate-500 dark:text-slate-400">{{ $t(`case_studies.${study.projectType}`) }}</span>
                  </div>
                  <span v-if="study.draft" class="shrink-0 border border-amber-300/50 rounded-full px-2 py-1 text-[0.58rem] text-amber-300 tracking-wide font-mono uppercase">
                    {{ $t('case_studies.draft') }}
                  </span>
                </div>

                <div class="relative self-start py-8 sm:pb-10">
                  <h2
                    class="max-w-4xl text-balance text-[clamp(1.8rem,5vw,3.4rem)] font-extrabold leading-[0.94] tracking-[-0.025em] font-mono"
                    :style="{ viewTransitionName: `study-title-${study.slug}` }"
                  >
                    {{ study.title }}
                  </h2>
                  <p class="mt-5 max-w-2xl text-sm text-slate-700 leading-relaxed dark:text-slate-300 sm:text-slate-950 sm:dark:text-slate-50">
                    {{ study.description }}
                  </p>
                </div>

                <div class="relative mt-auto flex items-center justify-between gap-4 border-t border-slate-300/45 pt-2 dark:border-slate-700/45">
                  <ul class="flex flex-wrap gap-1.5">
                    <li v-for="skill in getPreviewSkills(study)" :key="skill.slug">
                      <SkillIcon :skill="skill" :size="32" />
                    </li>
                  </ul>
                  <span aria-hidden="true" class="shrink-0 scale-0 text-lg opacity-0 transition duration-300 group-focus-within:(scale-120 opacity-100 drop-shadow-[0_0_6px_var(--card-color)]) group-hover:(scale-120 opacity-100 drop-shadow-[0_0_6px_var(--card-color)])" :style="{ color: 'var(--card-color)' }">↗</span>
                </div>
                <span v-if="study.isFallback" class="absolute bottom-2 left-2 text-[0.55rem] text-amber-300 font-mono">EN</span>
              </NuxtLink>
            </motion.article>
          </div>
        </LayoutGroup>
      </section>
    </div>
  </MotionConfig>
</template>

<style>
.work-filter-dialog::backdrop {
  background: rgb(2 6 23 / 0.65);
  backdrop-filter: blur(4px);
}

.work-filter-actions {
  padding-bottom: max(1rem, env(safe-area-inset-bottom));
}

.project-card {
  border-color: color-mix(in srgb, var(--card-color) 30%, rgb(203 213 225 / 0.7));
  background: color-mix(in srgb, var(--card-color) 13%, rgb(248 250 252 / 0.78));
}

.project-card:is(:hover, :focus-within) {
  border-color: color-mix(in srgb, var(--card-color) 70%, transparent);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--card-color) 18%, transparent);
}

html.dark .project-card {
  border-color: color-mix(in srgb, var(--card-color) 24%, rgb(51 65 85 / 0.7));
  background: color-mix(in srgb, var(--card-color) 12%, rgb(30 41 59 / 0.72));
}
</style>
