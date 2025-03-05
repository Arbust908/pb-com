<script lang="ts" setup>
definePageMeta({
  // middleware: ['auth'],
  layout: "auth",
  title: 'Ask AI :: Pancho Blanco',
})

const messages = ref([
  { id: 9895299, message: 'Hello', sender: 'user', timestamp: new Date() },
  { id: 9895899, message: 'Hello', sender: 'model', timestamp: new Date() },
  { id: 9895200, message: 'Hello', sender: 'system', timestamp: new Date() },
])
</script>

<template>
  <section class="grid grid-cols-[240px_1fr_240px] h-full max-h-full">
    <aside class="bg-zinc-8 border-r-3 border-black p-2">
      <article class="p-4 border-3 border-black rounded">
        <h2>
          <span>Model Name</span>
          <span class="text-zinc-3">by Company</span>
        </h2>
      </article>
    </aside>
    <article class="bg-zinc-9 bg-opacity-9 backdrop-blur-sm">
      <div class="max-w-[600px] mx-auto">
        <div v-for="message in messages" :key="message.id" class="text-sm">
          <p>
            {{ message.message }}
          </p>
            <span class="text-zinc-3">
              {{ useTimeAgo(message.timestamp) }}
            </span>
        </div>
      </div>
    </article>
    <aside class="bg-zinc-9 bg-opacity-9 backdrop-blur-sm"></aside>
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
