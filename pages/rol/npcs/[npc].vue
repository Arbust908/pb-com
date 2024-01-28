<script setup lang='ts'>
const route = useRoute()
const npcName = computed(() => route.params.npc)
</script>

<template>
  <main>
    <h1>
      {{ npcName }}
    </h1>
  </main>
</template>

<style scoped>

</style>
