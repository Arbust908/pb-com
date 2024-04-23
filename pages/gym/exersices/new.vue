<script setup lang='ts'>
import type { BaseExercise, Exercise, Muscle } from "~/types";

const muscles = ref<Muscle[]>([
 "chest",
 "back",
 "shoulders",
 "biceps",
 "triceps",
 "legs",
 "abs",
]);
const baseExercise = ref<BaseExercise>({
 name: "",
 image: "",
 video: "",
 muscleGroups: [],
});
const exampleExercise = ref<Exercise>({
 ...baseExercise.value,
 sets: 3,
 reps: 10,
 weight: 0,
 time: 0,
});

const timer = ref<any | null>(null);
const isRunning = computed(() => !!timer.value);

function onSubmit(event: Event) {
 event.preventDefault();
 console.log(exampleExercise.value);
}

function startTimer() {
 const start = Date.now();
 timer.value = setInterval(() => {
  const delta = Date.now() - start;
  exampleExercise.value.time = Math.floor(delta / 1000);
 }, 1000);
 return timer;
}

function endTimer() {
 if (timer.value) {
  clearInterval(timer.value);
  timer.value = null;
 }
}
</script>

<template>
  <main class="grid grid-cols-[1fr_300px] grid-rows-[min-content_1fr] gap-6 layout-grid-feature">
    <h1 class="col-span-full text-center text-4xl font-bold">
      New Exercise
    </h1>
    <section>
      <form class="grid grid-cols-[auto_1fr] items-baseline gap-x-2 gap-y-4 text-slate-700 dark:text-slate-200" @submit="onSubmit">
        <label for="name">Name</label>
        <input id="name" v-model="exampleExercise.name" class="border rounded bg-transparent" type="text">
        <label for="image">Image</label>
        <input id="image" v-model="exampleExercise.image" class="border rounded bg-transparent" type="text">
        <label for="video">Video</label>
        <input id="video" v-model="exampleExercise.video" class="border rounded bg-transparent" type="text">
        <label for="muscleGroups">Muscle Groups</label>
        <select id="muscleGroups" v-model="exampleExercise.muscleGroups" class="border rounded bg-transparent" multiple>
          <option value="">
            Select Muscle Groups
          </option>
          <option v-for="muscle in muscles" :key="muscle" :value="muscle">
            {{ muscle }}
          </option>
        </select>
        <button type="submit" class="col-span-full rounded bg-slate-600">
          Save
        </button>
      </form>
    </section>
    <section>
      <article class="rounded bg-slate-900 p-4 shadow">
        <img :src="exampleExercise.image" :alt="exampleExercise.name" class="mb-2 rounded">
        <div class="flex flex-wrap gap-1">
          <span v-for="muscle in exampleExercise.muscleGroups" class="rounded-full bg-white/10 px-2 py-1 text-xs">
            {{ muscle }}
          </span>
        </div>
        <dl class="grid grid-cols-1 justify-items-center gap-2 pb-6">
          <dt>
            Name
          </dt>
          <dd :class="!exampleExercise.name && 'text-slate-100/25'">
            {{ exampleExercise.name || 'Exercise Name' }}
          </dd>
          <dt>
            Sets
          </dt>
          <dd class="w-full flex items-baseline justify-center gap-4">
            <button class="h-8 w-8 rounded-full bg-slate-200 text-slate-700" @click="exampleExercise.sets--">
              -
            </button>
            <span>
              {{ exampleExercise.sets }}
            </span>
            <button class="h-8 w-8 rounded-full bg-slate-200 text-slate-700" @click="exampleExercise.sets++">
              +
            </button>
          </dd>
          <dt>
            Reps
          </dt>
          <dd class="w-full flex items-baseline justify-center gap-4">
            <button class="h-8 w-8 rounded-full bg-slate-200 text-slate-700" @click="exampleExercise.reps--">
              -
            </button>
            <span>
              {{ exampleExercise.reps }}
            </span>
            <button class="h-8 w-8 rounded-full bg-slate-200 text-slate-700" @click="exampleExercise.reps++">
              +
            </button>
          </dd>
          <dt>
            Weight
          </dt>
          <dd class="w-full flex items-baseline justify-center gap-4">
            <button class="h-8 w-8 rounded-full bg-slate-200 text-slate-700" @click="exampleExercise.weight - 5">
              -5
            </button>
            <button class="h-8 w-8 rounded-full bg-slate-200 text-slate-700" @click="exampleExercise.weight--">
              -
            </button>
            <span>
              {{ exampleExercise.weight }}
            </span>
            <button class="h-8 w-8 rounded-full bg-slate-200 text-slate-700" @click="exampleExercise.weight++">
              +
            </button>
            <button class="h-8 w-8 rounded-full bg-slate-200 text-slate-700" @click="exampleExercise.weight + 5">
              +5
            </button>
          </dd>
          <dt>
            Time
          </dt>
          <dd :class="!exampleExercise.time && 'text-slate-100/25'">
            {{ exampleExercise.time }}
          </dd>
        </dl>
        <div class="flex justify-around gap-6">
          <button type="button" :disabled="isRunning" class="grow rounded bg-indigo-500 py-1 disabled:(cursor-not-allowed bg-indigo-300 text-slate-200)" @click="startTimer">
            Start
          </button>
          <button type="button" :disabled="!isRunning" class="grow rounded bg-indigo-500 py-1 disabled:(cursor-not-allowed bg-indigo-300 text-slate-200)" @click="endTimer">
            End
          </button>
        </div>
      </article>
    </section>
  </main>
</template>
