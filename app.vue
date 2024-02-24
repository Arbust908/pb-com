<script setup lang="ts">
import { appName } from '@/constants'

const { locale } = useI18n()
const isDark = useDark()
const isDev = import.meta.dev

useHead({
  title: appName,
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      href: isDev ? '/public/pb-favicon-local.png' : isDark.value ? '/public/pb-favicon-dark.png' : '/public/pb-favicon-light.png',
    }
  ]
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* https://twitter.com/alirdev/status/1734136001671643465 for full height safe on device */
html,
body,
#__nuxt {
  min-height: -webkit-fill-available;
  color-scheme: light dark;
  @apply h-100svh m-0 p-0 scroll-smooth font-sans;
}

body {
  @apply bg-slate-100;
}
.dark body {
  @apply bg-slate-700 text-slate-100;
}
</style>
