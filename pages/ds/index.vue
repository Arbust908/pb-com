<script setup lang="ts">
import { useStorage } from "@vueuse/core";

const container = ref(null);
const { tilt, roll, source } = useParallax(document?.body);
const isHovered = useElementHover(container);
watch(isHovered, (value) => {
 console.log("isHovered", value);
});
const isLeft = usePageLeave();

const vault = useStorage("my-vault", {});

function checkVaultUser() {
 if (vault.value?.user && vault.value?.expiration) {
  const now = new Date();
  const expiration = new Date(vault.value.expiration);
  if (now < expiration) {
   isLoggedIn.value = true;
   console.log("Logged via vault", vault.value);
  }
 }
}

function checkParamUser() {
 const params = new URLSearchParams(window.location.search);
 const newParams = params
  .toString()
  .split("&")
  .reduce((acc, cur) => {
   const [key, value] = cur.split("=");
   acc[key] = value;
   return acc;
  }, {}) as { u: string; p: string };

 if (newParams && newParams?.u && newParams?.p) {
  user.value = newParams.u;
  password.value = newParams.p;
  onSubmit(new Event("submit"));
 }
}

onMounted(() => {
 console.log("state", vault.value);
 checkVaultUser();
 if (!isLoggedIn.value) checkParamUser();

 setTimeout(() => {
  checkVaultUser();
  if (!isLoggedIn.value) checkParamUser();
 }, 1000 * 1);
});

const user = ref("");
const password = ref("");
const isLoggedIn = ref(false);
async function onSubmit(event: Event) {
 event.preventDefault();

 const result = (await $fetch("/api/auth/simpleAuth", {
  method: "POST",
  body: JSON.stringify({
   user: user.value,
   password: password.value,
  }),
 })) as { success: boolean; user: any };

 if (result.success) {
  isLoggedIn.value = true;
  vault.value = { ...result.user };
 }
}
</script>

<template>
  <main ref="container" class="p-6">
    <form
      v-if="!isLoggedIn"
      class="grid grid-cols-[auto_1fr] items-baseline gap-x-2 gap-y-4 text-slate-700 dark:text-slate-200"
      @submit="onSubmit"
    >
      <label for="username">Username</label>
      <input
        id="username"
        v-model="user"
        type="text"
        class="rounded-lg bg-slate-200 px-3 py-2 dark:bg-slate-700"
      >
      <label for="password">Password</label>
      <input
        id="password"
        v-model="password"
        type="password"
        class="rounded-lg bg-slate-200 px-3 py-2 dark:bg-slate-700"
      >
      <button
        type="submit"
        class="col-start-2 rounded-lg bg-purple-700 px-4 py-2 text-slate-100 capitalize"
      >
        Login
      </button>
    </form>
    <template v-else>
      <article ref="container" class="rounded bg-rose-500 p-6">
        <h2>Parallax</h2>
        <dl class="grid grid-cols-2 gap-2">
          <dt class="text-lg font-bold">
            Tilt
          </dt>
          <dd class="text-xl">
            {{ tilt }}
          </dd>
          <dt class="text-lg font-bold">
            Roll
          </dt>
          <dd class="text-xl">
            {{ roll }}
          </dd>
          <dt class="text-lg font-bold">
            Source
          </dt>
          <dd class="text-xl">
            {{ source }}
          </dd>
        </dl>
      </article>
      <TestPikachuCard />
      <TestParallaxCard />
      <!-- <TestFoilCard /> -->
    </template>
  </main>
</template>

<style scoped></style>
