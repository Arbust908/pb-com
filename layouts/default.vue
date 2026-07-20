<template>
  <div
    class="grid grid-cols-[100%] grid-rows-[auto_1fr_auto] min-h-full bg-slate-1 dark:bg-slate-9"
  >
    <GeneralNavBar class="relative z-40" />
    <main class="relative z-20 layout-grid" style="align-content: flex-start;">
      <slot />
    </main>
    <GeneralFooter class="relative z-40" />
  </div>
</template>
