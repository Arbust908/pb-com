<script setup lang='ts'>
const backToTop = () => {
  window.scrollTo(0, 0)
}
</script>

<template>
  <button
    title="back to top"
    @click="backToTop"
  >
    <i class="i-ic:round-arrow-upward" />
  </button>
</template>

<style scoped lang='scss'>
    button {
        @apply absolute bottom-0 right-0 m-8 rounded transform transition duration-200 shadow hover:scale-105 hover:-translate-y-2 hover:bg-violet-200 dark:hover:bg-violet-800 hover:shadow-md p-3;
    }
</style>
