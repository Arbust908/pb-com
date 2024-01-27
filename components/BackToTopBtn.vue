<script setup lang='ts'>
function backToTop() {
  window.scrollTo(0, 0)
}
</script>

<template>
  <button
    title="back to top"
    class="absolute bottom-0 right-0 m-4 transform rounded aspect-ratio-square w-10 shadow transition duration-200 hover:(scale-105 bg-violet-200 shadow-md -translate-y-2) dark:hover:bg-violet-800"
    @click="backToTop"
  >
    <i class="i-ic:round-arrow-upward" />
  </button>
</template>
