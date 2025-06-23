<script setup lang="ts">
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
    class="relative mb-4 rounded bg-slate-200/60 p-4 text-slate-800 shadow backdrop-blur-xl dark:(bg-slate-800/60 text-slate-200)"
  >
    <picture>
      <source type="image/webp" srcset="/img/avatar.webp">
      <img
        class="right-0 top-0 mb-4 border-2 border-slate-500 rounded object-cover shadow absolute h-40 w-40 m-2 md:-m-2 md:w-32 lg:w-40"
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
        <li>
          <a href="mailto:me@panchoblanco.dev" class="mb-2 flex items-center gap-2">
            <i class="i-ic:round-mail h-6 w-6 text-violet-600 dark:text-violet-300" />
            <span>me@panchoblanco.dev</span>
          </a>
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
        <p class="text-sm text-slate-800 dark:text-slate-200">
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
        <p class="text-slate-800 dark:text-slate-200">
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
