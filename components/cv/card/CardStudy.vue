<script setup lang='ts'>
type Props = {
  place: string
  date: string
  description: string
}
withDefaults(
defineProps<Props>(),
  {
  place: 'Study Place',
  date: '1991',
  description: 'Study Description',
});
const isExtended = ref(false)
</script>

<template>
  <article class="mb-4 border-l-2 border-violet-400 p-4 text-slate-700 dark:text-slate-300 cursor-pointer" @click="isExtended = !isExtended">
    <h3 class="flex items-center gap-x-3 flex-row">
      <span class="font-bold">
        {{ place }}
      </span>
      <span class="text-sm">
        {{ date }}
      </span>
    </h3>
    <template v-if="isExtended">
      <p class="font-light mt-2">
        {{ description }}
      </p>
    </template>
  </article>
</template>
