<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGeneralStore } from '~/composables'

const general_store = useGeneralStore()
const { print_mode } = storeToRefs(general_store)
</script>

<template>
  <div
    :class="print_mode ? 'print' : null"
    class="pb-layout"
  >
    <NavBar />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style scoped lang="scss">
.pb-layout {
  @apply font-main bg-blueGray-100 dark:bg-blueGray-900 text-blueGray-900 dark:text-blueGray-100 flex flex-col min-h-screen;
  & > main {
    @apply grow z-20;
  }
}
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
