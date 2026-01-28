<script setup lang='ts'>
import type { CvExperience } from '~/composables/useCvExperiences'

interface Props {
  experience: CvExperience
}
const props = defineProps<Props>()

const general_store = useGeneralStore()
const { print_mode } = storeToRefs(general_store)
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

watch(print_mode, (isPrint) => {
  if (isPrint)
    isExpanded.value = true
})
</script>

<template>
  <div>
    <article
      :class="
        !experience.endDate ? 'border-violet-700 dark:border-violet-300' : 'border-slate-300 dark:border-slate-600'
      "
      class="grid grid-cols-1 mb-4 gap-2 border rounded p-4 text-slate-800 bg-checked bg-checked dark:text-slate-200"
      :key="locale"
    >
      <h3
        class="flex flex-col cursor-pointer font-bold lg:flex-row sm:flex-row md:flex-col"
        @click="onClick"
      >
        <span>{{ getTranslation('rol') }}</span>
        <span class="hidden px-2 lg:inline sm:inline md:hidden"> / </span>
        <span class="text-emerald-500"> {{ experience.company }} </span>
      </h3>
      <div class="text-sm leading-relaxed">
        <span>{{ formatDate(experience.startDate) }}</span> -
        <span
          v-if="!experience.endDate"
          class="rounded bg-emerald-800 px-2 text-emerald-300 font-bold dark:bg-emerald-300 dark:text-emerald-800"
        >
          Actual
        </span>
        <span v-else>{{ formatDate(experience.endDate) }}</span>
      </div>
      <p v-if="!print_mode && isExpanded" class="font-light">
        <span
          v-if="detailsShow"
          :key="`${experience.slug}-detail`"
          v-html="getTranslation('more')"
        />
        <span v-else :key="`${experience.slug}-description`">
          {{ getTranslation('description') }}
        </span>
      </p>
      <template v-if="print_mode">
        <p>
          <span v-html="hasMore() ? getTranslation('more') : getTranslation('description')" />
        </p>
      </template>
      <aside v-if="hasMore() && isExpanded" class="mt-2 flex justify-end">
        <button
          :class="print_mode ? 'opacity-0' : null"
          class="transform rounded px-2 py-1 text-sm transition duration-150 ease-out hover:(bg-emerald-400 text-emerald-700 -translate-y-1)"
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
