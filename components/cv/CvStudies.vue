<script setup lang="ts">
const { locale } = useI18n()
const { studies, fetch } = useCvStudies()
await fetch()

function getTranslation(study: typeof studies.value[number], field: string): string {
  const translations = study.translations
  return translations[locale.value]?.[field] || translations.en?.[field] || ''
}
</script>

<template>
  <section>
    <h2 id="study" class="display-heading mb-6 mt-14 text-[clamp(2.5rem,7vw,4.5rem)]">
      {{ $t('study_title') }}
    </h2>
    <CvCardStudy
      v-for="study in studies"
      :key="study.slug"
      :place="getTranslation(study, 'place')"
      :date="study.dateRange"
      :description="getTranslation(study, 'description')"
    />
  </section>
</template>
