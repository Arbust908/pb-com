<script setup lang="ts">
const general_store = useGeneralStore()
const { print_mode } = storeToRefs(general_store)
</script>

<template>
  <div
    :class="print_mode ? 'print pt-0' : null"
    class="grid grid-rows-[auto_1fr_auto] min-h-full"
  >
    <GeneralNavBar class="z-40" />
    <main class="z-20 grow layout-grid">
      <slot />
    </main>
    <GeneralFooter class="z-40"/>
  </div>
</template>
