<script setup lang="ts">
import { CONTACT_EMAIL } from '#shared/constants'
import { usePageSeo } from '~/composables/usePageSeo'
import { createPageGraph } from '~/utils/structuredData'

const { t } = useI18n()

usePageSeo({
  title: () => `${t('privacy.title')} :: Pancho Blanco`,
  description: () => t('privacy.introduction'),
  structuredData: context => createPageGraph({
    type: 'WebPage',
    url: context.canonicalUrl,
    name: t('privacy.title'),
    description: t('privacy.introduction'),
    breadcrumbs: [
      { name: t('home'), url: context.localeUrl(context.locale) },
      { name: t('privacy.title'), url: context.canonicalUrl },
    ],
  }),
})
</script>

<template>
  <div class="relative w-full overflow-hidden layout-grid-full bg-checked">
    <div aria-hidden="true" class="pointer-events-none absolute right--28 top--28 size-120 rounded-full bg-rose-400/15 filter-blur-3xl dark:bg-rose-400/10" />

    <header class="relative mx-auto max-w-360 w-full px-4 pb-10 pt-14 lg:px-10 sm:px-6 lg:pb-16 lg:pt-24 sm:pt-18">
      <h1 class="max-w-5xl text-[clamp(3.2rem,12vw,7rem)] font-extrabold leading-[0.9] tracking-[-0.035em] font-mono">
        {{ $t('privacy.title') }}
      </h1>
      <p class="mt-6 max-w-3xl text-lg text-slate-700 leading-relaxed sm:text-xl dark:text-slate-300">
        {{ $t('privacy.introduction') }}
      </p>
      <p class="mt-5 meta-label">
        {{ $t('privacy.updated') }}
      </p>
    </header>

    <section class="relative mx-auto max-w-360 w-full px-4 pb-18 lg:px-10 sm:px-6 lg:pb-28">
      <aside class="border border-rose-500/60 rounded-2xl bg-rose-800/50 p-5 dark:border-rose-400/50 sm:p-7">
        <p class="meta-label-primary">
          {{ $t('privacy.notice_title') }}
        </p>
        <p class="mt-3 max-w-4xl text-slate-700 leading-relaxed dark:text-slate-300">
          {{ $t('privacy.notice') }}
        </p>
      </aside>

      <div class="grid mt-10 gap-x-12 gap-y-10 border-t border-slate-300/70 pt-10 lg:grid-cols-2 lg:mt-16 dark:border-slate-700/70 lg:pt-16">
        <section v-for="section in ['operator', 'analytics', 'fonts', 'hosting', 'storage', 'email', 'choices']" :key="section">
          <h2 class="text-2xl font-extrabold leading-[0.9] tracking-[-0.035em] font-mono sm:text-3xl">
            {{ $t(`privacy.sections.${section}.title`) }}
          </h2>
          <p class="mt-4 text-slate-700 leading-relaxed dark:text-slate-300">
            {{ $t(`privacy.sections.${section}.body`) }}
          </p>
          <p v-if="section === 'operator'" class="mt-4">
            <a class="text-rose-700 transition dark:text-rose-300 hover:underline" :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a>
          </p>
          <p v-if="section === 'analytics'" class="mt-4">
            <a class="text-rose-700 transition dark:text-rose-300 hover:underline" href="https://posthog.com/privacy" rel="noreferrer" target="_blank">PostHog Privacy Policy</a>
          </p>
          <p v-if="section === 'fonts'" class="mt-4">
            <a class="text-rose-700 transition dark:text-rose-300 hover:underline" href="https://policies.google.com/privacy" rel="noreferrer" target="_blank">Google Privacy Policy</a>
          </p>
          <p v-if="section === 'hosting'" class="mt-4">
            <a class="text-rose-700 transition dark:text-rose-300 hover:underline" href="https://vercel.com/legal/privacy-policy" rel="noreferrer" target="_blank">Vercel Privacy Policy</a>
          </p>
        </section>
      </div>
    </section>
  </div>
</template>
