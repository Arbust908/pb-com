<template>
  <main class="error">
    <!-- <h1 class="text-5xl font-bold text-blue-400">
            {{ error.statusCode || '' }}
        </h1>
        <h2 class="text-2xl text-blue-400 -mt-4">{{ error.message || '' }}</h2>
        <p class="opacity-50 italic">www.digitalhouse.com{{ error.path || '' }}</p>
        <nuxt-link to="/" class="font-bold underline px-6 py-2 rounded mt-4">
            Volver al Inicio
        </nuxt-link> -->
    <article class="error--msg">
      <div class="error--msg__box">
        <p class="error--msg__code">
          {{ error.statusCode || '' }}
        </p>
        <p class="error--msg__text">
          {{ error.message || '' }}
        </p>
        <p class="error--msg__route">
          www.digitalhouse.com{{ error.path || '' }}
        </p>
        <nuxt-link to="/" class="error--msg__button">
          Volver a la Home
        </nuxt-link>
      </div>
    </article>
  </main>
</template>

<script>
// import ErrorSvg from '~/components/errors/SVG';

export default {
  components: {
    // ErrorSvg: () => import('~/components/errors/SVG'),
  },
  props: {
    error: {
      type: Object,
      default() {
        return {}
      },
    },
  },
}
</script>

<style scoped>
.error {
  @apply w-full flex justify-center items-center relative;
}
.error--msg {
  @apply flex flex-col justify-center items-center absolute inset-0;
}
.error--msg__box {
  @apply flex flex-col justify-center items-center;
}
.error--msg__code {
  @apply text-5xl pb-4;
}
.error--msg__text {
  @apply text-lg pb-2;
}
.error--msg__route {
  @apply opacity-50 italic;
}
.error--msg__button {
  @apply underline;
}
.error--msg__button:hover {
  @apply text-emerald-500;
}
@media screen and (min-width: 768px) {
  .error--msg {
    @apply mx-auto;
  }
  .error--msg__code {
    @apply text-6xl;
  }
  .error--msg__text {
    @apply text-2xl;
  }
  .error--msg__button {
    @apply text-xl;
  }
}
@media screen and (min-width: 1024px) {
  .error--msg__text {
    @apply text-3xl;
  }
  .error--msg__button {
    @apply text-2xl;
  }
}
</style>
