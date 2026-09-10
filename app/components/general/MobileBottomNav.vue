<script setup lang="ts">
import { GITHUB_URL } from '#shared/constants'

const localePath = useLocalePath()
const route = useRoute()
const moreDialog = useTemplateRef<HTMLDialogElement>('moreDialog')
const isMoreOpen = ref(false)

const isMoreActive = computed(() => route.path === localePath({ name: 'privacy' }))

const lockTarget = shallowRef<HTMLElement | null>(null)
const isLocked = useScrollLock(() => lockTarget.value)

onMounted(() => {
  lockTarget.value = document.documentElement
})

watch(isMoreOpen, (open) => {
  isLocked.value = open
})

function openMore() {
  moreDialog.value?.showModal()
  isMoreOpen.value = moreDialog.value?.open ?? false
}

function closeMore() {
  moreDialog.value?.close()
}

function closeFromBackdrop(event: MouseEvent) {
  if (event.target === event.currentTarget)
    closeMore()
}
</script>

<template>
  <nav
    class="mobile-bottom-nav fixed inset-x-0 bottom-0 z-nav grid grid-cols-5 border-t border-base surface-strong-bg font-mono backdrop-blur-xl sm:hidden"
    :aria-label="$t('mobile_navigation')"
  >
    <NuxtLink
      :to="localePath({ name: 'index' })"
      class="mobile-nav-item hover:text-primary focus-visible:outline-2 focus-visible:outline-rose-400 focus-visible:outline-offset--4"
      exact-active-class="text-primary"
    >
      <i class="i-ph:house size-5" aria-hidden="true" />
      <span>{{ $t('home') }}</span>
    </NuxtLink>
    <NuxtLink
      :to="localePath({ name: 'work' })"
      class="mobile-nav-item hover:text-primary focus-visible:outline-2 focus-visible:outline-rose-400 focus-visible:outline-offset--4"
      active-class="text-primary"
    >
      <i class="i-ph:squares-four size-5" aria-hidden="true" />
      <span>{{ $t('work') }}</span>
    </NuxtLink>
    <NuxtLink
      :to="localePath({ name: 'cv' })"
      class="mobile-nav-item hover:text-primary focus-visible:outline-2 focus-visible:outline-rose-400 focus-visible:outline-offset--4"
      active-class="text-primary"
    >
      <i class="i-ph:file-text size-5" aria-hidden="true" />
      <span>{{ $t('resume') }}</span>
    </NuxtLink>
    <NuxtLink
      :to="localePath({ name: 'about' })"
      class="mobile-nav-item hover:text-primary focus-visible:outline-2 focus-visible:outline-rose-400 focus-visible:outline-offset--4"
      active-class="text-primary"
    >
      <i class="i-ph:user-circle size-5" aria-hidden="true" />
      <span>{{ $t('about_nav') }}</span>
    </NuxtLink>
    <button
      type="button"
      class="mobile-nav-item hover:text-primary focus-visible:outline-2 focus-visible:outline-rose-400 focus-visible:outline-offset--4"
      :class="{ 'text-primary': isMoreActive || isMoreOpen }"
      :aria-expanded="isMoreOpen"
      aria-controls="mobile-more-dialog"
      @click="openMore"
    >
      <i class="i-ph:dots-three-circle size-5" aria-hidden="true" />
      <span>{{ $t('more') }}</span>
    </button>
  </nav>

  <dialog
    id="mobile-more-dialog"
    ref="moreDialog"
    class="mobile-more-dialog fixed inset-x-0 bottom-0 top-auto z-dialog m-0 max-h-[85dvh] max-w-none w-full overflow-hidden border-x-0 border-b-0 rounded-t-3xl bg-slate-50 p-0 color-base sm:hidden dark:bg-slate-800"
    :aria-label="$t('more_menu')"
    @click="closeFromBackdrop"
    @close="isMoreOpen = false"
  >
    <div class="mx-auto mt-2 h-1 w-10 rounded-full bg-slate-300 dark:bg-slate-600" aria-hidden="true" />
    <div class="flex items-center justify-between px-5 pb-4 pt-3">
      <h2 class="text-xl display-heading">
        {{ $t('more') }}
      </h2>
      <button class="icon-control" type="button" :aria-label="$t('close_more_menu')" @click="closeMore">
        <i class="i-ph:x text-lg" aria-hidden="true" />
      </button>
    </div>

    <div class="grid gap-2 px-4">
      <GeneralLangToggle full :label="$t('language')" />
      <ClientOnly>
        <DarkCircleToggle full :label="$t('theme')" />
      </ClientOnly>
      <NuxtLink
        :to="localePath({ name: 'privacy' })"
        class="min-h-14 flex items-center justify-between border border-base rounded-2xl px-4 py-2 text-sm font-mono transition hover:border-primary hover:text-primary"
        @click="closeMore"
      >
        <span class="flex items-center gap-3">
          <i class="i-ph:shield-check text-lg" aria-hidden="true" />
          {{ $t('privacy_link') }}
        </span>
        <i class="i-ph:caret-right text-lg" aria-hidden="true" />
      </NuxtLink>
      <NuxtLink
        :href="GITHUB_URL"
        class="min-h-14 flex items-center justify-between border border-base rounded-2xl px-4 py-2 text-sm font-mono transition hover:border-primary hover:text-primary"
        rel="noreferrer"
        external
      >
        <span class="flex items-center gap-3">
          <i class="i-ph:github-logo text-lg" aria-hidden="true" />
          {{ $t('github_profile') }}
        </span>
        <i class="i-ph:arrow-up-right text-lg" aria-hidden="true" />
      </NuxtLink>
    </div>

    <div class="mobile-more-safe-area" />
  </dialog>
</template>

<style scoped>
.mobile-bottom-nav {
  padding-bottom: env(safe-area-inset-bottom);
}

.mobile-nav-item {
  display: grid;
  min-width: 0;
  min-height: 4.5rem;
  place-content: center;
  justify-items: center;
  gap: 0.25rem;
  border-radius: 0.5rem;
  font-family: inherit;
  font-size: 0.625rem;
  transition: color 150ms ease;
}

.mobile-more-dialog::backdrop {
  background: rgb(15 23 42 / 0.55);
  backdrop-filter: blur(4px);
}

.mobile-more-safe-area {
  height: max(1rem, env(safe-area-inset-bottom));
}
</style>
