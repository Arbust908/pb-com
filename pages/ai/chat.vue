<template>
  <div class="grid grid-cols-[220px_1fr_220px] h-full max-w-full overflow-clip">
    <aside class="bg-zinc-9 p-4">Left Nav</aside>
    <main class="border-x-3 border-black px-4" >Main</main>
    <aside class="px-2 py-4 grid gap-4 items-start content-start bg-zinc-9 bg-opacity-40 backdrop-blur-xs">
      <section v-for="chatModels in groupedChatModels" :key="chatModels.name" class="p-2 border-3 border-black rounded bg-amber-2 grid">
        <h2 class="font-bold text-sm text-amber-7 break-all">
          {{ chatModels.name }}
          <span class="text-xs opacity-50">
            ({{ chatModels.models.length }})
          </span>
          <span class="text-xs opacity-50">
            {{ chatModels.hasFreeModels ? 'free' : '' }}
          </span>
        </h2>
        <article v-for="model in chatModels.models" class="p-2 border-3 border-black rounded bg-amber-2 grid" data-model-id="model.id">
          <details class="font-bold text-sm text-amber-7 break-all">
            <summary class="text-xs opacity-50">
            <h3>{{ model.name }}</h3>
          </summary>
              <p class="text-sm text-gray-500 break-all">
                {{ model.description }}
              </p>
          </details>
          <p class="text-sm text-gray-500">
            <span class="text-xs opacity-50">
              Prompt
            </span>
            {{ model.pricing.prompt }}
          </p>
          <p class="text-sm text-gray-500">
            <span class="text-xs opacity-50">
              Completion
            </span>
            {{ model.pricing.completion }}
          </p>
        </article>
      </section>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { type GroupedOpenRouterModels, type OpenRouterModel } from "~/types"

const { data: chatModels } = await useAsyncData('chat-models', () => $fetch('/api/ai/open_router/models'))

const groupedChatModels = computed(() => {
  return chatModels.value
    .reduce((acc: GroupedOpenRouterModels[], model: OpenRouterModel) => {
      const groupName = model.name.split(':')[0]
      const isFree = model.name.includes('(free)')
      let groupObj = acc.find(group => group.name === groupName)
      if (!groupObj) {
        groupObj = ({ name: groupName, models: [model], hasFreeModels: isFree })
        acc.push(groupObj)
        return acc
      }
      // always keep free models at the front of the array
      if (isFree) {
        groupObj.models.unshift(model)
        groupObj.hasFreeModels = true
      } else
        groupObj.models.push(model)

      return acc
    }, [] as GroupedOpenRouterModels[])
    .sort((a: GroupedOpenRouterModels, b: GroupedOpenRouterModels) => {
      if (a.hasFreeModels === b.hasFreeModels) return 0
      if (a.hasFreeModels) return -1
      if (b.hasFreeModels) return 1
    })
})

definePageMeta({
  // middleware: ['auth'],
  layout: "auth",
  title: 'AI Chat :: Pancho Blanco',
})
</script>
