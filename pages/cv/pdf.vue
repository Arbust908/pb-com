<script setup lang="ts">
import posthog from 'posthog-js'
import { storeToRefs } from "pinia";
import exp from "@/locales/en/exp";
import { useGeneralStore } from "~/composables";
import { useUP } from "~/composables/ultimateProtocol";
import type { MetaData } from "~/composables/ultimateProtocol";
const isDark = useDark()
const toggleDark = useToggle(isDark)
const exp_list = Object.keys(exp);
const { t, locale } = useI18n();
const meta: MetaData = {
  base_url: "panchoblanco.com",
  title: "Curriculum Vitae :: Pancho Blanco",
  description:
    "Hola soy Pancho Blanco, un Desarrollador y Diseñador Grafico. Estas son mis habilidades y experiencias. Tengo mas de 4 años en la industria del desarrollo y tengo una pasion por enseñar y aprender.",
};
useHead(useUP(meta));
const general_store = useGeneralStore();
const { print_mode } = storeToRefs(general_store);
const { togglePrintMode } = general_store;

const skill_list = ["web", "adobe", "other"];
const lang_list = ["es", "en"];
const learn_list = ["dh", "up", "slc"];

function birthday() {
  return new Date("06/14/1991").toLocaleDateString(locale.value, {
    dateStyle: "medium",
  });
}
const detailsShow = ref(false);
const isExpanded = ref(true);

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(locale.value, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}
function hasTranslation(key: string) {
  return t(key) !== key;
}

function onClick() {
  isExpanded.value = !isExpanded.value;
}

watch(print_mode, (isPrint) => {
  if (isPrint) isExpanded.value = true;
});

const DOCUMENT_OPTIONS = {
  format: "a4",
};
const HTML_OPTIONS = {
  autoPaging: true,
  html2canvas: {
    scale: 1,
  },
};
const exportFilename = computed(() => {
  return `FranBlanco-CV-${new Date().toLocaleDateString(locale.value, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })}-${locale.value}.pdf`;
});
const resume = ref<HTMLElement | null>(null);
watch(print_mode, (newVal) => {
  if (newVal) {
    const resumeEl = resume.value;
    if (resumeEl) {
      exportToPDF(exportFilename.value, resumeEl);
    }
  }
});
onMounted(() => {
  posthog.capture('seen PDF', { property: 'true' })
  toggleDark(false);
  print_mode.value = true;
  posthog.capture('download PDF', { property: 'true' })
});
</script>

<template>
  <div ref="resume" :class="print_mode && 'print'" class="relative layout-grid-popout">
    <section
      class="relative mb-4 rounded bg-slate-200/60 p-4 text-slate-800 shadow backdrop-blur-xl dark:(bg-slate-800/60 text-slate-200)">
      <picture>
        <source type="image/webp" srcset="/img/avatar.webp" />
        <img
          class="right-0 top-0 mb-4 border-2 border-slate-500 rounded object-cover shadow sm:(absolute h-40 w-32 top-4 right-4) md:w-40"
          src="/img/avatar.jpg" :alt="t('avatar.desc')" />
      </picture>
      <h2 class="text-3xl leading-none">Fran Blanco</h2>
      <h3 class="tracking-wider">
        {{ t("rol") }}
      </h3>
      <article class="mb-6 mt-2">
        <ul>
          <li class="mb-2 flex items-center gap-2">
            <span class="text-violet-600 dark:text-violet-300">
              Email
            </span>
            <span>arbust908@gmail.com</span>
          </li>
          <li class="mb-2 flex items-center gap-2">
            <span class=" text-violet-600 dark:text-violet-300">
              Birthday
            </span>
            <span>{{ birthday() }}</span>
          </li>
          <li class="mb-2 flex items-center gap-2">
            <span class=" text-violet-600 dark:text-violet-300">
              Location
            </span>
            <span>Buenos Aires, AR</span>
          </li>
        </ul>
      </article>
      <section class="mb-6">
        <h3 class="mb-2 flex items-center text-xl text-violet-600 dark:text-violet-400">
          <span> Skills </span>
        </h3>
        <article v-for="group in skill_list" :key="group" class="mb-2">
          <h4 class="mb-1 font-bold underline opacity-75">
            {{ t(`skills.${group}.title`) }}
          </h4>
          <p class="text-sm text-slate-800 dark:text-slate-200">
            {{ t(`skills.${group}.list`) }}
          </p>
        </article>
      </section>
      <section class="mb-2">
        <h3 class="flex items-center text-xl">
          <span> {{ t("lang_title") }} </span>
        </h3>
        <article v-for="lang in lang_list" :key="lang" class="mb-1 flex justify-between">
          <h4 class="mb-1 font-bold">
            {{ t(`tongues.${lang}.name`) }}
          </h4>
          <p class="text-slate-800 dark:text-slate-200">
            {{ t(`tongues.${lang}.level`) }}
          </p>
        </article>
      </section>
      <footer class="my-2 flex items-center">
        <div class="w-full text-right text-sm opacity-75">
          {{ t("last_update") }}
          {{
            new Intl.DateTimeFormat(locale, {
              dateStyle: "long",
            }).format(new Date())
          }}
        </div>
      </footer>
    </section>
    <section>
      <h2 id="exp" class="mb-2 ml-4 text-3xl">
        {{ $t("exp_title") }}
      </h2>

      <div v-for="job in exp_list" :key="job">
        <article :class="!hasTranslation(`exp.${job}.end`)
            ? 'border-violet-700 dark:border-violet-300'
            : 'border-slate-300 dark:border-slate-600'
          "
          class="grid grid-cols-1 mb-4 gap-2 border rounded p-4 text-slate-800 bg-checked bg-checked dark:text-slate-200"
          :key="locale">
          <h3 class="flex flex-col cursor-pointer font-bold lg:flex-row sm:flex-row md:flex-col" @click="onClick">
            <span>{{ $t(`exp.${job}.rol`) }}</span>
            <span class="hidden px-2 lg:inline sm:inline md:hidden"> / </span>
            <span class="text-emerald-500">
              {{ $t(`exp.${job}.company`) }}
            </span>
          </h3>
          <div class="text-sm leading-relaxed">
            <span>{{ formatDate($t(`exp.${job}.start`)) }}</span> -
            <span v-if="!hasTranslation(`exp.${job}.end`)"
              class="rounded bg-emerald-800 px-2 text-emerald-300 font-bold dark:bg-emerald-300 dark:text-emerald-800">
              Actual
            </span>
            <span v-else>{{ formatDate($t(`exp.${job}.end`)) }}</span>
          </div>
            <p>
              <span v-html="hasTranslation(`exp.${job}.more`)
                  ? $t(`exp.${job}.more`)
                  : $t(`exp.${job}.description`)
                " />
            </p>
        </article>
      </div>
    </section>
    <section>
      <h2 id="study" class="mb-2 ml-4 text-3xl">
        {{ $t("study_title") }}
      </h2>
      <article v-for="study in learn_list" :key="study"
        class="mb-4 cursor-pointer border-l-2 border-violet-400 p-4 text-slate-700 dark:text-slate-300">
        <h3 class="flex flex-row items-center gap-x-3">
          <span class="font-bold">
            {{ $t(`study.${study}.place`) }}
          </span>
          <span class="text-sm">
            {{ $t(`study.${study}.date`) }}
          </span>
        </h3>
        <p class="mt-2 font-light">
          {{ $t(`study.${study}.description`) }}
        </p>
      </article>
    </section>
  </div>
</template>
