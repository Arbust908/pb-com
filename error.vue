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
  <div class="min-h-full flex flex-col items-center justify-center gap-6 base-bg p-10 text-center color-base">
    <i class="i-ph:compass-question size-12 text-primary" aria-hidden="true" />
    <p class="meta-label">
      {{ props.error.statusCode ?? 500 }}
    </p>
    <h1 class="display-heading text-4xl sm:text-5xl">
      {{ title }}
    </h1>
    <p class="max-w-md text-body">
      {{ description }}
    </p>
    <button type="button" class="control-primary cursor-pointer" @click="handleError">
      {{ $t('error.back_home') }}
    </button>
  </div>
</template>
