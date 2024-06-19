<script setup lang="ts">
const general_store = useGeneralStore()
const { print_mode, layout_start } = storeToRefs(general_store)
</script>

<template>
  <div
    :class="[print_mode ? 'print pt-0' : null]"
    class="grid grid-cols-[100%] grid-rows-[auto_1fr_auto] min-h-full"
  >
    <GeneralNavBar class="relative z-40" />
    <main class="relative z-20 layout-grid" :style="layout_start ? 'align-content: flex-start;' : null">
      <slot />
    </main>
    <GeneralFooter class="relative z-40" />
  </div>
</template>
