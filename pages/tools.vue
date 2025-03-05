<script setup lang="ts">
definePageMeta({
  // middleware: ['auth'],
  layout: "auth",
})

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
  <section class="py-4 max-w-screen-lg mx-auto">
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
      <select id="tabs" name="tabs"
        class="block w-full rounded-md border-slate-3 py-2 pl-3 pr-10 text-base focus:border-violet-5 focus:outline-none focus:ring-violet-5 sm:text-sm">
        <option v-for="tab in filteredRoutes" :key="tab.name" :selected="tab.current">{{ tab.name }}</option>
      </select>
    </div>
    <div class="hidden sm:block">
      <div class="bg-zinc-7 border-3 border-black px-2 rounded">
        <nav class="py-3 space-x-2 group" aria-label="Tabs">
          <NuxtLink v-for="tab in filteredRoutes" :key="tab.name" :to="tab.path"
            :class="[
                tab.current 
                  ? 'border-black bg-rose-5 text-zinc-9'
                  : 'border-transparent text-zinc-1 group-hover:opacity-75 hover:bg-rose-4 hover:border-zinc-8 hover:text-zinc-8 hover:',
                  'whitespace-nowrap border-3 py-1 px-2 text-sm font-medium rounded transition duration-150 ease-in-out'
                ]"
            :aria-current="tab.current ? 'page' : undefined">
            {{ tab.name }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </section>
  <section class="py-4 max-w-screen-lg mx-auto">
    <NuxtPage />
  </section>
</template>
