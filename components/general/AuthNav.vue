<script setup lang="ts">
const authNavItems = [
  {
    label: 'Finances',
    icon: 'i-ph-currency-dollar-bold',
    to: '/finances',
  },
  {
    label: 'AI',
    icon: 'i-ph-brain-bold',
    to: '/ask/ai',
  },
  {
    label: 'Blog',
    icon: 'i-ph-book-open-text-bold',
    to: '/blog/posts',
  },
]
</script>

<template>
  <header
    class="w-full border-b-2 border-black bg-zinc-7 px-4 py-2"
  >
    <nav class="flex items-center justify-end space-x-3">
      <NuxtLink
        v-for="item in authNavItems"
        :key="item.label"
        :to="item.to"
        class="flex-middle gap-x-1 border-3 border-black rounded bg-amber-4 px-2 py-1 text-zinc-9 transition duration-150 ease-out shadow-flat hover:shadow-harsh hover:-translate-x-1 hover:-translate-y-1"
      >
        <i :class="item.icon" class="scale-125" />
        <span>
          {{ item.label }}
        </span>
      </NuxtLink>
    </nav>
  </header>
</template>
