<script setup lang="ts">
const { t } = useI18n()

const email = 'me@panchoblanco.dev'

function mailto(subject: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`
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

useSeoMeta({
  title: () => `${t('about.title')} :: Pancho Blanco`,
  description: () => t('about.introduction'),
})
</script>

<template>
  <div class="relative w-full overflow-hidden layout-grid-full">
    <div aria-hidden="true" class="pointer-events-none absolute right--20 top--24 size-120 rounded-full ambient-secondary filter-blur-3xl" />
    <div aria-hidden="true" class="pointer-events-none absolute bottom--36 left--24 size-96 rounded-full ambient-primary filter-blur-3xl" />

    <header class="relative content-container pb-10 pt-14 lg:pb-16 lg:pt-24 sm:pt-18">
      <p class="mb-5 meta-label-primary">
        {{ $t('about.eyebrow') }}
      </p>
      <h1 class="display-heading text-[clamp(3.5rem,13vw,8rem)]">
        {{ $t('about.title') }}
      </h1>
      <p class="mt-6 max-w-3xl text-lg text-body leading-relaxed sm:text-xl">
        {{ $t('about.introduction') }}
      </p>
    </header>

    <main class="relative content-container pb-18 lg:pb-28">
      <section class="grid border-t border-base py-10 lg:grid-cols-12 lg:gap-8 lg:py-16">
        <p class="mb-7 meta-label-primary lg:col-span-3 lg:mb-0">
          01 / {{ $t('about.profile_title') }}
        </p>
        <div class="max-w-3xl text-body leading-relaxed lg:col-span-8 space-y-5">
          <p>{{ $t('about.profile') }}</p>
          <dl class="grid gap-3 border border-base rounded-2xl surface-bg p-5 sm:grid-cols-2 sm:p-7">
            <div>
              <dt class="meta-label-secondary">
                {{ $t('about.location_label') }}
              </dt>
              <dd class="mt-2 text-base">
                Buenos Aires, Argentina
              </dd>
            </div>
            <div>
              <dt class="meta-label-secondary">
                {{ $t('about.email_label') }}
              </dt>
              <dd class="mt-2">
                <a class="text-base transition hover:text-primary" :href="`mailto:${email}`">{{ email }}</a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section class="grid border-t border-base py-10 lg:grid-cols-12 lg:gap-8 lg:py-16">
        <div class="mb-7 lg:col-span-3 lg:mb-0">
          <p class="meta-label-primary">
            02 / {{ $t('about.contact_title') }}
          </p>
          <p class="mt-4 max-w-xs text-sm text-muted leading-relaxed">
            {{ $t('about.mail_notice') }}
          </p>
        </div>
        <div class="grid gap-3 lg:col-span-9 md:grid-cols-3">
          <a
            v-for="action in contactActions"
            :key="action.href"
            :href="action.href"
            class="group min-h-48 flex flex-col justify-between surface-frosted rounded-2xl p-5 transition hover:(border-primary -translate-y-1) sm:p-7"
          >
            <i :class="action.icon" class="size-6 text-primary" aria-hidden="true" />
            <span>
              <strong class="block text-lg">{{ action.label }}</strong>
              <span class="mt-2 block text-sm text-body leading-relaxed">{{ action.description }}</span>
            </span>
          </a>
        </div>
      </section>
    </main>
  </div>
</template>
