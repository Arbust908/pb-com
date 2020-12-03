<template>
  <main class="px-8">
    <h1 class="text-4xl text-violet-700 dark:text-violet-300 py-4">
      Blog Posts
    </h1>
    <section class="grid gap-4">
      <nuxt-link
        v-for="article of articles"
        :key="article.slug"
        :to="{ name: 'blog-slug', params: { slug: article.slug } }"
        class="rounded bg-blueGray-300 dark:bg-blueGray-700 hover:shadow-xl hover:bg-blueGray-400 dark:hover:bg-blueGray-600 transition transform hover:scale-105"
      >
        <img
          :src="smallImgSrc(article.img_small)"
          class="h-24 w-full object-cover object-top rounded-t"
        />
        <div class="p-3">
          <h2 class="font-bold mb-2">{{ article.title }}</h2>
          <p class="leading-none">{{ article.description }}</p>
        </div>
      </nuxt-link>
    </section>
  </main>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const articles = await $content('articles', params.slug)
      .only(['title', 'description', 'img_small', 'slug'])
      .sortBy('createdAt', 'asc')
      .fetch()

    return {
      articles,
    }
  },
  // computed: {
  //   smallImgSrc() {
  //     return require(`~/assets/img/${this.article.img_small}`)
  //   },
  // },
  methods: {
    smallImgSrc(src) {
      return require(`~/assets/img/${src}`)
    },
  },
}
</script>

<style scoped>
section.grid {
  grid-template-columns: repeat(auto-fill, 20rem);
}
</style>
