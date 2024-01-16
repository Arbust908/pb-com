<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useGeneralStore } from '~/composables'
const avatar = ref<HTMLElement>()
const { tilt, roll, source } = useParallax(avatar)

const avatar_style = computed(() => {
  console.log(avatar.value)
  return {
    transform: `rotateX(${roll.value * 20}deg) rotateY(${tilt.value * 20}deg)`,
  }
})
const { t, locale } = useI18n()

const general_store = useGeneralStore()
const { print_mode } = storeToRefs(general_store)
const { togglePrintMode } = general_store

const skill_list = ['web', 'adobe', 'other']
const lang_list = ['es', 'en']

const birthday = () => {
  return new Date('06/14/1991').toLocaleDateString(
    locale.value,
    { dateStyle: 'medium' },
  )
}
</script>

<template>
  <section
    class="rounded shadow bg-blueGray-200 dark:bg-blueGray-800 p-4 mb-4 relative"
  >
    <picture>
      <source type="image/webp" srcset="/img/avatar.webp">
      <img
        ref="avatar"
        :style="avatar_style"
        class="w-full mb-4 sm:w-32 h-32 md:w-40 sm:h-40 object-cover rounded sm:absolute top-0 right-0 sm:-m-2 border-2 border-blueGray-500 shadow"
        src="/img/avatar.jpg"
        :alt="t('avatar.desc')"
      >
    </picture>
    <h2 class="text-3xl leading-none">
      Fran Blanco
    </h2>
    <h3 class="tracking-wider">
      {{ t('rol') }}
    </h3>
    <article class="mt-2 mb-6">
      <ul>
        <li class="personal-info">
          <i class="i-ic:round-mail" />
          <span>yo@panchoblanco.com</span>
        </li>
        <li class="personal-info">
          <i class="i-ic:round-cake" />
          <span>{{ birthday() }}</span>
        </li>
        <li class="personal-info">
          <i class="i-ic:round-house" />
          <span>Buenos Aires, AR</span>
        </li>
      </ul>
    </article>
    <section class="mb-6">
      <h3 class="text-xl flex items-center text-violet-600 dark:text-violet-400 mb-2">
        <i class="w-6 h-6 mr-2 i-ic:round-code" />
        <span> Skills </span>
      </h3>
      <article v-for="group in skill_list" :key="group" class="mb-2">
        <h4 class="font-bold mb-1 opacity-75 underline">
          {{ t(`skills.${group}.title`) }}
        </h4>
        <p class="text-blueGray-800 dark:text-blueGray-200 text-sm">
          {{ t(`skills.${group}.list`) }}
        </p>
      </article>
    </section>
    <section class="mb-2">
      <h3 class="text-xl flex items-center">
        <i class="w-6 h-6 mr-2 i-ic:round-travel-explore" />
        <span> {{ t('lang_title') }} </span>
      </h3>
      <article
        v-for="lang in lang_list"
        :key="lang"
        class="flex justify-between mb-1"
      >
        <h4 class="font-bold mb-1">
          {{ t(`tongues.${lang}.name`) }}
        </h4>
        <p class="text-blueGray-800 dark:text-blueGray-200">
          {{ t(`tongues.${lang}.level`) }}
        </p>
      </article>
    </section>
    <footer class="my-2 flex items-center">
      <button
        class="opacity-0 hover:opacity-75 transition duration-150 ease-in-out flex items-center"
        @click="togglePrintMode()"
      >
        <i class="w-6 h-6 mr-2 inline-block i-ic:round-print" />
        <span> {{ t('print') }} </span>
        ({{ print_mode }})
      </button>
      <div v-if="print_mode" class="text-sm text-right opacity-75 w-full">
        {{ t('last_update') }}
        {{
          new Intl.DateTimeFormat(locale, {
            dateStyle: 'long',
          }).format(new Date())
        }}
      </div>
    </footer>
  </section>
</template>

<style lang="scss" scoped>
.personal-info {
  @apply flex items-center mb-2 gap-2;
  & > i {
    @apply w-6 h-6 text-violet-600 dark:text-violet-300;
  }
}
</style>
