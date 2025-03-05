<script setup lang='ts'>
import { useTimeAgo } from '@vueuse/core'
import { formatCurrency } from '~/utils/format/number'
// https://twitter.com/jh3yy/status/1735499859715584298 animation for number changes
const { data, refresh, status } = useAsyncData('dollar', () => $fetch('/api/dolar'))

const isLoading = ref(false)

const lastUpdated = computed(() => {
  return data.value?.lastUpdated || ''
})

const dollarData = computed(() => {
  return data.value?.data || []
})

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
    <div class="flex items-center justify-end px-4 gap-x-4 mt-4">
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
</template>
