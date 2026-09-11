<script setup lang="ts">
import { AnimatePresence, motion, MotionConfig } from 'motion-v'

interface Props {
  title: string
}

defineProps<Props>()
</script>

<template>
  <section class="gap-y-4 overflow-clip border-t-4 border-slate-300 pb-10 lg:grid lg:grid-cols-12 lg:gap-x-8 dark:border-slate-700 lg:pb-16">
    <div class="ml-2 lg:col-span-full -mt-2">
      <MotionConfig reduced-motion="user">
        <AnimatePresence>
          <motion.p
            class="text-4xl text-slate-300 font-mono uppercase italic dark:text-slate-700"
            :initial="{ y: -10, opacity: 0 }"
            :animate="{ y: 0, opacity: 1 }"
            :exit="{ y: -10, opacity: 0, transition: { duration: 0.12 } }"
          >
            {{ title }}
          </motion.p>
        </AnimatePresence>
      </MotionConfig>
    </div>
    <slot>
      <div class="grid gap-3 lg:col-span-9 lg:col-start-4 md:grid-cols-2 lg:pr-6">
        <slot name="cards" />
      </div>
    </slot>
  </section>
</template>
