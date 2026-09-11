<script setup lang="ts">
import { AUTHOR_LOCATION, CONTACT_EMAIL } from '#shared/constants'
import { usePageSeo } from '~/composables/usePageSeo'
import { createPageGraph } from '~/utils/structuredData'

const { t } = useI18n()

function mailto(subject: string): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
}

const contactActions = computed(() => [
  {
    label: t('about.contact.hello'),
    description: t('about.contact.hello_description'),
    href: mailto(t('about.contact.hello_subject')),
    icon: 'i-ph:hand-waving',
  },
  {
    label: t('about.contact.bug'),
    description: t('about.contact.bug_description'),
    href: mailto(t('about.contact.bug_subject')),
    icon: 'i-ph:bug',
  },
  {
    label: t('about.contact.phone'),
    description: t('about.contact.phone_description'),
    href: mailto(t('about.contact.phone_subject')),
    icon: 'i-ph:phone',
  },
])

usePageSeo({
  title: () => `${t('about.title')} :: Pancho Blanco`,
  description: () => t('about.introduction'),
  structuredData: context => createPageGraph({
    type: 'ProfilePage',
    url: context.canonicalUrl,
    name: t('about.title'),
    description: t('about.introduction'),
    breadcrumbs: [
      { name: t('home'), url: context.localeUrl(context.locale) },
      { name: t('about.title'), url: context.canonicalUrl },
    ],
    person: {
      description: t('about.profile'),
      email: CONTACT_EMAIL,
      jobTitle: t('rol'),
    },
  }),
})
</script>

<template>
  <div class="relative w-full overflow-hidden layout-grid-full">
    <div aria-hidden="true" class="pointer-events-none absolute right--20 top--24 size-120 rounded-full bg-purple-400/15 filter-blur-3xl dark:bg-purple-400/10" />
    <div aria-hidden="true" class="pointer-events-none absolute bottom--36 left--24 size-96 rounded-full bg-rose-400/15 filter-blur-3xl dark:bg-rose-400/10" />

    <header class="relative mx-auto max-w-360 w-full px-4 pb-10 pt-14 lg:px-10 sm:px-6 lg:pb-16 lg:pt-24 sm:pt-18">
      <p class="mb-5 meta-label-primary">
        {{ $t('about.eyebrow') }}
      </p>
      <h1 class="text-[clamp(3.5rem,13vw,8rem)] font-extrabold leading-[0.9] tracking-[-0.035em] font-mono">
        {{ $t('about.title') }}
      </h1>
      <p class="mt-6 max-w-3xl text-lg text-slate-700 leading-relaxed sm:text-xl dark:text-slate-300">
        {{ $t('about.introduction') }}
      </p>
    </header>

    <section class="relative mx-auto max-w-360 w-full px-4 pb-18 lg:px-10 sm:px-6 lg:pb-28">
      <section class="grid border-t border-slate-300/70 py-10 lg:grid-cols-12 lg:gap-8 dark:border-slate-700/70 lg:py-16">
        <p class="mb-7 meta-label-primary lg:col-span-3 lg:mb-0">
          {{ $t('about.profile_title') }}
        </p>
        <div class="max-w-3xl text-slate-700 leading-relaxed lg:col-span-8 space-y-5 dark:text-slate-300">
          <p>{{ $t('about.profile') }}</p>
          <dl class="grid gap-3 border border-slate-300/70 rounded-2xl bg-slate-50/70 p-5 sm:grid-cols-2 dark:border-slate-700/70 dark:bg-slate-800/40 sm:p-7">
            <div>
              <dt class="meta-label-secondary">
                {{ $t('about.location_label') }}
              </dt>
              <dd class="mt-2 text-slate-950 dark:text-slate-50">
                {{ AUTHOR_LOCATION }}
              </dd>
            </div>
            <div>
              <dt class="meta-label-secondary">
                {{ $t('about.email_label') }}
              </dt>
              <dd class="mt-2">
                <a class="text-slate-950 transition dark:text-slate-50 hover:text-rose-700 dark:hover:text-rose-300" :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section class="grid border-t border-slate-300/70 py-10 lg:grid-cols-12 lg:gap-8 dark:border-slate-700/70 lg:py-16">
        <div class="mb-7 lg:col-span-3 lg:mb-0">
          <p class="meta-label-primary">
            {{ $t('about.contact_title') }}
          </p>
          <p class="mt-4 max-w-xs text-sm text-slate-500 leading-relaxed dark:text-slate-400">
            {{ $t('about.mail_notice') }}
          </p>
        </div>
        <div class="grid gap-3 lg:col-span-9 md:grid-cols-3">
          <a
            v-for="action in contactActions"
            :key="action.href"
            :href="action.href"
            class="group min-h-48 flex flex-col justify-between border border-slate-300/70 rounded-2xl bg-slate-50/70 p-5 backdrop-blur-xl transition dark:border-slate-700/70 hover:(border-rose-500/60 -translate-y-1) dark:bg-slate-800/40 sm:p-7 dark:hover:border-rose-400/50"
          >
            <i :class="action.icon" class="size-6 text-rose-700 dark:text-rose-300" aria-hidden="true" />
            <span>
              <strong class="block text-lg">{{ action.label }}</strong>
              <span class="mt-2 block text-sm text-slate-700 leading-relaxed dark:text-slate-300">{{ action.description }}</span>
            </span>
          </a>
        </div>
      </section>
    </section>
  </div>
</template>
