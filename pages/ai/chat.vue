<template>
  <LayoutAi>
    <template #sidebar-left>
      <ChatHistorySidebar />
    </template>
    <template #main>
      <ChatMain />
    </template>
    <template #sidebar-right>
      <ChatRightSidebar />
    </template>
  </LayoutAi>
</template>

<script setup lang="ts">
import LayoutAi from '@/layouts/ai.vue';
import ChatHistorySidebar from '@/components/chat/ChatHistorySidebar.vue';
import ChatMain from '@/components/chat/ChatMain.vue';
import ChatRightSidebar from '@/components/chat/ChatRightSidebar.vue';

definePageMeta({
  // middleware: ['auth'],
  layout: "none",
  title: 'AI Chat :: Pancho Blanco',
})
</script>

<style scoped>
</style>
