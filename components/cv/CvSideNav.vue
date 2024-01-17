<script setup lang='ts'>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

function changeLang() {
  if (locale.value === 'en')
    locale.value = 'es'
  else
    locale.value = 'en'
}
</script>

<template>
  <aside
    class="mb-6 flex flex-col justify-between sm:flex-row lg:justify-end"
  >
    <!--     <div class="lg:hidden space-x-2">
      <a
        href="#exp"
        class="py-3 sm:py-0 px-2 rounded-xl shadow hover:underline hover:text-violet-600 dark:hover:text-violet-200"
      >
        {{ $t('exp_title') }}
      </a>
      <a
        href="#study"
        class="py-3 sm:py-0 px-2 rounded-xl shadow hover:underline hover:text-violet-600 dark:hover:text-violet-200"
      >
        {{ $t('study_title') }}
      </a>
    </div> -->
    <button
      class="flex items-center text-right transition duration-200 ease-out space-x-1 hover:text-violet-600 hover:underline"
      @click="changeLang"
    >
      <i class="i-ic:round-translate h-5 w-5" />
      <span>
        {{ $t('change_lang') }}
      </span>
    </button>
  </aside>
</template>
