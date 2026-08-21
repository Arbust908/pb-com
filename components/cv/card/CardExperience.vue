<script setup lang='ts'>
import type { CvExperience } from '~/composables/useCvExperiences'

interface Props {
  experience: CvExperience
}
const props = defineProps<Props>()

const { locale } = useI18n()

const detailsShow = ref(false)
const isExpanded = ref(true)

// Get translation for current locale with fallback to 'en'
function getTranslation(field: string): string {
  const translations = props.experience.translations
  return translations[locale.value]?.[field] || translations.en?.[field] || ''
}

function hasMore(): boolean {
  return !!getTranslation('more')
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(locale.value, { year: 'numeric', month: 'short', day: '2-digit' })
}

function onClick() {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div>
    <article
      :key="locale"
      :class="
        !experience.endDate ? 'border-primary' : 'border-base'
      "
      class="grid grid-cols-1 mb-3 gap-3 border rounded-2xl surface-bg p-5 backdrop-blur-xl sm:p-7"
    >
      <h3
        class="flex flex-col cursor-pointer text-xl font-bold tracking-[-0.02em] lg:flex-row sm:flex-row md:flex-col"
        @click="onClick"
      >
        <span>{{ getTranslation('rol') }}</span>
        <span class="hidden px-2 lg:inline sm:inline md:hidden"> / </span>
        <span class="text-primary"> {{ experience.company }} </span>
      </h3>
      <div class="meta-label leading-relaxed">
        <span>{{ formatDate(experience.startDate) }}</span> -
        <span
          v-if="!experience.endDate"
          class="rounded-full bg-rose-400/15 px-2 py-1 text-primary font-bold"
        >
          Actual
        </span>
        <span v-else>{{ formatDate(experience.endDate) }}</span>
      </div>
      <p v-if="isExpanded" class="text-sm text-body leading-relaxed">
        <span
          v-if="detailsShow"
          :key="`${experience.slug}-detail`"
          v-html="getTranslation('more')"
        />
        <span v-else :key="`${experience.slug}-description`">
          {{ getTranslation('description') }}
        </span>
      </p>
      <aside v-if="hasMore() && isExpanded" class="mt-2 flex justify-end">
        <button
          class="pill-control text-body hover:(border-primary text-primary -translate-y-1)"
          @click="detailsShow = !detailsShow"
        >
          {{
            detailsShow
              ? $t('see_less')
              : $t('see_more')
          }}
        </button>
      </aside>
    </article>
  </div>
</template>
