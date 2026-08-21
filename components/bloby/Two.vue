<script setup lang='ts'>

</script>

<template>
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="blob-two-gradient" x1="50%" y1="0%" x2="50%" y2="100%">

        <stop offset="0%" stop-color="#c084fc">
          <animate attributeName="stop-color" values="#c084fc; #fb7185; #c084fc" dur="7s" repeatCount="indefinite" />
        </stop>

        <stop offset="100%" stop-color="#fb7185">
          <animate attributeName="stop-color" values="#fb7185; #c084fc; #fb7185" dur="7s" repeatCount="indefinite" />
        </stop>

      </linearGradient>

    </defs>
    <path fill="url('#blob-two-gradient')" d="M46.8,-15.4C55.8,12.5,55,43.5,37,58.2C19.1,73,-15.9,71.5,-38.6,54.6C-61.3,37.8,-71.8,5.5,-63.3,-21.7C-54.9,-49,-27.4,-71.2,-4.3,-69.8C18.9,-68.4,37.8,-43.4,46.8,-15.4Z" transform="translate(100 100)" />
  </svg>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  animate {
    display: none;
  }
}
</style>
