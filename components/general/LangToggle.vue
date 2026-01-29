<script lang="ts" setup>
const { locale, setLocale } = useI18n()

function _toggleLang() {
  const newLang = locale.value === 'es' ? 'en' : 'es'
  setLocale(newLang)
  document.documentElement.lang = newLang
}

function toggleLang(e: MouseEvent) {
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
    <i class="i-solar:text-field-focus-bold-duotone size-5 text-slate-500" />
  </button>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
}
</style>
