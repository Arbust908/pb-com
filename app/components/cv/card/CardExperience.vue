<script setup lang='ts'>
import type { CvExperience } from '#shared/types'

interface Props {
  experiences: CvExperience[]
}
const props = defineProps<Props>()

const { locale } = useI18n()

const { getTranslation } = useCvTranslation()

const company = computed(() => props.experiences[0]?.company || '')
const location = computed(() => props.experiences.find(experience => experience.location)?.location)
const isCurrent = computed(() => props.experiences.some(experience => !experience.endDate))
</script>

<template>
  <article
    :key="locale"
    :class="isCurrent ? 'border-primary' : 'border-base'"
    class="grid gap-4 border rounded-lg surface-bg p-3 backdrop-blur-xl sm:p-4"
  >
    <header class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
      <h3 class="text-xl text-primary font-bold tracking-[-0.02em]">
        {{ company }}
      </h3>
      <p v-if="location" class="meta-label">
        {{ location }}
      </p>
    </header>

    <div class="divide-base divide-y">
      <section
        v-for="experience in experiences"
        :key="experience.slug"
        class="grid gap-2 py-4 first:pt-0 last:pb-0"
      >
        <h4 class="text-lg font-bold tracking-[-0.02em]">
          {{ getTranslation(experience, 'rol') }}
        </h4>
        <p class="meta-label leading-relaxed">
          <span>{{ formatDate(experience.startDate, locale) }}</span>
          -
          <span
            v-if="!experience.endDate"
            class="rounded-full bg-rose-400/15 px-2 py-1 text-primary font-bold"
          >
            {{ $t('current') }}
          </span>
          <span v-else>{{ formatDate(experience.endDate, locale) }}</span>
        </p>
        <p class="text-sm text-body leading-relaxed">
          {{ getTranslation(experience, 'description') }}
        </p>
      </section>
    </div>
  </article>
</template>
