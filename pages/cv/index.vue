<template>
  <main class="p-6">
    <!-- <nav>{{ $t('lang') }}</nav> -->
    <aside class="flex justify-end mb-6">
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
    <Personal />
    <Experiences />
    <Studies />
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

<style scoped></style>
