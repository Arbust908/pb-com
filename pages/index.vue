<script setup lang="ts">
import type { MetaData } from '@/composables/ultimateProtocol'
import { useUP } from '@/composables/ultimateProtocol'

const meta: MetaData = {
  base_url: 'panchoblanco.com',
  title: 'Pancho Blanco :: Desarrollador Creativo',
  description:
          'Hola soy Pancho Blanco, un Desarrollador y Diseñador Grafico. Tengo mas de 6 años en la industria del desarrollo y tengo una pasion por enseñar y aprender.',
}
useHead(useUP(meta))
</script>

<template>
  <section class="home">
    <Logo class="home__icon" />
    <h1 class="home__title">
      Pancho Blanco
    </h1>
    <h2 class="home__subtitle">
      {{ $t('rol') }}
    </h2>
  </section>
</template>

<style lang="scss">
  .home {
    @apply p-6 flex flex-col items-center text-center;
    &__icon {
      @apply fill-current w-1/2 md:w-1/6;
    }
    &__title {
      @apply text-4xl md:text-6xl font-light md:-mt-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500;
    }
    &__subtitle {
      @apply text-lg md:text-3xl font-bold tracking-widest;
    }
  }
</style>
