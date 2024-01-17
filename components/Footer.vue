<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGeneralStore } from '~/composables'

const general_store = useGeneralStore()
const { print_mode } = storeToRefs(general_store)
</script>

<template>
  <footer
    class="flex flex-wrap items-center justify-between bg-blueGray-200 px-6 pb-1 pt-2 text-sm dark:bg-blueGray-800"
  >
    <section>
      <a
        href="https://github.com/Arbust908"
        class="inline-flex items-center p-3 md:py-0"
        title="Github profile"
      >
        <span v-if="print_mode" class="mr-2">https://github.com/Arbust908</span>
        <i class="i-carbon:logo-github inline h-6 w-6" />
      </a>
    </section>
    <div class="awesome-line" />
  </footer>
</template>

<style>
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
