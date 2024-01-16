<template>
  <nuxt-link
    :to="`/clases/${slug}`"
    class="flex justify-center pt-10 m-auto lg:w-1/4 lg:mx-6 lg:my-8"
    @mouseenter.native="isHover = true"
    @mouseleave.native="isHover = false"
  >
    <div class="relative w-64 h-48">
      <section
        class="flex items-center mt-4 ml-4 border-8 border-gray-700 border-solid rounded-lg"
      >
        <div class="w-1/4 h-40"></div>
        <div class="w-3/4 h-32 pr-2">
          <h3 class="pt-1 text-xl font-semibold">{{ title }}</h3>
          <p class="pt-1 text-sm opacity-75">
            {{ description }}
          </p>
        </div>
      </section>
      <section
        :class="[color, isHover ? 'rotate-45' : 'rotate-0']"
        class="absolute top-0 left-0 z-10 p-2 font-bold text-center rounded-lg duration-150 transition transform ease-in-out"
      >
        <div
          class="z-20 w-12 h-12 bg-white rounded-full flex justify-center items-center shadow-md"
        >
          <Icon
            :class="[iconColor, isHover ? '-rotate-45' : 'rotate-0']"
            class="fill-current w-8 h-8 duration-150 transition transform ease-in-out"
            :icon="icon"
            :weight="weight"
          />
        </div>
      </section>
      <aside
        :class="[isHover ? 'w-24' : 'w-10', color]"
        class="absolute bottom-0 right-0 z-30 h-3 transition-all duration-150 ease-out rounded-xl -mr-3 mb-2"
      />
    </div>
  </nuxt-link>
</template>

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
