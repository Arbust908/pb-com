<script setup lang="ts">
import posthog from 'posthog-js'
import { appName, FAVICONS } from '#shared/constants'

const isDark = useDark()
const isDev = import.meta.dev
const { locale } = useI18n()

onMounted(() => {
  const phKey = useRuntimeConfig().public.phKey as string
  if (!isDev && phKey) {
    posthog.init(phKey, { api_host: 'https://app.posthog.com' })
  }
})

useHead(() => ({
  title: appName,
  htmlAttrs: {
    lang: locale.value,
  },
  link: [
    {
      rel: 'icon',
      href: isDev ? FAVICONS.local : isDark.value ? FAVICONS.dark : FAVICONS.light,
    },
  ],
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
::view-transition-group(*) {
  animation: none;
}

html {
  color-scheme: light dark;
}
html.dark {
  color-scheme: dark light;
}

html,
body,
#__nuxt {
  min-height: -webkit-fill-available;
  @apply h-100svh m-0 p-0 scroll-smooth font-sans;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none;
  }
}
</style>
