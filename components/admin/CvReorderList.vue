<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'

interface Item {
  id: number
  [key: string]: unknown
}

interface Props {
  items: Item[]
  labelKey: string
  sublabelKey?: string
  loading?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  edit: [item: Item]
  delete: [item: Item]
  reorder: [orderedIds: number[]]
}>()

const localItems = ref<Item[]>([])

watch(
  () => props.items,
  (newItems) => {
    localItems.value = [...newItems]
  },
  { immediate: true }
)

function getLabel(item: Item): string {
  return String(item[props.labelKey] || '')
}

function getSublabel(item: Item): string {
  if (!props.sublabelKey) return ''
  return String(item[props.sublabelKey] || '')
}

function handleDragEnd() {
  const orderedIds = localItems.value.map((item) => item.id)
  emit('reorder', orderedIds)
}
</script>

<template>
  <div class="bg-white dark:bg-gray-900 shadow overflow-hidden sm:rounded-md">
    <div v-if="loading && !items.length" class="p-6 text-center text-gray-500">
      Loading...
    </div>
    <div v-else-if="!items.length" class="p-6 text-center text-gray-500">
      No items found. Add your first item!
    </div>
    <VueDraggable
      v-else
      v-model="localItems"
      tag="ul"
      class="divide-y divide-gray-200 dark:divide-gray-700"
      handle=".drag-handle"
      @end="handleDragEnd"
    >
      <li
        v-for="item in localItems"
        :key="item.id"
        class="px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-3"
      >
        <!-- Drag handle -->
        <div class="drag-handle cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="8" y1="6" x2="8" y2="6" />
            <line x1="16" y1="6" x2="16" y2="6" />
            <line x1="8" y1="12" x2="8" y2="12" />
            <line x1="16" y1="12" x2="16" y2="12" />
            <line x1="8" y1="18" x2="8" y2="18" />
            <line x1="16" y1="18" x2="16" y2="18" />
            <circle cx="8" cy="6" r="1.5" fill="currentColor" />
            <circle cx="16" cy="6" r="1.5" fill="currentColor" />
            <circle cx="8" cy="12" r="1.5" fill="currentColor" />
            <circle cx="16" cy="12" r="1.5" fill="currentColor" />
            <circle cx="8" cy="18" r="1.5" fill="currentColor" />
            <circle cx="16" cy="18" r="1.5" fill="currentColor" />
          </svg>
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <h3 class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
            {{ getLabel(item) }}
          </h3>
          <p v-if="sublabelKey" class="text-sm text-gray-500 dark:text-gray-400 truncate">
            {{ getSublabel(item) }}
          </p>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium text-sm"
            @click="emit('edit', item)"
          >
            Edit
          </button>
          <button
            type="button"
            class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 font-medium text-sm"
            @click="emit('delete', item)"
          >
            Delete
          </button>
        </div>
      </li>
    </VueDraggable>
  </div>
</template>
