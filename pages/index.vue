<script setup lang="ts">
const online = useOnline()
// https://github.com/zyyv/chris.me to copy simple about
// https://motion.dev/ for animations
// https://twitter.com/drawsgood/status/1740754087023362175 for mascot/face following with Rive
// https://masteringnuxt.com/blog/writing-a-cache-composable-in-nuxt-3 for useCacheFetch
</script>

<template>
  <section>
    <Logos mb-6 />
    <Suspense>
      <ClientOnly>
        <PageView v-if="online" />
        <div v-else text-gray:80>
          You're offline
        </div>
      </ClientOnly>
      <template #fallback>
        <div italic op50>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
    <InputEntry />
  </section>
</template>
