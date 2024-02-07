<script setup lang='ts'>
  const items = [
    { name: '', dot: 3, damage: ['d6'], type: 'Improvised', image: ''},
    { name: 'Stones', dot: 3, type: 'Ammunition', image: ''},
    { name: 'Heavy Armor', dot: 4, defense: 1, cardType: 'long', image: ''},
    { name: 'Light Armor', dot: 3, defense: 1, cardType: 'wide', image: ''},
    { name: 'Sword', dot: 3, damage: ['d6', 'd8'], type: 'Medium', image: ''},
    { name: 'Golden Bell', type: 'Medium', dot:6, image: '', isRelique: true, cardType: 'big'},
  ]
</script>

<template>
  <section class="card-grid">
     <article v-for="(item, index) in items" :key="item.name + index" class="card" :class="item.cardType">
        <h2>
            <i v-if="item.isRelique" class="i-ri:star-fill size-2"/>
            <span>
                {{ item.name }}
            </span>
        </h2>
        <div class="flex gap-x-1 justify-between items-center flex-wrap">
            <div class="dots">
                <span v-for="i in item.dot" :key="i" class="dot" />
            </div>
            <div class="damage-defense">
                <p v-for="dmg in item.damage">{{ dmg }}</p>
                <p v-if="item?.defense">{{ item.defense }} def</p>
            </div>
        </div>
        <p class="type">{{ item.type }}</p>
     </article>
  </section>
</template>

<style scoped>
    .card-grid {
        @apply grid p-2;
        grid-auto-columns: 25mm;
        grid-auto-rows: 25mm;
    }
    .card {
        @apply border-2 border-slate-900 bg-white col-span-1 row-span-1 text-slate-800 relative text-xs;
        &.long {
            @apply row-span-2;
        }
        &.wide {
            @apply col-span-2;
        }
        &.big {
            @apply col-span-2 row-span-2;
        }
        h2 {
            @apply h-6mm w-full border-b border-dashed text-xs p-1;
        }
    }
    .dots {
        @apply flex gap-x-1 pl-px py-1;
    }
    .dot {
        @apply w-3mm h-3mm bg-slate-100 border border-slate-800 rounded-full;
    }
    .damage-defense:has(> *) {
        @apply flex gap-y-1 p-1 border divide-x;
    }
    .type {
        @apply filter-drop-shadow absolute bottom-0 left-0 p-1;
    }
</style>
