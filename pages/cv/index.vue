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
  <div :class="print_mode && 'print'" class="relative p-6">
    <CvSideNav v-if="!print_mode" class="lang" />
    <CvPersonal class="personal" />
    <CvExperiences ref="exp" class="exp" />
    <CvStudies ref="study" class="study" />
    <BackToTopBtn />
  </div>
</template>

<style scoped>
@media screen and (min-width: 768px) {
  div {
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
  div.print {
    grid-template-rows: 20px 640px 1fr auto;
  }
}
</style>
