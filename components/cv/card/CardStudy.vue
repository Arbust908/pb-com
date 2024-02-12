<script setup lang='ts'>
interface Props {
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
  },
)
const isExtended = ref(false)
</script>

<template>
  <article class="mb-4 cursor-pointer border-l-2 border-violet-400 p-4 text-slate-700 dark:text-slate-300" @click="isExtended = !isExtended">
    <h3 class="flex flex-row items-center gap-x-3">
      <span class="font-bold">
        {{ place }}
      </span>
      <span class="text-sm">
        {{ date }}
      </span>
    </h3>
    <template v-if="isExtended">
      <p class="mt-2 font-light">
        {{ description }}
      </p>
    </template>
  </article>
</template>
