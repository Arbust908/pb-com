<script lang="ts" setup>
import { formatFileSize } from '@/utils'

const {
  models,
    selectedModel,
    selectModel,
    messages,
    newMessage,
    isResponding,
    sendMessage,
    getModels,
    ROLE_STYLES,
    CHAT_STRUCTURE,
    toggleChatStructure,
} = useChat()



const modelDisplayName = computed(() => {
  if (!selectedModel.value) return 'Missing Name'

  if (CHAT_STRUCTURE.value === 'ollama')
    return modelToDisplayName(selectedModel.value.name)
  else
    return 'Open Router'

  return ''
})

function onSubmit() {
  console.log('onSubmit')
  console.log(CHAT_STRUCTURE.value)
  sendMessage(CHAT_STRUCTURE.value)
}

const openModal = ref(false)
const toggleModal = useToggle(openModal)
function onOpenModal() { toggleModal(true) }

</script>

<template>
  <section class="flex flex-col p-4">
    <header>
      <h2 class="text-2xl font-bold capitalize">
        {{ CHAT_STRUCTURE }}
      </h2>
    </header>
    <div class="flex grow flex-col pb-4 space-y-3">
      <div class="grow" />
      <p
        v-for="message in messages" :key="message.id" class="max-w-[calc(100%-4px)] w-max rounded-2xl p-2"
        :class="ROLE_STYLES[message.role]"
      >
        {{ message.text }}
      </p>
      <p v-if="isResponding" class="mr-auto w-max flex-middle rounded-2xl rounded-bl-none bg-indigo-500 p-2 -ml-2">
        <i class="i-svg-spinners:3-dots-fade mx-4 size-5" />
      </p>
    </div>
    <div class="flex flex-row items-end gap-4">
      <nav class="flex flex-col gap-4">
        <button
          type="button" class="size-8 flex-middle rounded p-1 transition duration-150 hover:(bg-purple-600)"
          @click="toggleChatStructure"
        >
          <i class="i-solar:refresh-square-bold-duotone" />
        </button>
        <button
          type="button" class="size-8 flex-middle rounded p-1 transition duration-150 hover:(bg-purple-600)"
          @click="onOpenModal"
        >
          <i class="i-solar:settings-minimalistic-bold-duotone" />
        </button>
      </nav>
      <div class="flex grow flex-col gap-2" @keypress.enter="onSubmit">
        <label for="message" class="text-xs opacity-50">
          Message talking with
          <span class="font-bold">
            {{ modelDisplayName }}
          </span>
        </label>
        <textarea
          v-model="newMessage" type="text" placeholder="Type your message"
          class="border-slat-900 w-full grow border rounded rounded-lg bg-emerald-100/10 p-2 text-emerald-100"
        />
      </div>

      <button
        class="flex flex-col items-center gap-2 rounded bg-indigo-300 p-2 text-indigo-800 font-bold" type="button"
        @click="onSubmit"
      >
        <i class="i-solar:plain-bold-duotone size-5" />
      </button>
    </div>
    <Teleport to="body">
      <div v-show="openModal" class="fixed inset-0 z-40 flex-middle">
        <aside class="modal-cloak fixed inset-0 z-0 bg-slate-600/25" @click="openModal = false" />
        <section
          class="z-10 grid grid-cols-1 gap-4 border border-slate-200 rounded bg-slate-100 p-4 text-slate-700 shadow md:grid-cols-3 sm:grid-cols-2"
        >
          <h2 class="col-span-full text-2xl font-bold">
            Select Model
          </h2>
          <button
            v-for="model in models" :key="model.name"
            class="border rounded p-2 text-left ring-0 ring-purple-500 transition duration-150 ease-in-out space-y-1"
            :class="model === selectedModel ? 'border-purple-500 ring-3 ring-purple-600' : 'border-slate-200 hover:(ring-3)'"
            @click="selectModel(model)"
          >
            <h3 class="font-bold">
              {{ modelToDisplayName(model.name) }}
            </h3>
            <p class="text-xs text-slate-500">
              {{ specialModelText(model.name) }}
            </p>
            <p class="text-xs text-slate-500">
              <span class="text-[0.75em] text-slate-400">
                Size
              </span>
              {{ formatFileSize(model.size) }}
            </p>
            <p class="text-xs text-slate-500">
              <span class="text-[0.75em] text-slate-400">
                Context
              </span>
              {{ model.details.parameter_size }}
            </p>
          </button>
          <button
            class="border border-rose-200 rounded text-rose-300 ring-0 ring-rose-600 transition duration-150 ease-in-out -col-start-2 hover:(bg-rose-500 ring-2)"
            @click="openModal = false"
          >
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
