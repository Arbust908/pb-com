<script setup lang="ts">
import type { CvExperience } from '~/types'

const globalStore = useGlobalStore()
const { experiences } = storeToRefs(globalStore)

const groupedExperiences = computed(() => experiences.value.reduce<CvExperience[][]>((groups, experience) => {
  const previousGroup = groups.at(-1)

  if (previousGroup?.[0]?.company === experience.company)
    previousGroup.push(experience)
  else
    groups.push([experience])

  return groups
}, []))
</script>

<template>
  <section class="space-y-6">
    <h2 id="exp" class="display-heading text-[clamp(2.5rem,7vw,4.5rem)]">
      {{ $t('exp_title') }}
    </h2>
    <CvCardExperience
      v-for="companyExperiences in groupedExperiences"
      :key="companyExperiences[0]?.slug"
      :experiences="companyExperiences"
    />
  </section>
</template>
