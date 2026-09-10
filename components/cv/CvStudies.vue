<script setup lang="ts">
const globalStore = useGlobalStore()
const { studies } = storeToRefs(globalStore)

const { getTranslation } = useCvTranslation()
</script>

<template>
  <section class="space-y-4">
    <h2 id="study" class="display-heading text-[clamp(2.5rem,7vw,4.5rem)]">
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
