<script setup lang="ts">
import type { MetaData } from '~/composables/ultimateProtocol'
import { useUP } from '~/composables/ultimateProtocol'

const meta: MetaData = {
  base_url: 'panchoblanco.com',
  title: 'Blog :: Pancho Blanco',
  description:
          'Un blog donde busco descargar mis conocimientos para compartir con mi amigo Diego y todo aquel que lo encuentre util!',
}
useHead(useUP(meta))
interface ArticleCard {
  title: string
  description: string
  slug: string
}
const articles = [{ title: 'Nuevo Sitio', description: 'Nuevamente empezamos con otro sitio con nueva tecnologia y mucha nuevas cosas', slug: 'nuevo_sitio' }] as ArticleCard[]

// https://twitter.com/nuxt_js/status/1645825181640785926
// https://blog.webdevsimplified.com/2020-07/relative-time-format/ for blog times and time ago
// https://nuxtseo.com/og-image/releases/v3 for blog og images
</script>

<template>
  <main class="mx-auto w-full pt-0 sm:p-8">
    <h1 class="py-4 text-4xl text-violet-700 dark:text-violet-300">
      Blog Posts
    </h1>
    <section class="grid gap-4">
      <router-link
        v-for="article of articles"
        :key="article.slug"
        to="/blog/"
        class="transform rounded bg-blueGray-300 transition hover:scale-105 dark:bg-blueGray-700 hover:bg-blueGray-400 hover:shadow-xl dark:hover:bg-blueGray-600"
      >
        <div
          class="h-24 w-full rounded-t from-rose-500 to-violet-500 bg-gradient-to-tl"
        />
        <div class="p-3">
          <h2 class="mb-2 font-bold">
            {{ article.title }}
          </h2>
          <p class="leading-none">
            {{ article.description }}
          </p>
        </div>
      </router-link>
    </section>
  </main>
</template>

<style scoped>
section.grid {
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
}
</style>
