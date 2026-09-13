<script lang="ts" setup>
import { SEMANTIC_COLORS } from '#shared/constants'

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
    content: () => isDark.value ? SEMANTIC_COLORS.surfaceDark : SEMANTIC_COLORS.surface,
  }],
})
</script>

<template>
  <button
    type="button"
    :class="full ? 'min-h-14 w-full flex items-center justify-between border border-slate-300/70 dark:border-slate-700/70 rounded-2xl px-4 py-2 text-sm font-mono transition hover:border-rose-500/60 dark:hover:border-rose-400/50 hover:text-rose-700 dark:hover:text-rose-300' : 'size-9 inline-flex items-center justify-center border border-slate-300/70 rounded-full text-slate-700 transition hover:border-rose-500/60 hover:text-rose-700 dark:border-slate-700/70 dark:text-slate-300 dark:hover:border-rose-400/50 dark:hover:text-rose-300'"
    :aria-label="label || $t('change_theme')"
    :title="$t('change_theme')"
    @click="handleClick"
  >
    <span v-if="full" class="flex items-center gap-3">
      <i class="i-ph:moon-stars text-lg" aria-hidden="true" />
      {{ label }}
    </span>
    <span v-if="full" class="size-9 flex items-center justify-center border border-slate-300/70 rounded-full dark:border-slate-700/70" aria-hidden="true">
      <i v-if="!isDark" class="i-ph:moon size-4" />
      <i v-else class="i-ph:sun size-4" />
    </span>
    <template v-else>
      <i v-if="!isDark" class="i-ph:moon size-4" aria-hidden="true" />
      <i v-else class="i-ph:sun size-4" aria-hidden="true" />
    </template>
  </button>
</template>
