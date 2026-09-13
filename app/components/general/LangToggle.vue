<script lang="ts" setup>
defineProps<{
  full?: boolean
  label?: string
}>()

const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

async function toggleLang() {
  const newLang = locale.value === 'es' ? 'en' : 'es'
  await navigateTo(switchLocalePath(newLang))
}

const { handleClick } = useViewTransitionToggle(toggleLang)
</script>

<template>
  <button
    type="button"
    :class="full ? 'min-h-14 w-full flex items-center justify-between border border-slate-300/70 dark:border-slate-700/70 rounded-2xl px-4 py-2 text-sm font-mono transition hover:border-rose-500/60 dark:hover:border-rose-400/50 hover:text-rose-700 dark:hover:text-rose-300' : 'size-9 inline-flex items-center justify-center border border-slate-300/70 rounded-full text-slate-700 transition hover:border-rose-500/60 hover:text-rose-700 dark:border-slate-700/70 dark:text-slate-300 dark:hover:border-rose-400/50 dark:hover:text-rose-300'"
    :aria-label="label || $t('change_lang')"
    :title="full ? undefined : $t('change_lang')"
    @click="handleClick"
  >
    <span v-if="full" class="flex items-center gap-3">
      <i class="i-ph:translate text-lg" aria-hidden="true" />
      {{ label }}
    </span>
    <span v-if="full" class="size-9 flex items-center justify-center border border-slate-300/70 rounded-full text-xs dark:border-slate-700/70" aria-hidden="true">
      {{ locale === 'es' ? 'EN' : 'ES' }}
    </span>
    <i v-else class="i-ph:translate size-4" aria-hidden="true" />
  </button>
</template>
