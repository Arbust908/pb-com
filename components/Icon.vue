<template>
  <Component :is="icon_component" class="icon__default fill-current" />
</template>

<script>
export default {
  name: 'Icon',
  props: {
    icon: {
      type: String,
      required: false,
      default: 'Facebook',
    },
  },
  computed: {
    icon_component() {
      return () => import('~/components/icons/Icon' + this.icon + '.vue')
    },
  },
}
</script>
