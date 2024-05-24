<script setup lang='ts'>
  const a = ref<number>(100);
const b = ref<number>(100);
const c = ref<number>(50);
const debouncedCalculation = useDebounceFn(() => {
    return (c.value * b.value) / a.value;
}, 1000)
const x = computed(() => {
    return debouncedCalculation();
});
</script>

<template>
  <div>
    <section class="grid gap-6 grid-cols-2">
    <input type="number" v-model="a" placeholder="a" class="p-2 border border-gray-300 rounded-md">
    <input type="number" v-model="b" placeholder="b" class="p-2 border border-gray-300 rounded-md">
    <input type="number" v-model="c" placeholder="c" class="p-2 border border-gray-300 rounded-md">
    <input type="number" v-model="x" placeholder="x" disabled class="p-2 border border-gray-300 rounded-md">
    </section>
  </div>
</template>
