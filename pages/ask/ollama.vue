<script lang="ts" setup>
import type { ModelResponse } from 'ollama';
import { formatFileSize } from '@/utils'

const {
  modelToDisplayName,
  specialModelText,
} = useOllama()

const {
  models,
  selectedModel,
  selectModel,
  messages,
  newMessage,
  isResponding,
  sendMessage,
  getModels,
} = useChat()

const roleClasses = {
  user: 'bg-emerald-500 -mr-2 ml-auto rounded-br-none',
  model: 'bg-indigo-500 -ml-2 mr-auto rounded-bl-none',
  error: 'bg-red-100 mx-auto rounded-md text-red-500 text-center text-xs font-bold',
}

const modelDisplayName = computed(() => {
  if (selectedModel.value) {
    return modelToDisplayName(selectedModel.value.name)
  }
  return ''
})

function onSubmit() {
  console.log('onSubmit')
  console.log(chatStructure.value)
  sendMessage(chatStructure.value)
}

const openModal = ref(false)
const toggleModal = useToggle(openModal)
const onOpenModal = () => { toggleModal(true) }

const chatStructure = ref<'ollama' | 'openRouter'>('ollama')
const toggleChatStructure = () => {
  chatStructure.value = chatStructure.value === 'ollama' ? 'openRouter' : 'ollama'
}

onMounted(async () => {
  await getModels('ollama')
  console.log('models', models.value)
  selectModel(models.value[0])
})
</script>

<template>
  <section class="flex flex-col p-4">
    <header>
      <h2 class="text-2xl font-bold capitalize">{{ chatStructure }}</h2>
    </header>
    <div class="flex grow flex-col pb-4 space-y-3">
      <div class="grow" />
      <p v-for="message in messages" :key="message.id" class="max-w-[calc(100%-4px)] w-max rounded-2xl p-2"
        :class="roleClasses[message.role]">
        {{ message.text }}
      </p>
      <p v-if="isResponding" class="-ml-2 mr-auto w-max flex-middle rounded-2xl rounded-bl-none bg-indigo-500 p-2">
        <i class="i-svg-spinners:3-dots-fade mx-4 size-5" />
      </p>
    </div>
    <div class="flex flex-row gap-4 items-end">
      <nav class="flex flex-col gap-4">
        <button type="button" @click="toggleChatStructure"
          class="transition duration-150 p-1 rounded size-8 flex-middle hover:(bg-purple-600)">
          <i class="i-ri:refresh-line" />
        </button>
        <button type="button" @click="onOpenModal"
          class="transition duration-150 p-1 rounded size-8 flex-middle hover:(bg-purple-600)">
          <i class="i-ri:settings-3-line" />
        </button>
      </nav>
      <div class="flex grow flex-col gap-2" @keypress.enter="onSubmit">
        <label for="message" class="text-xs opacity-50">
          Message talking with
          <span class="font-bold">
            {{ modelDisplayName }}
          </span>
        </label>
        <textarea v-model="newMessage" type="text" placeholder="Type your message"
          class="border-slat-900 w-full grow border rounded rounded-lg bg-emerald-100/10 p-2 text-emerald-100" />
      </div>

      <button class="rounded bg-indigo-300 text-indigo-800 font-bold p-2 flex flex-col items-center gap-2" type="button"
        @click="onSubmit">
        <i class="i-ri:send-plane-fill size-5" />
      </button>
    </div>
    <Teleport to="body">
      <div v-show="openModal" class="fixed inset-0 z-40 flex-middle">
        <aside class="bg-slate-600/25 modal-cloak fixed inset-0 z-0" @click="openModal = false" />
        <section
          class="rounded bg-slate-100 border border-slate-200 shadow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 z-10 text-slate-700 p-4">
          <h2 class="col-span-full text-2xl font-bold">Select Model</h2>
          <button v-for="model in models" :key="model.name"
            class="rounded border p-2 space-y-1 transition duration-150 ease-in-out text-left ring-0 ring-purple-500"
            :class="model === selectedModel ? 'border-purple-500 ring-3 ring-purple-600' : 'border-slate-200 hover:(ring-3)'"
            @click="selectModel(model)">
            <h3 class="font-bold">{{ modelToDisplayName(model.name) }}</h3>
            <p class="text-xs text-slate-500">{{ specialModelText(model.name) }}</p>
            <p class="text-xs text-slate-500">
              <span class="text-slate-400 text-[0.75em]">
                Size
              </span>
              {{ formatFileSize(model.size) }}
            </p>
            <p class="text-xs text-slate-500">
              <span class="text-slate-400 text-[0.75em]">
                Context
              </span>
              {{ model.details.parameter_size }}
            </p>
          </button>
          <button
            class="-col-start-2 rounded border border-rose-200 text-rose-300 ring-0 ring-rose-600 transition duration-150 ease-in-out hover:(bg-rose-500 ring-2)"
            @click="openModal = false">
            close
          </button>
        </section>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
/* https://twitter.com/wesbos/status/1735729524069827044 */
/* textarea { field-sizing: content; } */
.modal-cloak {
  backdrop-filter: blur(6px);
}
</style>
