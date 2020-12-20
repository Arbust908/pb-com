<template>
  <main class="p-6 relative">
    <!-- <nav>{{ $t('lang') }}</nav> -->
    <aside
      class="flex flex-col sm:flex-row justify-between lg:justify-end mb-6 lang"
    >
      <div class="lg:hidden space-x-2">
        <a
          href="#exp"
          class="py-3 sm:py-0 hover:underline hover:text-violet-600"
          @click.prevent="scrollToElement('exp')"
          >{{ $t('exp_title') }}</a
        >
        <a
          href="#study"
          class="py-3 sm:py-0 hover:underline hover:text-violet-600"
          @click.prevent="scrollToElement('study')"
          >{{ $t('study_title') }}</a
        >
      </div>
      <button
        class="hover:underline text-rigth flex items-center hover:text-violet-600 transition duration-200 ease-out"
        @click="changeLang()"
      >
        <Icon icon="translate" class="w-5 h-5 mr-1" />
        <span>
          {{ $t('change_lang') }}
        </span>
      </button>
    </aside>
    <Personal class="personal" />
    <Experiences ref="exp" class="exp" />
    <Studies ref="study" class="study" />
    <button
      title="back to top"
      class="absolute bottom-0 right-0 m-8 rounded transform transition duration-200 shadow hover:scale-105 hover:-translate-y-2 hover:bg-violet-200 dark:hover:bg-violet-800 hover:shadow-md"
      @click="backToTop"
    >
      <Icon icon="upload" weight="solid" class="m-3" />
    </button>
  </main>
</template>

<script>
import mediaCards from '@/mixins/media_cards'

export default {
  mixins: [mediaCards],
  data() {
    return {
      meta: {
        url: 'panchoblanco.com/cv',
        title: 'Curriculum Vitae :: Pancho Blanco',
        description:
          'Hola soy Pancho Blanco, un Desarrollador y Diseñador Grafico. Estas son mis habilidades y experiencias. Tengo mas de 4 años en la industria del desarrollo y tengo una pasion por enseñar y aprender.',
      },
    }
  },
  methods: {
    changeLang() {
      const newLang = this.$i18n.locale === 'es' ? 'en' : 'es'
      this.$i18n.locale = newLang
    },
    scrollToElement(ref, offset = 100) {
      const element = this.$refs[ref]
      this.$nextTick(() => {
        const top = element.$el.offsetTop - offset
        window.scrollTo(0, top)
      })
    },
    backToTop() {
      window.scrollTo(0, 0)
    },
  },
  head() {
    return this.ultimateProtocol(this.meta)
  },
}
</script>

<style scoped>
@media screen and (min-width: 768px) {
  main {
    display: grid;
    grid-template-areas:
      'lang .'
      'personal exp'
      '. exp'
      '. study';
    grid-template-columns: 400px 1fr;
    grid-template-rows: 64px 640px 1fr auto;
    column-gap: 1.5rem;
  }
  .lang {
    grid-area: lang;
  }
  .personal {
    grid-area: personal;
  }
  .exp {
    grid-area: exp;
  }
  .study {
    grid-area: study;
  }
}
</style>
