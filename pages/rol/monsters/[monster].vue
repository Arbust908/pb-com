<script setup lang='ts'>
const route = useRoute()
const monsterName = computed(() => route.params.monster)
</script>

<template>
  <main>
    <h1>
      {{ monsterName }}
    </h1>
  </main>
</template>
