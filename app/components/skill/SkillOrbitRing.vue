<script setup lang="ts">
import type { SkillRecord } from './types'
import { computed } from 'vue'
import SkillIcon from './SkillIcon.vue'

const props = defineProps<{
  skills: SkillRecord[]
}>()

const orbitItems = computed(() => props.skills.map((skill, index) => ({
  skill,
  angle: (360 / Math.max(props.skills.length, 1)) * index,
  bobDelay: `${index * -0.7}s`,
})))
</script>

<template>
  <div aria-hidden="true" class="skill-orbit">
    <div class="skill-orbit-tilt">
      <div class="skill-orbit-ring">
        <div
          v-for="item in orbitItems"
          :key="item.skill.slug"
          class="skill-orbit-item"
          :style="{ '--angle': `${item.angle}deg`, '--skill-color': item.skill.color }"
        >
          <div class="skill-orbit-counter">
            <div class="skill-orbit-billboard">
              <span class="skill-orbit-bob" :style="{ animationDelay: item.bobDelay }">
                <span class="skill-orbit-glow" />
                <SkillIcon :skill="item.skill" :size="30" decorative />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skill-orbit {
  --orbit-size: clamp(16rem, 26vw, 24rem);
  --orbit-radius: calc(var(--orbit-size) / 2 - 1.9rem);
  --orbit-tilt: 62deg;
  --orbit-upright: 14deg;
  position: relative;
  width: var(--orbit-size);
  height: var(--orbit-size);
  perspective: 50rem;
  pointer-events: none;
}

.skill-orbit-tilt {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  animation: skill-orbit-tilt-oscillate 26s ease-in-out infinite;
}

.skill-orbit-ring {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  animation: skill-orbit-rotate 60s linear infinite;
}

.skill-orbit-item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: rotateZ(var(--angle)) translate(var(--orbit-radius));
  transform-style: preserve-3d;
}

.skill-orbit-counter {
  transform-style: preserve-3d;
  animation: skill-orbit-counter 60s linear infinite;
}

.skill-orbit-billboard {
  transform-style: preserve-3d;
  animation: skill-orbit-billboard 26s ease-in-out infinite;
}

.skill-orbit-bob {
  position: relative;
  display: grid;
  place-items: center;
  animation: skill-orbit-bob 5s ease-in-out infinite;
}

.skill-orbit-glow {
  position: absolute;
  inset: -0.65rem;
  border-radius: 999px;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--skill-color) 40%, transparent), transparent 70%);
}

@keyframes skill-orbit-tilt-oscillate {
  0%,
  100% {
    transform: rotateX(var(--orbit-tilt));
  }

  50% {
    transform: rotateX(var(--orbit-upright));
  }
}

@keyframes skill-orbit-billboard {
  0%,
  100% {
    transform: rotateX(calc(var(--orbit-tilt) * -1));
  }

  50% {
    transform: rotateX(calc(var(--orbit-upright) * -1));
  }
}

@keyframes skill-orbit-rotate {
  from {
    transform: rotateZ(0deg);
  }

  to {
    transform: rotateZ(360deg);
  }
}

@keyframes skill-orbit-counter {
  from {
    transform: rotateZ(calc(var(--angle) * -1));
  }

  to {
    transform: rotateZ(calc(var(--angle) * -1 - 360deg));
  }
}

@keyframes skill-orbit-bob {
  0%,
  100% {
    transform: translate3d(0, -0.3rem, -0.5rem) scale(0.85);
  }

  50% {
    transform: translate3d(0, 0.3rem, 0.5rem) scale(1.08);
  }
}

@media (prefers-reduced-motion: reduce) {
  .skill-orbit-tilt,
  .skill-orbit-ring,
  .skill-orbit-counter,
  .skill-orbit-billboard,
  .skill-orbit-bob {
    animation: none;
  }

  .skill-orbit-tilt {
    transform: rotateX(var(--orbit-tilt));
  }

  .skill-orbit-billboard {
    transform: rotateX(calc(var(--orbit-tilt) * -1));
  }
}
</style>
