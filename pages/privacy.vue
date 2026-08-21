<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('privacy.title')} :: Pancho Blanco`,
  description: () => t('privacy.introduction'),
})
</script>

<template>
  <div class="relative w-full overflow-hidden layout-grid-full">
    <div aria-hidden="true" class="pointer-events-none absolute right--28 top--28 size-120 rounded-full ambient-primary filter-blur-3xl" />

    <header class="relative content-container pb-10 pt-14 lg:pb-16 lg:pt-24 sm:pt-18">
      <p class="mb-5 meta-label-primary">
        {{ $t('privacy.eyebrow') }}
      </p>
      <h1 class="display-heading max-w-5xl text-[clamp(3.2rem,12vw,7rem)]">
        {{ $t('privacy.title') }}
      </h1>
      <p class="mt-6 max-w-3xl text-lg text-body leading-relaxed sm:text-xl">
        {{ $t('privacy.introduction') }}
      </p>
      <p class="mt-5 meta-label">
        {{ $t('privacy.updated') }}
      </p>
    </header>

    <main class="relative content-container pb-18 lg:pb-28">
      <aside class="border border-primary rounded-2xl bg-rose-400/8 p-5 sm:p-7">
        <p class="meta-label-primary">
          {{ $t('privacy.notice_title') }}
        </p>
        <p class="mt-3 max-w-4xl text-body leading-relaxed">
          {{ $t('privacy.notice') }}
        </p>
      </aside>

      <div class="grid mt-10 gap-x-12 gap-y-10 border-t border-base pt-10 lg:grid-cols-2 lg:mt-16 lg:pt-16">
        <section v-for="section in ['operator', 'analytics', 'fonts', 'hosting', 'storage', 'email', 'choices']" :key="section">
          <h2 class="display-heading text-2xl sm:text-3xl">
            {{ $t(`privacy.sections.${section}.title`) }}
          </h2>
          <p class="mt-4 text-body leading-relaxed">
            {{ $t(`privacy.sections.${section}.body`) }}
          </p>
          <p v-if="section === 'operator'" class="mt-4">
            <a class="text-primary transition hover:underline" href="mailto:me@panchoblanco.dev">me@panchoblanco.dev</a>
          </p>
          <p v-if="section === 'analytics'" class="mt-4">
            <a class="text-primary transition hover:underline" href="https://posthog.com/privacy" rel="noreferrer" target="_blank">PostHog Privacy Policy</a>
          </p>
          <p v-if="section === 'fonts'" class="mt-4">
            <a class="text-primary transition hover:underline" href="https://policies.google.com/privacy" rel="noreferrer" target="_blank">Google Privacy Policy</a>
          </p>
          <p v-if="section === 'hosting'" class="mt-4">
            <a class="text-primary transition hover:underline" href="https://vercel.com/legal/privacy-policy" rel="noreferrer" target="_blank">Vercel Privacy Policy</a>
          </p>
        </section>
      </div>
    </main>
  </div>
</template>
