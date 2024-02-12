<script setup lang='ts'>
interface Props {
  job: string
}
const props = defineProps<Props>()

const general_store = useGeneralStore()
const { print_mode } = storeToRefs(general_store)
const { t, locale } = useI18n()

const detailsShow = ref(false)
const isExpanded = ref(false)

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(locale.value, { year: 'numeric', month: 'short', day: '2-digit' })
}
function hasTranslation(key: string) {
  return t(key) !== key
}

function onClick() {
  isExpanded.value = !isExpanded.value
}

watch(print_mode, (isPrint) => {
  if (isPrint)
    isExpanded.value = true
})

onMounted(() => {
  isExpanded.value = hasTranslation(`exp.${props.job}.isExpanded`)
})
</script>

<template>
  <div>
    <article
      :class="
        !hasTranslation(`exp.${job}.end`) ? 'border-violet-700 dark:border-violet-300' : 'border-slate-300 dark:border-slate-600'
      "
      class="grid grid-cols-1 mb-4 gap-2 border rounded p-4 text-slate-800 bg-checked bg-checked dark:text-slate-200"
    >
      <h3
        class="flex flex-col cursor-pointer font-bold lg:flex-row sm:flex-row md:flex-col"
        @click="onClick"
      >
        <span>{{ $t(`exp.${job}.rol`) }}</span>
        <span class="hidden px-2 lg:inline sm:inline md:hidden"> / </span>
        <span class="text-emerald-500"> {{ $t(`exp.${job}.company`) }} </span>
      </h3>
      <div class="text-sm leading-relaxed">
        <span>{{ formatDate($t(`exp.${job}.start`)) }}</span> -
        <span
          v-if="!hasTranslation(`exp.${job}.end`)"
          class="rounded bg-emerald-800 px-2 text-emerald-300 font-bold dark:bg-emerald-300 dark:text-emerald-800"
        >
          Actual
        </span>
        <span v-else>{{ formatDate($t(`exp.${job}.end`)) }}</span>
      </div>
      <p v-if="!print_mode && isExpanded" class="font-light">
        <span
          v-if="detailsShow"
          :key="`${job}-detail`"
          v-html="$t(`exp.${job}.more`) || ''"
        />
        <span v-else :key="`${job}-description`">
          {{ $t(`exp.${job}.description`) }}
        </span>
      </p>
      <template v-if="print_mode">
        <p>
          <span v-html="hasTranslation(`exp.${job}.more`) ? $t(`exp.${job}.more`) : $t(`exp.${job}.description`)" />
        </p>
      </template>
      <aside v-if="hasTranslation(`exp.${job}.more`) && isExpanded" class="mt-2 flex justify-end">
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
