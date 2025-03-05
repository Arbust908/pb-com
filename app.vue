<script setup lang="ts">
import posthog from 'posthog-js'
import { appName } from '@/constants'

const { locale } = useI18n()
const isDark = useDark()
const isDev = import.meta.dev

onMounted(() => {
  if (!isDev) {
    posthog.init('phc_IWe7D2dsdy63sd80Puspwd4UqBWaoatzh42WSwehkqF', { api_host: 'https://app.posthog.com' })
  }
})

useHead({
  title: appName,
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      href: isDev ? '/pb-favicon-local.png' : isDark.value ? '/pb-favicon-dark.png' : '/pb-favicon-light.png',
    }
  ]
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <section class="modal__layer z-50"></section>
</template>

<style>
/* https://twitter.com/alirdev/status/1734136001671643465 for full height safe on device */
html.dark {
  color-scheme: light dark;
}
html,
body,
#__nuxt {
  min-height: -webkit-fill-available;
  @apply h-100svh m-0 p-0 scroll-smooth font-sans;
}
</style>
