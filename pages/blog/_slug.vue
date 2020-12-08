<template>
  <main class="">
    <!-- <figure
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
    </figure> -->
    <article class="w-11/12 mx-auto">
      <prev-next :prev="prev" :next="next" />
      <header
        class="flex flex-col mb-3 lg:mb-1 lg:flex-row justify-between items-baseline"
      >
        <h1
          class="text-4xl font-light bg-clip-text text-transparent bg-gradient-to-r dark:from-amber-400 dark:to-rose-600 from-cyan-400 to-violet-600"
        >
          {{ article.title }}
        </h1>
        <p
          v-if="article.updatedAt !== article.createdAt"
          class="text-blueGray-400 dark:text-blueGray-600"
        >
          Actualizado el {{ formatDate(article.updatedAt) }}
        </p>
        <p v-else class="text-blueGray-400 dark:text-blueGray-600">
          Creado el {{ formatDate(article.createdAt) }}
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
import mediaCards from '@/mixins/media_cards'

export default {
  mixins: [mediaCards],
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
    // timeCount() {
    //   const text = this.post && this.post.content ? this.post.content : ' '
    //   const WORDS_PER_MINUTES = 200
    //   const wordCount = text.split(' ').length
    //   let wordsInMin = wordCount / WORDS_PER_MINUTES
    //   wordsInMin = Math.round(wordsInMin)
    //   const formatWIM = wordsInMin <= 0 ? 'Menos de 1 ' : wordsInMin + ' '
    //   return formatWIM
    // },
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('es', options)
    },
  },
  head() {
    return this.ultimateProtocol({
      title: `${this.article.title} | Blog :: Pancho Blanco`,
      description: `${this.article.description} // ${this.formatDate(
        this.article.updatedAt
      )}`,
    })
  },
}
</script>

<style>
.nuxt-content h2 {
  font-weight: bold;
  font-size: 28px;
}
.nuxt-content h3 {
  font-weight: bold;
  font-size: 22px;
}
.nuxt-content p {
  margin-bottom: 20px;
}
.nuxt-content-highlight > pre {
  @apply p-4 rounded-lg bg-blueGray-800 text-sm grid;
}
.nuxt-content-highlight > pre > code {
  @apply overflow-auto w-full pb-2;
}

@media screen and (min-width: 768px) {
  /* main.grid {
    grid-template-rows: 1fr;
    grid-template-columns: minmax(368px, 768px) minmax(400px, 1fr);
    /* minmax(300px, 1fr)
  } */
  /* figure {
    height: calc(100vh - 56px);
    top: 56px;
  } */
  main > article {
    max-width: 80ch;
  }
}
</style>
