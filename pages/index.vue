<script setup lang="ts">
import shuffleLetters from "shuffle-letters";
// https://github.com/georapbox/shuffle-letters/tree/main
import type { MetaData } from "@/composables/ultimateProtocol";
import { useUP } from "@/composables/ultimateProtocol";

const meta: MetaData = {
 base_url: "panchoblanco.com",
 title: "Pancho Blanco :: Desarrollador Creativo",
 description:
  "Hola soy Pancho Blanco, un Desarrollador y Diseñador Grafico. Tengo mas de 8 años en la industria del desarrollo y tengo una pasion por enseñar y aprender.",
};
useHead(useUP(meta));
// AI vue components https://www.vue0.dev/
onMounted(() => {
 shuffleLetters(document.querySelector("h2"));
});
</script>

<template>
  <section class="flex flex-col items-center gap-4 p-6 text-center">
    <Logo class="w-1/2 fill-current" />
    <h1 class="from-pink-500 to-violet-500 bg-gradient-to-r bg-clip-text text-4xl text-transparent font-light md:(text-6xl -mt-4)">
      Pancho Blanco
    </h1>
    <h2 class="text-lg font-bold tracking-widest md:text-3xl min-h-32px">
      {{ $t('rol') }}
    </h2>
    <div class="flex gap-x-4">
      <NuxtLink
        class="rounded-lg bg-violet-400 px-4 py-1 text-slate-900 transition duration-150 ease-out dark:bg-violet-600 dark:text-slate-100 hover:text-violet-500 hover:shadow dark:hover:bg-violet-800"
        to="/blog"
      >
        Blog
      </NuxtLink>
      <NuxtLink
        class="rounded-lg bg-violet-400 px-4 py-1 text-slate-900 transition duration-150 ease-out dark:bg-violet-600 dark:text-slate-100 hover:text-violet-500 hover:shadow dark:hover:bg-violet-800"
        to="/cv"
      >
        Resume
      </NuxtLink>
    </div>
    <!-- <DotHero /> -->
  </section>
</template>

<style scoped>
h1 {
  view-transition-name: h1;
}
h2 {
  view-transition-name: h2;
}
div {
  view-transition-name: content;
}
</style>
