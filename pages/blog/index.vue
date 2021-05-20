<template>
  <main class="mx-auto sm:p-8 pt-0 w-full">
    <h1 class="text-4xl text-violet-700 dark:text-violet-300 py-4">
      Blog Posts
    </h1>
    <section class="grid gap-4">
      <nuxt-link
        v-for="article of articles"
        :key="article.slug"
        :to="{
          name: 'blog-slug___es___default',
          params: { slug: article.slug },
        }"
        class="rounded bg-blueGray-300 dark:bg-blueGray-700 hover:shadow-xl hover:bg-blueGray-400 dark:hover:bg-blueGray-600 transition transform hover:scale-105"
      >
        <!-- <img
          :src="smallImgSrc(article.img_small)"
          class="h-24 w-full object-cover object-top rounded-t"
        /> -->
        <div
          class="h-24 w-full bg-gradient-to-tl from-rose-500 to-violet-500 rounded-t"
        ></div>
        <div class="p-3">
          <h2 class="font-bold mb-2">{{ article.title }}</h2>
          <p class="leading-none">{{ article.description }}</p>
        </div>
      </nuxt-link>
    </section>
  </main>
</template>

<script>
import mediaCards from '@/mixins/media_cards'

export default {
  mixins: [mediaCards],
  async asyncData({ $content, params }) {
    const articles = await $content('articles', params.slug)
      .only(['title', 'description', 'img_small', 'slug'])
      .sortBy('createdAt', 'desc')
      .fetch()

    return {
      articles,
    }
  },
  data() {
    return {
      meta: {
        url: 'panchoblanco.com/blog',
        title: 'Blog :: Pancho Blanco',
        description:
          'Un blog donde busco descargar mis conocimientos para compartir con mi amigo Diego y todo aquel que lo encuentre util!',
      },
    }
  },
  methods: {
    smallImgSrc(src) {
      return require(`~/assets/img/${src}`)
    },
  },
  head() {
    return this.ultimateProtocol(this.meta)
  },
}
</script>

<style scoped>
section.grid {
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
}
</style>
