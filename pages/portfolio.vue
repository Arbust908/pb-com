<script setup lang="ts">
import shuffleLetters from 'shuffle-letters'
import type { MetaData } from '@/composables/ultimateProtocol'
import { useUP } from '@/composables/ultimateProtocol'

const meta: MetaData = {
  base_url: 'panchoblanco.com',
  title: 'Portfolio :: Pancho Blanco',
  description: 'Portfolio of creative work by Pancho Blanco - Coming Soon',
}
useHead(useUP(meta))

const messages = [
  'Coming Soon',
  'Work in Progress',
  'Stay Tuned',
  'Something Awesome',
]
const workingOn = [
  'Full Next.ts rewrite',
  'Versatile eCommerce with payment integration',
  'Full Redesign and re-write in Svelte and Solid',
  'The Tabletop Roleplaying Game Database',
]

const messageRef = ref<HTMLElement>()
const workOnRef = ref<HTMLElement>()
const messageIndex = ref(0)
const workingOnIndex = ref(0)

const shuffleIntervalOne = ref<ReturnType<typeof setInterval>>()
const shuffleIntervalTwo = ref<ReturnType<typeof setInterval>>()

onMounted(() => {
  if (messageRef.value) {
    shuffleLetters(messageRef.value)
    shuffleLetters(workOnRef.value)
  }

  shuffleIntervalOne.value = setInterval(() => {
    messageIndex.value = (messageIndex.value + 1) % messages.length
    if (messageRef.value) {
      shuffleLetters(messageRef.value, {
        text: messages[messageIndex.value],
      })
    }
  }, 2560)
  shuffleIntervalTwo.value = setInterval(() => {
    workingOnIndex.value = (workingOnIndex.value + 1) % workingOn.length
    if (workOnRef.value) {
      shuffleLetters(workOnRef.value, {
        text: workingOn[workingOnIndex.value],
      })
    }
  }, 3725)
})
</script>

<template>
  <div class="mt-40 min-h-screen flex flex-col items-center justify-start bg-slate-100 dark:bg-slate-900">
    <div class="w-full text-center space-y-6">
      <h1 class="from-pink-500 to-violet-500 bg-gradient-to-r bg-clip-text text-5xl text-transparent font-light md:text-7xl">
        Portfolio
      </h1>
      <p ref="messageRef" class="min-h-32px text-xl text-slate-600 font-medium tracking-widest md:text-2xl dark:text-slate-400">
        Working on it!
      </p>
      <p ref="workOnRef" class="min-h-32px text-slate-700 font-bold dark:text-slate-300">
        Deep typescript tighting
      </p>
      <NuxtLink
        class="inline-block rounded-lg bg-transparent px-6 py-2 text-slate-900 font-medium underline underline-offset-2 transition duration-150 ease-out dark:text-slate-100 hover:text-violet-200 hover:shadow dark:hover:bg-violet-800"
        to="/"
      >
        ← Back to Home
      </NuxtLink>
    </div>
  </div>
</template>
