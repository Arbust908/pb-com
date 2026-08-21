<script setup lang="ts">
const { t, locale } = useI18n()

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
    class="relative mb-4 overflow-hidden surface-frosted rounded-2xl p-5 sm:p-7"
  >
    <picture>
      <source type="image/webp" srcset="/img/avatar.webp">
      <img
        class="mb-6 aspect-square w-28 border border-base rounded-2xl object-cover sm:w-36"
        src="/img/avatar.jpg"
        :alt="t('avatar.desc')"
      >
    </picture>
    <p class="mb-3 meta-label-primary">
      Curriculum Vitae
    </p>
    <h1 class="display-heading text-4xl leading-none">
      Fran Blanco
    </h1>
    <h2 class="mt-2 text-sm text-body leading-snug">
      {{ t('rol') }}
    </h2>
    <article class="my-7 border-y border-base py-5">
      <ul class="text-sm space-y-3">
        <li>
          <a href="mailto:me@panchoblanco.dev" class="flex items-center gap-2 transition hover:text-primary">
            <i class="i-ph:envelope-simple size-5 text-primary" />
            <span>me@panchoblanco.dev</span>
          </a>
        </li>
        <li class="flex items-center gap-2">
          <i class="i-ph:cake size-5 text-primary" />
          <span>{{ birthday() }}</span>
        </li>
        <li class="flex items-center gap-2">
          <i class="i-ph:house-simple size-5 text-primary" />
          <span>Buenos Aires, AR</span>
        </li>
      </ul>
    </article>
    <section class="mb-6">
      <h3 class="mb-5 flex items-center meta-label-primary">
        <i class="i-ph:code-simple mr-2 size-5" />
        <span> Skills </span>
      </h3>
      <article v-for="skill in skills" :key="skill.slug" class="mb-4 border-l border-primary pl-4">
        <h4 class="mb-1 font-bold">
          {{ getSkillTranslation(skill, 'title') }}
        </h4>
        <p class="text-sm text-body leading-relaxed">
          {{ getSkillList(skill) }}
        </p>
      </article>
    </section>
    <section class="mb-2">
      <h3 class="mb-4 flex items-center meta-label-secondary">
        <i class="i-ph:globe-simple mr-2 size-5" />
        <span> {{ $t('lang_title') }} </span>
      </h3>
      <article
        v-for="lang in languages"
        :key="lang.slug"
        class="border-t border-base py-3 text-sm first:border-0"
      >
        <h4 class="font-bold">
          {{ getLangTranslation(lang, 'name') }}
        </h4>
        <p class="mt-1 text-body">
          {{ getLangTranslation(lang, 'level') }}
        </p>
      </article>
    </section>
  </section>
</template>
