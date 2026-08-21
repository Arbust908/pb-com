<script setup lang="ts">
import posthog from 'posthog-js'
import { appName } from '@/constants'

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
      href: isDev ? '/pb-favicon-local.png' : isDark.value ? '/pb-favicon-dark.png' : '/pb-favicon-light.png',
    },
  ],
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <section class="modal__layer z-50" />
</template>

<style>
/* https://twitter.com/alirdev/status/1734136001671643465 for full height safe on device */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
}

html.dark {
  color-scheme: light dark;
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
}
</style>
