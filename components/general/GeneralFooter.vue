<template>
  <footer
    class="flex flex-wrap items-center justify-between bg-slate-200 px-6 pt-2 text-sm dark:bg-slate-800"
  >
    <section>
      <NuxtLink
        href="https://github.com/Arbust908"
        class="inline-flex items-center p-3 md:py-0"
        title="Github profile"
        external
      >
        <span class="hidden">https://github.com/Arbust908</span>
        <i class="i-ph:github-logo inline h-6 w-6" />
      </NuxtLink>
    </section>
    <div class="awesome-line" />
  </footer>
</template>

<style>
  .awesome-line {
  @apply w-full h-2 rounded-t-full;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
