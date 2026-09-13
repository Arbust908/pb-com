<script setup lang="ts">
import type { CvSkillsData } from '#shared/types'
import { resolveSkillSlugs } from '~/utils/skills'
import SectionBox from './SectionBox.vue'

const props = defineProps<{
  skillsData: CvSkillsData
}>()

const { locale } = useI18n()
const { getTranslation } = useCvTranslation()
const skillGroups = computed(() => props.skillsData.groups.map(group => ({
  ...group,
  title: getTranslation(group, 'title'),
  skills: resolveSkillSlugs(group.skillSlugs, props.skillsData.skills),
})))

const skillsGridRef = useTemplateRef<HTMLElement>('skillsGrid')
const skillGroupRefs = useTemplateRef<HTMLElement[]>('skillGroupElements')
const activeSkillGroup = shallowRef<number | null>(null)
const canHoverSkills = useMediaQuery('(min-width: 640px) and (hover: hover) and (pointer: fine)')
const skillHighlightStyle = shallowRef({})
const { start: scheduleSkillReset, stop: cancelSkillReset } = useTimeoutFn(() => {
  activeSkillGroup.value = null
}, 200, { immediate: false })

function activateSkillGroup(index: number) {
  cancelSkillReset()
  activeSkillGroup.value = index
}

function updateSkillHighlight() {
  if (!canHoverSkills.value)
    return

  const grid = skillsGridRef.value
  const group = activeSkillGroup.value === null
    ? grid
    : grid?.querySelectorAll<HTMLElement>(':scope > article')[activeSkillGroup.value]
  if (!group)
    return

  const padding = 16
  skillHighlightStyle.value = {
    width: `${group.offsetWidth + padding * 2}px`,
    height: `${group.offsetHeight + padding * 2}px`,
    left: `${(group === grid ? 0 : group.offsetLeft) - padding}px`,
    top: `${(group === grid ? 0 : group.offsetTop) - padding}px`,
  }
}

watch([activeSkillGroup, canHoverSkills, skillGroups, locale], updateSkillHighlight, { flush: 'post' })
useResizeObserver(() => [skillsGridRef.value, ...(skillGroupRefs.value ?? [])], updateSkillHighlight)
</script>

<template>
  <SectionBox v-if="skillGroups.length" :title="$t('skills_title')">
    <div
      ref="skillsGrid"
      class="relative isolate grid mr-6 gap-x-8 gap-y-10 lg:col-span-9 lg:col-start-4 sm:grid-cols-2"
    >
      <aside
        aria-hidden="true"
        class="skill-group-highlight pointer-events-none absolute left-0 top-0 z-under border border-slate-300/70 rounded-2xl bg-slate-50/70 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-800/40"
        :style="skillHighlightStyle"
      />
      <article
        v-for="(group, index) in skillGroups"
        :key="group.id"
        ref="skillGroupElements"
        class="skill-group relative z-above"
        @mouseenter="activateSkillGroup(index)"
        @mouseleave="scheduleSkillReset()"
        @focusin="activateSkillGroup(index)"
        @focusout="scheduleSkillReset()"
      >
        <h3 class="text-lg font-bold tracking-[-0.02em]">
          {{ group.title }}
        </h3>
        <ul class="mt-3 flex flex-wrap gap-2">
          <li v-for="skill in group.skills" :key="skill.slug">
            <SkillChip :skill="skill" />
          </li>
        </ul>
      </article>
    </div>
  </SectionBox>
</template>

<style scoped>
.skill-group-highlight {
  display: none;
  transition:
    left 250ms ease,
    width 250ms ease,
    top 250ms ease 250ms,
    height 250ms ease 250ms;
}

@media (min-width: 640px) and (hover: hover) and (pointer: fine) {
  .skill-group::after {
    position: absolute;
    z-index: -1;
    inset: -16px;
    content: '';
  }

  .skill-group-highlight {
    display: block;
  }
}

@media (prefers-reduced-motion: reduce) {
  .skill-group-highlight {
    transition: none;
  }
}
</style>
