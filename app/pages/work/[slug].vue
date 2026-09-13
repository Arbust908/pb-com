<script setup lang="ts">
import type { ApiResponse, CvSkillsData } from '#shared/types'
import { motion, MotionConfig, useDomRef, useScroll, useSpring } from 'motion-v'
import { MOTION_SPRINT_OPTIONS } from '#shared/constants'
import { usePageSeo } from '~/composables/usePageSeo'
import { resolveCaseStudySkills } from '~/utils/skills'
import { createArticleGraph } from '~/utils/structuredData'

const route = useRoute()
const { locale, t } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const slug = computed(() => String(route.params.slug))
const articleRef = useDomRef()
const { data: skillsResponse } = await useFetch<ApiResponse<CvSkillsData>>('/api/cv/skills', { key: 'cv-skills' })
const catalogSkills = computed(() => skillsResponse.value?.data?.skills ?? [])

const { data: translations } = await useAsyncData(
  () => `case-study-${slug.value}`,
  () => {
    const query = queryCollection('caseStudies')
      .where('slug', '=', slug.value)

    if (!import.meta.dev)
      query.where('draft', '=', false)

    return query.all()
  },
  { watch: [slug] },
)

if (!translations.value?.length)
  throw createError({ statusCode: 404, statusMessage: t('case_studies.not_found') })

const availableLocales = computed(() => translations.value?.map(document => document.locale) ?? [])
const study = computed(() => translations.value?.find(document => document.locale === locale.value)
  ?? translations.value?.find(document => document.locale === 'en')
  ?? translations.value?.[0])
const isFallback = computed(() => study.value?.locale !== locale.value)
const hasBothLanguages = computed(() => availableLocales.value.includes('en') && availableLocales.value.includes('es'))
const tocLinks = computed(() => study.value?.body?.toc?.links ?? [])
const technologies = computed(() => resolveCaseStudySkills(study.value?.technologies ?? [], catalogSkills.value))
const skills = computed(() => resolveCaseStudySkills(study.value?.skills ?? [], catalogSkills.value))

const { scrollYProgress } = useScroll({
  target: articleRef,
  offset: ['start start', 'end end'],
  trackContentSize: true,
})
const readingProgress = useSpring(scrollYProgress, MOTION_SPRINT_OPTIONS)

async function switchLanguage(language: 'en' | 'es') {
  await navigateTo(switchLocalePath(language))
}

usePageSeo({
  title: () => `${study.value?.title ?? t('case_studies.title')} :: Pancho Blanco`,
  description: () => study.value?.description,
  type: 'article',
  structuredData: (context) => {
    const currentStudy = study.value
    if (!currentStudy)
      return null

    const areas = currentStudy.areas?.map(area => t(`case_studies.areas.${area}`)) ?? []
    return createArticleGraph({
      url: context.canonicalUrl,
      name: currentStudy.title,
      description: currentStudy.description,
      publishedAt: currentStudy.publishedAt,
      section: areas,
      keywords: [...new Set([...currentStudy.technologies, ...currentStudy.skills, ...areas])],
      breadcrumbs: [
        { name: t('home'), url: context.localeUrl(context.locale) },
        { name: t('case_studies.title'), url: context.absoluteUrl(`${context.locale === 'es' ? '/es' : ''}/work`) },
        { name: currentStudy.title, url: context.canonicalUrl },
      ],
    })
  },
})
</script>

<template>
  <MotionConfig reduced-motion="user" :transition="MOTION_SPRINT_OPTIONS">
    <article v-if="study" ref="articleRef" class="relative w-full overflow-clip bg-slate-100 text-slate-950 layout-grid-full dark:bg-slate-900 dark:text-slate-50">
      <motion.div
        aria-hidden="true"
        class="fixed inset-x-0 top-0 z-progress h-1 origin-left bg-rose-400"
        :style="{ scaleX: readingProgress }"
      />

      <div aria-hidden="true" class="pointer-events-none absolute right--20 top--24 size-120 rounded-full bg-purple-400/15 filter-blur-3xl dark:bg-purple-400/10" />
      <div aria-hidden="true" class="pointer-events-none absolute right-48 top-16 size-72 rounded-full bg-rose-400/15 filter-blur-3xl dark:bg-rose-400/10" />

      <motion.nav
        class="relative z-main mx-auto max-w-360 w-full flex items-center justify-between gap-3 px-4 py-4 lg:px-10 lg:py-6 sm:px-6"
        :initial="{ opacity: 0, y: -12 }"
        :animate="{ opacity: 1, y: 0 }"
      >
        <NuxtLink
          :to="localePath({ name: 'work' })"
          class="h-11 inline-flex items-center gap-2 border border-slate-300/70 rounded-full bg-slate-50/70 px-4 py-2 text-xs text-slate-700 font-mono backdrop-blur-md transition dark:border-slate-700/70 hover:border-rose-500/60 dark:bg-slate-800/40 dark:text-slate-300 hover:text-rose-700 dark:hover:border-rose-400/50 dark:hover:text-rose-300"
        >
          <span aria-hidden="true">←</span>
          <span class="xs:inline hidden">{{ $t('case_studies.back') }}</span>
          <span class="xs:hidden">{{ $t('work') }}</span>
        </NuxtLink>

        <div class="flex items-center gap-2">
          <span v-if="study.draft" class="border border-amber-500/30 rounded-full bg-amber-400/10 px-3 py-2 text-[0.6rem] text-amber-800 tracking-wide font-mono uppercase dark:text-amber-200">
            {{ $t('case_studies.draft') }}
          </span>
          <div v-if="hasBothLanguages" class="flex rounded-full bg-slate-50/70 p-1 dark:bg-slate-800/40" :aria-label="$t('case_studies.language')">
            <button
              v-for="language in ['en', 'es'] as const"
              :key="language"
              class="relative rounded-full px-3 py-2 text-[0.62rem] font-mono uppercase"
              :class="locale === language ? 'text-slate-950' : 'text-slate-500 dark:text-slate-400 hover:text-rose-700 dark:hover:text-rose-300'"
              type="button"
              @click="switchLanguage(language)"
            >
              <motion.span v-if="locale === language" layout-id="article-language" class="absolute inset-0 rounded-full bg-rose-400" />
              <span class="relative z-above">{{ language }}</span>
            </button>
          </div>
        </div>
      </motion.nav>

      <header class="relative mx-auto max-w-360 w-full px-4 pb-12 pt-8 lg:px-10 sm:px-6 lg:pb-24 sm:pb-16 sm:pt-12">
        <motion.div
          v-if="isFallback"
          class="mb-8 flex items-start gap-3 border border-amber-500/30 rounded-2xl bg-amber-400/10 p-4 text-sm text-amber-800 dark:text-amber-100"
          :initial="{ opacity: 0, y: 10 }"
          :animate="{ opacity: 1, y: 0 }"
        >
          <span aria-hidden="true" class="mt-0.5 text-amber-700 dark:text-amber-300">◎</span>
          {{ $t('case_studies.fallback') }}
        </motion.div>

        <div class="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div class="lg:col-span-8 xl:col-span-9">
            <motion.p
              class="mb-6 flex flex-wrap items-center gap-2 meta-label-primary"
              :initial="{ opacity: 0, y: 10 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ delay: 0.04 }"
            >
              <span>{{ study.organization }}</span>
              <span class="text-slate-400 dark:text-slate-500">/</span>
              <span class="text-slate-500 dark:text-slate-400">{{ $t(`case_studies.${study.projectType}`) }}</span>
              <template v-if="study.publishedAt">
                <span class="text-slate-400 dark:text-slate-500">/</span>
                <time class="text-slate-500 dark:text-slate-400">{{ formatDate(study.publishedAt, locale, { year: 'numeric', month: 'short' }) }}</time>
              </template>
            </motion.p>

            <motion.h1
              class="max-w-6xl text-balance text-[clamp(3rem,10vw,7.5rem)] font-extrabold leading-[0.9] tracking-[-0.035em] font-mono lg:leading-[0.84]"
              :style="{ viewTransitionName: `study-title-${study.slug}` }"
              :initial="{ opacity: 0 }"
              :animate="{ opacity: 1 }"
              :transition="{ delay: 0.08, duration: 0.45 }"
            >
              {{ study.title }}
            </motion.h1>

            <motion.p
              class="mt-8 max-w-3xl text-lg text-slate-700 leading-relaxed lg:text-2xl sm:text-xl dark:text-slate-300"
              :initial="{ opacity: 0, y: 18 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ delay: 0.14 }"
            >
              {{ study.description }}
            </motion.p>
          </div>

          <motion.dl
            class="grid grid-cols-2 overflow-hidden border border-slate-300/70 rounded-2xl bg-slate-50/70 backdrop-blur-xl lg:col-span-4 xl:col-span-3 lg:grid-cols-1 dark:border-slate-700/70 dark:bg-slate-800/40"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ delay: 0.18 }"
          >
            <div class="border-r border-slate-300/70 p-4 lg:border-b lg:border-r-0 dark:border-slate-700/70 lg:p-5">
              <dt class="meta-label">
                {{ $t('case_studies.role') }}
              </dt>
              <dd class="mt-2 text-sm text-slate-700 leading-snug dark:text-slate-300 sm:text-slate-950 sm:dark:text-slate-50">
                {{ study.role }}
              </dd>
            </div>
            <div class="p-4 lg:p-5">
              <dt class="meta-label">
                {{ $t('case_studies.period') }}
              </dt>
              <dd class="mt-2 text-sm text-slate-700 dark:text-slate-300 sm:text-slate-950 sm:dark:text-slate-50">
                {{ study.period }}
              </dd>
            </div>
          </motion.dl>
        </div>
      </header>

      <nav v-if="tocLinks.length" class="sticky top-0 z-sticky border-y border-slate-300/70 bg-slate-50/90 backdrop-blur-xl lg:hidden dark:border-slate-700/70 dark:bg-slate-800/75">
        <ol class="flex gap-6 overflow-x-auto px-4 py-4 no-scrollbar sm:px-6">
          <li v-for="(link, index) in tocLinks" :key="link.id" class="shrink-0">
            <a :href="`#${link.id}`" class="flex items-center gap-2 text-xs text-slate-500 font-mono dark:text-slate-400 hover:text-rose-700 dark:hover:text-rose-300">
              <span class="text-rose-700 opacity-60 dark:text-rose-300">{{ (index + 1).toString().padStart(2, '0') }}</span>
              {{ link.text }}
            </a>
          </li>
        </ol>
      </nav>

      <div class="relative grid mx-auto max-w-360 w-full gap-12 border-t border-slate-300/70 px-4 py-12 lg:grid-cols-[13rem_minmax(0,46rem)] xl:grid-cols-[15rem_minmax(0,48rem)_10rem] lg:justify-center lg:gap-16 dark:border-slate-700/70 lg:px-10 lg:py-24 sm:px-6 sm:py-16">
        <motion.aside
          v-if="tocLinks.length"
          class="hidden lg:block"
          :initial="{ opacity: 0, x: -16 }"
          :while-in-view="{ opacity: 1, x: 0 }"
          :in-view-options="{ once: true, margin: '-10%' }"
        >
          <div class="sticky top-8">
            <p class="mb-5 meta-label">
              {{ $t('case_studies.contents') }}
            </p>
            <ol class="border-l border-slate-300/70 pl-5 space-y-4 dark:border-slate-700/70">
              <li v-for="(link, index) in tocLinks" :key="link.id">
                <a :href="`#${link.id}`" class="group flex gap-3 text-xs text-slate-500 leading-snug font-mono transition dark:text-slate-400 hover:text-rose-700 dark:hover:text-rose-300">
                  <span class="text-rose-700 opacity-45 dark:text-rose-300 group-hover:opacity-100">{{ (index + 1).toString().padStart(2, '0') }}</span>
                  {{ link.text }}
                </a>
              </li>
            </ol>
          </div>
        </motion.aside>

        <motion.div
          :initial="{ opacity: 0, y: 24 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true, margin: '-5%' }"
        >
          <ContentRenderer :value="study" class="case-study-content" />

          <motion.footer
            class="grid mt-18 gap-8 border-t border-slate-300/70 pt-10 sm:grid-cols-2 dark:border-slate-700/70"
            :initial="{ opacity: 0, y: 20 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :in-view-options="{ once: true, margin: '-10%' }"
          >
            <div>
              <h2 class="mb-4 meta-label">
                {{ $t('case_studies.technologies') }}
              </h2>
              <ul class="flex flex-wrap gap-2">
                <li v-for="technology in technologies" :key="technology.slug">
                  <SkillChip :skill="technology" />
                </li>
              </ul>
            </div>
            <div>
              <h2 class="mb-4 meta-label">
                {{ $t('case_studies.skills') }}
              </h2>
              <ul class="flex flex-wrap gap-2">
                <li v-for="skill in skills" :key="skill.slug">
                  <SkillChip :skill="skill" />
                </li>
              </ul>
            </div>
          </motion.footer>

          <NuxtLink
            :to="localePath({ name: 'work' })"
            class="mt-16 min-h-28 flex items-center justify-between gap-5 border border-slate-300/70 rounded-3xl bg-slate-50/70 p-5 backdrop-blur-xl transition dark:border-slate-700/70 hover:border-rose-500/60 dark:bg-slate-800/40 sm:p-7 dark:hover:border-rose-400/50"
          >
            <span>
              <span class="block meta-label-primary">{{ $t('work') }}</span>
              <span class="mt-2 block text-xl font-medium sm:text-2xl">{{ $t('case_studies.back') }}</span>
            </span>
            <span class="size-12 flex shrink-0 items-center justify-center rounded-full bg-rose-400 text-xl text-slate-950">←</span>
          </NuxtLink>
        </motion.div>

        <div aria-hidden="true" class="hidden xl:block" />
      </div>
    </article>
  </MotionConfig>
</template>

<style scoped>
.case-study-content {
  @apply text-slate-700 dark:text-slate-300;
  font-size: clamp(1rem, 1.4vw, 1.125rem);
  line-height: 1.85;
}

.case-study-content :deep(h2) {
  @apply text-slate-950 dark:text-slate-50;
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 500;
  letter-spacing: -0.035em;
  line-height: 1;
  margin: 5rem 0 1.5rem;
  scroll-margin-top: 5rem;
  text-wrap: balance;
}

.case-study-content :deep(h2:first-child) {
  margin-top: 0;
}

.case-study-content :deep(h2 > a),
.case-study-content :deep(h3 > a) {
  color: inherit;
  text-decoration: none;
}

.case-study-content :deep(h3) {
  @apply text-rose-700 dark:text-rose-300;
  font-family: 'Google Sans Code', monospace;
  font-size: 0.76rem;
  letter-spacing: 0.1em;
  margin: 3rem 0 1rem;
  scroll-margin-top: 5rem;
  text-transform: uppercase;
}

.case-study-content :deep(p),
.case-study-content :deep(ul),
.case-study-content :deep(ol) {
  margin: 1.4rem 0;
}

.case-study-content :deep(ul),
.case-study-content :deep(ol) {
  padding-left: 1.5rem;
}

.case-study-content :deep(a) {
  @apply text-rose-700 dark:text-rose-300;
  text-decoration: underline;
  text-underline-offset: 0.22em;
}

.case-study-content :deep(blockquote) {
  @apply border border-rose-500/60 dark:border-rose-400/50 bg-rose-400/5 text-slate-700 dark:text-slate-300;
  border-radius: 1.25rem;
  font-size: clamp(1.05rem, 2vw, 1.28rem);
  line-height: 1.65;
  margin: 2.25rem 0;
  padding: 1.25rem;
}

.case-study-content :deep(code) {
  @apply text-rose-700 dark:text-rose-300;
  font-family: 'Google Sans Code', monospace;
}

@media (min-width: 640px) {
  .case-study-content :deep(blockquote) {
    padding: 1.75rem;
  }
}
</style>
