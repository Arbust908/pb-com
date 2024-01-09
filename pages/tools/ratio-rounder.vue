<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { nearestOneDigitAspectRatio } from '@/utils'

const inputRatio = ref('')
const nearestRatio = ref('')

const debouncedCalculation = useDebounceFn(() => {
  nearestRatio.value = nearestOneDigitAspectRatio(inputRatio.value)
}, 1000)
</script>

<template>
  <section class="space-y-5">
    <h1 class="text-3xl text-zinc-500">
      Ratio rounder
    </h1>
    <form class="mx-auto space-x-4">
      <label for="ratio">Enter Ratio (x:x):</label>
      <input id="ratio" v-model="inputRatio" class="border border-rose rounded-lg bg-transparent shadow" type="text" @input="debouncedCalculation">
    </form>
    <p>Nearest Ratio with Single Digit on Each Side: {{ nearestRatio }}</p>
  </section>
</template>
