<template>
  <div class="flex justify-between py-4">
    <NuxtLink
      v-if="prev"
      :to="{ name: 'blog-slug___es___default', params: { slug: prev.slug } }"
      class="text-primary font-bold hover:underline"
    >
      <Icon icon="chevron-left" class="inline w-5 h-5" /> {{ prev.title }}
    </NuxtLink>
    <span v-else>
      <!-- <Icon icon="ban" weight="solid" class="inline w-5 h-5 opacity-50" /> -->
    </span>
    <NuxtLink to="/blog" class="hover:underline"> Blog </NuxtLink>
    <NuxtLink
      v-if="next"
      :to="{ name: 'blog-slug___es___default', params: { slug: next.slug } }"
      class="font-bold hover:underline"
    >
      {{ next.title }} <Icon icon="chevron-right" class="inline w-5 h-5" />
    </NuxtLink>
    <span v-else>
      <!-- <Icon icon="ban" weight="solid" class="inline w-5 h-5 opacity-50" /> -->
    </span>
  </div>
</template>
<script>
export default {
  props: {
    prev: {
      type: Object,
      default: () => null,
    },
    next: {
      type: Object,
      default: () => null,
    },
  },
}
</script>
