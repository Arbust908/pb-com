<script setup lang="ts">
const { experiences, fetch } = useCvExperiences()
await fetch()
</script>

<template>
  <section>
    <h2 id="exp" class="mb-2 ml-4 text-3xl">
      {{ $t('exp_title') }}
    </h2>
    <CvCardExperience
      v-for="exp in experiences"
      :key="exp.slug"
      :experience="exp"
    />
  </section>
</template>
