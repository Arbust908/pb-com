<script setup lang="ts">
const exp_list = ['bitpatagonia', 'viafoura', 'forian', 'pointmore', 'digitalhouse_dev', 'digitalhouse', 'netdreams', 'musculocreativo', 'mindset']
</script>

<template>
  <section>
    <h2 id="exp" class="mb-2 ml-4 text-3xl">
      {{ $t('exp_title') }}
    </h2>
    <CvCardExperience
      v-for="job in exp_list"
      :key="job"
      :job="job"
    />
  </section>
</template>
