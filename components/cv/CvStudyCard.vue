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
  <article class="mb-4 border-l-2 border-violet-400 p-4 text-blueGray-700 dark:text-blueGray-300">
    <h3 class="mb-2 flex flex-col font-bold sm:flex-row">
      {{ place }}
    </h3>
    <div class="mb-2 text-sm">
      {{ date }}
    </div>
    <p class="font-light">
      {{ description }}
    </p>
  </article>
</template>
