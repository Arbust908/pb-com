<template>
  <main class="p-6 flex flex-col items-center">
    <Logo class="fill-current w-1/2 md:w-1/6" />
    <h1 class="text-4xl font-light md:-mt-4">Pancho Blanco</h1>
    <h2 class="text-xl font-bold tracking-widest">Desarrollador Creativo</h2>
    <!-- <AppSearchInput /> -->
  </main>
</template>

<script>
import Logo from '@/assets/icons/logo.svg'
import mediaCards from '@/mixins/media_cards'

export default {
  components: {
    Logo,
  },
  mixins: [mediaCards],
  data() {
    return {
      meta: {
        url: 'panchoblanco.com',
        title: 'Pancho Blanco :: Desarrollador Creativo',
        description:
          'Hola soy Pancho Blanco, un Desarrollador y Diseñador Grafico. Tengo mas de 4 años en la industria del desarrollo y tengo una pasion por enseñar y aprender.',
      },
    }
  },
  head() {
    return this.ultimateProtocol(this.meta)
  },
}
</script>

<style scoped></style>
