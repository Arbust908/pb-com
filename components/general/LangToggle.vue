<script lang="ts" setup>
defineProps<{
  full?: boolean
  label?: string
}>()

const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

async function _toggleLang() {
  const newLang = locale.value === 'es' ? 'en' : 'es'
  await navigateTo(switchLocalePath(newLang))
}

const { handleClick } = useViewTransitionToggle(_toggleLang)
</script>

<template>
  <button
    type="button"
    :class="full ? 'min-h-14 w-full flex items-center justify-between border border-base rounded-2xl px-4 py-2 text-sm font-mono transition hover:border-primary hover:text-primary' : 'icon-control'"
    :aria-label="label || 'Change language'"
    :title="full ? undefined : 'Change language'"
    @click="handleClick"
  >
    <span v-if="full" class="flex items-center gap-3">
      <i class="i-ph:translate text-lg" aria-hidden="true" />
      {{ label }}
    </span>
    <span v-if="full" class="size-9 flex items-center justify-center border border-base rounded-full text-xs" aria-hidden="true">
      {{ locale === 'es' ? 'EN' : 'ES' }}
    </span>
    <i v-else class="i-ph:translate size-4" aria-hidden="true" />
  </button>
</template>
