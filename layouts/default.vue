<script setup lang="ts">
const general_store = useGeneralStore();
const { print_mode } = storeToRefs(general_store);
</script>

<template>
  <div
    :class="print_mode ? 'print pt-0' : null"
    class="grid grid-cols-[100%] grid-rows-[auto_1fr_auto] min-h-full"
  >
    <GeneralNavBar class="relative z-40" />
    <main class="relative z-20 layout-grid">
      <slot />
    </main>
    <GeneralFooter class="relative z-40" />
  </div>
</template>
