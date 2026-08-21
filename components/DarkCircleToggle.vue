<script lang="ts" setup>
defineProps<{
  full?: boolean
  label?: string
}>()

const isDark = useDark()
const toggleDark = useToggle(isDark)

const { handleClick } = useViewTransitionToggle(toggleDark)

useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => isDark.value ? '#0f172a' : '#f1f5f9',
  }],
})
</script>

<template>
  <button
    type="button"
    :class="full ? 'min-h-14 w-full flex items-center justify-between border border-base rounded-2xl px-4 py-2 text-sm font-mono transition hover:border-primary hover:text-primary' : 'icon-control'"
    :aria-label="label || `Toggle ${isDark ? 'to Light' : 'to Dark'} mode`"
    :title="`Toggle ${isDark ? 'to Light' : 'to Dark'} mode`"
    @click="handleClick"
  >
    <span v-if="full" class="flex items-center gap-3">
      <i class="i-ph:moon-stars text-lg" aria-hidden="true" />
      {{ label }}
    </span>
    <span v-if="full" class="size-9 flex items-center justify-center border border-base rounded-full" aria-hidden="true">
      <i v-if="!isDark" class="i-ph:moon size-4" />
      <i v-else class="i-ph:sun size-4" />
    </span>
    <template v-else>
      <i v-if="!isDark" class="i-ph:moon size-4" aria-hidden="true" />
      <i v-else class="i-ph:sun size-4" aria-hidden="true" />
    </template>
  </button>
</template>
