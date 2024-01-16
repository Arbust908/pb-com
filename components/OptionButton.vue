<script setup lang='ts'>
import type { PropType } from 'vue'

defineProps({
  options: {
    type: Array as PropType<string[]>,
    required: true,
  },
  title: {
    type: String,
    default: 'Option',
  },
  value: {
    type: String,
    default: 'none',
  },
})

defineEmits(['changeValue'])

const isFirstOpt = (position: number) => {
  return position === 0
}
const isLastOpt = (position: number, maxLength: number) => {
  return position === maxLength
}

const positionClass = (position: number, maxLength: number) => {
  if (isFirstOpt(position))
    return 'first'

  if (isLastOpt(position, maxLength))
    return 'last'
}
</script>

<template>
  <div class="options">
    <span>{{ title }}</span>
    <button
      v-for="(option, pos) in options"
      :key="option"
      :class="[positionClass(pos, options.length - 1), value === option && 'selected']"
      @click="$emit('changeValue', option)"
    >
      {{ option }}
    </button>
  </div>
</template>

<style scoped lang='scss'>
    .options {
        @apply p-2 relative mt-4;
        & > span {
            @apply text-sm font-bold absolute -top-3 opacity-75;
        }
        & > button {
            @apply px-4 py-2 bg-blue-100 text-gray-800 border-blue-600;
            &.selected {
                @apply bg-blue-800 text-gray-200 cursor-not-allowed;
            }
            &.first {
                @apply rounded-l-full border-r-2;
            }
            &.last {
                @apply rounded-r-full border-l-2;
            }
            &:not(.first, .last) {
                @apply border-x-2;
            }
        }
    }
</style>
