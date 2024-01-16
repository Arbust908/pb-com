<script setup lang='ts'>
// https://twitter.com/jh3yy/status/1735499859715584298 animation for number changes
const { data, refresh } = useAsyncData('dollar', () => $fetch('/api/dolar'))

function handleRefresh() {
  refresh()
}
</script>

<template>
  <div class="subgrid grid layout-grid-feature">
    <section v-if="data?.length" class="layout-grid-popout">
      <article v-for="(exchange, index) in data" :key="exchange.casa + exchange.fechaActualizacion" :class="index % 2 === 0 ? 'color-hint' : 'simple-linear'">
        <h2>{{ exchange.casa }}</h2>
        <p>{{ exchange.compra }}</p>
        <p>{{ exchange.venta }}</p>
        <p>{{ exchange.fechaActualizacion }}</p>
      </article>
    </section>
    <button class="layout-grid-content" @click="handleRefresh">
      refresh
    </button>
  </div>
</template>

<style scoped lang='postcss'>
.subgrid {
  grid-template-columns: subgrid;
}
/* https://twitter.com/anatudor/status/1744663509865058765 */
.color-hint {
  background: linear-gradient(blue, 10%, pink);
}
.simple-linear {
  background: linear-gradient(blue, pink);
}
</style>
