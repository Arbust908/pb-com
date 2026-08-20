<script setup lang="ts">
import { LayoutGroup, MotionConfig, motion } from 'motion-v'

const { locale, t } = useI18n()
const localePath = useLocalePath()
const activeFilter = ref<string | null>(null)

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
  const values = studies.value.flatMap(study => [...(study.technologies ?? []), ...(study.skills ?? [])])
  return [...new Set(values)].sort((a, b) => a.localeCompare(b))
})

const filteredStudies = computed(() => activeFilter.value
  ? studies.value.filter(study => [...(study.technologies ?? []), ...(study.skills ?? [])].includes(activeFilter.value!))
  : studies.value)

const professionalCount = computed(() => studies.value.filter(study => study.projectType === 'professional').length)
const personalCount = computed(() => studies.value.filter(study => study.projectType === 'personal').length)

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
    <div class="relative w-full overflow-hidden bg-[#090b0c] text-slate-100 layout-grid-full">
      <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 h-120 bg-[radial-gradient(circle_at_80%_0%,rgba(190,242,100,0.14),transparent_42%)]" />

      <header class="relative mx-auto max-w-360 px-4 pb-12 pt-12 lg:px-10 sm:px-6 lg:pb-24 lg:pt-24 sm:pb-16 sm:pt-16">
        <motion.p
          class="mb-5 flex items-center gap-3 text-[0.68rem] text-lime-300 tracking-[0.22em] font-mono uppercase"
          :initial="{ opacity: 0, y: 10 }"
          :animate="{ opacity: 1, y: 0 }"
        >
          <span class="size-2 rounded-full bg-lime-300 shadow-[0_0_18px_rgba(190,242,100,0.8)]" />
          {{ $t('case_studies.eyebrow') }}
        </motion.p>

        <div class="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <motion.div
            :initial="{ opacity: 0, y: 24 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ delay: 0.06 }"
          >
            <h1 class="[word-spacing:0.04em] max-w-5xl text-[clamp(3.2rem,14vw,7rem)] font-extrabold leading-[0.88] tracking-[-0.035em] font-display">
              {{ $t('case_studies.title') }}
            </h1>
            <p class="mt-8 max-w-2xl text-base text-slate-300 leading-relaxed lg:text-xl sm:text-lg">
              {{ $t('case_studies.introduction') }}
            </p>
          </motion.div>

          <motion.dl
            class="grid grid-cols-2 overflow-hidden border border-white/10 rounded-2xl bg-white/[0.035] backdrop-blur-sm"
            :initial="{ opacity: 0, scale: 0.97 }"
            :animate="{ opacity: 1, scale: 1 }"
            :transition="{ delay: 0.14 }"
          >
            <div class="border-r border-white/10 p-4 sm:p-5">
              <dt class="text-[0.62rem] text-slate-500 tracking-[0.18em] font-mono uppercase">
                {{ $t('case_studies.professional') }}
              </dt>
              <dd class="mt-2 text-3xl font-medium tabular-nums">
                {{ professionalCount.toString().padStart(2, '0') }}
              </dd>
            </div>
            <div class="p-4 sm:p-5">
              <dt class="text-[0.62rem] text-slate-500 tracking-[0.18em] font-mono uppercase">
                {{ $t('case_studies.personal') }}
              </dt>
              <dd class="mt-2 text-3xl font-medium tabular-nums">
                {{ personalCount.toString().padStart(2, '0') }}
              </dd>
            </div>
          </motion.dl>
        </div>
      </header>

      <section class="relative border-y border-white/10 bg-[#090b0c]/90 backdrop-blur-xl lg:sticky lg:top-0 lg:z-30">
        <div class="mx-auto max-w-360 px-4 py-3 lg:px-10 sm:px-6">
          <div class="flex gap-2 overflow-x-auto no-scrollbar" role="group" :aria-label="$t('case_studies.filters_label')">
            <button
              class="relative shrink-0 rounded-full px-4 py-2.5 text-xs font-mono transition-colors"
              :class="activeFilter === null ? 'text-slate-950' : 'border border-white/10 text-slate-300 hover:border-white/25 hover:text-white'"
              type="button"
              @click="activeFilter = null"
            >
              <motion.span v-if="activeFilter === null" layout-id="active-work-filter" class="absolute inset-0 rounded-full bg-lime-300" />
              <span class="relative z-1">{{ $t('case_studies.filter_all') }}</span>
            </button>
            <button
              v-for="filter in filters"
              :key="filter"
              class="relative shrink-0 rounded-full px-4 py-2.5 text-xs font-mono transition-colors"
              :class="activeFilter === filter ? 'text-slate-950' : 'border border-white/10 text-slate-300 hover:border-white/25 hover:text-white'"
              type="button"
              @click="activeFilter = filter"
            >
              <motion.span v-if="activeFilter === filter" layout-id="active-work-filter" class="absolute inset-0 rounded-full bg-lime-300" />
              <span class="relative z-1">{{ filter }}</span>
            </button>
          </div>
        </div>
      </section>

      <main class="relative mx-auto max-w-360 px-4 py-6 lg:px-10 lg:py-14 sm:px-6 sm:py-10">
        <div class="mb-5 flex items-center justify-between text-[0.65rem] text-slate-500 tracking-[0.16em] font-mono uppercase">
          <span>{{ $t('case_studies.showing') }}</span>
          <span>{{ filteredStudies.length.toString().padStart(2, '0') }}</span>
        </div>

        <LayoutGroup>
          <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-12 lg:gap-4">
            <motion.article
              v-for="(study, index) in filteredStudies"
              :key="study.translationKey"
              layout
              class="group min-h-82 overflow-hidden border border-white/10 rounded-[1.5rem] bg-[#111416]"
              :class="gridClass(index)"
              :initial="{ opacity: 0, y: 24, scale: 0.98 }"
              :animate="{ opacity: 1, y: 0, scale: 1 }"
              :transition="{ delay: Math.min(index * 0.035, 0.2), layout: { duration: 0.35 } }"
              :while-hover="{ y: -5 }"
              :while-press="{ scale: 0.985 }"
            >
              <NuxtLink
                :to="localePath({ name: 'work-slug', params: { slug: study.slug } })"
                class="relative h-full flex flex-col p-5 lg:p-8 sm:p-7 focus-visible:outline-2 focus-visible:outline-lime-300 focus-visible:outline-offset--2"
              >
                <span aria-hidden="true" class="absolute right-3 top-0 text-8xl text-white/[0.025] font-medium leading-none tabular-nums sm:text-9xl">
                  {{ (index + 1).toString().padStart(2, '0') }}
                </span>

                <div class="relative flex items-start justify-between gap-4">
                  <div class="flex flex-wrap items-center gap-2 text-[0.65rem] font-mono">
                    <span class="text-lime-300">{{ study.organization }}</span>
                    <span class="text-slate-600">/</span>
                    <span class="text-slate-400">{{ $t(`case_studies.${study.projectType}`) }}</span>
                  </div>
                  <span v-if="study.draft" class="shrink-0 border border-amber-300/35 rounded-full px-2 py-1 text-[0.58rem] text-amber-300 tracking-wide font-mono uppercase">
                    {{ $t('case_studies.draft') }}
                  </span>
                </div>

                <div class="relative my-auto py-10 sm:py-12">
                  <h2
                    class="[word-spacing:0.04em] max-w-4xl text-[clamp(1.8rem,5vw,3.4rem)] font-extrabold leading-[0.94] tracking-[-0.025em] font-display"
                    :style="{ viewTransitionName: `study-title-${study.slug}` }"
                  >
                    {{ study.title }}
                  </h2>
                  <p class="mt-5 max-w-2xl text-sm text-slate-400 leading-relaxed sm:text-base">
                    {{ study.description }}
                  </p>
                </div>

                <div class="relative mt-auto flex items-end justify-between gap-4 border-t border-white/8 pt-5">
                  <ul class="flex flex-wrap gap-x-3 gap-y-1.5">
                    <li v-for="technology in study.technologies?.slice(0, 4)" :key="technology" class="text-[0.62rem] text-slate-500 font-mono">
                      {{ technology }}
                    </li>
                    <li v-if="!study.technologies?.length" class="text-[0.62rem] text-slate-600 font-mono">
                      {{ study.skills?.[0] }}
                    </li>
                  </ul>
                  <span class="size-10 flex shrink-0 items-center justify-center border border-white/12 rounded-full text-lg transition duration-300 group-hover:(rotate--12 border-lime-300 bg-lime-300 text-slate-950)">
                    <span aria-hidden="true">↗</span>
                    <span class="sr-only">{{ $t('case_studies.read') }}</span>
                  </span>
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
