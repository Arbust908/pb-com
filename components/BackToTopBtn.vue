<script setup lang='ts'>
function backToTop() {
  window.scrollTo(0, 0)
}
</script>

<template>
  <button
    type="button"
    :aria-label="$t('back_to_top')"
    class="back-to-top absolute right-4 icon-control surface-strong-bg backdrop-blur-xl hover:-translate-y-1"
    @click="backToTop"
  >
    <i class="i-ph:arrow-up size-4" aria-hidden="true" />
  </button>
</template>

<style scoped>
.back-to-top {
  bottom: calc(5.5rem + env(safe-area-inset-bottom));
}

@media (min-width: 640px) {
  .back-to-top {
    bottom: 1rem;
  }
}
</style>
