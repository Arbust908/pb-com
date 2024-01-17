<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useGeneralStore } from '~/composables'

const { t, locale } = useI18n()
const general_store = useGeneralStore()
const { print_mode } = storeToRefs(general_store)

const exp_list = ['bitpatagonia', 'viafoura', 'forian', 'pointmore', 'digitalhouse_dev', 'digitalhouse', 'netdreams', 'musculocreativo', 'mindset']
const detail_shown = ref([] as string[])
function formatDate(date: string) {
  return new Date(date).toLocaleDateString(locale.value, { year: 'numeric', month: 'short', day: '2-digit' })
}
function addDetail(job: string) {
  const isInDetails = detail_shown.value.includes(job)
  if (isInDetails)
    detail_shown.value = detail_shown.value.filter(title => title !== job)

  else
    detail_shown.value.push(job)
}

function hasTranslation(key: string) {
  return t(key) !== key
}
</script>

<template>
  <section>
    <h2 id="exp" class="mb-2 ml-4 text-3xl">
      {{ $t('exp_title') }}
    </h2>
    <article
      v-for="job in exp_list"
      :key="job"
      :class="
        !hasTranslation(`exp.${job}.end`) ? 'border-violet-700 dark:border-violet-300 shadow-violet-500' : 'dark:shadow-gray-800'
      "
      class="mb-4 rounded p-4 shadow dark:border-blueGray-700 dark:shadow-md"
    >
      <h3
        class="mb-2 flex flex-col font-bold lg:flex-row sm:flex-row md:flex-col"
      >
        <span>{{ $t(`exp.${job}.rol`) }}</span>
        <span class="hidden px-2 lg:inline sm:inline md:hidden"> / </span>
        <span class="text-emerald-500"> {{ $t(`exp.${job}.company`) }} </span>
      </h3>
      <div class="mb-2 text-sm leading-relaxed">
        <span>{{ formatDate($t(`exp.${job}.start`)) }}</span> -
        <span
          v-if="!hasTranslation(`exp.${job}.end`)"
          class="rounded bg-emerald-800 px-2 text-emerald-300 font-bold dark:bg-emerald-300 dark:text-emerald-800"
        >
          Actual
        </span>
        <span v-else>{{ formatDate($t(`exp.${job}.end`)) }}</span>
      </div>
      <p v-if="!print_mode" class="font-light">
        <span
          v-if="detail_shown.includes(job)"
          :key="`${job}-detail`"
          v-html="$t(`exp.${job}.more`) || ''"
        />
        <span v-else :key="`${job}-description`">
          {{ $t(`exp.${job}.description`) }}
        </span>
      </p>
      <template v-if="print_mode">
        <p>
          <span v-html="$t(`exp.${job}.more`) || $t(`exp.${job}.description`)" />
        </p>
      </template>
      <aside class="mt-2 flex justify-end">
        <button
          v-if="hasTranslation(`exp.${job}.more`)"
          :class="print_mode ? 'opacity-0' : null"
          class="transform rounded px-2 py-1 text-sm transition duration-150 ease-out hover:bg-emerald-400 hover:text-emerald-700 hover:-translate-y-1"
          @click="addDetail(job)"
        >
          {{
            detail_shown.includes(job)
              ? $t('see_less')
              : $t('see_more')
          }}
        </button>
      </aside>
    </article>
  </section>
</template>
