<script setup lang="ts">
import type { SkillRecord } from './types'
import { useTimeoutFn } from '@vueuse/core'
import { AnimatePresence, motion, MotionConfig } from 'motion-v'
import { computed, nextTick, onBeforeUnmount, shallowRef, useId, useTemplateRef, watch } from 'vue'
import SkillIcon from './SkillIcon.vue'

const props = withDefaults(defineProps<{
  skill: SkillRecord
  variant?: 'chip' | 'icon'
}>(), {
  variant: 'chip',
})

const { locale } = useI18n()
const triggerRef = useTemplateRef<HTMLButtonElement>('trigger')
const anchorRef = useTemplateRef<HTMLDivElement>('anchor')
const isOpen = shallowRef(false)
const tooltipId = `skill-tooltip-${useId()}`
const tooltipStyle = shallowRef<Record<string, string>>({})
const tooltipSide = shallowRef<'above' | 'below'>('below')
const TOOLTIP_SPRING = {
  type: 'spring',
  stiffness: 500,
  damping: 32,
  mass: 0.8,
} as const

const description = computed(() =>
  props.skill.translations[locale.value]?.description
  ?? props.skill.translations.en?.description
  ?? '',
)
const skillColor = computed(() => props.skill.color || '#475569')
const skillStyle = computed(() => ({ '--skill-color': skillColor.value }))
const tooltipTextColor = computed(() => {
  const hex = skillColor.value.match(/^#([\da-f]{3}|[\da-f]{6})$/i)?.[1]
  if (!hex)
    return '#fff'

  const channels = hex.length === 3
    ? [...hex].map(channel => Number.parseInt(channel.repeat(2), 16))
    : hex.match(/\w\w/g)!.map(channel => Number.parseInt(channel, 16))
  const luminance = channels
    .map((channel) => {
      const value = channel / 255
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
    })
    .reduce((total, value, index) => total + value * (index === 0 ? 0.2126 : index === 1 ? 0.7152 : 0.0722), 0)

  return luminance > 0.179 ? '#000' : '#fff'
})
const tooltipColorStyle = computed(() => ({
  ...skillStyle.value,
  '--skill-contrast-color': tooltipTextColor.value,
}))

function positionTooltip() {
  const trigger = triggerRef.value
  if (!trigger)
    return

  const rect = trigger.getBoundingClientRect()
  const padding = 12
  const width = Math.min(280, window.innerWidth - padding * 2)
  const tooltipHeight = anchorRef.value?.offsetHeight ?? 0
  const center = rect.left + rect.width / 2
  const left = Math.max(padding + width / 2, Math.min(window.innerWidth - padding - width / 2, center))
  const placeAbove = rect.top - padding >= tooltipHeight + 8
  const top = placeAbove
    ? rect.top - 8
    : Math.min(window.innerHeight - padding - tooltipHeight, rect.bottom + 8)

  tooltipSide.value = placeAbove ? 'above' : 'below'
  tooltipStyle.value = {
    left: `${left}px`,
    maxWidth: `${width}px`,
    top: `${top}px`,
    transform: placeAbove ? 'translate(-50%, -100%)' : 'translateX(-50%)',
  }
}

const { start: scheduleOpen, stop: cancelOpen } = useTimeoutFn(open, 300, { immediate: false })

async function open() {
  cancelOpen()
  if (!description.value)
    return

  isOpen.value = true
  await nextTick()
  positionTooltip()
}

function close() {
  cancelOpen()
  isOpen.value = false
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    close()
    triggerRef.value?.focus()
  }
}

function handleOutsidePointer(event: PointerEvent) {
  if (!triggerRef.value?.contains(event.target as Node))
    close()
}

function updatePosition() {
  if (isOpen.value)
    positionTooltip()
}

/* const TOOLTIP_SPRING = {
  type: 'spring',
  bounce: 0.45, // 0 = no overshoot, 1 = very springy
  duration: 0.35,
} */

watch(isOpen, (open) => {
  if (open) {
    document.addEventListener('pointerdown', handleOutsidePointer, true)
    window.addEventListener('keydown', handleKeydown)
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    return
  }

  document.removeEventListener('pointerdown', handleOutsidePointer, true)
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', updatePosition)
  window.removeEventListener('scroll', updatePosition, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handleOutsidePointer, true)
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', updatePosition)
  window.removeEventListener('scroll', updatePosition, true)
})
</script>

<template>
  <button
    ref="trigger"
    class="skill-chip"
    :class="`is-${variant}`"
    :style="skillStyle"
    type="button"
    :aria-label="variant === 'icon' ? skill.name : undefined"
    :aria-describedby="isOpen ? tooltipId : undefined"
    :aria-expanded="description ? isOpen : undefined"
    @mouseenter="scheduleOpen()"
    @mouseleave="close"
    @focus="open"
    @blur="close"
    @click="open"
  >
    <SkillIcon :skill="skill" :size="variant === 'chip' ? 18 : 32" decorative />
    <span v-if="variant === 'chip'" class="skill-chip-label">{{ skill.name }}</span>
  </button>

  <Teleport to="body">
    <MotionConfig reduced-motion="user">
      <AnimatePresence>
        <div v-if="isOpen" :id="tooltipId" ref="anchor" class="skill-tooltip-anchor" :style="tooltipStyle">
          <motion.div
            class="skill-tooltip"
            :class="`is-${tooltipSide}`"
            role="tooltip"
            :style="tooltipColorStyle"
            :initial="{ x: -18, rotate: -8, opacity: 0 }"
            :animate="{ x: 0, rotate: 0, opacity: 1 }"
            :exit="{ x: -10, rotate: -4, opacity: 0, transition: { duration: 0.12 } }"
            :transition="TOOLTIP_SPRING"
          >
            {{ description }}
          </motion.div>
        </div>
      </AnimatePresence>
    </MotionConfig>
  </Teleport>
</template>

<style scoped>
.skill-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  border: 1px solid color-mix(in srgb, var(--skill-color) 32%, transparent);
  border-radius: 999px;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font: inherit;
  line-height: 1;
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    transform 160ms ease;
}

.is-chip {
  padding: 0.42rem 0.65rem 0.42rem 0.45rem;
}
.is-icon {
  padding: 0.35rem;
  border-radius: 0.55rem;
}

.skill-chip:hover,
.skill-chip:focus-visible {
  border-color: color-mix(in srgb, var(--skill-color) 68%, transparent);
  background: color-mix(in srgb, var(--skill-color) 14%, transparent);
}

.skill-chip:focus-visible {
  outline: 2px solid var(--skill-color);
  outline-offset: 2px;
}

.skill-chip:active {
  transform: scale(0.97);
}
.skill-chip-label {
  white-space: nowrap;
}

.skill-tooltip-anchor {
  position: fixed;
  z-index: 1000;
  pointer-events: none;
}

.skill-tooltip {
  position: relative; /* required for the ::after arrow to anchor to it */
  padding: 0.55rem 0.7rem;
  border-radius: 0.5rem;
  background: var(--skill-color);
  color: var(--skill-contrast-color);
  font-size: 0.8125rem;
  line-height: 1.35;
}

.skill-tooltip::after {
  position: absolute;
  left: 50%;
  width: 0.65rem;
  height: 0.65rem;
  background: var(--skill-color);
  content: '';
  transform: translateX(-50%) rotate(45deg);
}

.skill-tooltip.is-above::after {
  bottom: -0.325rem;
  border-radius: 0 0 3px 0; /* rounds the bottom (downward-pointing) tip */
}

.skill-tooltip.is-below::after {
  top: -0.325rem;
  border-radius: 3px 0 0 0; /* rounds the top (upward-pointing) tip */
}

.skill-tooltip.is-above {
  transform-origin: 50% 100%; /* pivot at bottom tip */
}
.skill-tooltip.is-below {
  transform-origin: 50% 0%; /* pivot at top tip */
}

@supports (color: contrast-color(red)) {
  .skill-tooltip {
    color: contrast-color(var(--skill-color));
  }
}
</style>
