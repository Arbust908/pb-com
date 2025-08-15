<script setup lang="ts">
import { ref } from 'vue'

// Protect the page
definePageMeta({
  middleware: 'auth'
})

// Use the holidays composable
const { holidays, loading, error, fetchHolidays, createHoliday, updateHoliday, deleteHoliday } = useHolidays()

// Form state
const showForm = ref(false)
const editingHoliday = ref<any>(null)
const formData = ref({
  name: '',
  date: '',
  endDate: ''
})

// UI state
const successMessage = ref('')
const errorMessage = ref('')

// Initialize holidays on mount
onMounted(async () => {
  await fetchHolidays()
})

// Form handlers
const resetForm = () => {
  formData.value = {
    name: '',
    date: '',
    endDate: ''
  }
  editingHoliday.value = null
  showForm.value = false
}

const openCreateForm = () => {
  resetForm()
  showForm.value = true
}

const openEditForm = (holiday: any) => {
  editingHoliday.value = holiday
  formData.value = {
    name: holiday.name,
    date: holiday.date,
    endDate: holiday.endDate || ''
  }
  showForm.value = true
}

watch(showForm, (newValue) => {
  if (newValue) {
    // scroll to the top when form is shown
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

const handleSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    const data = {
      name: formData.value.name,
      date: formData.value.date,
      endDate: formData.value.endDate || undefined
    }
    
    if (editingHoliday.value) {
      await updateHoliday(editingHoliday.value.id, data)
      successMessage.value = 'Holiday updated successfully!'
    } else {
      await createHoliday(data)
      successMessage.value = 'Holiday created successfully!'
    }
    
    resetForm()
    setTimeout(() => successMessage.value = '', 3000)
  } catch (err: any) {
    errorMessage.value = err.data?.statusMessage || 'An error occurred'
    setTimeout(() => errorMessage.value = '', 5000)
  }
}

const handleDelete = async (id: number) => {
  if (!confirm('Are you sure you want to delete this holiday?')) return
  
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    await deleteHoliday(id)
    successMessage.value = 'Holiday deleted successfully!'
    setTimeout(() => successMessage.value = '', 3000)
  } catch (err: any) {
    errorMessage.value = err.data?.statusMessage || 'Failed to delete holiday'
    setTimeout(() => errorMessage.value = '', 5000)
  }
}

// Format date for display
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-800 !grid-area-[feature] py-8">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Holiday Management</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">Manage holidays for the widget</p>
      </div>

      <!-- Messages -->
      <div v-if="successMessage" class="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 dark:bg-green-900 dark:border-green-800 dark:text-green-300 rounded">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage || error" class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 dark:bg-red-900 dark:border-red-800 dark:text-red-300 rounded">
        {{ errorMessage || error }}
      </div>

      <!-- Add/Edit Form -->
      <div v-if="showForm" class="mb-8 bg-white dark:bg-gray-900 shadow rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">
          {{ editingHoliday ? 'Edit Holiday' : 'Add New Holiday' }}
        </h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-400">Name *</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
              placeholder="Holiday name"
            />
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="date" class="block text-sm font-medium text-gray-700 dark:text-gray-400">Date *</label>
              <input
                id="date"
                v-model="formData.date"
                type="date"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
              />
            </div>
            
            <div>
              <label for="endDate" class="block text-sm font-medium text-gray-700">End Date (optional)</label>
              <input
                id="endDate"
                v-model="formData.endDate"
                type="date"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
              />
            </div>
          </div>
          
          <div class="flex gap-2">
            <button
              type="submit"
              :disabled="loading"
              class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {{ loading ? 'Saving...' : (editingHoliday ? 'Update' : 'Create') }}
            </button>
            <button
              type="button"
              @click="resetForm"
              class="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- Add Button -->
      <div v-if="!showForm" class="mb-6">
        <button
          @click="openCreateForm"
          class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <svg class="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Add Holiday
        </button>
      </div>

      <!-- Holidays List -->
      <div class="bg-white dark:bg-gray-900 shadow overflow-hidden sm:rounded-md">
        <div v-if="loading && !holidays.length" class="p-6 text-center text-gray-500">
          Loading holidays...
        </div>
        <div v-else-if="!holidays.length" class="p-6 text-center text-gray-500">
          No holidays found. Add your first holiday!
        </div>
        <ul v-else class="grid grid-cols-1 md:grid-cols-2 gap-2 p-4">
          <li v-for="holiday in holidays" :key="holiday.id" class="px-6 py-4 hover:bg-gray-50 border dark:border-gray-700 dark:hover:bg-gray-800 rounded">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">{{ holiday.name }}</h3>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(holiday.date) }}
                  <span v-if="holiday.endDate">
                    - {{ formatDate(holiday.endDate) }}
                  </span>
                </p>
              </div>
              <div class="flex items-center gap-2">
                <button
                  @click="openEditForm(holiday)"
                  class="text-indigo-600 hover:text-indigo-900 font-medium text-sm"
                >
                  Edit
                </button>
                <button
                  @click="handleDelete(holiday.id!)"
                  class="text-red-600 hover:text-red-900 font-medium text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Back to Widget Link -->
      <div class="mt-8 text-center">
        <NuxtLink
          to="/widget/next_observed"
          class="text-indigo-600 hover:text-indigo-900 font-medium"
        >
          View Holiday Widget →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
