<template>
  <div
    class="mobile-nav-clearance grid grid-cols-[100%] grid-rows-[auto_1fr_auto] min-h-full bg-slate-100 text-slate-950 dark:bg-slate-900 dark:text-slate-50"
  >
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-skip-link focus:rounded-full focus:bg-rose-400 focus:px-4 focus:py-2 focus:text-xs focus:text-slate-950 focus:font-mono"
    >{{ $t('skip_to_content') }}</a>
    <GeneralNavBar class="relative z-nav" />
    <main id="main" class="relative z-main content-start layout-grid">
      <slot />
    </main>
    <GeneralFooter class="relative z-nav" />
    <GeneralMobileBottomNav />
  </div>
</template>

<style scoped>
.mobile-nav-clearance {
  padding-bottom: calc(4.5rem + env(safe-area-inset-bottom));
}

@media (min-width: 640px) {
  .mobile-nav-clearance {
    padding-bottom: 0;
  }
}
</style>
