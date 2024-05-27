<script setup lang='ts'>
import type { ChatMessage } from '@/types'

interface Props {
  messages: ChatMessage[]
  isResponding: boolean
}
defineProps<Props>()
</script>

<template>
  <section class="py-4 space-y-4">
    <ChatMessage v-for="msg in messages" :key="msg.id" v-bind="msg" />
    <ChatMessage v-if="isResponding" :is-responding="isResponding" role="model" />
  </section>
</template>
