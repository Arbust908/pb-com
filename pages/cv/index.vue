<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGeneralStore } from '~/composables'
import { useUP } from '~/composables/ultimateProtocol'
import type { MetaData } from '~/composables/ultimateProtocol'

const meta: MetaData = {
  base_url: 'panchoblanco.com',
  title: 'Curriculum Vitae :: Pancho Blanco',
  description:
          'Hola soy Pancho Blanco, un Desarrollador y Diseñador Grafico. Estas son mis habilidades y experiencias. Tengo mas de 4 años en la industria del desarrollo y tengo una pasion por enseñar y aprender.',
}
useHead(useUP(meta))
const general_store = useGeneralStore()
const { print_mode } = storeToRefs(general_store)
</script>

<template>
    <div :class="print_mode && 'print'" class="relative grid layout-grid-feature">
      <BlobyOne v-if="!print_mode" class="fixed z-0 w-90 opacity-60 filter-blur-2xl -right-8 -top-4" />
      <BlobyTwo v-if="!print_mode" class="fixed z-0 w-100 opacity-60 filter-blur-2xl -bottom-7 -left-6" />
      <CvSideNav v-if="!print_mode" class="lang relative z-10" />
      <CvPersonal class="personal relative z-10" />
      <CvExperiences ref="exp" class="exp relative z-10" />
      <CvStudies ref="study" class="study relative z-10" />
      <BackToTopBtn class="z-20" />
    </div>
</template>

<style scoped>
@media screen and (min-width: 768px) {
  /* https://colorgradient.dev/ */
  div {
    grid-template-areas:
      'lang .'
      'personal exp'
      '. exp'
      '. study';
    grid-template-columns: 360px 1fr;
    grid-template-rows: 64px 640px 1fr auto;
    @apply gap-x-4;
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
  div.print {
    grid-template-rows: 20px 640px 1fr auto;
  }
}
@screen lg {
  div {
    grid-template-areas:
      'lang .'
      'personal exp'
      '. exp'
      '. study';
    grid-template-columns: 400px clamp(320px, 60%, 640px);
    grid-template-rows: 64px 640px 1fr auto;
  }
}
div.print {
      grid-template-areas:
      '. . .'
      '. personal .'
      '. exp .'
      '. study .';
    grid-template-columns: 200px 640px 200px;
    grid-template-rows: 60px repeat(3, auto);
}
</style>
