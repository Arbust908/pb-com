<template>
  <div
    class="grid grid-cols-[100%] grid-rows-[1fr_auto_auto] min-h-full"
  >
    <main class="relative z-20 layout-grid">
      <slot />
    </main>
    <GeneralNavBar class="relative z-40" />
    <GeneralFooter class="relative z-40" />
  </div>
</template>