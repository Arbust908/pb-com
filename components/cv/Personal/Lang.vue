<script setup lang="ts">
import type { CvLanguage } from '~/types'

interface Props {
  languages: CvLanguage[]
  locale: string
}

const { languages, locale } = defineProps<Props>()

function getLangTranslation(lang: typeof languages[number], field: string): string {
  const translations = lang.translations
  return translations[locale]?.[field] || translations.en?.[field] || ''
}
</script>

<template>
  <section class="mb-2">
    <h3 class="mb-4 flex items-center meta-label-secondary">
      <i class="i-ph:globe-simple mr-2 size-5" />
      <span> {{ $t('lang_title') }} </span>
    </h3>
    <article class="flex flex-row divide-x divide-slate-300/20">
      <div
        v-for="lang in languages"
        :key="lang.slug"
        class="w-full px-4 text-sm"
      >
        <h4 class="font-bold">
          {{ getLangTranslation(lang, 'name') }}
        </h4>
        <p class="mt-1 text-body">
          {{ getLangTranslation(lang, 'level') }}
        </p>
      </div>
    </article>
  </section>
</template>
