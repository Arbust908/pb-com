<script setup lang="ts">
import { LayoutGroup, motion, MotionConfig } from 'motion-v'
import { CASE_STUDY_AREAS, MOTION_SPRINT_OPTIONS, PROJECT_COLORS } from '#shared/constants'
import { usePageSeo } from '@/composables/usePageSeo'
import { createCollectionGraph } from '~/utils/structuredData'

const { locale, t } = useI18n()
const localePath = useLocalePath()
const activeFilter = shallowRef<string | null>(null)
const filterDialog = useTemplateRef<HTMLDialogElement>('filterDialog')
const isFiltersOpen = shallowRef(false)
const lockTarget = shallowRef<HTMLElement | null>(null)
const isLocked = useScrollLock(() => lockTarget.value)

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
    <div class="relative w-full overflow-hidden base-bg color-base layout-grid-full">
      <div aria-hidden="true" class="pointer-events-none absolute right--20 top--24 size-120 rounded-full ambient-secondary filter-blur-3xl" />
      <div aria-hidden="true" class="pointer-events-none absolute right-48 top-16 size-72 rounded-full ambient-primary filter-blur-3xl" />

      <header class="relative content-container pb-10 pt-12 lg:pb-18 lg:pt-24 sm:pb-16 sm:pt-16">
        <div class="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <motion.div
            :initial="{ opacity: 0, y: 24 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ delay: 0.06 }"
          >
            <h1 class="max-w-5xl text-[clamp(3.2rem,14vw,7rem)] display-heading leading-[0.88] capitalize">
              {{ $t('case_studies.title') }}
            </h1>
            <p class="mt-2 max-w-2xl color-base text-body leading-relaxed lg:text-xl sm:text-lg">
              {{ $t('case_studies.introduction') }}
            </p>
          </motion.div>
        </div>
      </header>

      <section class="relative border-y border-base surface-strong-bg backdrop-blur-xl lg:sticky lg:top-0 lg:z-sticky">
        <div class="content-container py-3">
          <button
            class="w-full pill-control justify-between text-body sm:hidden hover:border-primary hover:text-primary"
            type="button"
            :aria-expanded="isFiltersOpen"
            aria-controls="work-filter-dialog"
            @click="openFilters"
          >
            <span class="flex items-center gap-2">
              <span class="i-ph-funnel-simple color-base" aria-hidden="true" />
              {{ $t('case_studies.filters_button') }}
            </span>
            <span class="text-primary">
              {{ activeFilter ? $t(`case_studies.areas.${activeFilter}`) : $t('case_studies.filter_all') }}
            </span>
          </button>

          <div class="hidden gap-2 overflow-x-auto no-scrollbar sm:flex" role="group" :aria-label="$t('case_studies.filters_label')">
            <button
              class="relative shrink-0 rounded-full px-4 py-1 text-xs font-mono transition-colors"
              :class="activeFilter === null ? 'text-slate-950' : 'pill-control text-body hover:border-primary hover:text-primary'"
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
              :class="activeFilter === filter ? 'text-slate-950' : 'pill-control text-body hover:border-primary hover:text-primary'"
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
        class="work-filter-dialog fixed inset-x-0 bottom-0 top-auto m-0 max-h-[85dvh] max-w-none w-full overflow-hidden border-x-0 border-b-0 rounded-t-3xl surface-strong-bg p-0 color-base sm:hidden"
        :aria-label="$t('case_studies.filters_label')"
        @click="closeFiltersFromBackdrop"
        @close="isFiltersOpen = false"
      >
        <div class="mx-auto mt-2 h-1 w-10 rounded-full bg-slate-300 dark:bg-slate-600" aria-hidden="true" />
        <div class="flex items-center justify-between px-5 pb-4 pt-3">
          <h2 class="text-xl display-heading">
            {{ $t('case_studies.filters_button') }}
          </h2>
          <button class="icon-control" type="button" :aria-label="$t('case_studies.close_filters')" @click="closeFilters">
            <span class="i-ph-x text-lg" aria-hidden="true" />
          </button>
        </div>

        <div class="grid max-h-[calc(85dvh-8rem)] gap-2 overflow-y-auto px-4 pb-4" role="group" :aria-label="$t('case_studies.filters_label')">
          <button
            class="w-full flex items-center justify-between border border-base rounded-2xl px-4 py-3 text-left text-sm font-mono transition-colors"
            :class="activeFilter === null ? 'bg-rose-400 text-slate-950' : 'text-body hover:border-primary hover:text-primary'"
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
            class="w-full flex items-center justify-between border border-base rounded-2xl px-4 py-3 text-left text-sm font-mono transition-colors"
            :class="activeFilter === filter ? 'bg-rose-400 text-slate-950' : 'text-body hover:border-primary hover:text-primary'"
            :aria-pressed="activeFilter === filter"
            type="button"
            @click="activeFilter = filter"
          >
            {{ $t(`case_studies.areas.${filter}`) }}
            <span v-if="activeFilter === filter" class="i-ph-check text-lg" aria-hidden="true" />
          </button>
        </div>

        <div class="work-filter-actions border-t border-base p-4">
          <button class="w-full control-primary justify-center py-3" type="button" @click="closeFilters">
            {{ $t('case_studies.show_projects') }}
          </button>
        </div>
      </dialog>

      <section class="relative content-container py-6 lg:py-14 sm:py-10">
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
                    <span class="text-subtle">/</span>
                    <span class="text-muted">{{ $t(`case_studies.${study.projectType}`) }}</span>
                  </div>
                  <span v-if="study.draft" class="shrink-0 border border-amber-300/50 rounded-full px-2 py-1 text-[0.58rem] text-amber-300 tracking-wide font-mono uppercase">
                    {{ $t('case_studies.draft') }}
                  </span>
                </div>

                <div class="relative self-start py-8 sm:pb-10">
                  <h2
                    class="max-w-4xl text-balance text-[clamp(1.8rem,5vw,3.4rem)] display-heading leading-[0.94] tracking-[-0.025em]"
                    :style="{ viewTransitionName: `study-title-${study.slug}` }"
                  >
                    {{ study.title }}
                  </h2>
                  <p class="mt-5 max-w-2xl text-sm text-body leading-relaxed sm:color-base">
                    {{ study.description }}
                  </p>
                </div>

                <div class="relative mt-auto flex items-center justify-between gap-4 border-t border-subtle pt-2">
                  <ul class="flex flex-wrap gap-x-3 gap-y-1.5">
                    <li v-for="technology in study.technologies?.slice(0, 4)" :key="technology" class="text-2.5 text-muted font-mono">
                      {{ technology }}
                    </li>
                    <li v-if="!study.technologies?.length" class="text-2.5 text-subtle font-mono">
                      {{ study.skills?.[0] }}
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
