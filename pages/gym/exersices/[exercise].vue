<script setup lang='ts'>
const route = useRoute();
const exerciseName = computed(() => route.params.exercise);
</script>

<template>
  <main>
    <h1>
      {{ exerciseName }}
    </h1>
  </main>
</template>
