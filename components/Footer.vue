<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGeneralStore } from '~/composables'

const general_store = useGeneralStore()
const { print_mode } = storeToRefs(general_store)
</script>

<template>
  <footer
    class="px-6 pb-1 pt-2 bg-blueGray-200 dark:bg-blueGray-800 flex items-center justify-between text-sm flex-wrap"
  >
    <section>
      <a
        href="https://github.com/Arbust908"
        class="p-3 md:py-0 inline-flex items-center"
        title="Github profile"
      >
        <span v-if="print_mode" class="mr-2">https://github.com/Arbust908</span>
        <i class="w-6 h-6 inline i-carbon:logo-github" />
      </a>
    </section>
    <div class="awesome-line" />
  </footer>
</template>

<style lang="scss">
  .awesome-line {
    @apply w-full h-1.5 rounded-full;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
</style>
