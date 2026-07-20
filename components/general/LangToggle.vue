<script lang="ts" setup>
const { locale, setLocale } = useI18n()

function _toggleLang() {
  const newLang = locale.value === 'es' ? 'en' : 'es'
  setLocale(newLang)
  document.documentElement.lang = newLang
}

const { handleClick } = useViewTransitionToggle(_toggleLang)
</script>

<template>
  <button
    class="size-8 flex-middle rounded-xl bg-slate-800 dark:bg-slate-200"
    title="Change language"
    @click="handleClick"
  >
    <i class="i-ph:translate size-5 text-slate-500" />
  </button>
</template>
