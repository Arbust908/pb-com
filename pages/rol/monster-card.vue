<script setup lang='ts'>
const name = 'Monster Name'
const type = 'Type'
const dodge = 10
const resist = 10
const hp = 20
const str = 10
const dex = 10
const con = 10
const int = 10
const wis = 10
const cha = 10
const actions = ['Action 1', 'action 2', 'action 3']
</script>

<template>
  <main>
    <article class="monster-card h-full flex flex-col gap-y-2 rounded bg-zinc-400 p-2 text-sm shadow">
      <header class="flex justify-between">
        <h2 class="font-bold uppercase">
          {{ name }}
        </h2>
        <p>{{ type }}</p>
      </header>
      <section class="grid grid-cols-3">
        <div class="border rounded-l border-r-none text-center">
          <p>
            <i class="i-ri:run-fill" />
            Dodge
          </p>
          <p>{{ dodge }}</p>
        </div>
        <div class="border rounded-r border-l-none text-center">
          <p>
            <i class="i-ri:shield-line" />
            Resist
          </p>
          <p>{{ resist }}</p>
        </div>
        <div class="text-center">
          <p>
            <i class="i-ri:heart-3-fill" />
            HP
          </p>
          <p>{{ hp }}</p>
        </div>
      </section>
      <section class="grid grid-cols-6 divide-x">
        <div class="text-center">
          <p>Str</p>
          <p>{{ str }}</p>
        </div>
        <div class="text-center">
          <p>Dex</p>
          <p>{{ dex }}</p>
        </div>
        <div class="text-center">
          <p>Con</p>
          <p>{{ con }}</p>
        </div>
        <div class="text-center">
          <p>Int</p>
          <p>{{ int }}</p>
        </div>
        <div class="text-center">
          <p>Wis</p>
          <p>{{ wis }}</p>
        </div>
        <div class="text-center">
          <p>Cha</p>
          <p>{{ cha }}</p>
        </div>
      </section>
      <section class="h-6/12 border-t pt-2">
        <h4 class="font-bold">
          Actions
        </h4>
        <p v-for="action in actions" :key="action">
          {{ action }}
        </p>
      </section>
    </article>
  </main>
</template>

<style scoped lang='postcss'>
.monster-card {
  /* width: 6cm; */ /* 226 */
  /* height: 9.5cm; */ /* 360 */
  @apply w-226px h-360px;
}
</style>
