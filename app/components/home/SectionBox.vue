<script setup lang="ts">
interface Props {
  title: string
}

defineProps<Props>()
</script>

<template>
  <div class="border-t border-slate-300/70 py-10 lg:grid lg:grid-cols-12 lg:gap-8 dark:border-slate-700/70 lg:py-16">
    <div class="mb-7 lg:col-span-3 lg:mb-0">
      <p class="italic meta-label-base">
        {{ title }}
      </p>
    </div>
    <div class="grid gap-3 lg:col-span-9 md:grid-cols-2">
      <slot name="cards" />
    </div>
  </div>
</template>
