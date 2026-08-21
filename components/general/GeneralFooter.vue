<script setup lang="ts">
const currentYear = new Date().getFullYear()
const localePath = useLocalePath()
</script>

<template>
  <footer
    class="border-t border-base surface-strong-bg px-4 text-sm"
  >
    <div class="mx-auto max-w-360 flex flex-wrap items-center justify-between gap-3 px-2 py-4">
      <p class="meta-label">
        Pancho Blanco / {{ currentYear }}
      </p>
      <nav class="flex items-center gap-1 sm:gap-2" :aria-label="$t('footer_navigation')">
        <NuxtLink
          :to="localePath({ name: 'about' })"
          class="rounded-full px-3 py-2 text-xs font-mono transition hover:text-primary"
        >
          {{ $t('about_link') }}
        </NuxtLink>
        <NuxtLink
          :to="localePath({ name: 'privacy' })"
          class="rounded-full px-3 py-2 text-xs font-mono transition hover:text-primary"
        >
          {{ $t('privacy_link') }}
        </NuxtLink>
        <NuxtLink
          href="https://github.com/Arbust908"
          class="icon-control"
          :aria-label="$t('github_profile')"
          rel="noreferrer"
          external
        >
          <i class="i-ph:github-logo size-5" aria-hidden="true" />
        </NuxtLink>
      </nav>
    </div>
    <div class="awesome-line accent-line" />
  </footer>
</template>

<style>
.awesome-line {
  height: 2px;
  width: 100%;
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

@media (prefers-reduced-motion: reduce) {
  .awesome-line {
    animation: none;
  }
}
</style>
