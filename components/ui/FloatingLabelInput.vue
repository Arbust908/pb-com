<template>
  <fieldset class="w-full rounded px-2 bg-white border-3 border-black placeholder-gray-7 text-black focus-within:outline-none focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2 ring-offset-rose-5 relative pt-2 group">
    <label 
      :for="id" 
      class="absolute top-2 left-2 text-gray-700 transition-all duration-200 group-focus-within:scale-75 group-focus-within:-translate-y-3 origin-left"
      :class="{ 'scale-75 -translate-y-3': modelValue }"
    >
      {{ label }}
    </label>
    <input 
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :type="type"
      class="bg-transparent w-full focus:outline-none"
      v-bind="$attrs"
    >
    <slot></slot>
  </fieldset>
</template>

<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  }
})

defineEmits(['update:modelValue'])
</script>
