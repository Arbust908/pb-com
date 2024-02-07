<script setup lang='ts'>
import type { BaseExercise, Exercise, Muscle } from '~/types';

const muscles = ref<Muscle[]>(['chest', 'back', 'shoulders', 'biceps', 'triceps', 'legs', 'abs'])
const baseExercise = ref<BaseExercise>({
  name: '',
  image: '',
  video: '',
  muscleGroups: [],
})
const exampleExercise = ref<Exercise>({
  ...baseExercise.value,
  sets: 3,
  reps: 10,
  weight: 0,
  time: 0,
})

const timer = ref<any | null>(null)
const isRunning = computed(() => !!timer.value)

function onSubmit (event: Event) {
  event.preventDefault()
  console.log(exampleExercise.value)
}

function startTimer() {
  const start = Date.now()
  timer.value = setInterval(() => {
    const delta = Date.now() - start
    exampleExercise.value.time = Math.floor(delta / 1000)
  }, 1000)
  return timer
}

function endTimer() {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}


</script>

<template>
  <main class="layout-grid-feature grid grid-cols-[1fr_300px] grid-rows-[min-content_1fr] gap-6">
    <h1 class="text-4xl font-bold col-span-full text-center">
      New Exercise
    </h1>
    <section>
      <form @submit="onSubmit" class="grid grid-cols-[auto_1fr] gap-x-2 gap-y-4 items-baseline text-slate-700 dark:text-slate-200">
        <label for="name">Name</label>
        <input id="name" class="rounded bg-transparent border" v-model="exampleExercise.name" type="text" />
        <label for="image">Image</label>
        <input id="image" class="rounded bg-transparent border" v-model="exampleExercise.image" type="text" />
        <label for="video">Video</label>
        <input id="video" class="rounded bg-transparent border" v-model="exampleExercise.video" type="text" />
        <label for="muscleGroups">Muscle Groups</label>
        <select id="muscleGroups" class="rounded bg-transparent border" v-model="exampleExercise.muscleGroups" multiple>
          <option value="">
            Select Muscle Groups
          </option>
          <option v-for="muscle in muscles" :key="muscle" :value="muscle">
            {{ muscle }}
          </option>
        </select>
        <button type="submit" class="rounded bg-slate-600 col-span-full">
          Save
        </button>
      </form>
    </section>
    <section>
      <article class="rounded bg-slate-900 shadow p-4">
          <img :src="exampleExercise.image" :alt="exampleExercise.name" class="rounded mb-2" />
          <div class="flex flex-wrap gap-1">
            <span v-for="muscle in exampleExercise.muscleGroups" class="rounded-full px-2 py-1 bg-white/10 text-xs">
              {{ muscle }}
            </span>
          </div>
        <dl class="grid grid-cols-1 justify-items-center gap-2 pb-6">
          <dt>
            Name
          </dt>
          <dd :class="!exampleExercise.name && 'text-slate-100/25'">
            {{ exampleExercise.name || 'Exercise Name'}}
          </dd>
          <dt>
            Sets
          </dt>
          <dd class="flex justify-center gap-4 w-full items-baseline">
          <button class="rounded-full bg-slate-200 text-slate-700 w-8 h-8" @click="exampleExercise.sets--">-</button>
          <span>
            {{ exampleExercise.sets }}
          </span>
          <button class="rounded-full bg-slate-200 text-slate-700 w-8 h-8" @click="exampleExercise.sets++">+</button>
          </dd>
          <dt>
            Reps
          </dt>
          <dd class="flex justify-center gap-4 w-full items-baseline">
            <button class="rounded-full bg-slate-200 text-slate-700 w-8 h-8" @click="exampleExercise.reps--">-</button>
          <span>
            {{ exampleExercise.reps }}
          </span>
          <button class="rounded-full bg-slate-200 text-slate-700 w-8 h-8" @click="exampleExercise.reps++">+</button>
          </dd>
          <dt>
            Weight
          </dt>
          <dd class="flex justify-center gap-4 w-full items-baseline">
            <button class="rounded-full bg-slate-200 text-slate-700 w-8 h-8" @click="exampleExercise.weight - 5">-5</button>
            <button class="rounded-full bg-slate-200 text-slate-700 w-8 h-8" @click="exampleExercise.weight--">-</button>
          <span>
            {{ exampleExercise.weight }}
          </span>
          <button class="rounded-full bg-slate-200 text-slate-700 w-8 h-8" @click="exampleExercise.weight++">+</button>
          <button class="rounded-full bg-slate-200 text-slate-700 w-8 h-8" @click="exampleExercise.weight + 5">+5</button>
          </dd>
          <dt>
            Time
          </dt>
          <dd :class="!exampleExercise.time && 'text-slate-100/25'">
            {{ exampleExercise.time }}
          </dd>
        </dl>
        <div class="flex justify-around gap-6">
        <button type="button" :disabled="isRunning" class="rounded bg-indigo-500 grow py-1 disabled:(bg-indigo-300 cursor-not-allowed text-slate-200)" @click='startTimer'>
          Start
        </button>
        <button type="button" :disabled="!isRunning" class="rounded bg-indigo-500 grow py-1 disabled:(bg-indigo-300 cursor-not-allowed text-slate-200)" @click="endTimer">
          End
        </button>
        </div>
      </article>
    </section>
  </main>
</template>
