<script setup lang="ts">
const messages = ref<Array<{ text: string, type: 'user' | 'bot' }>>([]);
const input = ref('');
const isLoading = ref(false);

const sendMessage = async () => {
  if (!input.value.trim()) return;
  
  // Add user message
  messages.value.push({ text: input.value, type: 'user' });
  const userInput = input.value;
  input.value = '';
  
  try {
    isLoading.value = true;
    
    const { data } = await useFetch('/api/chat', {
      method: 'POST',
      body: {
        message: userInput,
        history: messages.value.slice(-4), // Send last 4 messages as context
      },
    });

    // Add bot messages with delays
    const parsedMessages = data.value.messages;
    for (const [index, msg] of parsedMessages.entries()) {
      await new Promise(resolve => setTimeout(resolve, index * 800));
      messages.value.push({ text: msg, type: 'bot' });
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="h-screen flex flex-col">
    <UCard class="flex-1 overflow-auto">
      <div v-for="(msg, idx) in messages" :key="idx" class="mb-4">
        <UBadge 
          :color="msg.type === 'user' ? 'primary' : 'gray'" 
          class="max-w-[80%]"
          :ui="{ rounded: 'rounded-lg' }"
        >
          {{ msg.text }}
        </UBadge>
      </div>
      
      <div v-if="isLoading" class="flex items-center gap-2 text-gray-500">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin h-4 w-4" />
        <span>Thinking...</span>
      </div>
    </UCard>

    <form @submit.prevent="sendMessage" class="mt-4 flex gap-2">
      <UInput 
        v-model="input" 
        placeholder="Type your message..." 
        class="flex-1"
        :disabled="isLoading"
      />
      <UButton type="submit" :disabled="isLoading">
        Send
      </UButton>
    </form>
  </div>
</template>