<script lang="ts" setup>
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
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
const openModal = ref(false)

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
      const data = await $fetch<AI_MODEL_RESPONSE>('/api/assistant', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

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
      <p v-for="message in messages" :key="message.id" class="max-w-[calc(100%-4px)] w-max rounded-2xl p-2" :class="message.role === 'user' ? 'bg-emerald-500 mr-2 ml-auto rounded-br-none' : 'bg-rose-500 ml-2 mr-auto rounded-bl-none'">
        {{ message.text }}
      </p>
      <p v-if="isResponding" class="ml-2 mr-auto w-max flex-middle rounded-2xl rounded-bl-none bg-rose-500 p-2">
        <i class="i-svg-spinners:3-dots-fade mx-4 size-5" />
      </p>
    </div>
    <div class="flex justify-between gap-4">
      <button type="button" @click="openModal = true">
        <i class="i-ri:list-settings-fill size-5 text-slate-500" />
      </button>
      <div class="flex grow flex-col gap-2" @keypress.enter="sendMessage">
        <label for="message" class="text-xs opacity-50">
          Message talking with {{ selectedModel }}
        </label>
        <textarea v-model="newMessage" type="text" placeholder="Type your message" class="border-slat-900 w-full grow border rounded rounded-lg bg-emerald-100/10 p-2 text-emerald-700" />
      </div>
    </div>
    <LazyUiModal v-model:should-open="openModal" title="Settings">
      <div class="flex flex-col gap-4">
        <div class="flex justify-between">
          <h2 class="text-xl">
            Model
          </h2>
          <select v-model="selectedModel" class="border border-slate-200 rounded bg-transparent p-2">
            <option v-for="model in models" :key="model" :value="model">
              {{ model }}
            </option>
          </select>
          <Listbox v-model="selectedModel" as="div">
            <ListboxLabel class="block text-sm text-gray-900 font-medium leading-6">
              Assigned to
            </ListboxLabel>
            <div class="relative mt-2">
              <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset sm:text-sm sm:leading-6 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <span class="w-full inline-flex truncate">
                  <span class="truncate">{{ selectedModel }}</span>
                  <span class="ml-2 truncate text-gray-500">secundary</span>
                </span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <i class="i-ri:expand-up-down-line size-5 text-gray-400" aria-hidden="true" />
                </span>
              </ListboxButton>

              <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm focus:outline-none">
                  <ListboxOption v-for="model in models" :key="model" v-slot="{ active, selected }" as="template" :value="model">
                    <li class="relative cursor-default select-none py-2 pl-3 pr-9" :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
                      <div class="flex">
                        <span class="truncate" :class="[selected ? 'font-semibold' : 'font-normal']">{{ model }}</span>
                        <span class="ml-2 truncate" :class="[active ? 'text-indigo-200' : 'text-gray-500']">secondary</span>
                      </div>

                      <span v-if="selected" class="absolute inset-y-0 right-0 flex items-center pr-4" :class="[active ? 'text-white' : 'text-indigo-600']">
                        <i class="i-ri:check-fill size-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>
      </div>
    </LazyUiModal>
  </section>
</template>

<style scoped>
/* https://twitter.com/wesbos/status/1735729524069827044 */
textarea {
  field-sizing: content;
}
</style>
