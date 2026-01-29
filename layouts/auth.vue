<script setup lang="ts">

</script>

<template>
  <div
    class="grid grid-cols-[100%] grid-rows-[auto_1fr_auto] min-h-full bg-zinc-8"
  >
    <GeneralAuthNav />
    <main class="[background-size:16px_16px] relative z-20 border-b-4 border-black bg-[radial-gradient(#71717a_2px,transparent_1px)]">
      <slot />
    </main>
  </div>
</template>
