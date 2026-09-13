<script setup lang="ts">
const props = defineProps<{ error: { statusCode?: number, statusMessage?: string, message?: string } }>()

const { t } = useI18n()
const localePath = useLocalePath()

const is404 = computed(() => props.error.statusCode === 404)
const title = computed(() => is404.value || !props.error.statusMessage ? t('error.title') : props.error.statusMessage)
const description = computed(() => is404.value || !props.error.message ? t('error.description') : props.error.message)

function handleError() {
  clearError({ redirect: localePath({ name: 'index' }) })
}

useHead({
  title: () => `${title.value} :: Pancho Blanco`,
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
  ],
})
</script>

<template>
  <div class="min-h-full flex flex-col items-center justify-center gap-6 bg-slate-100 p-10 text-center text-slate-950 dark:bg-slate-900 dark:text-slate-50">
    <i class="i-ph:compass-question size-12 text-rose-700 dark:text-rose-300" aria-hidden="true" />
    <p class="meta-label">
      {{ props.error.statusCode ?? 500 }}
    </p>
    <h1 class="text-4xl font-extrabold leading-[0.9] tracking-[-0.035em] font-mono sm:text-5xl">
      {{ title }}
    </h1>
    <p class="max-w-md text-slate-700 dark:text-slate-300">
      {{ description }}
    </p>
    <button type="button" class="inline-flex cursor-pointer items-center rounded-full bg-rose-400 px-4 py-2 text-xs text-slate-950 font-mono transition active:bg-rose-500 hover:bg-rose-300 focus-visible:outline-2 focus-visible:outline-rose-400 focus-visible:outline-offset-2" @click="handleError">
      {{ $t('error.back_home') }}
    </button>
  </div>
</template>
