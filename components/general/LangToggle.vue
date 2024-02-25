<script lang="ts" setup>
import shuffleLetters from 'shuffle-letters';
const { locale, locales, setLocale } = useI18n()

function _toggleLang() {
  /* console.log('toggleLang', locale.value, locales.value)
  const indexLang = locales.value.indexOf(locale.value)
  console.log('indexLang', indexLang)
  const newLocale = locales.value[(indexLang + 1) % locales.value.length]
  console.log('newLocale', newLocale) */
  // setLocale(newLocale)
  const newLang = locale.value === 'es' ? 'en' : 'es'
  setLocale(newLang)
  console.log('NewLang::', newLang)
  document.documentElement.lang = newLang
}

function toggleLang(e) {
  const md = window.matchMedia('(max-width: 768px)').matches
  const x = e.clientX
  const y = e.clientY
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

  if (!document?.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    _toggleLang()
    return
  }

  const transition = document?.startViewTransition(() => {
    _toggleLang()
  })

  transition.ready.then(() => {
    const duration = md ? 400 : 600
    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
        filter: ['blur(5px)', 'blur(0)'],
      },
      {
        duration,
        easing: 'cubic-bezier(.76,.32,.29,.99)',
        pseudoElement: '::view-transition-new(root)',
      },
    )
  })
}
</script>

<template>
  <button
    class="size-8 flex-middle rounded-xl bg-slate-800 dark:bg-slate-200"
    title="Change language"
    @click="toggleLang"
  >
    <i class="i-ri:a-b size-5 text-slate-500" />
  </button>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
}
</style>
