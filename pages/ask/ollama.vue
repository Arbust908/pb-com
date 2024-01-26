<script lang="ts" setup>
import type { AI_MODEL_REQUEST_CLIENT, AI_MODEL_RESPONSE, MODEL_TYPES } from '@/types'
import { allowedModels } from '@/types'
import { getResponseMsg } from '@/utils'

const selectedModel = ref<MODEL_TYPES>(allowedModels.CAPYBARA)
const models = Object.values(allowedModels)
interface ChatMessage {
  id: string
  text: string
  role: 'user' | 'model'
}
const messages = ref<ChatMessage[]>([])
const newMessage = ref('')
const isResponding = ref(false)

async function sendMessage() {
  console.log('sendMessage')
  isResponding.value = true
  if (newMessage.value) {
    const payload = {
      message: newMessage.value,
      model: selectedModel.value,
    } satisfies AI_MODEL_REQUEST_CLIENT
    try {
      console.log('try')
      const data = await $fetch('/api/assistant/ollama', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      console.log('data', data)
      
      messages.value.push({ id: data.id, text: getResponseMsg(data), role: 'model' })
      newMessage.value = ''
    }
    catch (error) {
      console.error(error)
    }
    finally {
      isResponding.value = false
    }
  }
}
</script>

<template>
  <section class="flex flex-col p-4">
    <div class="flex grow flex-col pb-4 space-y-3">
      <div class="grow" />
      <p v-for="message in messages" :key="message.id" class="max-w-[calc(100%-4px)] w-max rounded-2xl p-2" :class="message.role === 'user' ? 'bg-emerald-500 mr-2 ml-auto rounded-br-none' : 'bg-indigo-500 ml-2 mr-auto rounded-bl-none'">
        {{ message.text }}
      </p>
      <p v-if="isResponding" class="ml-2 mr-auto w-max flex-middle rounded-2xl rounded-bl-none bg-indigo-500 p-2">
        <i class="i-svg-spinners:3-dots-fade mx-4 size-5" />
      </p>
    </div>
    <div class="flex flex-col gap-4">
      <div class="flex grow flex-col gap-2" @keypress.enter="sendMessage">
        <label for="message" class="text-xs opacity-50">
          Message talking with {{ selectedModel }}
        </label>
        <textarea v-model="newMessage" type="text" placeholder="Type your message" class="border-slat-900 w-full grow border rounded rounded-lg bg-emerald-100/10 p-2 text-emerald-700" />
      </div>
      <button class="rounded bg-indigo-300 text-indigo-800 font-bold px-4 py-2" type="button" @click="sendMessage">
        <i class="i-ri:send-plane-fill" />
        Send
      </button>
    </div>
  </section>
</template>

<style scoped>
/* https://twitter.com/wesbos/status/1735729524069827044 */
textarea {
  field-sizing: content;
}
</style>
