<template>
  <aside
    class="flex flex-row items-center gap-2 lg:justify-end"
  >
    <a
      href="#exp"
      class="inline-flex items-center border border-slate-300/70 rounded-full px-4 py-2 text-xs text-slate-700 font-mono transition dark:border-slate-700/70 hover:(border-rose-500/60 text-rose-700) dark:text-slate-300 dark:hover:(border-rose-400/50 text-rose-300)"
    >
      {{ $t('exp_title') }}
    </a>
    <a
      href="#study"
      class="inline-flex items-center border border-slate-300/70 rounded-full px-4 py-2 text-xs text-slate-700 font-mono transition dark:border-slate-700/70 hover:(border-rose-500/60 text-rose-700) dark:text-slate-300 dark:hover:(border-rose-400/50 text-rose-300)"
    >
      {{ $t('study_title') }}
    </a>
  </aside>
</template>
