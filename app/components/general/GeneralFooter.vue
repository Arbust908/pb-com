<script setup lang="ts">
import { GITHUB_URL } from '#shared/constants'

const currentYear = new Date().getFullYear()
const localePath = useLocalePath()
</script>

<template>
  <footer
    class="border-t border-slate-300/70 bg-slate-50/90 px-4 text-sm dark:border-slate-700/70 dark:bg-slate-800/75"
  >
    <div class="mx-auto max-w-360 flex flex-wrap items-center justify-between gap-3 px-2 py-4">
      <p class="meta-label">
        Pancho Blanco / {{ currentYear }}
      </p>
      <nav class="flex items-center gap-1 sm:gap-2" :aria-label="$t('footer_navigation')">
        <NuxtLink
          :to="localePath({ name: 'about' })"
          class="rounded-full px-3 py-2 text-xs font-mono transition hover:text-rose-700 dark:hover:text-rose-300"
        >
          {{ $t('about_link') }}
        </NuxtLink>
        <NuxtLink
          :to="localePath({ name: 'privacy' })"
          class="rounded-full px-3 py-2 text-xs font-mono transition hover:text-rose-700 dark:hover:text-rose-300"
        >
          {{ $t('privacy_link') }}
        </NuxtLink>
        <NuxtLink
          :href="GITHUB_URL"
          class="size-9 inline-flex items-center justify-center border border-slate-300/70 rounded-full text-slate-700 transition dark:border-slate-700/70 hover:border-rose-500/60 dark:text-slate-300 hover:text-rose-700 dark:hover:border-rose-400/50 dark:hover:text-rose-300"
          :aria-label="$t('github_profile')"
          rel="noreferrer"
          external
        >
          <i class="i-ph:github-logo size-5" aria-hidden="true" />
        </NuxtLink>
      </nav>
    </div>
    <div class="awesome-line bg-[length:200%_100%] from-rose-400 via-purple-400 to-rose-400 bg-gradient-to-r" />
  </footer>
</template>

<style>
.awesome-line {
  height: 2px;
  width: 100%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .awesome-line {
    animation: none;
  }
}
</style>
