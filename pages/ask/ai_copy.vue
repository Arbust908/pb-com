<script lang="ts" setup>
definePageMeta({
  // middleware: ['auth'],
  layout: "auth",
  title: 'Ask AI :: Pancho Blanco',
})
const {
  models,
    selectedModel,
    selectModel,
    messages,
    newMessage,
    isResponding,
    sendMessage,
    ROLE_STYLES,
    CHAT_STRUCTURE,
    toggleChatStructure,
    modelDisplayName,
    modelModalText,
    formatModelInfo,
    isOpenRouterFreeModel,
    openRouterGroups,
} = useChat()

function onSubmit() {
  sendMessage(CHAT_STRUCTURE.value)
}

const searchValue = ref('')
const showFreeModels = ref(true)
const dateOrder = ref<'asc' | 'desc'>('desc')
const groups = computed(() => {
  return openRouterGroups(models.value)
})

const shownModels = computed(() => {
  let _models = models.value
  if (showFreeModels.value) {
    _models = _models.filter(model => isOpenRouterFreeModel(model))
  }
  if (searchValue.value) {
    _models = _models.filter(model => {
      return model.name.toLowerCase().includes(searchValue.value.toLowerCase())
    })
  }
  return _models.sort((a, b) => {
    if (dateOrder.value === 'asc') {
      return a?.created - b?.created
    } else {
      return b?.created - a?.created
    }
  })
})

const openModal = ref(false)
const toggleModal = useToggle(openModal)
function onOpenModal() { toggleModal(true) }
</script>

<template>
  <section class="grid p-4 chat-layout h-full max-h-full">
    <ChatMessages :messages="messages" :is-responding="isResponding" />
    <div class="flex gap-2 area-input">
      <nav class="flex flex-col gap-4 self-end">
        <button type="button" class="flex-middle rounded p-1 transition duration-150 hover:(bg-violet-8)"
          @click="toggleChatStructure">
          <i class="i-solar:refresh-square-bold-duotone size-6" />
        </button>
        <button type="button" class="flex-middle rounded p-1 transition duration-150 hover:(bg-violet-8)"
          @click="onOpenModal">
          <i class="i-solar:settings-minimalistic-bold-duotone size-6" />
        </button>
      </nav>
      <div class="flex grow flex-col gap-2" @keypress.enter="onSubmit">
        <label for="message" class="text-xs opacity-50">
          Talking to
          <span class="font-bold">
            {{ modelDisplayName }}
          </span>
          <span class="opacity-50">
            via {{ CHAT_STRUCTURE }}
          </span>
        </label>
        <textarea v-model="newMessage" type="text" placeholder="Type your message"
          class="border-slate-800 w-full grow border rounded rounded-lg bg-transparent p-2 text-slate-2" />
      </div>
      <button
        class="flex flex-col flex-middle self-end aspect-ratio-1/2 gap-2 rounded bg-violet-300 p-2 text-violet-800 font-bold"
        type="button" @click="onSubmit">
        <i class="i-solar:plain-bold-duotone size-5" />
      </button>
    </div>
    <Teleport to=".modal__layer">
      <div v-show="openModal" class="fixed inset-0 z-40 flex-middle">
        <aside class="modal-cloak fixed inset-0 z-0 bg-slate-600/25 backdrop-blur" @click="toggleModal(false)" />
        <section
          class="z-10 grid grid-cols-1 gap-4 border border-slate-6 rounded bg-slate-7 py-4 text-slate-300 shadow md:grid-cols-3 sm:grid-cols-2 h-full max-h-[80vh] scrollbar-gutter-stable-both overflow-y-scroll w-full max-w-sm md:max-w-[80%] mx-auto"
        >
          <h2 class="col-span-full text-2xl font-bold">
            Select Model
          </h2>
          <button
            v-for="model in shownModels" :key="model.name"
            class="border rounded p-2 text-left ring-0 ring-violet-500 transition duration-150 ease-in-out space-y-1"
            :class="model === selectedModel ? 'border-violet-500 ring-3 ring-violet-600' : 'border-slate-200 hover:(ring-3)'"
            @click="selectModel(model)"
          >
            <h3 class="font-bold">
              {{ formatModelInfo(model).displayName }}
            </h3>
            <p class="text-xs text-slate-500">
              {{ formatModelInfo(model).specialText }}
            </p>
            <p v-if="model.size" class="text-xs text-slate-500">
              <span class="text-[0.75em] text-slate-400">
                Size
              </span>
              {{ formatFileSize(model.size) }}
            </p>
            <p v-if="model.parameter_size" class="text-xs text-slate-500">
              <span class="text-[0.75em] text-slate-400">
                Context
              </span>
              {{ model.parameter_size }}
            </p>
          </button>
          <button
            class="border border-rose-200 rounded text-rose-300 ring-0 ring-rose-600 transition duration-150 ease-in-out -col-start-2 hover:(bg-rose-500 ring-2)"
            @click="toggleModal(false)"
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
/* textarea {
  field-sizing: content;
} */

.chat-layout {
  grid-template-rows: [chat-start] 1fr [chat-end input-start] 200px [input-end];
  grid-template-columns: [chat-start input-start] 1fr [chat-end input-end];
}

.area-input {
  grid-area: input;
}
</style>
