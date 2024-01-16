<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const changeLang = () => {
  if (locale.value === 'en')
    locale.value = 'es'
  else
    locale.value = 'en'
}
</script>

<template>
  <aside
    class="side-nav"
  >
    <!--     <div class="side-nav__btn-group">
      <a
        href="#exp"
        class="side-nav__link"
      >
        {{ $t('exp_title') }}
      </a>
      <a
        href="#study"
        class="side-nav__link"
      >
        {{ $t('study_title') }}
      </a>
    </div> -->
    <button
      class="side-nav__lang-btn"
      @click="changeLang"
    >
      <i class="i-ic:round-translate" />
      <span>
        {{ $t('change_lang') }}
      </span>
    </button>
  </aside>
</template>

<style scoped lang='scss'>
    .side-nav {
        @apply flex flex-col sm:flex-row justify-between lg:justify-end mb-6;
        &__btn-group {
            @apply lg:hidden space-x-2;
        }
        &__link {
            @apply py-3 sm:py-0 px-2 rounded-xl shadow hover:underline hover:text-violet-600 dark:hover:text-violet-200;
        }
        &__lang-btn {
            @apply hover:underline text-right flex items-center hover:text-violet-600 transition duration-200 ease-out space-x-1;
            & > i {
                @apply w-5 h-5;
            }
        }
    }
</style>
