<script setup lang="ts">
const { t, locale } = useI18n()

const general_store = useGeneralStore()
const { print_mode } = storeToRefs(general_store)
const { togglePrintMode } = general_store

const { skills, fetch: fetchSkills } = useCvSkills()
const { languages, fetch: fetchLanguages } = useCvLanguages()

await Promise.all([fetchSkills(), fetchLanguages()])

function getSkillTranslation(skill: typeof skills.value[number], field: string): string {
  const translations = skill.translations
  return translations[locale.value]?.[field] || translations.en?.[field] || ''
}

function getSkillList(skill: typeof skills.value[number]): string {
  // Check if there's a locale-specific list in translations (for 'other' skill)
  const localizedList = skill.translations[locale.value]?.list
  if (localizedList)
    return localizedList
  return skill.skillList
}

function getLangTranslation(lang: typeof languages.value[number], field: string): string {
  const translations = lang.translations
  return translations[locale.value]?.[field] || translations.en?.[field] || ''
}

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
        class="absolute right-0 top-0 m-2 mb-4 h-40 w-40 border-2 border-slate-500 rounded object-cover shadow lg:w-40 md:w-32 md:-m-2"
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
      <article v-for="skill in skills" :key="skill.slug" class="mb-2">
        <h4 class="mb-1 font-bold underline opacity-75">
          {{ getSkillTranslation(skill, 'title') }}
        </h4>
        <p class="text-sm text-slate-800 dark:text-slate-200">
          {{ getSkillList(skill) }}
        </p>
      </article>
    </section>
    <section class="mb-2">
      <h3 class="flex items-center text-xl">
        <i class="i-ic:round-travel-explore mr-2 h-6 w-6" />
        <span> {{ t('lang_title') }} </span>
      </h3>
      <article
        v-for="lang in languages"
        :key="lang.slug"
        class="mb-1 flex justify-between"
      >
        <h4 class="mb-1 font-bold">
          {{ getLangTranslation(lang, 'name') }}
        </h4>
        <p class="text-slate-800 dark:text-slate-200">
          {{ getLangTranslation(lang, 'level') }}
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
