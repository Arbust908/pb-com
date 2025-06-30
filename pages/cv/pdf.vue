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
      Fran Blanco | Senior Front‑End Engineer
Buenos Aires, AR • me@panchoblanco.dev • https://github.com/Arbust908 • LinkedIn/in/panchoblanco
────────────────────────────────────────────────────────────────────────
ABOUT ME
Creative, product‑minded Front‑End Engineer with 8 y building Vue / React applications at scale.
Blend of UI craftsmanship and leadership—have led teams of up to 6 devs and migrated legacy
stacks to modern TypeScript/SSR setups that improved load times by *40 %* and boosted conversion
by *15 %*.

EXPERIENCE
Front‑End Engineer · Demand.io — Remote Oct 2022 – Present
• Spearheaded migration of core e‑commerce app from Vue 2 to Vue 3 + Vite, cutting bundle size
  by *28 %* and reducing first contentful paint to *<1.2 s*.  
• Championed design‑system adoption (UnoCSS + Storybook) enabling 3 squads to ship features
  *30 %* faster with consistent accessibility compliance (WCAG AA).  
• Mentored 4 junior devs; two promoted to mid‑level within 12 months.

Senior FE Lead · B1tPatagonia Jul 2020 – Oct 2022
• Oversaw 5‑developer team delivering multilingual logistics PWA; processed *7 k* daily shipments,
  uptime >99.95 %.  
• Devised incremental SSR strategy with Next.js that lifted organic traffic by *22 %* YoY.  
• Coordinated React‑Native offshoot app, decreasing driver onboarding time from 45 min → 18 min.

Front‑End Developer · Viafoura (contract) Mar 2021 – Dec 2021
• Modularised legacy Backbone widgets into Vue v2 components; cut maintenance hours by
  *10 h / sprint*.  
• Led brainstorm for v3 architecture; prototypes approved by C‑suite, now revenue‑generating.

(Older roles available on request)

KEY PROJECTS
• **MercadoCat** – Adoption platform built with Vue + Laravel; facilitated >100 pet adoptions.  
• **Bittrack** – Real‑time blockchain tracker (Nuxt + D3); reached *5 k* MAU organically.

SKILLS
Front‑End → Vue 3 / Nuxt 3, React, Next.js, TypeScript, Tailwind / UnoCSS  
Tooling  → Vite, Vitest/Jest, CI CD (GitHub Actions), Storybook, SEO/Lighthouse  
Back‑End → Node/Express, Prisma, REST/GraphQL, SQL basics  
Design  → Figma, Adobe XD, Photoshop (atomic‑design advocate)  
Soft   → Team leadership, Stakeholder comms, Remote mentoring

EDUCATION
Digital House – Full‑Stack Dev Bootcamp 2016  
Universidad de Palermo – Multimedia Design (in progress) 2009 – 2013

LANGUAGES Spanish (native) • English (C1)


    </section>
  </div>
</template>
