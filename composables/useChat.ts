import type { ModelResponse } from 'ollama'
import type { ChatMessage } from '~/types'

export function useChat() {
  const selectedModel = ref<ModelResponse>()
  const models = ref<ModelResponse[]>([])
  function selectModel(model: ModelResponse) {
    selectedModel.value = model
  }

  const messages = ref<ChatMessage[]>([])
  const newMessage = ref('')
  const isResponding = ref(false)
  const errorMsg = ref('')
  watch(errorMsg, (val) => {
    if (val) {
      messages.value.push({ id: Date.now().toString(), text: val, role: 'error' })
      errorMsg.value = ''
    }
  })
  async function sendMessage(chatStructure: string) {
    isResponding.value = true
    if (!selectedModel.value) {
      errorMsg.value = 'Please select a model'
      isResponding.value = false
      return
    }
    if (!newMessage.value) {
      errorMsg.value = 'Please enter a message'
      isResponding.value = false
      return
    }

    const payload = {
      message: newMessage.value,
      model: selectedModel.value.name,
    }
    console.log('payload', payload)
    try {
      console.log('try')
      console.log('assistantUrl', chatStructure)
      const data = await $fetch(`/api/assistant/${chatStructure}`, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      const newMsg = { id: getNewId(messages.value), text: newMessage.value, role: 'user' }
      messages.value.push(newMsg)
      console.log('data', data)
      const responseText = getResponseMsg(data, chatStructure)

      messages.value.push({ id: data.id, text: responseText, role: 'model' })
      newMessage.value = ''
    }
    catch (error) {
      console.error(error)
      errorMsg.value = error.message
    }
    finally {
      isResponding.value = false
    }
  }
  async function getModels(provider: 'ollama' | 'openRouter') {
    try {
      const _provider = provider ?? 'ollama'
      const data = await $fetch<ModelResponse[]>(`/api/assistant/${_provider}/models`)

      models.value = data
    }
    catch (error) {
      console.error(error)
    }
  }

  return {
    models,
    selectedModel,
    selectModel,
    messages,
    newMessage,
    isResponding,
    sendMessage,
    getModels,
  }
}
