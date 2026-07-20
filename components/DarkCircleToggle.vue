<script lang="ts" setup>
/* https://www.aang.dev/playground/view-transition-theme-switcher */
const isDark = useDark()
const toggleDark = useToggle(isDark)

const { handleClick } = useViewTransitionToggle(toggleDark)

useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => isDark.value ? '#222222' : '#ffffff',
  }],
})
</script>

<template>
  <button
    class="size-8 flex-middle rounded-xl bg-slate-800"
    :class="{ 'dark:bg-slate-200': isDark }"
    :title="`Toggle ${isDark ? 'to Light' : 'to Dark'} mode`"
    @click="handleClick"
  >
    <i v-if="!isDark" class="i-ph:moon size-5 text-slate-500" />
    <i v-else class="i-ph:sun size-5 text-slate-500" />
  </button>
</template>
