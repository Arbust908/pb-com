<script setup lang="ts">
import { LayoutGroup, MotionConfig, motion } from 'motion-v'

const { locale, t } = useI18n()
const localePath = useLocalePath()
const activeFilter = ref<string | null>(null)
const filterDialog = ref<HTMLDialogElement | null>(null)
const areaOrder = ['frontend', 'backend', 'architecture', 'e2e', 'product', 'data', 'content', 'legacy'] as const
const projectColors = {
  SimplyCodes: '#b4ff4b',
  Dealspotr: '#2cd700',
  Knoji: '#009ff4',
  personal: '#f54842',
} as const

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
  return areaOrder.filter(area => availableAreas.has(area))
})

const filteredStudies = computed(() => activeFilter.value
  ? studies.value.filter(study => study.areas?.includes(activeFilter.value as typeof areaOrder[number]))
  : studies.value)

function cardStyle(project: string, projectType: string) {
  let color: string = projectColors.personal

  if (project === 'SimplyCodes')
    color = projectColors.SimplyCodes
  else if (project === 'Dealspotr')
    color = projectColors.Dealspotr
  else if (project === 'Knoji')
    color = projectColors.Knoji
  else if (projectType === 'personal')
    color = projectColors.personal

  return { '--card-color': color }
}

function openFilters() {
  filterDialog.value?.showModal()
}

function closeFilters() {
  filterDialog.value?.close()
}

function gridClass(index: number) {
  if (index === 0)
    return 'md:col-span-2 xl:col-span-7'
  if (index === 1)
    return 'xl:col-span-5'
  return 'xl:col-span-4'
}

useSeoMeta({
  title: () => `${t('case_studies.title')} :: Pancho Blanco`,
  description: () => t('case_studies.introduction'),
})
</script>

<template>
  <MotionConfig reduced-motion="user" :transition="{ type: 'spring', stiffness: 280, damping: 28 }">
    <div class="base-bg relative w-full overflow-hidden text-base layout-grid-full">
      <div aria-hidden="true" class="ambient-secondary pointer-events-none absolute right--20 top--24 size-120 rounded-full filter-blur-3xl" />
      <div aria-hidden="true" class="ambient-primary pointer-events-none absolute right-48 top-16 size-72 rounded-full filter-blur-3xl" />

      <header class="content-container relative pb-10 pt-12 lg:pb-18 lg:pt-24 sm:pb-16 sm:pt-16">
        <div class="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <motion.div
            :initial="{ opacity: 0, y: 24 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ delay: 0.06 }"
          >
            <h1 class="display-heading max-w-5xl text-[clamp(3.2rem,14vw,7rem)] leading-[0.88]">
              {{ $t('case_studies.title') }}
            </h1>
            <p class="text-body mt-2 max-w-2xl text-base leading-relaxed lg:text-xl sm:text-lg">
              {{ $t('case_studies.introduction') }}
            </p>
          </motion.div>

          <motion.figure
            class="surface-frosted hidden h-44 overflow-hidden rounded-2xl lg:block"
            :initial="{ opacity: 0, scale: 0.97 }"
            :animate="{ opacity: 1, scale: 1 }"
            :transition="{ delay: 0.14 }"
          >
            <img src="/work-placeholder.svg" alt="" class="h-full w-full object-cover" loading="eager">
          </motion.figure>
        </div>
      </header>

      <section class="border-base surface-strong-bg relative border-y backdrop-blur-xl lg:sticky lg:top-0 lg:z-30">
        <div class="content-container py-3">
          <button
            class="pill-control text-body hover:border-primary hover:text-primary w-full justify-between sm:hidden"
            type="button"
            @click="openFilters"
          >
            <span class="flex items-center gap-2">
              <span class="i-ph-funnel-simple text-base" aria-hidden="true" />
              {{ $t('case_studies.filters_button') }}
            </span>
            <span class="text-primary">
              {{ activeFilter ? $t(`case_studies.areas.${activeFilter}`) : $t('case_studies.filter_all') }}
            </span>
          </button>

          <div class="hidden gap-2 overflow-x-auto no-scrollbar sm:flex" role="group" :aria-label="$t('case_studies.filters_label')">
            <button
              class="relative shrink-0 rounded-full px-4 py-2.5 text-xs font-mono transition-colors"
              :class="activeFilter === null ? 'text-slate-950' : 'pill-control text-body hover:border-primary hover:text-primary'"
              :aria-pressed="activeFilter === null"
              type="button"
              @click="activeFilter = null"
            >
              <motion.span v-if="activeFilter === null" layout-id="active-work-filter" class="absolute inset-0 rounded-full bg-rose-400" />
              <span class="relative z-1">{{ $t('case_studies.filter_all') }}</span>
            </button>
            <button
              v-for="filter in filters"
              :key="filter"
              class="relative shrink-0 rounded-full px-4 py-2.5 text-xs font-mono transition-colors"
              :class="activeFilter === filter ? 'text-slate-950' : 'pill-control text-body hover:border-primary hover:text-primary'"
              :aria-pressed="activeFilter === filter"
              type="button"
              @click="activeFilter = filter"
            >
              <motion.span v-if="activeFilter === filter" layout-id="active-work-filter" class="absolute inset-0 rounded-full bg-rose-400" />
              <span class="relative z-1">{{ $t(`case_studies.areas.${filter}`) }}</span>
            </button>
          </div>
        </div>
      </section>

      <dialog
        ref="filterDialog"
        class="work-filter-dialog surface-strong-bg fixed inset-x-0 bottom-0 top-auto m-0 max-h-[85dvh] max-w-none w-full overflow-hidden border-x-0 border-b-0 rounded-t-3xl p-0 text-base sm:hidden"
        :aria-label="$t('case_studies.filters_label')"
      >
        <div class="mx-auto mt-2 h-1 w-10 rounded-full bg-slate-300 dark:bg-slate-600" aria-hidden="true" />
        <div class="flex items-center justify-between px-5 pb-4 pt-3">
          <h2 class="display-heading text-xl">
            {{ $t('case_studies.filters_button') }}
          </h2>
          <button class="icon-control" type="button" :aria-label="$t('case_studies.close_filters')" @click="closeFilters">
            <span class="i-ph-x text-lg" aria-hidden="true" />
          </button>
        </div>

        <div class="grid max-h-[calc(85dvh-8rem)] gap-2 overflow-y-auto px-4 pb-4" role="group" :aria-label="$t('case_studies.filters_label')">
          <button
            class="border-base w-full flex items-center justify-between border rounded-2xl px-4 py-3 text-left text-sm font-mono transition-colors"
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
            class="border-base w-full flex items-center justify-between border rounded-2xl px-4 py-3 text-left text-sm font-mono transition-colors"
            :class="activeFilter === filter ? 'bg-rose-400 text-slate-950' : 'text-body hover:border-primary hover:text-primary'"
            :aria-pressed="activeFilter === filter"
            type="button"
            @click="activeFilter = filter"
          >
            {{ $t(`case_studies.areas.${filter}`) }}
            <span v-if="activeFilter === filter" class="i-ph-check text-lg" aria-hidden="true" />
          </button>
        </div>

        <div class="work-filter-actions border-base border-t p-4">
          <button class="control-primary w-full justify-center py-3" type="button" @click="closeFilters">
            {{ $t('case_studies.close_filters') }}
          </button>
        </div>
      </dialog>

      <main class="content-container relative py-6 lg:py-14 sm:py-10">
        <div class="meta-label mb-5 flex items-center justify-between">
          <span>{{ $t('case_studies.showing') }}</span>
          <span>{{ filteredStudies.length.toString().padStart(2, '0') }}</span>
        </div>

        <LayoutGroup>
          <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-12 lg:gap-4">
            <motion.article
              v-for="(study, index) in filteredStudies"
              :key="study.translationKey"
              layout
              class="project-card group relative min-h-74 overflow-hidden border rounded-[1.5rem] backdrop-blur-xl transition duration-200 focus-within:z-10 hover:z-10"
              :class="gridClass(index)"
              :style="cardStyle(study.project, study.projectType)"
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
                    class="display-heading max-w-4xl text-[clamp(1.8rem,5vw,3.4rem)] leading-[0.94] tracking-[-0.025em] text-balance"
                    :style="{ viewTransitionName: `study-title-${study.slug}` }"
                  >
                    {{ study.title }}
                  </h2>
                  <p class="text-body mt-5 max-w-2xl text-sm leading-relaxed sm:text-base">
                    {{ study.description }}
                  </p>
                </div>

                <div class="border-subtle relative mt-auto flex items-center justify-between gap-4 border-t pt-2">
                  <ul class="flex flex-wrap gap-x-3 gap-y-1.5">
                    <li v-for="technology in study.technologies?.slice(0, 4)" :key="technology" class="text-muted text-2.5 font-mono">
                      {{ technology }}
                    </li>
                    <li v-if="!study.technologies?.length" class="text-subtle text-2.5 font-mono">
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
      </main>
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
