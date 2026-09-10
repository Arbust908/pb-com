<script setup lang="ts">
import { SEMANTIC_COLORS } from '~/constants'

const gradientColors = `${SEMANTIC_COLORS.accent}; ${SEMANTIC_COLORS.secondary}; ${SEMANTIC_COLORS.accent}`
const reverseGradientColors = `${SEMANTIC_COLORS.secondary}; ${SEMANTIC_COLORS.accent}; ${SEMANTIC_COLORS.secondary}`
</script>

<template>
  <svg aria-hidden="true" focusable="false" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="blob-one-gradient" x1="50%" y1="0%" x2="50%" y2="100%">

        <stop offset="0%" :stop-color="SEMANTIC_COLORS.accent">
          <animate attributeName="stop-color" :values="gradientColors" dur="6s" repeatCount="indefinite" />
        </stop>

        <stop offset="100%" :stop-color="SEMANTIC_COLORS.secondary">
          <animate attributeName="stop-color" :values="reverseGradientColors" dur="6s" repeatCount="indefinite" />
        </stop>

      </linearGradient>

    </defs>
    <path fill="url('#blob-one-gradient')" d="M66.2,-23.3C72.1,-3.4,53.7,22.6,31.1,37.9C8.5,53.1,-18.3,57.6,-34.1,46.3C-49.9,34.9,-54.8,7.8,-47.3,-14.4C-39.7,-36.5,-19.9,-53.7,5.1,-55.4C30.2,-57.1,60.3,-43.2,66.2,-23.3Z" transform="translate(100 100)" />
  </svg>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  animate {
    display: none;
  }
}
</style>
