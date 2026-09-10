<script setup lang='ts'>
interface Props {
  place: string
  date: string
  description: string
}
defineProps<Props>()
const isExtended = ref(false)
const descId = useId()
</script>

<template>
  <article class="surface-frosted rounded-lg p-3 transition hover:border-primary sm:p-4">
    <h3>
      <button
        type="button"
        class="w-full flex flex-col cursor-pointer gap-2 text-left sm:flex-row sm:items-center sm:justify-between focus-visible:outline-2 focus-visible:outline-rose-400 focus-visible:outline-offset-4"
        :aria-expanded="isExtended"
        :aria-controls="descId"
        @click="isExtended = !isExtended"
      >
        <span class="text-lg font-bold tracking-[-0.02em]">{{ place }}</span>
        <span class="meta-label">{{ date }}</span>
      </button>
    </h3>
    <p v-if="isExtended" :id="descId" class="mt-4 border-t border-base pt-4 text-sm text-body leading-relaxed">
      {{ description }}
    </p>
  </article>
</template>
