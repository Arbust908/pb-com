<script setup lang="ts">
const online = useOnline();
// https://github.com/zyyv/chris.me to copy simple about
// https://motion.dev/ for animations
// https://twitter.com/drawsgood/status/1740754087023362175 for mascot/face following with Rive
// https://masteringnuxt.com/blog/writing-a-cache-composable-in-nuxt-3 for useCacheFetch
const { data } = useAsyncData("data", () => $fetch("/api/auth/getAll"));
</script>

<template>
  <section>
    <Suspense>
      <ClientOnly>
        <PageView v-if="online" />
        <div v-else text-gray:80>
          You're offline
        </div>
        <table v-if="data && data?.all">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in data.all" :key="`${u.username}:${u.email}`">
              <td>{{ u.username }}</td>
              <td>{{ u.email }}</td>
            </tr>
          </tbody>
        </table>
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
