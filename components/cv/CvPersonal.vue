<script setup lang="ts">
import { AUTHOR_LOCATION, CONTACT_EMAIL } from '~/constants'

const { t, locale } = useI18n()

const globalStore = useGlobalStore()
const { languages, skillsData } = storeToRefs(globalStore)
const skills = computed(() => skillsData.value.skills)
const skillGroups = computed(() => skillsData.value.groups)

const { getTranslation } = useCvTranslation()

function getSkillList(group: typeof skillGroups.value[number]): string {
  const skillBySlug = new Map(skills.value.map(skill => [skill.slug, skill.name]))
  return group.skillSlugs.map(slug => skillBySlug.get(slug)).filter(Boolean).join(', ')
}
</script>

<template>
  <section
    class="relative surface-frosted rounded-2xl p-5 sm:p-7"
  >
    <h1 class="display-heading text-4xl leading-none">
      Francisco <br>
      <span class="text-primary font-normal italic">Pancho</span><br>
      Blanco
    </h1>
    <h2 class="mt-2 text-sm text-body leading-snug">
      {{ t('rol') }}
    </h2>
    <article class="my-7 border-y border-base py-5">
      <ul class="text-sm space-y-3">
        <li>
          <a :href="`mailto:${CONTACT_EMAIL}`" class="flex items-center gap-2 transition hover:text-primary">
            <i class="i-ph:envelope-simple size-5 text-primary" />
            <span>{{ CONTACT_EMAIL }}</span>
          </a>
        </li>
        <li class="flex items-center gap-2">
          <i class="i-ph:map-pin-area size-5 text-primary" />
          <span>{{ AUTHOR_LOCATION }}</span>
        </li>
      </ul>
    </article>
    <section class="mb-6">
      <h3 class="mb-5 flex items-center meta-label-primary">
        <i class="i-ph:code-simple mr-2 size-5" />
        <span> Skills </span>
      </h3>
      <article v-for="group in skillGroups" :key="group.slug" class="mb-4 pl-4">
        <h4 class="mb-1 text-secondary font-bold">
          {{ getTranslation(group, 'title') }}
        </h4>
        <p class="text-sm text-body leading-relaxed">
          {{ getSkillList(group) }}
        </p>
      </article>
    </section>
    <CvPersonalLang :languages="languages" :locale="locale" />
  </section>
</template>
