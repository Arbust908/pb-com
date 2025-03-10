<template>
  <div class="grid grid-cols-[220px_1fr_220px] h-full">
    <aside>Left Nav</aside>
    <main>Main</main>
    <aside>Right Nav</aside>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  // middleware: ['auth'],
  layout: "auth",
  title: 'AI Chat :: Pancho Blanco',
})
</script>
