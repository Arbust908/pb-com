<script setup lang='ts'>
function backToTop() {
  window.scrollTo(0, 0)
}
</script>

<template>
  <button
    type="button"
    :aria-label="$t('back_to_top')"
    class="back-to-top absolute right-4 size-9 inline-flex items-center justify-center border border-slate-300/70 rounded-full bg-slate-50/90 text-slate-700 backdrop-blur-xl transition dark:border-slate-700/70 hover:border-rose-500/60 dark:bg-slate-800/75 dark:text-slate-300 hover:text-rose-700 hover:-translate-y-1 dark:hover:border-rose-400/50 dark:hover:text-rose-300"
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
