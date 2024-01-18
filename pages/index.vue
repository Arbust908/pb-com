<script setup lang="ts">
import type { MetaData } from '@/composables/ultimateProtocol'
import { useUP } from '@/composables/ultimateProtocol'

const meta: MetaData = {
  base_url: 'panchoblanco.com',
  title: 'Pancho Blanco :: Desarrollador Creativo',
  description:
          'Hola soy Pancho Blanco, un Desarrollador y Diseñador Grafico. Tengo mas de 8 años en la industria del desarrollo y tengo una pasion por enseñar y aprender.',
}
useHead(useUP(meta))
// AI vue components https://www.vue0.dev/
</script>

<template>
  <section class="flex flex-col items-center p-6 text-center">
    <Logo class="w-1/2 fill-current md:w-1/6" />
    <h1 class="from-pink-500 to-violet-500 bg-gradient-to-r bg-clip-text text-4xl text-transparent font-light md:text-6xl md:-mt-4">
      Pancho Blanco
    </h1>
    <h2 class="text-lg font-bold tracking-widest md:text-3xl">
      {{ $t('rol') }}
    </h2>
  </section>
</template>
