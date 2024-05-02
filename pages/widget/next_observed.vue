<script setup lang="ts">
import WidgetBox from "../../components/widget/WidgetBox.vue";

interface Holiday {
  date: Date;
  name: string;
}
const holidays = ref<Holiday[]>([
  { date: new Date("2024-02-12"), name: "Carnival" },
  { date: new Date("2024-02-13"), name: "Carnival" },
  { date: new Date("2024-03-29"), name: "Good Friday" },
  { date: new Date("2024-05-01"), name: "Labor Day" },
  { date: new Date("2024-07-09"), name: "Arg Independence" },
  { date: new Date("2024-09-07"), name: "Br Independence" },
  { date: new Date("2024-12-25"), name: "XMas Day" },
  { date: new Date("2024-12-31"), name: "New Year’s Eve" },
  { date: new Date("2025-01-01"), name: "2025!" },
]);
const today = ref(new Date());
const nextHolidayIndex = computed(() => {
  return holidays.value.findIndex((holiday) => holiday.date > today.value);
});
function getHoliday(index: number) {
  return holidays.value[index];
}

const nextHoliday = computed(() => {
  console.log(`Next holiday index: ${nextHolidayIndex.value}`)
  return getHoliday(nextHolidayIndex.value);
});
const followingHoliday = computed(() => {
  console.log(`Following holiday index: ${nextHolidayIndex.value + 1}`)
  return getHoliday(nextHolidayIndex.value + 1);
});

const daysToNextHoliday = computed(() => {
  if (!nextHoliday.value) return 0;
  return Math.ceil(
    (nextHoliday.value.date.getTime() - today.value.getTime()) / (1000 * 60 * 60 * 24)
  );
});
const formatDateAsCompact = (date: Date) => {
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  return `${day} ${month}`;
};
const formattedDate = computed(() => formatDateAsCompact(nextHoliday.value.date));
const followingHolidayDate = computed(() => formatDateAsCompact(followingHoliday.value.date));

definePageMeta({
  layout: "none",
});

// 18 cuadrados de largo. 1 cuadrado = 6 TWU = 24px
// 360 + 48 + 48 = 456px
</script>

<template>
  <main class="grid content-start justify-items-center gap-4 min-h-full pt-12">
    <div class="grid content-start justify-items-center w-full bg-gray-800/10 rounded p-6 grided-box max-w-456px">
      <WidgetBox v-slot="{ isLong }">
        <div class="h-full items-center gap-2 p-6" :class="isLong
            ? 'grid long-holiday justify-items-center'
            : 'flex flex-col'
          ">
          <h1 class="text-40px font-bold" :class="{ nextHoly: isLong }">
            Next Holiday
          </h1>
          <div class="grid" :class="{ name: isLong }">
            <p class="text-32px" :class="{ name: isLong }">
              {{ nextHoliday?.name }}
            </p>
            <p class="text-sm text-right">{{ formattedDate }}</p>
          </div>
          <p class="text-128px font-bold -my-8" :class="{ 'daysToGo text-6xl': isLong }">
            {{ daysToNextHoliday }}
          </p>
          <p class="text-3xl font-bold" :class="{ days: isLong }">days to go</p>
          <p class="text-2xl">
            Next =>
            {{ followingHolidayDate }}
          </p>
        </div>
      </WidgetBox>
      <div class="py-24"></div>
    </div>
    <NuxtLink to="/widget"
      class="text-xl md:text-sm font-bold rounded-md bg-purple-700 px-4 py-2 hover:(shadow bg-purple-800 text-gray-200)">
      go back</NuxtLink>
  </main>
</template>

<style scoped>
.long-holiday {
  grid-template-areas: "daysToGo nextHoly" "daysToGo name" "days date";
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
  background-image: url(https://nucleoapp.com/assets/img/svg-patterns/chessboard-3.svg),
    url(https://nucleoapp.com/assets/img/svg-patterns/cols-dotted-2.svg),
    url(https://nucleoapp.com/assets/img/svg-patterns/grid-2.svg);
}
</style>
