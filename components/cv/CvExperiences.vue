<script setup lang="ts">
const { experiences, fetch } = useCvExperiences()
await fetch()
</script>

<template>
  <section>
    <h2 id="exp" class="display-heading mb-6 text-[clamp(2.5rem,7vw,4.5rem)]">
      {{ $t('exp_title') }}
    </h2>
    <CvCardExperience
      v-for="exp in experiences"
      :key="exp.slug"
      :experience="exp"
    />
  </section>
</template>
