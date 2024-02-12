<script lang="ts" setup>
import type { AI_MODEL_REQUEST_CLIENT, AI_MODEL_RESPONSE, ChatMessage, MODEL_TYPES } from '@/types'
import { allowedModels } from '@/types'
import { getNewId, getResponseMsg } from '@/utils'

const selectedModel = ref<MODEL_TYPES>(allowedModels.CAPYBARA)

const messages = ref<ChatMessage[]>([])
const newMessage = ref('')
const isResponding = ref(false)
const openModal = ref(false)

async function sendMessage() {
  console.log('sendMessage')
  isResponding.value = true
  if (newMessage.value) {
    const newMsg = { id: getNewId(messages.value), message: newMessage.value, role: 'user' }
    console.log('newMessage', newMsg)
    console.log(messages.value)
    messages.value.push(newMsg)
    const payload = {
      message: newMessage.value,
      model: selectedModel.value,
    } satisfies AI_MODEL_REQUEST_CLIENT
    try {
      console.log('try')
      const data = await $fetch<AI_MODEL_RESPONSE>('/api/assistant', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      console.log('data', data)
      messages.value.push({ id: data.id, message: getResponseMsg(data), role: 'model' })
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
    <div class="grow" />
    <ChatMessages :messages="messages" :is-responding="isResponding" />
    <div class="flex gap-2" @keypress.enter="sendMessage">
      <textarea
        v-model="newMessage" type="text" placeholder="Type your message"
        class="border-slat-900 w-full grow border rounded rounded-lg bg-emerald-100/10 p-2 text-emerald-700"
      />
      <button
        type="submit"
        :disabled="!newMessage || isResponding"
        class="inline-flex items-center gap-x-2 rounded-lg bg-blue-600 px-3.5 py-2.5 text-center text-sm text-slate-50 font-medium disabled:(cursor-not-allowed bg-blue-200 text-slate-400 hover:bg-blue-200 hover:text-slate-400) hover:bg-blue-800 focus:(outline-none ring ring-blue-300)"
        @click="sendMessage"
      >
        <i v-if="isResponding" class="i-svg-spinners:180-ring-with-bg" />
        <i v-else class="i-ri:send-plane-fill" />
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
