<script setup lang="ts">
import type { CvLanguage } from '#shared/types'
import { getTranslation } from '~/composables/useCvTranslation'

interface Props {
  languages: CvLanguage[]
  locale: string
}

const { languages, locale } = defineProps<Props>()
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
          {{ getTranslation(lang, 'name', locale) }}
        </h4>
        <p class="mt-1 text-slate-700 dark:text-slate-300">
          {{ getTranslation(lang, 'level', locale) }}
        </p>
      </div>
    </article>
  </section>
</template>
