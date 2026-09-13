<script setup lang="ts">
import { usePageSeo } from '~/composables/usePageSeo'
import { createPageGraph } from '~/utils/structuredData'

const { t } = useI18n()

const globalStore = useGlobalStore()
await useAsyncData('global-data', () => globalStore.fetchAll())
const { experiences, skillsData } = storeToRefs(globalStore)

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
</script>

<template>
  <div class="relative w-full overflow-hidden layout-grid-full">
    <div aria-hidden="true" class="pointer-events-none fixed right--20 top--24 size-120 rounded-full bg-purple-400/15 filter-blur-3xl dark:bg-purple-400/10" />
    <div aria-hidden="true" class="pointer-events-none fixed left--32 top-80 size-96 rounded-full bg-rose-400/15 filter-blur-3xl dark:bg-rose-400/10" />

    <HomeHeroSection :skills-data="skillsData" />

    <div v-if="experiences.length > 0 || skillsData.groups.length > 0" class="mx-auto max-w-360 w-full px-4 pb-18 lg:px-10 sm:px-6 lg:pb-28">
      <HomeRecentWorkSection :experiences="experiences" :skills="skillsData.skills" />
      <HomeSkillsSection :skills-data="skillsData" />
    </div>
  </div>
</template>
