<script setup lang='ts'>
import type { RouteLocationRaw } from '#vue-router';
import type { RouteRecordNormalized } from '#vue-router';

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
        <div v-for="route in widgetRoutes" :key="route.path" class="grid md:grid-cols-2 gap-4">
            <NuxtLink :to="route.path" class="text-xl md:text-sm font-bold rounded-md bg-purple-700 px-4 py-2 hover:(shadow bg-purple-800 text-gray-200)">{{ route.name }}</NuxtLink>
            <NuxtLink :to="toLongPath(route)" class="text-xl md:text-sm font-bold rounded-md bg-purple-700 px-4 py-2 hover:(shadow bg-purple-800 text-gray-200)">{{ route.name }} Long</NuxtLink>
        </div>
    </main>
</template>
