<script setup lang="ts">
import type { SkillRecord } from './types'
import { computed, useTemplateRef } from 'vue'
import { useSkillIdleMotion } from '~/composables/useSkillIdleMotion'
import { resolveSkillIcon } from './iconResolver'

const props = withDefaults(defineProps<{
  skill: SkillRecord
  size?: number | string
  decorative?: boolean
}>(), {
  size: 24,
  decorative: false,
})

const iconRef = useTemplateRef<HTMLElement>('icon')
const { isAnimating } = useSkillIdleMotion(iconRef)
const iconUrl = computed(() => resolveSkillIcon(props.skill.icon))
const iconStyle = computed(() => ({
  '--skill-color': props.skill.color || '#475569',
  'width': typeof props.size === 'number' ? `${props.size}px` : props.size,
  'height': typeof props.size === 'number' ? `${props.size}px` : props.size,
}))
const fallbackLabel = computed(() => props.skill.name.slice(0, 1).toUpperCase())
</script>

<template>
  <span
    ref="icon"
    class="skill-icon"
    :class="{ 'is-idle-animating': isAnimating }"
    :style="iconStyle"
    :aria-hidden="decorative || undefined"
  >
    <img v-if="iconUrl" class="skill-icon-image" :src="iconUrl" :alt="decorative ? '' : skill.name">
    <span v-else class="skill-icon-fallback" :aria-label="decorative ? undefined : skill.name">{{ fallbackLabel }}</span>
  </span>
</template>

<style scoped>
.skill-icon {
  display: inline-grid;
  flex: none;
  place-items: center;
  overflow: hidden;
  border-radius: 0.25em;
  color: var(--skill-color);
  transform-origin: center;
}

.skill-icon-image {
  display: block;
  width: 100%;
  height: 100%;
}

.skill-icon-fallback {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  background: var(--skill-color);
  color: white;
  font-size: 0.55em;
  font-weight: 700;
  line-height: 1;
}

.is-idle-animating {
  animation: skill-idle 700ms ease-in-out;
}

@keyframes skill-idle {
  35% {
    transform: rotate(-5deg) scale(1.06);
  }
  70% {
    transform: rotate(3deg) scale(1.02);
  }
}

@media (prefers-reduced-motion: reduce) {
  .is-idle-animating {
    animation: none;
  }
}
</style>
