<script setup lang="ts">
// https://codepen.io/jh3y/pen/QWoKXdo
// https://twitter.com/jh3yy/status/1746101914700493168
const localePath = useLocalePath()
</script>

<template>
  <header
    class="hidden w-full border-b border-slate-300/70 bg-slate-50/90 px-4 py-3 backdrop-blur-xl sm:block dark:border-slate-700/70 dark:bg-slate-800/75 sm:px-6"
  >
    <div class="mx-auto max-w-360 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
      <NuxtLink :to="localePath({ name: 'index' })" class="rounded-full transition hover:text-rose-700 focus-visible:outline-2 focus-visible:outline-rose-400 focus-visible:outline-offset-4 dark:hover:text-rose-300">
        <div class="flex items-center gap-2 text-slate-950 font-bold tracking-[-0.02em] dark:text-slate-50">
          <Logo class="h-8 w-8 fill-current" />
          <span>
            Pancho Blanco
          </span>
        </div>
      </NuxtLink>
      <nav class="flex items-center justify-between gap-2">
        <NuxtLink
          class="rounded-full px-3 py-2 text-xs font-mono transition hover:text-rose-700 dark:hover:text-rose-300"
          active-class="text-rose-700 dark:text-rose-300"
          :to="localePath({ name: 'work' })"
        >
          {{ $t('work') }}
        </NuxtLink>
        <NuxtLink
          class="rounded-full px-3 py-2 text-xs font-mono transition hover:text-rose-700 dark:hover:text-rose-300"
          active-class="text-rose-700 dark:text-rose-300"
          :to="localePath({ name: 'cv' })"
        >
          {{ $t('resume') }}
        </NuxtLink>
        <GeneralLangToggle />
        <ClientOnly>
          <DarkCircleToggle />
        </ClientOnly>
      </nav>
    </div>
  </header>
</template>
