<script setup lang="ts">
const router = useRouter()

const filteredRoutes = computed(() => {
  const toolsRoute = router.options.routes.find(route => route.path === '/tools')
  if (toolsRoute && toolsRoute.children) {
    return toolsRoute.children.map(route => {
      const formattedName = route.name?.toString().replace('tools-', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      const formattedPath = `/tools/${route.path}`
      const isCurrent = formattedPath === router.currentRoute.value.path
      return {
        name: formattedName,
        path: formattedPath,
        current: isCurrent
      }
    })
  }
  return []
})
</script>

<template>
  <section class="py-4 layout-grid-popout">
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
      <select id="tabs" name="tabs"
        class="block w-full rounded-md border-slate-3 py-2 pl-3 pr-10 text-base focus:border-violet-5 focus:outline-none focus:ring-violet-5 sm:text-sm">
        <option v-for="tab in filteredRoutes" :key="tab.name" :selected="tab.current">{{ tab.name }}</option>
      </select>
    </div>
    <div class="hidden sm:block">
      <div class="border-b border-slate-2">
        <nav class="-mb-px flex space-x-2" aria-label="Tabs">
          <NuxtLink v-for="tab in filteredRoutes" :key="tab.name" :to="tab.path"
            :class="[tab.current ? 'border-violet-5 text-slate-6 dark:text-slate-1' : 'border-transparent text-slate-5 hover:border-slate-3 hover:text-slate-7 dark:hover:text-slate-3', 'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium']"
            :aria-current="tab.current ? 'page' : undefined">
            {{ tab.name }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </section>
  <section>
    <NuxtPage />
  </section>
</template>
