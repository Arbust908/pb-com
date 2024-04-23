<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGeneralStore } from "~/composables";

const general_store = useGeneralStore();
const { print_mode } = storeToRefs(general_store);
// https://codepen.io/jh3y/pen/QWoKXdo
// https://twitter.com/jh3yy/status/1746101914700493168
</script>

<template>
  <header
    v-if="!print_mode"
    class="w-full flex flex-col items-center bg-slate-200 p-2 sm:flex-row sm:justify-between dark:bg-slate-800"
  >
    <NuxtLink to="/" class="rounded-lg px-2 py-1 hover:text-violet-500">
      <h1 class="flex items-center text-lg font-bold">
        <Logo class="h-8 w-8 fill-current" />
        <span>
          Pancho Blanco
        </span>
      </h1>
    </NuxtLink>
    <nav class="mr-4 flex items-center justify-between space-x-3">
      <GeneralLangToggle />
      <ClientOnly>
        <DarkCircleToggle />
      </ClientOnly>
      <NuxtLink
        class="rounded-lg px-2 py-1 transition duration-150 ease-out hover:text-violet-500 hover:underline"
        to="/about"
      >
        About
      </NuxtLink>
      <NuxtLink
        class="rounded-lg px-2 py-1 transition duration-150 ease-out hover:text-violet-500 hover:underline"
        to="/cv"
      >
        Resume
      </NuxtLink>
      <!-- <NuxtLink
          class="rounded-lg px-2 py-1 hover:text-violet-500 hover:shadow"
          to="/clases"
        >
          Clases
        </NuxtLink> -->
      <NuxtLink
        class="rounded-lg bg-violet-400 px-4 py-1 text-slate-900 transition duration-150 ease-out dark:bg-violet-600 dark:text-slate-100 hover:text-violet-500 hover:shadow dark:hover:bg-violet-800"
        to="/blog"
      >
        Blog
      </NuxtLink>
    </nav>
  </header>
</template>
