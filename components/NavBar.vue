<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { isDark, toggleDark } from '~/composables/dark'
import { useGeneralStore } from '~/composables'

const general_store = useGeneralStore()
const { print_mode } = storeToRefs(general_store)
</script>

<template>
  <header
    v-if="!print_mode"
    class="flex flex-col sm:flex-row sm:justify-between items-center p-2 fixed top-0 w-full bg-blueGray-200 dark:bg-blueGray-800 z-50"
  >
    <NuxtLink to="/" class="rounded-lg px-2 py-1 hover:text-violet-500">
      <h1 class="text-lg font-bold flex items-center">
        <Logo class="w-8 h-8 fill-current" />
        <span>
          Pancho Blanco
        </span>
      </h1>
    </NuxtLink>
    <nav>
      <ul class="flex space-x-3 items-center justify-between mr-4">
        <li class="flex w-8 h-8 items-center justify-center">
          <i
            :class="isDark ? 'i-ic:round-light-mode' : 'i-ic:round-nights-stay'"
            class="w-5 h-5 fill-current transition duration-150 ease-out cursor-pointer hover:text-violet-500"
            @click="toggleDark()"
          />
        </li>
        <li>
          <NuxtLink
            class="px-2 py-1 rounded-lg transition duration-150 ease-out hover:text-violet-500 hover:underline"
            to="/cv"
          >
            Curriculum Vitae
          </NuxtLink>
        </li>
        <!--
          <li>
            <NuxtLink
              class="px-2 py-1 rounded-lg hover:text-violet-500 hover:shadow"
              to="/clases"
            >
              Clases
            </NuxtLink>
          </li>
          -->
        <li>
          <NuxtLink
            class="px-4 py-1 rounded-lg bg-violet-400 text-blueGray-900 transition duration-150 ease-out dark:bg-violet-600 dark:text-blueGray-100 hover:text-violet-500 hover:shadow dark:hover:bg-violet-800"
            to="/blog"
          >
            Blog
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
