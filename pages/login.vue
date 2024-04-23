<script setup lang="ts">
import type { ActionTypes, User } from "~/types";
import { fullActions } from "~/types";

const userStore = useUserStore();

const email = ref<string>("");
const password = ref<string>("");
const errorMsg = ref<string | null>(null);

const action = ref<ActionTypes>("LOGIN");

function changeType() {
 action.value = action.value === "LOGIN" ? "REGISTER" : "LOGIN";
}

async function onSubmit(event: Event) {
 errorMsg.value = null;
 console.log(`onSubmit::${action.value}`);
 event.preventDefault();

 const actionUrl = fullActions[action.value];
 const user = {
  email: email.value,
  password: password.value,
 } as User;

 const result = await $fetch(actionUrl, {
  method: "POST",
  body: JSON.stringify(user),
 });
 console.log(result);
 if (result.success) {
  console.log(result);
  userStore.currentUser = result.data;
  userStore.isLoggedIn = true;
  console.log("userStore.currentUser", userStore.currentUser);
  await navigateTo("/profile");
 } else if (result.error) {
  errorMsg.value = result.error;
 }
}
</script>

<template>
  <div class="flex items-start justify-center py-20">
    <article class="relative rounded-lg bg-slate-100 p-6 shadow-lg dark:bg-slate-800">
      <h1 class="mb-4 text-center text-2xl font-bold capitalize">
        {{ action.toLowerCase() }}
      </h1>
      <form class="grid grid-cols-[auto_1fr] items-baseline gap-x-2 gap-y-4 text-slate-700 dark:text-slate-200" @submit="onSubmit">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="text" class="rounded-lg bg-slate-200 px-3 py-2 dark:bg-slate-700">
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" class="rounded-lg bg-slate-200 px-3 py-2 dark:bg-slate-700">
        <button type="submit" class="col-start-2 rounded-lg bg-purple-700 px-4 py-2 text-slate-100 capitalize">
          {{ action.toLowerCase() }}
        </button>
      </form>
      <p v-if="errorMsg" class="mt-4 text-red-600">
        {{ errorMsg }}
      </p>
      <p v-if="userStore.currentUser" class="mt-4 text-pink-600">
        {{ userStore.currentUser }}
      </p>
      <button class="absolute bottom-1 right-1 p-4" @click="changeType">
        <p class="h-1 w-1 rounded-full bg-slate-500" />
      </button>
    </article>
  </div>
</template>

<style scoped>
label:has(input[type='checkbox']) {
  grid-column: 2;
}
/*
form {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 1rem;
  justify-items: start;
}

Jus' throw a load of label + input in 🙏

:has() for the little visual niceties ✨
 */
</style>
