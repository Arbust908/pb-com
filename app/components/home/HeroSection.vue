<script setup lang="ts">
import type { CvSkillsData } from '#shared/types'
import shuffleLetters from 'shuffle-letters'
import { resolveSkillSlugs } from '~/utils/skills'

const props = defineProps<{
  skillsData: CvSkillsData
}>()

const orbitSkills = computed(() => {
  const stack = props.skillsData.groups.find(group => group.slug === 'my-stack')
  return stack ? resolveSkillSlugs(stack.skillSlugs, props.skillsData.skills) : []
})

const heroRef = useTemplateRef<HTMLElement>('hero')

onMounted(() => {
  if (heroRef.value && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    shuffleLetters(heroRef.value)
  }
})
</script>

<template>
  <header class="relative grid mx-auto max-w-360 w-full gap-10 px-4 pb-16 pt-14 lg:grid-cols-12 lg:items-end lg:px-10 sm:px-6 lg:pb-24 lg:pt-24 sm:pt-18">
    <div class="lg:col-span-9">
      <h1 class="text-[clamp(3.5rem,13vw,8rem)] font-extrabold leading-[0.9] tracking-[-0.035em] font-mono">
        Francisco<br>
        <span class="text-rose-700 font-normal italic dark:text-rose-300">
          Pancho
        </span><br>
        Blanco
      </h1>
      <h2 ref="hero" class="mt-5 min-h-8 text-lg text-slate-700 leading-snug sm:text-2xl dark:text-slate-300">
        {{ $t('rol') }}
      </h2>
    </div>
    <div v-if="orbitSkills.length" class="hidden lg:col-span-3 lg:block lg:justify-self-center">
      <SkillOrbitRing :skills="orbitSkills" />
    </div>
  </header>
</template>
