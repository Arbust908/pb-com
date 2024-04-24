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
  layout: 'none',
})
</script>

<template>
  <main class="grid content-start justify-items-center gap-4 p-8 min-h-full">
    <div class="grid content-start justify-items-center w-full bg-gray-800/10 rounded aspect-ratio-square p-10 grided-box">
    <WidgetBox v-slot="{ isLong }">
        <div class="h-full items-center" :class="isLong ? 'grid long-holiday justify-items-center' : 'flex flex-col justify-center '">
          <h1 class="text-xl font-bold" :class="{ 'nextHoly': isLong }">Next Holiday</h1>
          <p class="text-xl font-bold" :class="{ 'name': isLong }">{{ nextHoliday?.name }}</p>
          <p class="text-4xl font-bold" :class="{ 'daysToGo text-6xl': isLong }">{{ daysToNextHoliday }}</p>
          <p class="text-xl font-bold" :class="{ 'days': isLong }">days to go</p>
          <p class="text-2xl font-bold" :class="{ 'date': isLong }">{{ nextHoliday?.date.toLocaleDateString() }}</p>
        </div>
    </WidgetBox>
    </div>
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

.grided-box {
  background-image:
    url(https://nucleoapp.com/assets/img/svg-patterns/chessboard-3.svg),
    url(https://nucleoapp.com/assets/img/svg-patterns/cols-dotted-2.svg),
    url(https://nucleoapp.com/assets/img/svg-patterns/grid-2.svg);
}
</style>
