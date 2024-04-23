<script setup lang='ts'>
import WidgetBox from '../../components/widget/WidgetBox.vue';

interface Holiday {
  date: Date;
  name: string;
}
const holidays = ref<Holiday[]>([
    { date: new Date("2024-02-12"), name: "Carnival / Shrove Monday" },
    { date: new Date("2024-02-13"), name: "Carnival / Shrove Tuesday" },
    { date: new Date("2024-03-29"), name: "Good Friday" },
    { date: new Date("2024-05-01"), name: "Labor Day" },
    { date: new Date("2024-07-09"), name: "Argentina Independence Day" },
    { date: new Date("2024-09-07"), name: "Brazil Independence Day" },
    { date: new Date("2024-12-25"), name: "Christmas Day" },
    { date: new Date("2024-12-31"), name: "New Year’s Eve" },
    { date: new Date("2025-01-01"), name: "New Year's Day" },
]);
const today = ref(new Date());

const nextHoliday = computed(() => {
    return holidays.value.find((holiday) => holiday.date > today.value);
});
const daysToNextHoliday = computed(() => {
    if (!nextHoliday.value) return 0;
    return Math.ceil((nextHoliday.value.date.getTime() - today.value.getTime()) / (1000 * 60 * 60 * 24));
});
definePageMeta({
  layout: 'home',
})
</script>

<template>
  <main class="grid content-start justify-items-center gap-4 py-4 min-h-full">

    <WidgetBox v-slot="{ isLong }">
        <div class="h-full items-center" :class="isLong ? 'grid long-holiday justify-items-center' : 'flex flex-col justify-center '">
          <h1 class="text-xl font-bold" :class="{ 'nextHoly': isLong }">Next Holiday</h1>
          <p class="text-xl font-bold" :class="{ 'name': isLong }">{{ nextHoliday?.name }}</p>
          <p class="text-4xl font-bold" :class="{ 'daysToGo text-6xl': isLong }">{{ daysToNextHoliday }}</p>
          <p class="text-xl font-bold" :class="{ 'days': isLong }">days to go</p>
          <p class="text-2xl font-bold" :class="{ 'date': isLong }">{{ nextHoliday?.date.toLocaleDateString() }}</p>
        </div>
    </WidgetBox>
    <NuxtLink to="/widget" class="text-xl md:text-sm font-bold rounded-md bg-purple-700 px-4 py-2 hover:(shadow bg-purple-800 text-gray-200)">go back</NuxtLink>
  </main>
</template>

<style scoped>
.long-holiday {
  grid-template-areas: 'daysToGo nextHoly' 'daysToGo name' 'days date';
}
.nextHoly {
  grid-area: nextHoly;
}
.daysToGo {
  grid-area: daysToGo;
}
.name {
  grid-area: name;
}
.days {
  grid-area: days;
}
</style>
