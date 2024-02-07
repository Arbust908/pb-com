<script setup lang="ts">
import type { MetaData } from '@/composables/ultimateProtocol'
import { useUP } from '@/composables/ultimateProtocol'

const meta: MetaData = {
  base_url: 'panchoblanco.com',
  title: 'Sobre Pancho Blanco :: Desarrollador Creativo',
  description:
          'Hola soy Pancho Blanco, un Desarrollador y Diseñador Grafico. Tengo mas de 8 años en la industria del desarrollo y tengo una pasion por enseñar y aprender.',
}
useHead(useUP(meta))
</script>

<template>
  <section class="flex flex-col items-center gap-4 p-6 text-center">
    <h1 class="from-violet-600 via-pink-500 to-violet-400 bg-gradient-to-r bg-clip-text text-4xl text-transparent font-light md:(text-6xl -mt-4)">
      Pancho Blanco
    </h1>
    <h2 class="text-lg font-bold tracking-widest md:text-3xl">
      Classes
    </h2>
    <div class="flex gap-x-4">
      <p></p>
    </div>
  </section>
</template>

<style scoped>
h1 {
  view-transition-name: h1
}
h2 {
  view-transition-name: h2
}
div {
  view-transition-name: content
}
</style>
