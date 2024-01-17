<script setup lang='ts'>
function backToTop() {
  window.scrollTo(0, 0)
}
</script>

<template>
  <button
    title="back to top"
    class="absolute bottom-0 right-0 m-8 transform rounded p-3 shadow transition duration-200 hover:scale-105 hover:bg-violet-200 hover:shadow-md hover:-translate-y-2 dark:hover:bg-violet-800"
    @click="backToTop"
  >
    <i class="i-ic:round-arrow-upward" />
  </button>
</template>
