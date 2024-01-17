<script lang="ts" setup>
/* https://www.aang.dev/playground/view-transition-theme-switcher */
const theme = useColorMode()
const isDark = computed(() => theme.value === 'dark')

function toggleTheme(e) {
  const md = window.matchMedia('(max-width: 768px)').matches
  const x = e.clientX
  const y = e.clientY
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

  if (!document?.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    theme.value = isDark.value ? 'light' : 'dark'
    return
  }

  const transition = document?.startViewTransition(() => {
    theme.value = isDark.value ? 'light' : 'dark'
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

watch(theme, (newTheme, oldTheme) => {
  // Handle theme change side effects here if needed
})

useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => theme.value === 'dark' ? '#222222' : '#ffffff',
  }],
})
</script>

<template>
  <button
    class="size-8 flex-middle rounded-xl bg-slate-800"
    :class="{ 'dark:bg-slate-200': isDark }"
    @click="toggleTheme"
  >
    <i v-if="!isDark" class="i-ri:moon-fill size-5 text-slate-500" />
    <i v-else class="i-ri:sun-fill size-5 text-slate-500" />
  </button>
</template>

  <style>
  /* CSS to disable fade-in animation */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
}
</style>
