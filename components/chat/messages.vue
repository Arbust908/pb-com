<script setup lang='ts'>
type ChatMessage = {
  id: string
  message: string
  role: 'user' | 'model'
}

type Props = {
    messages: ChatMessage[],
    isResponding: boolean
};
defineProps<Props>()
</script>

<template>
    <section class="py-4 space-y-2">
        <ChatMessage v-for="msg in messages" :key="msg.id" v-bind="msg" />
        <ChatMessage v-if="isResponding" :is-responding="isResponding" role="model" />
    </section>
</template>
