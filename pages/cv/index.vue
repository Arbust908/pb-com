<template>
  <main class="p-6">
    <!-- <nav>{{ $t('lang') }}</nav> -->
    <aside class="flex justify-end mb-6 lang">
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
    <Experiences class="exp" />
    <Studies class="study" />
  </main>
</template>

<script>
export default {
  methods: {
    changeLang() {
      const newLang = this.$i18n.locale === 'es' ? 'en' : 'es'
      this.$i18n.locale = newLang
    },
  },
}
</script>

<style scoped>
@media screen and (min-width: 1024px) {
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
