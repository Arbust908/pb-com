<script setup lang="ts">
import { ref } from 'vue'

// Protect the page
definePageMeta({
  middleware: 'auth',
})

// Use the holidays composable
const { holidays, loading, error, fetchHolidays, createHoliday, updateHoliday, deleteHoliday } = useHolidays()

// Form state
const showForm = ref(false)
const editingHoliday = ref<any>(null)
const formData = ref({
  name: '',
  date: '',
  endDate: '',
})

// UI state
const successMessage = ref('')
const errorMessage = ref('')

// Initialize holidays on mount
onMounted(async () => {
  await fetchHolidays()
})

// Form handlers
function resetForm() {
  formData.value = {
    name: '',
    date: '',
    endDate: '',
  }
  editingHoliday.value = null
  showForm.value = false
}

function openCreateForm() {
  resetForm()
  showForm.value = true
}

function openEditForm(holiday: any) {
  editingHoliday.value = holiday
  formData.value = {
    name: holiday.name,
    date: holiday.date,
    endDate: holiday.endDate || '',
  }
  showForm.value = true
}

watch(showForm, (newValue) => {
  if (newValue) {
    // scroll to the top when form is shown
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

async function handleSubmit() {
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const data = {
      name: formData.value.name,
      date: formData.value.date,
      endDate: formData.value.endDate || undefined,
    }

    if (editingHoliday.value) {
      await updateHoliday(editingHoliday.value.id, data)
      successMessage.value = 'Holiday updated successfully!'
    }
    else {
      await createHoliday(data)
      successMessage.value = 'Holiday created successfully!'
    }

    resetForm()
    setTimeout(() => successMessage.value = '', 3000)
  }
  catch (err: any) {
    errorMessage.value = err.data?.statusMessage || 'An error occurred'
    setTimeout(() => errorMessage.value = '', 5000)
  }
}

async function handleDelete(id: number) {
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await deleteHoliday(id)
    successMessage.value = 'Holiday deleted successfully!'
    setTimeout(() => successMessage.value = '', 3000)
  }
  catch (err: any) {
    errorMessage.value = err.data?.statusMessage || 'Failed to delete holiday'
    setTimeout(() => errorMessage.value = '', 5000)
  }
}

// Format date for display
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8 !grid-area-[feature] dark:bg-gray-800">
    <div class="mx-auto max-w-[1200px] px-4 lg:px-8 sm:px-6">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl text-gray-900 font-bold dark:text-gray-100">
          Holiday Management
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Manage holidays for the widget
        </p>
      </div>

      <!-- Messages -->
      <div v-if="successMessage" class="mb-4 border border-green-400 rounded bg-green-100 p-4 text-green-700 dark:border-green-800 dark:bg-green-900 dark:text-green-300">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage || error" class="mb-4 border border-red-400 rounded bg-red-100 p-4 text-red-700 dark:border-red-800 dark:bg-red-900 dark:text-red-300">
        {{ errorMessage || error }}
      </div>

      <!-- Add/Edit Form -->
      <div v-if="showForm" class="mb-8 rounded-lg bg-white p-6 shadow dark:bg-gray-900">
        <h2 class="mb-4 text-xl font-semibold">
          {{ editingHoliday ? 'Edit Holiday' : 'Add New Holiday' }}
        </h2>
        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div>
            <label for="name" class="block text-sm text-gray-700 font-medium dark:text-gray-400">Name *</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-indigo-500 sm:text-sm focus:ring-indigo-500"
              placeholder="Holiday name"
            >
          </div>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label for="date" class="block text-sm text-gray-700 font-medium dark:text-gray-400">Date *</label>
              <input
                id="date"
                v-model="formData.date"
                type="date"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-indigo-500 sm:text-sm focus:ring-indigo-500"
              >
            </div>

            <div>
              <label for="endDate" class="block text-sm text-gray-700 font-medium">End Date (optional)</label>
              <input
                id="endDate"
                v-model="formData.endDate"
                type="date"
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-indigo-500 sm:text-sm focus:ring-indigo-500"
              >
            </div>
          </div>

          <div class="flex gap-2">
            <button
              type="submit"
              :disabled="loading"
              class="inline-flex justify-center border border-transparent rounded-md bg-indigo-600 px-4 py-2 text-sm text-white font-medium shadow-sm hover:bg-indigo-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {{ loading ? 'Saving...' : (editingHoliday ? 'Update' : 'Create') }}
            </button>
            <button
              type="button"
              class="inline-flex justify-center border border-gray-300 rounded-md bg-white px-4 py-2 text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              @click="resetForm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- Add Button -->
      <div v-if="!showForm" class="mb-6">
        <button
          class="inline-flex items-center border border-transparent rounded-md bg-indigo-600 px-4 py-2 text-sm text-white font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          @click="openCreateForm"
        >
          <svg class="mr-2 h-5 w-5 -ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Add Holiday
        </button>
      </div>

      <!-- Holidays List -->
      <div class="overflow-hidden bg-white shadow sm:rounded-md dark:bg-gray-900">
        <div v-if="loading && !holidays.length" class="p-6 text-center text-gray-500">
          Loading holidays...
        </div>
        <div v-else-if="!holidays.length" class="p-6 text-center text-gray-500">
          No holidays found. Add your first holiday!
        </div>
        <ul v-else class="grid grid-cols-1 gap-2 p-4 md:grid-cols-2">
          <li v-for="holiday in holidays" :key="holiday.id" class="border rounded px-6 py-4 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <h3 class="text-lg text-gray-900 font-medium dark:text-gray-100">
                  {{ holiday.name }}
                </h3>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(holiday.date) }}
                  <span v-if="holiday.endDate">
                    - {{ formatDate(holiday.endDate) }}
                  </span>
                </p>
              </div>
              <div class="flex items-center gap-2">
                <button
                  class="text-sm text-indigo-600 font-medium hover:text-indigo-900"
                  @click="openEditForm(holiday)"
                >
                  Edit
                </button>
                <button
                  class="text-sm text-red-600 font-medium hover:text-red-900"
                  @click="handleDelete(holiday.id!)"
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
          class="text-indigo-600 font-medium hover:text-indigo-900"
        >
          View Holiday Widget →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
