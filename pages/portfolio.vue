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

const messageRef = ref<HTMLElement>()
const currentIndex = ref(0)

onMounted(() => {
  if (messageRef.value) {
    shuffleLetters(messageRef.value)
  }

  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % messages.length
    if (messageRef.value) {
      shuffleLetters(messageRef.value, {
        text: messages[currentIndex.value],
      })
    }
  }, 3000)
})
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900">
    <div class="text-center space-y-6">
      <h1 class="from-pink-500 to-violet-500 bg-gradient-to-r bg-clip-text text-5xl text-transparent font-light md:text-7xl">
        Portfolio
      </h1>
      <p ref="messageRef" class="min-h-32px text-xl text-slate-600 font-medium tracking-widest dark:text-slate-400 md:text-2xl">
        Coming Soon
      </p>
      <NuxtLink
        class="inline-block rounded-lg bg-violet-400 px-6 py-2 text-slate-900 font-medium transition duration-150 ease-out dark:bg-violet-600 dark:text-slate-100 hover:text-violet-500 hover:shadow dark:hover:bg-violet-800"
        to="/"
      >
        ← Back to Home
      </NuxtLink>
    </div>
  </div>
</template>
