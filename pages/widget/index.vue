<script setup lang='ts'>
import type { RouteLocationRaw, RouteRecordNormalized } from '#vue-router'

const router = useRouter()
function isWidget(route: RouteRecordNormalized) {
  const { path } = route
  // looks for pages that are widgets but nor the index
  return path.startsWith('/widget') && path !== '/widget'
}
const widgetRoutes = router.getRoutes().filter(isWidget)
function toLongPath(route: RouteRecordNormalized) {
  return { path: route.path, query: { long_mode: true } } satisfies RouteLocationRaw
}
</script>

<template>
  <main class="grid content-start justify-items-center py-8">
    <div v-for="route in widgetRoutes" :key="route.path" class="grid gap-4 md:grid-cols-2">
      <NuxtLink :to="route.path" class="rounded-md bg-purple-700 px-4 py-2 text-xl font-bold hover:(bg-purple-800 text-gray-200 shadow) md:text-sm">
        {{ route.name }}
      </NuxtLink>
      <NuxtLink :to="toLongPath(route)" class="rounded-md bg-purple-700 px-4 py-2 text-xl font-bold hover:(bg-purple-800 text-gray-200 shadow) md:text-sm">
        {{ route.name }} Long
      </NuxtLink>
    </div>
  </main>
</template>
