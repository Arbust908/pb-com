<script setup lang="ts">
import { useUP } from '~/composables/ultimateProtocol'
import type { MetaData } from '~/composables/ultimateProtocol'

const meta: MetaData = {
  base_url: 'https://panchoblanco.dev',
  title: 'Curriculum Vitae :: Pancho Blanco',
  description:
          'Hola soy Pancho Blanco, un Desarrollador y Diseñador Grafico. Estas son mis habilidades y experiencias. Tengo mas de 4 años en la industria del desarrollo y tengo una pasion por enseñar y aprender.',
}
useHead(useUP(meta))
</script>

<template>
  <section class="relative w-full overflow-hidden layout-grid-full">
    <!-- eslint-disable vue/no-unused-refs -->
    <BlobyOne class="pointer-events-none fixed z-0 w-90 opacity-45 filter-blur-2xl -right-8 -top-4 dark:opacity-30" />
    <BlobyTwo class="pointer-events-none fixed z-0 w-100 opacity-45 filter-blur-2xl -bottom-7 -left-6 dark:opacity-30" />
    <div class="cv-layout relative grid content-container pb-18 pt-8 lg:pb-28 lg:pt-12">
      <CvSideNav class="lang relative z-10" />
      <CvPersonal class="personal relative z-10 h-fit" />
      <CvExperiences ref="exp" class="exp relative z-10" />
      <CvStudies ref="study" class="study relative z-10" />
      <BackToTopBtn class="z-20" />
    </div>
  </section>
</template>

<style scoped>
@media screen and (min-width: 768px) {
  /* https://colorgradient.dev/ */
  .cv-layout {
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
  .cv-layout.print {
    grid-template-rows: 20px 640px 1fr auto;
  }
}
@screen lg {
  .cv-layout {
    grid-template-areas:
      'lang .'
      'personal exp'
      'personal exp'
      '. study';
    grid-template-columns: 400px clamp(320px, 60%, 640px);
    grid-template-rows: 64px 640px 1fr auto;
  }
}
.cv-layout.print {
  grid-template-areas:
    '. . .'
    '. personal .'
    '. exp .'
    '. study .';
  grid-template-columns: 200px 640px 200px;
  grid-template-rows: 60px repeat(3, auto);
}
</style>
