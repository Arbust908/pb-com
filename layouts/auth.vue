<script setup lang="ts">

</script>

<template>
  <div
    class="grid grid-cols-[100%] grid-rows-[auto_1fr_auto] min-h-full bg-zinc-8"
  >
    <GeneralAuthNav />
    <main class="relative z-20 bg-[radial-gradient(#71717a_2px,transparent_1px)] [background-size:16px_16px] border-b-4 border-black" >
      <slot />
    </main>
  </div>
</template>
