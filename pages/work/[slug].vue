<script setup lang="ts">
import { MotionConfig, motion, useDomRef, useScroll, useSpring } from 'motion-v'

const route = useRoute()
const { locale, t } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const slug = computed(() => String(route.params.slug))
const articleRef = useDomRef()

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

if (!translations.value?.length) {
  throw createError({ statusCode: 404, statusMessage: 'Case study not found' })
}

const availableLocales = computed(() => translations.value?.map(document => document.locale) ?? [])
const study = computed(() => translations.value?.find(document => document.locale === locale.value)
  ?? translations.value?.find(document => document.locale === 'en')
  ?? translations.value?.[0])
const isFallback = computed(() => study.value?.locale !== locale.value)
const hasBothLanguages = computed(() => availableLocales.value.includes('en') && availableLocales.value.includes('es'))
const tocLinks = computed(() => study.value?.body?.toc?.links ?? [])

const { scrollYProgress } = useScroll({
  target: articleRef,
  offset: ['start start', 'end end'],
  trackContentSize: true,
})
const readingProgress = useSpring(scrollYProgress, {
  stiffness: 160,
  damping: 30,
  restDelta: 0.001,
})

async function switchLanguage(language: 'en' | 'es') {
  await navigateTo(switchLocalePath(language))
}

useSeoMeta({
  title: () => `${study.value?.title ?? t('case_studies.title')} :: Pancho Blanco`,
  description: () => study.value?.description,
})
</script>

<template>
  <MotionConfig reduced-motion="user" :transition="{ type: 'spring', stiffness: 260, damping: 28 }">
    <article v-if="study" ref="articleRef" class="base-bg relative w-full overflow-clip text-base layout-grid-full">
      <motion.div
        aria-hidden="true"
        class="fixed inset-x-0 top-0 z-60 h-1 origin-left bg-rose-400"
        :style="{ scaleX: readingProgress }"
      />

      <div aria-hidden="true" class="ambient-secondary pointer-events-none absolute right--20 top--24 size-120 rounded-full filter-blur-3xl" />
      <div aria-hidden="true" class="ambient-primary pointer-events-none absolute right-48 top-16 size-72 rounded-full filter-blur-3xl" />

      <motion.nav
        class="content-container relative z-20 flex items-center justify-between gap-3 py-4 lg:py-6"
        :initial="{ opacity: 0, y: -12 }"
        :animate="{ opacity: 1, y: 0 }"
      >
        <NuxtLink
          :to="localePath({ name: 'work' })"
          class="pill-control surface-bg text-body hover:border-primary hover:text-primary h-11 gap-2 backdrop-blur-md"
        >
          <span aria-hidden="true">←</span>
          <span class="xs:inline hidden">{{ $t('case_studies.back') }}</span>
          <span class="xs:hidden">{{ $t('work') }}</span>
        </NuxtLink>

        <div class="flex items-center gap-2">
          <span v-if="study.draft" class="border border-amber-500/30 rounded-full bg-amber-400/10 px-3 py-2 text-[0.6rem] text-amber-800 tracking-wide font-mono uppercase dark:text-amber-200">
            {{ $t('case_studies.draft') }}
          </span>
          <div v-if="hasBothLanguages" class="surface-bg flex rounded-full p-1" :aria-label="$t('case_studies.language')">
            <button
              v-for="language in ['en', 'es'] as const"
              :key="language"
              class="relative rounded-full px-3 py-2 text-[0.62rem] font-mono uppercase"
              :class="locale === language ? 'text-slate-950' : 'text-muted hover:text-primary'"
              type="button"
              @click="switchLanguage(language)"
            >
              <motion.span v-if="locale === language" layout-id="article-language" class="absolute inset-0 rounded-full bg-rose-400" />
              <span class="relative z-1">{{ language }}</span>
            </button>
          </div>
        </div>
      </motion.nav>

      <header class="content-container relative pb-12 pt-8 lg:pb-24 sm:pb-16 sm:pt-12">
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
              class="meta-label-primary mb-6 flex flex-wrap items-center gap-2"
              :initial="{ opacity: 0, y: 10 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ delay: 0.04 }"
            >
              <span>{{ study.organization }}</span>
              <span class="text-subtle">/</span>
              <span class="text-muted">{{ $t(`case_studies.${study.projectType}`) }}</span>
              <template v-if="study.publishedAt">
                <span class="text-subtle">/</span>
                <time class="text-muted">{{ new Date(study.publishedAt).toLocaleDateString(locale, { year: 'numeric', month: 'short' }) }}</time>
              </template>
            </motion.p>

            <motion.h1
              class="display-heading max-w-6xl text-[clamp(3rem,10vw,7.5rem)] leading-[0.9] text-balance lg:leading-[0.84]"
              :style="{ viewTransitionName: `study-title-${study.slug}` }"
              :initial="{ opacity: 0 }"
              :animate="{ opacity: 1 }"
              :transition="{ delay: 0.08, duration: 0.45 }"
            >
              {{ study.title }}
            </motion.h1>

            <motion.p
              class="text-body mt-8 max-w-3xl text-lg leading-relaxed lg:text-2xl sm:text-xl"
              :initial="{ opacity: 0, y: 18 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ delay: 0.14 }"
            >
              {{ study.description }}
            </motion.p>
          </div>

          <motion.dl
            class="surface-frosted grid grid-cols-2 overflow-hidden rounded-2xl lg:col-span-4 xl:col-span-3 lg:grid-cols-1"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ delay: 0.18 }"
          >
            <div class="border-base border-r p-4 lg:border-b lg:border-r-0 lg:p-5">
              <dt class="meta-label">
                {{ $t('case_studies.role') }}
              </dt>
              <dd class="text-body mt-2 text-sm leading-snug sm:text-base">
                {{ study.role }}
              </dd>
            </div>
            <div class="p-4 lg:p-5">
              <dt class="meta-label">
                {{ $t('case_studies.period') }}
              </dt>
              <dd class="text-body mt-2 text-sm sm:text-base">
                {{ study.period }}
              </dd>
            </div>
          </motion.dl>
        </div>
      </header>

      <nav v-if="tocLinks.length" class="border-base surface-strong-bg sticky top-0 z-30 border-y backdrop-blur-xl lg:hidden">
        <ol class="flex gap-6 overflow-x-auto px-4 py-4 no-scrollbar sm:px-6">
          <li v-for="(link, index) in tocLinks" :key="link.id" class="shrink-0">
            <a :href="`#${link.id}`" class="text-muted hover:text-primary flex items-center gap-2 text-xs font-mono">
              <span class="text-primary opacity-60">{{ (index + 1).toString().padStart(2, '0') }}</span>
              {{ link.text }}
            </a>
          </li>
        </ol>
      </nav>

      <div class="content-container border-base relative grid gap-12 border-t py-12 lg:grid-cols-[13rem_minmax(0,46rem)] xl:grid-cols-[15rem_minmax(0,48rem)_10rem] lg:justify-center lg:gap-16 lg:py-24 sm:py-16">
        <motion.aside
          v-if="tocLinks.length"
          class="hidden lg:block"
          :initial="{ opacity: 0, x: -16 }"
          :while-in-view="{ opacity: 1, x: 0 }"
          :in-view-options="{ once: true, margin: '-10%' }"
        >
          <div class="sticky top-8">
            <p class="meta-label mb-5">
              {{ $t('case_studies.contents') }}
            </p>
            <ol class="border-base border-l pl-5 space-y-4">
              <li v-for="(link, index) in tocLinks" :key="link.id">
                <a :href="`#${link.id}`" class="group text-muted hover:text-primary flex gap-3 text-xs leading-snug font-mono transition">
                  <span class="text-primary opacity-45 group-hover:opacity-100">{{ (index + 1).toString().padStart(2, '0') }}</span>
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
            class="border-base grid mt-18 gap-8 border-t pt-10 sm:grid-cols-2"
            :initial="{ opacity: 0, y: 20 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :in-view-options="{ once: true, margin: '-10%' }"
          >
            <div>
              <h2 class="meta-label mb-4">
                {{ $t('case_studies.technologies') }}
              </h2>
              <ul class="flex flex-wrap gap-2">
                <li v-for="technology in study.technologies" :key="technology" class="rounded-full bg-rose-400 px-3 py-1.5 text-[0.65rem] text-slate-950 font-mono">
                  {{ technology }}
                </li>
                <li v-if="!study.technologies?.length" class="text-subtle text-sm">
                  —
                </li>
              </ul>
            </div>
            <div>
              <h2 class="meta-label mb-4">
                {{ $t('case_studies.skills') }}
              </h2>
              <ul class="flex flex-wrap gap-2">
                <li v-for="skill in study.skills" :key="skill" class="pill-control text-body rounded-full">
                  {{ skill }}
                </li>
              </ul>
            </div>
          </motion.footer>

          <NuxtLink
            :to="localePath({ name: 'work' })"
            class="surface-frosted hover:border-primary mt-16 min-h-28 flex items-center justify-between gap-5 rounded-3xl p-5 transition sm:p-7"
          >
            <span>
              <span class="meta-label-primary block">{{ $t('work') }}</span>
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
  @apply text-body;
  font-size: clamp(1rem, 1.4vw, 1.125rem);
  line-height: 1.85;
}

.case-study-content :deep(h2) {
  @apply text-base;
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
  @apply text-primary;
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
  @apply text-primary;
  text-decoration: underline;
  text-underline-offset: 0.22em;
}

.case-study-content :deep(blockquote) {
  @apply border border-primary bg-rose-400/5 text-body;
  border-radius: 1.25rem;
  font-size: clamp(1.05rem, 2vw, 1.28rem);
  line-height: 1.65;
  margin: 2.25rem 0;
  padding: 1.25rem;
}

.case-study-content :deep(code) {
  @apply text-primary;
  font-family: 'Google Sans Code', monospace;
}

@media (min-width: 640px) {
  .case-study-content :deep(blockquote) {
    padding: 1.75rem;
  }
}
</style>
