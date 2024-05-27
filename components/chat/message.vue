<script setup lang="ts">
import type { ChatMessage } from '@/types'
type Props = ChatMessage & ({
  isResponding?: boolean
})
const props = defineProps<Props>()

const {
  selectedModel,
} = useChat()
const isUser = computed(() => props.role === 'user')
const avatar = computed(() => isUser.value 
  ? '/pb-favicon-dark.png'
  : 'https://ollama.com/public/ollama.png'
)
const timeAgo = useTimeAgo(props.timestamp || new Date())
</script>

<template>
  <article class="flex items-start gap-2.5" :class="isUser && 'flex-row-reverse text-right'">
    <img class="w-8 h-8 rounded bg-slate-1 object-contain object-top-center" :src="avatar" :alt="`Avatar for ${role}`">
    <div class="flex flex-col w-full max-w-[320px] leading-1.5">
      <span class="text-xs font-normal text-gray-500 dark:text-gray-400">{{ timeAgo }}</span>
      <i v-if="!isUser && isResponding" class="i-svg-spinners:3-dots-fade mx-4 size-5" />
      <p v-else class="text-sm font-normal pb-2 text-gray-900 dark:text-white">
        {{ text }}
      </p>
    </div>
  </article>
</template>
