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
  <article class="mb-3 cursor-pointer surface-frosted rounded-2xl p-5 transition hover:border-primary sm:p-7" @click="isExtended = !isExtended">
    <h3 class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <span class="text-lg font-bold tracking-[-0.02em]">
        {{ place }}
      </span>
      <span class="meta-label">
        {{ date }}
      </span>
    </h3>
    <template v-if="isExtended">
      <p class="mt-4 border-t border-base pt-4 text-sm text-body leading-relaxed">
        {{ description }}
      </p>
    </template>
  </article>
</template>
