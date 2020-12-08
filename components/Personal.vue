<template>
  <section
    class="rounded shadow bg-blueGray-200 dark:bg-blueGray-800 p-4 mb-4 relative"
  >
    <picture>
      <source type="image/webp" srcset="@/assets/img/avatar.webp" />
      <img
        class="w-full mb-4 sm:w-32 h-32 md:w-40 sm:h-40 object-cover md:rounded sm:absolute top-0 right-0 sm:-m-2 border-2 border-blueGray-500"
        src="@/assets/img/avatar.jpg"
        alt=""
      />
    </picture>
    <h2 class="text-3xl leading-none">Fran Blanco</h2>
    <h3 class="tracking-wider">
      {{ $t('rol') }}
    </h3>
    <article class="mt-2 mb-6">
      <ul>
        <li class="flex items-center mb-2">
          <Icon icon="mail" weight="solid" class="w-6 h-6 mr-2" />
          <span>yo@panchoblanco.com</span>
        </li>
        <li class="flex items-center mb-2">
          <Icon icon="cake" weight="solid" class="w-6 h-6 mr-2" />
          <span>{{ birthdate }}</span>
        </li>
        <li class="flex items-center mb-2">
          <Icon icon="home" weight="solid" class="w-6 h-6 mr-2" />
          <span>Buenos Aires, AR</span>
        </li>
      </ul>
    </article>
    <section class="mb-6">
      <h3 class="text-xl flex items-center">
        <Icon icon="code" weight="solid" class="w-6 h-6 mr-2" />
        <span> Skills </span>
      </h3>
      <article v-for="group in $t('skills')" :key="group.title" class="mb-2">
        <h4 class="font-bold mb-1">{{ group.title }}</h4>
        <p class="text-blueGray-800 dark:text-blueGray-200 text-sm">
          {{ group.list }}
        </p>
      </article>
    </section>
    <section class="mb-4">
      <h3 class="text-xl flex items-center">
        <Icon icon="globe-alt" weight="solid" class="w-6 h-6 mr-2" />
        <span> Idiomas </span>
      </h3>
      <article
        v-for="lang in $t('languajes')"
        :key="lang.name"
        class="flex justify-between mb-1"
      >
        <h4 class="font-bold mb-1">{{ lang.name }}</h4>
        <p class="text-blueGray-800 dark:text-blueGray-200">{{ lang.level }}</p>
      </article>
    </section>
  </section>
</template>

<script>
export default {
  computed: {
    birthdate() {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date('06/14/1991').toLocaleDateString(
        this.$i18n.locale,
        options
      )
    },
  },
}
</script>
