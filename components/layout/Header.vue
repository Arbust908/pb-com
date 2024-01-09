<script setup lang="ts">
const router = useRouter()
const allRoutes = computed(() => router.getRoutes())
</script>

<template>
  <div class="flex justify-between flex-gap-3 p-5 text-xl">
    <NuxtLink to="/" class="flex-middle relative">
      <i class="i-ri:angularjs-fill size-12 text-emerald-500" />
      <i class="i-ri:checkbox-blank-circle-fill absolute size-10 text-emerald-500" />
      <i class="i-ri:brain-fill absolute size-8 text-slate-900" />
      <i class="i-ri:hexagon-line absolute size-8 text-slate-900" />
      <!--
      <i class="i-ri:arrow-drop-up-line absolute size-8 text-slate-900" />
      <i class="i-ri:bard-fill absolute size-10 text-slate-900" />
      <i class="i-ri:brain-line absolute size-8 dark:text-slate-900" />
      <i class="i-ri:contract-left-right-line absolute left-0 size-8 text-slate-900" />
      <i class="i-ri:eye-close-line absolute bottom-0 size-8 text-slate-900" />
      <i class="i-ri:eye-close-line absolute size-8 text-slate-900" />
      <i class="i-ri:empathize-line absolute size-8 text-slate-900" />
      <i class="i-ri:code-s-slash-fill absolute size-8 text-slate-900" />
      //
      -->
    </NuxtLink>
    <nav class="space-x-3">
      <NuxtLink v-for="route in allRoutes" :key="route.path" :to="route.path">
        {{ route.name }}
      </NuxtLink>
    </nav>
    <DarkToggle />
  </div>
</template>
