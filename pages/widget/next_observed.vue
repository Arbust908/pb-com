<script setup lang="ts">
import WidgetBox from "../../components/widget/WidgetBox.vue";

interface HolidayDisplay {
  date: Date;
  name: string;
  end?: Date;
}

// Use the holidays composable
const { holidays: apiHolidays, loading, error, fetchHolidays } = useHolidays()

// Convert API holidays to display format
const holidays = computed<HolidayDisplay[]>(() => {
  return apiHolidays.value.map(h => ({
    date: new Date(h.date),
    name: h.name,
    end: h.endDate ? new Date(h.endDate) : undefined
  }))
})

// Fetch holidays on mount
onMounted(async () => {
  await fetchHolidays()
})
const today = ref(new Date());
const nextHolidayIndex = computed(() => {
  if (holidays.value.length === 0) return -1;
  return holidays.value.findIndex((holiday) => holiday.date > today.value);
});
function getHoliday(index: number) {
  if (index < 0 || index >= holidays.value.length) return null;
  return holidays.value[index];
}

const previousHoliday = computed(() => {
  if (nextHolidayIndex.value <= 0) return null;
  return getHoliday(nextHolidayIndex.value - 1);
});
const nextHoliday = computed(() => {
  if (nextHolidayIndex.value === -1) return null;
  return getHoliday(nextHolidayIndex.value);
});
const followingHoliday = computed(() => {
  if (nextHolidayIndex.value === -1 || nextHolidayIndex.value >= holidays.value.length - 1) return null;
  return getHoliday(nextHolidayIndex.value + 1);
});

const isActiveHoliday = computed(() => {
  if (previousHoliday.value && previousHoliday.value.end) {
    return previousHoliday.value.end > today.value;
  }
  return false;
});

const shownHoliday = computed(() => {
  if (isActiveHoliday.value) {
    return previousHoliday.value
  }
  return nextHoliday.value
})

const daysToNextHoliday = computed(() => {
  if (!nextHoliday.value) return 0;
  return Math.ceil(
    (nextHoliday.value.date.getTime() - today.value.getTime()) / (1000 * 60 * 60 * 24)
  );
});
const formatDateAsCompact = (date: Date | undefined) => {
  if (!date) return '';
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  return `${day} ${month}`;
};
const formattedDate = computed(() => nextHoliday.value ? formatDateAsCompact(nextHoliday.value.date) : '');
const followingHolidayDate = computed(() => followingHoliday.value ? formatDateAsCompact(followingHoliday.value.date) : '');

definePageMeta({
  layout: "none",
});

// 18 cuadrados de largo. 1 cuadrado = 6 TWU = 24px
// 360 + 48 + 48 = 456px
</script>

<template>
  <main class="grid content-start justify-items-center gap-4 min-h-full pt-12">
    <div v-if="loading" class="text-xl">Loading holidays...</div>
    <div v-else-if="error" class="text-xl text-red-500">{{ error }}</div>
    <div v-else-if="holidays.length === 0" class="text-xl">No holidays found</div>
    <div v-else class="grid content-start justify-items-center w-full rounded p-6 grided-box max-w-456px" :class="isActiveHoliday ? 'bg-teal-700/80' : 'bg-gray-800/10'">
      <WidgetBox v-slot="{ isLong }">
        <div class="h-full items-center gap-2 p-6" :class="isLong
            ? 'grid long-holiday justify-items-center'
            : 'flex flex-col'
          ">
          <h1 class="text-40px font-bold" :class="{ nextHoly: isLong }">
            {{ isActiveHoliday ? 'Current Holiday' : 'Next Holiday'}}
          </h1>
          <div class="grid" :class="{ name: isLong }">
            <p class="text-32px" :class="{ name: isLong }">
              {{ shownHoliday?.name }}
            </p>
            <p class="text-sm text-right">{{ formattedDate }}</p>
          </div>
          <p class="text-128px font-bold -my-8" :class="{ 'daysToGo text-6xl': isLong }">
            {{ daysToNextHoliday }}
          </p>
          <p class="text-3xl font-bold" :class="{ days: isLong }">days to go</p>
          <p v-if="followingHoliday" class="text-2xl">
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
