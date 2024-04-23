<script setup lang='ts'>
import type { PropType } from "vue";

defineProps({
 options: {
  type: Array as PropType<string[]>,
  required: true,
 },
 title: {
  type: String,
  default: "Option",
 },
 value: {
  type: String,
  default: "none",
 },
});

defineEmits(["changeValue"]);

function isFirstOpt(position: number) {
 return position === 0;
}
function isLastOpt(position: number, maxLength: number) {
 return position === maxLength;
}

function positionClass(position: number, maxLength: number) {
 if (isFirstOpt(position)) return "first";

 if (isLastOpt(position, maxLength)) return "last";
}
</script>

<template>
  <div class="options relative mt-4 p-2">
    <span class="absolute text-sm font-bold opacity-75 -top-3">{{ title }}</span>
    <button
      v-for="(option, pos) in options"
      :key="option"
      class="border-blue-600 bg-blue-100 px-4 py-2 text-gray-800"
      :class="[positionClass(pos, options.length - 1), value === option && 'selected']"
      @click="$emit('changeValue', option)"
    >
      {{ option }}
    </button>
  </div>
</template>

<style scoped>
    .options {
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
</style>
