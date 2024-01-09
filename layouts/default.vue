<template>
  <div class="parent-layout">
    <LayoutHeader />
    <main class="layout-grid">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<style scoped>
.parent-layout {
  @apply grid min-h-svh;
  grid-template-rows: auto 1fr auto;
}
</style>
