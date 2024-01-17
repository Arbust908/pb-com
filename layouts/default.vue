<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGeneralStore } from '~/composables'

const general_store = useGeneralStore()
const { print_mode } = storeToRefs(general_store)
</script>

<template>
  <div
    :class="print_mode ? 'print' : null"
    class="grid grid-rows-[52px_1fr_52px] h-full bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100"
  >
    <NavBar />
    <main class="z-20 grow layout-grid">
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
