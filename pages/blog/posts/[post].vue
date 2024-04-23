<script setup lang='ts'>
const route = useRoute();
const postName = computed(() => route.params.post);
</script>

<template>
  <main>
    <h1>
      {{ postName }}
    </h1>
  </main>
</template>
