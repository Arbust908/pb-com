<script setup lang="ts">
import { appName } from '@/constants'

useHead({
  title: appName,
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
  color-scheme: light dark;
  min-height: -webkit-fill-available;
  @apply h-100svh m-0 p-0 scroll-smooth;
}

html.dark {
  @apply bg-slate-900 text-slate-100;
}
</style>
