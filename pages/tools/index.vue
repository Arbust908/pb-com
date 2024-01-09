<script setup lang="ts">
// icons from https://icones.js.org/collection/ri
const actions = [
  {
    title: 'Receipt reader',
    href: '/tools/receipt-reader',
    icon: 'i-ri:qr-scan-2-fill',
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
    description: 'Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.',
  },
  {
    title: 'Ratio rounder',
    href: '/tools/ratio-rounder',
    icon: 'i-ri:aspect-ratio-fill',
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
    description: 'Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.',
  },
]
</script>

<template>
  <section>
    <div class="overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px divide-y divide-gray-200 sm:divide-y-0">
      <article v-for="(action, actionIdx) in actions" :key="action.title" class="group relative bg-white p-6 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-inset" :class="[actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '', actionIdx === 1 ? 'sm:rounded-tr-lg' : '', actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '', actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '']">
        <div>
          <span class="inline-flex rounded-lg p-3 ring-4 ring-white" :class="[action.iconBackground, action.iconForeground]">
            <i :class="action.icon" class="size-6" aria-hidden="true" />
          </span>
        </div>
        <div class="mt-8">
          <h3 class="text-base text-gray-900 font-semibold leading-6">
            <NuxtLink :to="action.href" class="focus:outline-none">
              <!-- Extend touch target to entire panel -->
              <span class="absolute inset-0" aria-hidden="true" />
              {{ action.title }}
            </NuxtLink>
          </h3>
          <p class="mt-2 text-sm text-gray-500">
            {{ action.description }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>
