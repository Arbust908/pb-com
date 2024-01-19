<script setup lang="ts">
interface Income {
  id: number
  description: string
  amount: number
}

interface Expense {
  id: number
  description: string
  amount: number
}

const incomes = ref<Income[]>([
  { id: 1, description: 'Salary', amount: 5000 },
  { id: 2, description: 'Freelance Work', amount: 1000 },
])

const expenses = ref<Expense[]>([
  { id: 1, description: 'Rent', amount: 1500 },
  { id: 2, description: 'Groceries', amount: 200 },
])
</script>

<template>
  <div class="mx-auto container">
    <h1 class="mb-4 text-2xl font-bold">
      Personal Finances
    </h1>
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-white p-4 shadow">
        <h2 class="mb-2 text-lg font-bold">
          Income
        </h2>
        <ul>
          <li v-for="income in incomes" :key="income.id">
            {{ income.description }} - {{ income.amount }}
          </li>
        </ul>
      </div>
      <div class="bg-white p-4 shadow">
        <h2 class="mb-2 text-lg font-bold">
          Expenses
        </h2>
        <ul>
          <li v-for="expense in expenses" :key="expense.id">
            {{ expense.description }} - {{ expense.amount }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
