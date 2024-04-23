<script setup lang="ts">
const learn_list = ["dh", "up", "slc"];
</script>

<template>
  <section>
    <h2 id="study" class="mb-2 ml-4 text-3xl">
      {{ $t('study_title') }}
    </h2>
    <CvCardStudy
      v-for="study in learn_list"
      :key="study"
      :place="$t(`study.${study}.place`)"
      :date="$t(`study.${study}.date`)"
      :description="$t(`study.${study}.description`)"
    />
  </section>
</template>
