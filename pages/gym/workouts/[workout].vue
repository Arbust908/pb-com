<script setup lang='ts'>
const route = useRoute();
const workoutName = computed(() => route.params.workout);
</script>

<template>
  <main>
    <h1>
      {{ workoutName }}
    </h1>
  </main>
</template>
