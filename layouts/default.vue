<template>
  <div
    class="mobile-nav-clearance grid grid-cols-[100%] grid-rows-[auto_1fr_auto] min-h-full base-bg text-base"
  >
    <GeneralNavBar class="relative z-40" />
    <main class="relative z-20 layout-grid" style="align-content: flex-start;">
      <slot />
    </main>
    <GeneralFooter class="relative z-40" />
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
