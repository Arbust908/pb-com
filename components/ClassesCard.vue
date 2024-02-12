<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Title',
    },
    slug: {
      type: String,
      default: 'title',
    },
    description: {
      type: String,
      default:
        'Analyse the problem sets to find a better solution to the issue.',
    },
    color: {
      type: String,
      default: 'bg-red-600',
    },
    iconColor: {
      type: String,
      default: 'text-red-600',
    },
    icon: {
      type: String,
      default: 'variable',
    },
    weight: {
      type: String,
      default: 'solid',
    },
  },
  data() {
    return {
      isHover: false,
    }
  },
}
</script>

<template>
  <nuxt-link
    :to="`/clases/${slug}`"
    class="m-auto flex justify-center pt-10 lg:mx-6 lg:my-8 lg:w-1/4"
    @mouseenter.native="isHover = true"
    @mouseleave.native="isHover = false"
  >
    <div class="relative h-48 w-64">
      <section
        class="ml-4 mt-4 flex items-center border-8 border-gray-700 rounded-lg border-solid"
      >
        <div class="h-40 w-1/4" />
        <div class="h-32 w-3/4 pr-2">
          <h3 class="pt-1 text-xl font-semibold">
            {{ title }}
          </h3>
          <p class="pt-1 text-sm opacity-75">
            {{ description }}
          </p>
        </div>
      </section>
      <section
        :class="[color, isHover ? 'rotate-45' : 'rotate-0']"
        class="absolute left-0 top-0 z-10 transform rounded-lg p-2 text-center font-bold transition duration-150 ease-in-out"
      >
        <div
          class="z-20 h-12 w-12 flex items-center justify-center rounded-full bg-white shadow-md"
        >
          <Icon
            :class="[iconColor, isHover ? '-rotate-45' : 'rotate-0']"
            class="h-8 w-8 transform fill-current transition duration-150 ease-in-out"
            :icon="icon"
            :weight="weight"
          />
        </div>
      </section>
      <aside
        :class="[isHover ? 'w-24' : 'w-10', color]"
        class="absolute bottom-0 right-0 z-30 mb-2 h-3 rounded-xl transition-all duration-150 ease-out -mr-3"
      />
    </div>
  </nuxt-link>
</template>
