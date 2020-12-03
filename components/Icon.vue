<template>
  <Component :is="icon_component" />
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
