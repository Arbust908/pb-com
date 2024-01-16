<script setup lang='ts'>
defineProps({
  place: {
    type: String,
    default: 'Study Place',
  },
  date: {
    type: String,
    default: '1991',
  },
  description: {
    type: String,
    default: 'Study Description',
  },
})
</script>

<template>
  <article class="study-card">
    <h3>
      {{ place }}
    </h3>
    <div>
      {{ date }}
    </div>
    <p>
      {{ description }}
    </p>
  </article>
</template>

<style scoped lang='scss'>
    .study-card {
        @apply mb-4 p-4 text-blueGray-700 dark:text-blueGray-300 border-l-2 border-violet-400;
        & > h3 {
            @apply font-bold flex flex-col sm:flex-row mb-2;
        }
        & > div {
            @apply text-sm mb-2;
        }
        & > p {
            @apply font-light;
        }
    }
</style>
