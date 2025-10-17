<script setup lang='ts'>
import { useTimeAgo } from '@vueuse/core'
import { formatCurrency } from '~/utils/format/number'
import NumberFlow from '@number-flow/vue'

// https://twitter.com/jh3yy/status/1735499859715584298 animation for number changes
const { data, refresh, status } = useAsyncData('dollar', () => $fetch('/api/dolar'))

const isLoading = ref(false)

// Currency converter state
const selectedCasa = ref('blue')
const rateType = ref<'compra' | 'venta' | 'promedio'>('promedio')
const usdAmount = ref<string>('')
const arsAmount = ref<string>('')
const lastEdited = ref<'usd' | 'ars'>('usd')

// Computed numeric values for animated display
const usdNumericValue = computed(() => parseFloat(usdAmount.value) || 0)
const arsNumericValue = computed(() => parseFloat(arsAmount.value) || 0)

const lastUpdated = computed(() => {
  return data.value?.lastUpdated || ''
})

const dollarData = computed(() => {
  return data.value?.data || []
})

// Get the selected exchange house
const selectedExchange = computed(() => {
  return dollarData.value?.find(e => e.casa.toLowerCase() === selectedCasa.value.toLowerCase())
})

// Get the current exchange rate based on selected type
const currentRate = computed(() => {
  if (!selectedExchange.value) return 0
  
  switch (rateType.value) {
    case 'compra':
      return selectedExchange.value.compra
    case 'venta':
      return selectedExchange.value.venta
    case 'promedio':
      return (selectedExchange.value.compra + selectedExchange.value.venta) / 2
    default:
      return 0
  }
})

// Available casa options
const casaOptions = computed(() => {
  return dollarData.value.map(exchange => ({
    value: exchange.casa.toLowerCase(),
    label: exchange.casa
  }))
})

// Convert USD to ARS
function convertUsdToArs(usd: number): number {
  return usd * currentRate.value
}

// Convert ARS to USD
function convertArsToUsd(ars: number): number {
  return currentRate.value > 0 ? ars / currentRate.value : 0
}

// Handle USD input change
watch(usdAmount, (newValue) => {
  if (lastEdited.value === 'usd') {
    const numValue = parseFloat(newValue) || 0
    const converted = convertUsdToArs(numValue)
    arsAmount.value = converted > 0 ? converted.toFixed(2) : ''
  }
})

// Handle ARS input change
watch(arsAmount, (newValue) => {
  if (lastEdited.value === 'ars') {
    const numValue = parseFloat(newValue) || 0
    const converted = convertArsToUsd(numValue)
    usdAmount.value = converted > 0 ? converted.toFixed(2) : ''
  }
})

// Reset conversion when casa or rate type changes
watch([selectedCasa, rateType], () => {
  if (lastEdited.value === 'usd' && usdAmount.value) {
    const numValue = parseFloat(usdAmount.value) || 0
    const converted = convertUsdToArs(numValue)
    arsAmount.value = converted > 0 ? converted.toFixed(2) : ''
  } else if (lastEdited.value === 'ars' && arsAmount.value) {
    const numValue = parseFloat(arsAmount.value) || 0
    const converted = convertArsToUsd(numValue)
    usdAmount.value = converted > 0 ? converted.toFixed(2) : ''
  }
})

// Set default casa once data loads
watch(() => dollarData.value, (newData) => {
  if (newData && newData.length > 0 && !selectedCasa.value) {
    selectedCasa.value = newData[0].casa.toLowerCase()
  }
}, { immediate: true })

function handleRefresh() {
  isLoading.value = true
  refresh()
}
watch(status, (newStatus) => {
  if (newStatus === 'success') {
    setTimeout(() => {
      isLoading.value = false
    }, 1000)
  }
})
/* .subgrid {
  grid-template-columns: subgrid;
}
/* https://twitter.com/anatudor/status/1744663509865058765
.color-hint {
  background: linear-gradient(blue, 10%, pink);
}
.simple-linear {
  background: linear-gradient(blue, pink);
}
*/
</script>

<template>
      <!-- Exchange Rates Grid -->
    <div v-if="dollarData?.length" class="w-full grid grid-cols-[repeat(auto-fill,230px)] gap-4 border-3 border-black rounded bg-zinc-8 bg-opacity-70 backdrop-blur-sm p-4 text-zinc-3 shadow  h-full mx-auto">
      <article v-for="(exchange) in dollarData" :key="exchange.casa + exchange.fechaActualizacion" class=" p-2 border-2 border-zinc-7 rounded-lg relative w-[230px]">
        <h2 class="uppercase font-bold text-sm absolute bg-zinc-8 -top-4 py-1 px-2 rounded bg-opacity-70">{{ exchange.casa }}</h2>
        <dl class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <dt class="text-right">
            <span class="text-xs opacity-50">
              compra
            </span>
          </dt>
          <dd class="text-left" :class="{'bg-zinc-6 animate-pulse px-1 rounded-full text-zinc-6': isLoading}">
            {{ formatCurrency(exchange.compra) }}
          </dd>
          <dt class="text-right">
            <span class="text-xs opacity-50">
              promedio
            </span>
          </dt>
          <dd class="text-left" :class="{'bg-zinc-6 animate-pulse px-1 rounded-full text-zinc-6': isLoading}">
            {{ formatCurrency((exchange.compra + exchange.venta) / 2) }}
          </dd>
          <dt class="text-right">
            <span class="text-xs opacity-50">
              venta
            </span>
          </dt>
          <dd class="text-left" :class="{'bg-zinc-6 animate-pulse px-1 rounded-full text-zinc-6': isLoading}">
            {{ formatCurrency(exchange.venta) }}
          </dd>
          <dt class="text-right">
            <span class="text-xs opacity-50">
              actualizado
            </span>
          </dt>
          <dd class="text-left" :class="{'bg-zinc-6 animate-pulse px-1 rounded-full text-zinc-6': isLoading}">
            {{ useTimeAgo(exchange.fechaActualizacion) }}
          </dd>
        </dl>
      </article>
    </div>
    <div class="flex items-center justify-end px-4 gap-x-4 mt-4 mb-8">
      <p class="text-xs text-zinc-3 bg-zinc-8 px-3">
       Last update:   {{ useTimeAgo(lastUpdated) }}
      </p>
      <button class="bg-zinc-8 text-amber-5 px-3 py-1 rounded-lg shadow-flat hover:shadow-harsh hover:-translate-x-1 hover:-translate-y-1 border-3 border-black focus:outline-none focus:shadow-harsh focus:-translate-x-1 focus:-translate-y-1 capitalize group flex-middle gap-x-2" @click="handleRefresh">
        <span>
          refresh
        </span>
        <i class="i-ph-arrow-counter-clockwise-bold group-hover:-rotate-360 transition-all duration-600 ease-in-out" />
      </button>
    </div>

    <!-- Currency Converter -->
    <div v-if="dollarData?.length" class="w-full border-3 border-black rounded bg-zinc-8 bg-opacity-70 backdrop-blur-sm p-6 text-zinc-3 shadow mb-6 mx-auto max-w-2xl">
      <h2 class="text-xl font-bold mb-4 text-amber-5">Currency Converter</h2>
      
      <!-- Exchange House and Rate Type Selection -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label for="casa-select" class="block text-xs opacity-70 mb-2 uppercase">Exchange House</label>
          <select 
            id="casa-select"
            v-model="selectedCasa" 
            class="w-full bg-zinc-7 border-2 border-zinc-6 rounded px-3 py-2 text-zinc-2 focus:outline-none focus:border-amber-5 transition-colors"
          >
            <option v-for="option in casaOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
        
        <div>
          <label for="rate-type-select" class="block text-xs opacity-70 mb-2 uppercase">Rate Type</label>
          <select 
            id="rate-type-select"
            v-model="rateType" 
            class="w-full bg-zinc-7 border-2 border-zinc-6 rounded px-3 py-2 text-zinc-2 focus:outline-none focus:border-amber-5 transition-colors"
          >
            <option value="compra">Compra (Buy)</option>
            <option value="venta">Venta (Sell)</option>
            <option value="promedio">Promedio (Average)</option>
          </select>
        </div>
      </div>

      <!-- Current Rate Display -->
      <div class="mb-6 p-3 bg-zinc-7 bg-opacity-50 rounded border border-zinc-6">
        <p class="text-sm">
          <span class="opacity-70">Current Rate:</span> 
          <span class="font-bold text-amber-5 ml-2">{{ formatCurrency(currentRate) }}</span>
        </p>
      </div>

      <!-- Conversion Section -->
      <div class="grid gap-8 grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center">
        <!-- USD Section -->
        <div class="space-y-3">
          <label for="usd-input" class="block text-sm font-semibold mb-2 opacity-90">Enter USD Amount</label>
          
          <!-- Input Field -->
          <div class="relative">
            <input
              id="usd-input"
              v-model="usdAmount"
              type="number"
              step="0.01"
              min="0"
              placeholder="Type amount..."
              class="w-full bg-zinc-7 bg-opacity-50 border-2 border-zinc-6 rounded px-4 py-2 text-zinc-2 text-sm focus:outline-none focus:border-amber-5 transition-colors placeholder:text-zinc-5"
              @focus="lastEdited = 'usd'"
            >
          </div>
          
          <!-- Animated Display -->
          <div class="p-4 bg-zinc-7 bg-opacity-30 rounded-lg border border-zinc-6 min-h-[80px] flex items-center justify-center">
            <div v-if="usdNumericValue > 0" class="flex items-center gap-2 text-amber-5 text-3xl font-mono font-bold">
              <NumberFlow
                :value="usdNumericValue"
                :format="{ style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }"
              />
            </div>
            <span v-else class="text-zinc-5 text-sm opacity-50">Enter amount above</span>
          </div>
        </div>

        <!-- Conversion Arrow -->
        <div class="flex items-center justify-center">
          <div class="text-amber-5 text-3xl opacity-50 transform rotate-90 md:rotate-0">
            ⇄
          </div>
        </div>

        <!-- ARS Section -->
        <div class="space-y-3">
          <label for="ars-input" class="block text-sm font-semibold mb-2 opacity-90">Enter ARS Amount</label>
          
          <!-- Input Field -->
          <div class="relative">
            <input
              id="ars-input"
              v-model="arsAmount"
              type="number"
              step="0.01"
              min="0"
              placeholder="Type amount..."
              class="w-full bg-zinc-7 bg-opacity-50 border-2 border-zinc-6 rounded px-4 py-2 text-zinc-2 text-sm focus:outline-none focus:border-amber-5 transition-colors placeholder:text-zinc-5"
              @focus="lastEdited = 'ars'"
            >
          </div>
          
          <!-- Animated Display -->
          <div class="p-4 bg-zinc-7 bg-opacity-30 rounded-lg border border-zinc-6 min-h-[80px] flex items-center justify-center">
            <div v-if="arsNumericValue > 0" class="flex items-center gap-2 text-amber-5 text-3xl font-mono font-bold">
              <NumberFlow
                :value="arsNumericValue"
                :format="{ style: 'currency', currency: 'ARS', minimumFractionDigits: 2, maximumFractionDigits: 2 }"
              />
            </div>
            <span v-else class="text-zinc-5 text-sm opacity-50">Enter amount above</span>
          </div>
        </div>
      </div>
    </div>
    <!-- https://number-flow.barvian.me/vue/ -->
</template>
