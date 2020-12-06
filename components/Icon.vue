<template>
  <Component :is="icon_component" class="w-4 h-4 inline-block" />
</template>

<script>
export default {
  name: 'Icon',
  props: {
    icon: {
      type: String,
      default: 'shield-check',
    },
    weight: {
      type: String,
      default: 'outline',
    },
  },
  computed: {
    icon_component() {
      return () => import(`@/assets/svg/${this.weight}/${this.icon}.svg`)
    },
  },
}
</script>
