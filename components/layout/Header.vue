<script setup lang="ts">
const router = useRouter()
const allRoutes = computed(() => router.getRoutes().filter(route => route.path !== '/' || route.path.includes(':')))
// https://codepen.io/jh3y/pen/QWoKXdo
// https://twitter.com/jh3yy/status/1746101914700493168
</script>

<template>
  <div class="flex items-center justify-between flex-gap-3 p-5 text-xl">
    <NuxtLink to="/" class="relative flex-middle">
      <i class="i-ri:hexagon-fill size-12 text-emerald-500" />
      <i class="i-ri:checkbox-blank-circle-fill absolute size-10 text-emerald-500" />
      <i class="i-ri:brain-fill absolute size-8 text-slate-900" />
      <i class="i-ri:hexagon-line absolute size-8 text-slate-900" />
    </NuxtLink>
    <nav class="space-x-3">
      <NuxtLink v-for="route in allRoutes" :key="route.path" :to="route.path">
        {{ route.name }}
      </NuxtLink>
    </nav>
    <DarkCircleToggle />
  </div>
</template>
