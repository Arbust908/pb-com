<script setup lang="ts">
interface Props {
  modelValue: {
    en?: Record<string, string | undefined>
    es?: Record<string, string | undefined>
  }
  fields: { key: string; label: string; type?: 'input' | 'textarea' }[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: typeof props.modelValue]
}>()

function updateField(locale: 'en' | 'es', field: string, value: string) {
  const newValue = {
    ...props.modelValue,
    [locale]: {
      ...props.modelValue[locale],
      [field]: value,
    },
  }
  emit('update:modelValue', newValue)
}
</script>

<template>
  <div class="space-y-4">
    <div v-for="field in fields" :key="field.key" class="space-y-2">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {{ field.label }}
      </label>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <!-- English -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">English</label>
          <input
            v-if="!field.type || field.type === 'input'"
            type="text"
            :value="modelValue.en?.[field.key] || ''"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border dark:bg-gray-800 dark:border-gray-600"
            :placeholder="`${field.label} (EN)`"
            @input="updateField('en', field.key, ($event.target as HTMLInputElement).value)"
          />
          <textarea
            v-else
            :value="modelValue.en?.[field.key] || ''"
            rows="4"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border dark:bg-gray-800 dark:border-gray-600"
            :placeholder="`${field.label} (EN)`"
            @input="updateField('en', field.key, ($event.target as HTMLTextAreaElement).value)"
          />
        </div>
        <!-- Spanish -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Espanol</label>
          <input
            v-if="!field.type || field.type === 'input'"
            type="text"
            :value="modelValue.es?.[field.key] || ''"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border dark:bg-gray-800 dark:border-gray-600"
            :placeholder="`${field.label} (ES)`"
            @input="updateField('es', field.key, ($event.target as HTMLInputElement).value)"
          />
          <textarea
            v-else
            :value="modelValue.es?.[field.key] || ''"
            rows="4"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border dark:bg-gray-800 dark:border-gray-600"
            :placeholder="`${field.label} (ES)`"
            @input="updateField('es', field.key, ($event.target as HTMLTextAreaElement).value)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
