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
::view-transition-group(*) {
  animation: none;
}

::view-transition-old(*) {
  animation: view-transition-fade-out 150ms ease-in both;
}

::view-transition-new(*) {
  animation: view-transition-fade-in 150ms 150ms ease-out both;
}

@keyframes view-transition-fade-out {
  to {
    opacity: 0;
  }
}

@keyframes view-transition-fade-in {
  from {
    opacity: 0;
  }
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
