<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGeneralStore } from '~/composables'

const general_store = useGeneralStore()
const { print_mode } = storeToRefs(general_store)
</script>

<template>
  <div
    :class="print_mode ? 'print' : null"
    class="min-h-screen flex flex-col bg-blueGray-100 text-blueGray-900 dark:bg-blueGray-900 dark:text-blueGray-100"
  >
    <NavBar />
    <main class="z-20 grow">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<style scoped>
.pb-layout {
  padding-top: 88px;
}
@media screen and (min-width: 768px) {
  .pb-layout {
    padding-top: 56px;
  }
}

.pb-layout.print {
  padding-top: 0;
}
</style>
