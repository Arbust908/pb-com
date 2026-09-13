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
  <article class="border border-slate-300/70 rounded-lg bg-slate-50/70 p-3 backdrop-blur-xl transition dark:border-slate-700/70 hover:border-rose-500/60 dark:bg-slate-800/40 sm:p-4 dark:hover:border-rose-400/50">
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
    <p v-if="isExtended" :id="descId" class="mt-4 border-t border-slate-300/70 pt-4 text-sm text-slate-700 leading-relaxed dark:border-slate-700/70 dark:text-slate-300">
      {{ description }}
    </p>
  </article>
</template>
