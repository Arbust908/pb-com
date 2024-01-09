<script lang="ts" setup>
import { createWorker } from 'tesseract.js'

const worker = ref<any>(null)
const finalText = ref('')
const reading = ref(false)

async function recognizeText(event: Event) {
  if (!worker.value)
    return
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file)
    return
  console.info(file)
  reading.value = true

  const { data: { text } } = await worker.value.recognize(file)
  console.log(text)
  finalText.value = text
  reading.value = false
}

onMounted(async () => {
  // is on the client side
  if (typeof window !== 'undefined')
    worker.value = await createWorker('spa')
})
</script>

<template>
  <div class="px-2 space-y-5">
    <input id="select" type="file" accept="image/png, image/gif, image/webp, image/jpeg" @change="recognizeText">
    <pre class="min-h-4 w-full border rounded bg-transparent text-slate-200">
    <code>
      <i v-if="reading" class="i-svg-spinners:3-dots-fade mx-4 size-5" />
      {{ finalText }}
    </code>
    </pre>
  </div>
</template>

<style>

</style>
