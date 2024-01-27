<script setup lang="ts">
const theme = ref('light')
const themeClasses = computed(() => {
  if (theme.value === 'primary')
    return 'bg-indigo-600 text-white hover:bg-indigo-500  focus-visible:outline-indigo-600'
  else if (theme.value === 'light')
    return 'bg-white text-gray-900 hover:bg-gray-50 focus-visible:outline-gray-300'
  else if (theme.value === 'dark')
    return 'bg-gray-900 text-white hover:bg-gray-800 focus-visible:outline-gray-300'
  else if (theme.value === 'third')
    return 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-gray-300'
})
const roundnessClasses = computed(() => {
  if (roundness.value === 'none')
    return ''
  else if (roundness.value === 'md')
    return 'rounded-md'
  else if (roundness.value === 'full')
    return 'rounded-full'
})
const sizeClasses = computed(() => {
  if (size.value === 'xs')
    return 'px-2 py-1 text-xs font-semibold gap-x-1.5'
  else if (size.value === 'sm')
    return 'px-2 py-1 text-sm font-semibold gap-x-1.5'
  else if (size.value === 'md')
    return 'px-2.5 py-1.5 text-sm font-semibold gap-x-1.5'
  else if (size.value === 'lg')
    return 'px-3 py-2 text-sm font-semibold gap-x-2'
  else if (size.value === 'xl')
    return 'px-3.5 py-2.5 text-sm font-semibold gap-x-2'
})
</script>

<template>
  <button type="button" class="rounded px-2 py-1 text-xs font-semibold shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline">
    <slot name="prefix" />
    <slot>Button</slot>
    <slot name="suffix" />
  </button>
  <hr>
  <button type="button" class="rounded bg-indigo-600 px-2 py-1 text-xs text-white font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline">
    Button text
  </button>
  <button type="button" class="rounded bg-indigo-600 px-2 py-1 text-sm text-white font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline">
    Button text
  </button>
  <button type="button" class="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline">
    Button text
  </button>
  <button type="button" class="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline">
    Button text
  </button>
  <button type="button" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm text-white font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline">
    Button text
  </button>
  <hr>
  <button type="button" class="rounded bg-white px-2 py-1 text-xs text-gray-900 font-semibold shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
    Button text
  </button>
  <button type="button" class="rounded bg-white px-2 py-1 text-sm text-gray-900 font-semibold shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
    Button text
  </button>
  <button type="button" class="rounded-md bg-white px-2.5 py-1.5 text-sm text-gray-900 font-semibold shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
    Button text
  </button>
  <button type="button" class="rounded-md bg-white px-3 py-2 text-sm text-gray-900 font-semibold shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
    Button text
  </button>
  <button type="button" class="rounded-md bg-white px-3.5 py-2.5 text-sm text-gray-900 font-semibold shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
    Button text
  </button>
  <hr>
  <button type="button" class="rounded bg-indigo-500 px-2 py-1 text-xs text-white font-semibold shadow-sm hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2 focus-visible:outline">
    Button text
  </button>
  <button type="button" class="rounded bg-indigo-500 px-2 py-1 text-sm text-white font-semibold shadow-sm hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2 focus-visible:outline">
    Button text
  </button>
  <button type="button" class="rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm text-white font-semibold shadow-sm hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2 focus-visible:outline">
    Button text
  </button>
  <button type="button" class="rounded-md bg-indigo-500 px-3 py-2 text-sm text-white font-semibold shadow-sm hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2 focus-visible:outline">
    Button text
  </button>
  <button type="button" class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm text-white font-semibold shadow-sm hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2 focus-visible:outline">
    Button text
  </button>
  <hr>
  <button type="button" class="rounded bg-white/10 px-2 py-1 text-xs text-white font-semibold shadow-sm hover:bg-white/20">
    Button text
  </button>
  <button type="button" class="rounded bg-white/10 px-2 py-1 text-sm text-white font-semibold shadow-sm hover:bg-white/20">
    Button text
  </button>
  <button type="button" class="rounded-md bg-white/10 px-2.5 py-1.5 text-sm text-white font-semibold shadow-sm hover:bg-white/20">
    Button text
  </button>
  <button type="button" class="rounded-md bg-white/10 px-3 py-2 text-sm text-white font-semibold shadow-sm hover:bg-white/20">
    Button text
  </button>
  <button type="button" class="rounded-md bg-white/10 px-3.5 py-2.5 text-sm text-white font-semibold shadow-sm hover:bg-white/20">
    Button text
  </button>
  <hr>
  <button type="button" class="rounded bg-indigo-50 px-2 py-1 text-xs text-indigo-600 font-semibold shadow-sm hover:bg-indigo-100">
    Button text
  </button>
  <button type="button" class="rounded bg-indigo-50 px-2 py-1 text-sm text-indigo-600 font-semibold shadow-sm hover:bg-indigo-100">
    Button text
  </button>
  <button type="button" class="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm text-indigo-600 font-semibold shadow-sm hover:bg-indigo-100">
    Button text
  </button>
  <button type="button" class="rounded-md bg-indigo-50 px-3 py-2 text-sm text-indigo-600 font-semibold shadow-sm hover:bg-indigo-100">
    Button text
  </button>
  <button type="button" class="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm text-indigo-600 font-semibold shadow-sm hover:bg-indigo-100">
    Button text
  </button>
  <hr>
  <button type="button" class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline">
    <i class="i-ri:checkbox-circle-fill size-5 -ml-0.5" aria-hidden="true" />
    Button text
  </button>
  <button type="button" class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm text-white font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline">
    <i class="i-ri:checkbox-circle-fill size-5 -ml-0.5" aria-hidden="true" />
    Button text
  </button>
  <button type="button" class="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm text-white font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline">
    <i class="i-ri:checkbox-circle-fill size-5 -ml-0.5" aria-hidden="true" />
    Button text
  </button>
  <hr>
  <button type="button" class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline">
    Button text
    <i class="i-ri:checkbox-circle-fill size-5 -ml-0.5" aria-hidden="true" />
  </button>
  <button type="button" class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm text-white font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline">
    Button text
    <i class="i-ri:checkbox-circle-fill size-5 -ml-0.5" aria-hidden="true" />
  </button>
  <button type="button" class="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm text-white font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline">
    Button text
    <i class="i-ri:checkbox-circle-fill size-5 -ml-0.5" aria-hidden="true" />
  </button>
  <hr>
  <button type="button" class="rounded-full bg-indigo-600 px-2.5 py-1 text-xs text-white font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline">
    Button text
  </button>
  <button type="button" class="rounded-full bg-indigo-600 px-2.5 py-1 text-sm text-white font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline">
    Button text
  </button>
  <button type="button" class="rounded-full bg-indigo-600 px-3 py-1.5 text-sm text-white font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline">
    Button text
  </button>
  <button type="button" class="rounded-full bg-indigo-600 px-3.5 py-2 text-sm text-white font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline">
    Button text
  </button>
  <button type="button" class="rounded-full bg-indigo-600 px-4 py-2.5 text-sm text-white font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline">
    Button text
  </button>
  <hr>
  <button type="button" class="rounded-full bg-white px-2.5 py-1 text-xs text-gray-900 font-semibold shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
    Button text
  </button>
  <button type="button" class="rounded-full bg-white px-2.5 py-1 text-sm text-gray-900 font-semibold shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
    Button text
  </button>
  <button type="button" class="rounded-full bg-white px-3 py-1.5 text-sm text-gray-900 font-semibold shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
    Button text
  </button>
  <button type="button" class="rounded-full bg-white px-3.5 py-2 text-sm text-gray-900 font-semibold shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
    Button text
  </button>
  <button type="button" class="rounded-full bg-white px-4 py-2.5 text-sm text-gray-900 font-semibold shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
    Button text
  </button>
  <hr>
  <button type="button" class="inline-flex rounded-full bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline">
    <i class="i-ri:add-fill size-5" aria-hidden="true" />
  </button>
  <button type="button" class="inline-flex rounded-full bg-indigo-600 p-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline">
    <i class="i-ri:add-fill size-5" aria-hidden="true" />
  </button>
  <button type="button" class="inline-flex rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline">
    <i class="i-ri:add-fill size-5" aria-hidden="true" />
  </button>
</template>
