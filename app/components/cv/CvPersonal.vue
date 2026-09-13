<script setup lang="ts">
import { AUTHOR_LOCATION, CONTACT_EMAIL } from '#shared/constants'
import { resolveSkillSlugs } from '~/utils/skills'

const { t, locale } = useI18n()

const globalStore = useGlobalStore()
const { languages, skillsData } = storeToRefs(globalStore)
const skills = computed(() => skillsData.value.skills)
const skillGroups = computed(() => skillsData.value.groups)

const { getTranslation } = useCvTranslation()

function getGroupSkills(group: typeof skillGroups.value[number]) {
  return resolveSkillSlugs(group.skillSlugs, skills.value)
}
</script>

<template>
  <section
    class="relative border border-slate-300/70 rounded-2xl bg-slate-50/70 p-5 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-800/40 sm:p-7"
  >
    <h1 class="text-4xl font-extrabold leading-none tracking-[-0.035em] font-mono">
      Francisco <br>
      <span class="text-rose-700 font-normal italic dark:text-rose-300">Pancho</span><br>
      Blanco
    </h1>
    <h2 class="mt-2 text-sm text-slate-700 leading-snug dark:text-slate-300">
      {{ t('rol') }}
    </h2>
    <article class="my-7 border-y border-slate-300/70 py-5 dark:border-slate-700/70">
      <ul class="text-sm space-y-3">
        <li>
          <a :href="`mailto:${CONTACT_EMAIL}`" class="flex items-center gap-2 transition hover:text-rose-700 dark:hover:text-rose-300">
            <i class="i-ph:envelope-simple size-5 text-rose-700 dark:text-rose-300" />
            <span>{{ CONTACT_EMAIL }}</span>
          </a>
        </li>
        <li class="flex items-center gap-2">
          <i class="i-ph:map-pin-area size-5 text-rose-700 dark:text-rose-300" />
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
        <h4 class="mb-1 text-purple-700 font-bold dark:text-purple-300">
          {{ getTranslation(group, 'title') }}
        </h4>
        <ul class="mt-2 flex flex-wrap gap-2">
          <li v-for="skill in getGroupSkills(group)" :key="skill.slug">
            <SkillChip :skill="skill" />
          </li>
        </ul>
      </article>
    </section>
    <CvPersonalLang :languages="languages" :locale="locale" />
  </section>
</template>
