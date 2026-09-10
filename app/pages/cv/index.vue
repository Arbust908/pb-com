<script setup lang="ts">
import { CONTACT_EMAIL } from '#shared/constants'
import { usePageSeo } from '~/composables/usePageSeo'
import { createPageGraph } from '~/utils/structuredData'

const { locale, t } = useI18n()

const globalStore = useGlobalStore()
await useAsyncData('global-data', () => globalStore.fetchAll())
const { languages, skillsData } = storeToRefs(globalStore)

usePageSeo({
  title: () => `${t('cv.meta.title')} :: Pancho Blanco`,
  description: () => t('cv.meta.description'),
  structuredData: context => createPageGraph({
    type: 'ProfilePage',
    url: context.canonicalUrl,
    name: t('cv.meta.title'),
    description: t('cv.meta.description'),
    breadcrumbs: [
      { name: t('home'), url: context.localeUrl(context.locale) },
      { name: t('cv.meta.title'), url: context.canonicalUrl },
    ],
    person: {
      email: CONTACT_EMAIL,
      jobTitle: t('rol'),
      knowsAbout: skillsData.value.skills.map(skill => skill.name),
      knowsLanguage: languages.value
        .map(language => language.translations[locale.value]?.name ?? language.translations.en?.name)
        .filter((name): name is string => Boolean(name)),
    },
  }),
})
</script>

<template>
  <section class="relative w-full overflow-hidden layout-grid-full">
    <BlobyOne class="pointer-events-none fixed z-under w-90 opacity-45 filter-blur-2xl -right-8 -top-4 dark:opacity-30" />
    <BlobyTwo class="pointer-events-none fixed z-under w-100 opacity-45 filter-blur-2xl -bottom-7 -left-6 dark:opacity-30" />
    <div class="cv-layout relative grid content-container gap-6 pb-18 pt-8 md:gap-8 lg:pb-28 lg:pt-12">
      <CvSideNav class="lang relative z-content" />
      <CvPersonal class="personal relative z-content h-fit" />
      <CvExperiences class="exp relative z-content" />
      <CvStudies class="study relative z-content" />
      <BackToTopBtn class="z-main" />
    </div>
  </section>
</template>

<style scoped>
@media screen and (min-width: 768px) {
  /* https://colorgradient.dev/ */
  .cv-layout {
    grid-template-areas:
      'lang .'
      'personal exp'
      '. exp'
      '. study';
    grid-template-columns: 360px 1fr;
    grid-template-rows: 34px 640px 1fr auto;
    @apply gap-x-4;
  }
  .lang {
    grid-area: lang;
  }
  .personal {
    grid-area: personal;
  }
  .exp {
    grid-area: exp;
  }
  .study {
    grid-area: study;
  }
}
@screen lg {
  .cv-layout {
    grid-template-areas:
      'lang .'
      'personal exp'
      'personal exp'
      '. study';
    grid-template-columns: 400px clamp(320px, 60%, 640px);
    grid-template-rows: 64px 640px 1fr auto;
  }
}
</style>
