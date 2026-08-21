<script setup lang="ts">
// https://codepen.io/jh3y/pen/QWoKXdo
// https://twitter.com/jh3yy/status/1746101914700493168
const localePath = useLocalePath()
</script>

<template>
  <header
    class="hidden w-full border-b border-base surface-strong-bg px-4 py-3 backdrop-blur-xl sm:block sm:px-6"
  >
    <div class="mx-auto max-w-360 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
      <NuxtLink :to="localePath({ name: 'index' })" class="rounded-full transition hover:text-primary focus-visible:outline-2 focus-visible:outline-rose-400 focus-visible:outline-offset-4">
        <div class="flex items-center gap-2 text-base font-bold tracking-[-0.02em]">
          <Logo class="h-8 w-8 fill-current" />
          <span>
            Pancho Blanco
          </span>
        </div>
      </NuxtLink>
      <nav class="flex items-center justify-between gap-2">
        <GeneralLangToggle />
        <ClientOnly>
          <DarkCircleToggle />
        </ClientOnly>
        <NuxtLink
          class="rounded-full px-3 py-2 text-xs font-mono transition hover:text-primary"
          active-class="text-primary"
          :to="localePath({ name: 'work' })"
        >
          {{ $t('work') }}
        </NuxtLink>
        <NuxtLink
          class="rounded-full px-3 py-2 text-xs font-mono transition hover:text-primary"
          active-class="text-primary"
          :to="localePath({ name: 'cv' })"
        >
          {{ $t('resume') }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
