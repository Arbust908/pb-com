<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <fieldset class="group relative w-full border-3 border-black rounded bg-white px-2 pt-2 text-black ring-offset-rose-5 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-black placeholder-gray-7">
    <label
      :for="id"
      class="absolute left-2 top-2 origin-left text-gray-700 transition-all duration-200 group-focus-within:scale-75 group-focus-within:-translate-y-3"
      :class="{ 'scale-75 -translate-y-3': modelValue }"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      :value="modelValue"
      :type="type"
      class="w-full bg-transparent focus:outline-none"
      v-bind="$attrs"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
    <slot />
  </fieldset>
</template>
