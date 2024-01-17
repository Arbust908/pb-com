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

function birthday() {
  return new Date('06/14/1991').toLocaleDateString(
    locale.value,
    { dateStyle: 'medium' },
  )
}
</script>

<template>
  <section
    class="relative mb-4 rounded bg-blueGray-200 p-4 shadow dark:bg-blueGray-800"
  >
    <picture>
      <source type="image/webp" srcset="/img/avatar.webp">
      <img
        ref="avatar"
        :style="avatar_style"
        class="right-0 top-0 mb-4 h-32 w-full border-2 border-blueGray-500 rounded object-cover shadow sm:absolute md:w-40 sm:h-40 sm:w-32 sm:-m-2"
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
    <article class="mb-6 mt-2">
      <ul>
        <li class="mb-2 flex items-center gap-2">
          <i class="i-ic:round-mail h-6 w-6 text-violet-600 dark:text-violet-300" />
          <span>yo@panchoblanco.com</span>
        </li>
        <li class="mb-2 flex items-center gap-2">
          <i class="i-ic:round-cake h-6 w-6 text-violet-600 dark:text-violet-300" />
          <span>{{ birthday() }}</span>
        </li>
        <li class="mb-2 flex items-center gap-2">
          <i class="i-ic:round-house h-6 w-6 text-violet-600 dark:text-violet-300" />
          <span>Buenos Aires, AR</span>
        </li>
      </ul>
    </article>
    <section class="mb-6">
      <h3 class="mb-2 flex items-center text-xl text-violet-600 dark:text-violet-400">
        <i class="i-ic:round-code mr-2 h-6 w-6" />
        <span> Skills </span>
      </h3>
      <article v-for="group in skill_list" :key="group" class="mb-2">
        <h4 class="mb-1 font-bold underline opacity-75">
          {{ t(`skills.${group}.title`) }}
        </h4>
        <p class="text-sm text-blueGray-800 dark:text-blueGray-200">
          {{ t(`skills.${group}.list`) }}
        </p>
      </article>
    </section>
    <section class="mb-2">
      <h3 class="flex items-center text-xl">
        <i class="i-ic:round-travel-explore mr-2 h-6 w-6" />
        <span> {{ t('lang_title') }} </span>
      </h3>
      <article
        v-for="lang in lang_list"
        :key="lang"
        class="mb-1 flex justify-between"
      >
        <h4 class="mb-1 font-bold">
          {{ t(`tongues.${lang}.name`) }}
        </h4>
        <p class="text-blueGray-800 dark:text-blueGray-200">
          {{ t(`tongues.${lang}.level`) }}
        </p>
      </article>
    </section>
    <footer class="my-2 flex items-center">
      <button
        class="flex items-center opacity-0 transition duration-150 ease-in-out hover:opacity-75"
        @click="togglePrintMode()"
      >
        <i class="i-ic:round-print mr-2 inline-block h-6 w-6" />
        <span> {{ t('print') }} </span>
        ({{ print_mode }})
      </button>
      <div v-if="print_mode" class="w-full text-right text-sm opacity-75">
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
