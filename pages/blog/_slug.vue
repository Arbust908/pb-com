<template>
  <main class="grid md:grid-cols-2 md:relative">
    <figure
      class="md:col-span-1 md:order-2 bg-gradient-to-tl from-rose-500 to-violet-500 md:sticky w-full"
    >
      <picture>
        <source :srcset="mainImgSrc" media="(min-width:768px)" />
        <img
          class="w-full h-full object-cover rounded-xl p-2"
          :src="smallImgSrc"
          :alt="article.alt"
        />
      </picture>
      <figcaption></figcaption>
    </figure>
    <article class="md:col-span-1 p-4">
      <prev-next :prev="prev" :next="next" />
      <header
        class="flex flex-col mb-3 lg:mb-1 lg:flex-row justify-between items-baseline"
      >
        <h1
          class="text-4xl font-light bg-clip-text text-transparent bg-gradient-to-r dark:from-amber-400 dark:to-rose-600 from-cyan-400 to-violet-600"
        >
          {{ article.title }}
        </h1>
        <p class="text-blueGray-400 dark:text-blueGray-600">
          last updated: {{ formatDate(article.updatedAt) }}
        </p>
      </header>
      <!-- <nav>
        <ul>
          <li v-for="link of article.toc" :key="link.id">
            <NuxtLink
              :class="{
                'py-2': link.depth === 2,
                'ml-2 pb-2': link.depth === 3,
              }"
              :to="`#${link.id}`"
              >{{ link.text }}</NuxtLink
            >
          </li>
        </ul>
      </nav> -->
      <nuxt-content :document="article" />
      <!-- <pre> {{ article }} </pre> -->
      <prev-next :prev="prev" :next="next" />
    </article>
  </main>
</template>
<script>
export default {
  // http://localhost:3000/_content/articles?only=title&only=description&only=img&only=slug&only=author
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    return {
      article,
      prev,
      next,
    }
  },
  computed: {
    mainImgSrc() {
      return require(`~/assets/img/${this.article.img}`)
    },
    smallImgSrc() {
      return require(`~/assets/img/${this.article.img_small}`)
    },
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
}
</script>

<style>
main.grid {
  grid-template-rows: 240px 1fr;
}
/* .nuxt-content-highlight > pre {
  @apply max-w-xs overflow-auto;
}

@media screen and (min-width: 500px) {
  .nuxt-content-highlight > pre {
    @apply max-w-none;
  }
} */
@media screen and (min-width: 768px) {
  main.grid {
    grid-template-rows: 1fr;
    grid-template-columns: minmax(368px, 768px) minmax(400px, 1fr);
    /* minmax(300px, 1fr) */
  }
  .nuxt-content-highlight > pre {
    @apply max-w-none;
  }
  figure {
    height: calc(100vh - 56px);
    top: 56px;
  }
}
</style>
