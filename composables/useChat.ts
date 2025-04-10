import type { ModelResponse } from 'ollama'
import type { ChatMessage, OPEN_ROUTER_MODELS } from '~/types'

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
    const userMessageTimestamp = Date.now()
    const payload = {
      message: newMessage.value,
      model: selectedModel.value.name,
    }
    console.log('payload', payload)
    try {
      console.log('try')
      console.log('assistantUrl', chatStructure)
      const newMsg = {
        id: getNewId(messages.value),
        text: newMessage.value,
        role: 'user',
        timestamp: userMessageTimestamp,
      }
      messages.value.push(newMsg)

      const data = await $fetch(`/api/assistant/${chatStructure}`, {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      console.log('data', data)
      const responseText = getResponseMsg(data, chatStructure)

      messages.value.push({ id: data.id, text: responseText, role: 'model', timestamp: Date.now() })
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
  function openRouterGroups(models: OPEN_ROUTER_MODELS[]) {
    return models.reduce((acc, model) => {
      const group = model.name.split('/')[0]
      if (!acc.includes(group)) acc.push(group)
      return acc
    }, [] as string[])
  }
  function isOpenRouterFreeModel(model: OPEN_ROUTER_MODELS) {
    const idContainsFree = model.id.includes(':free')
    const nameContainsFree = model.name.includes('(free)')
    const pricingIsFree = Number(model.pricing.completion) === 0 && Number(model.pricing.image) === 0 && Number(model.pricing.request) === 0 && Number(model.pricing.prompt) === 0
    return pricingIsFree && (idContainsFree || nameContainsFree)
  }
  async function getModels(provider: 'ollama' | 'openRouter') {
    try {
      const _provider = provider ?? 'ollama'
      const data = await $fetch<ModelResponse[]>(`/api/assistant/${_provider}/models`)

      if (provider === 'openRouter') {
        const freeModels = (data as unknown as OPEN_ROUTER_MODELS[])?.filter(isOpenRouterFreeModel)
        selectedModel.value = freeModels.sort((a,b) => a.context_length - b.context_length)[0]
      }

      models.value = data
    }
    catch (error) {
      console.error(error)
    }
  }

  const ROLE_STYLES = {
    user: 'bg-emerald-500 -mr-2 ml-auto rounded-br-none',
    model: 'bg-indigo-500 -ml-2 mr-auto rounded-bl-none',
    error: 'bg-red-100 mx-auto rounded-md text-red-500 text-center text-xs font-bold',
  }

  const DEFAULT_STRUCTURE = 'openRouter'
  const CHAT_STRUCTURE = ref<'ollama' | 'openRouter'>(DEFAULT_STRUCTURE)
  function toggleChatStructure() {
    CHAT_STRUCTURE.value = CHAT_STRUCTURE.value === 'ollama' ? 'openRouter' : 'ollama'
  }

  const selectedModelInfo = computed(() => {
    if (!selectedModel.value) return {
      displayName: 'Missing Name',
      specialText: 'No info'
    }
    return formatModelInfo(selectedModel.value)
  });
  const modelDisplayName = computed(() => selectedModelInfo.value?.displayName)
  const modelModalText = computed(() => selectedModelInfo.value?.specialText)
  function formatModelInfo(model: ModelResponse) {
    const nameKeyWords = [':latest', '-uncensored', ':free']
    const specials: string[] = []
    let displayName = model.name;
    nameKeyWords.forEach(keyword => {
      if (displayName.includes(keyword)) {
        specials.push(keyword.replace(':', '').replace('-', ''))
        displayName = displayName.replace(keyword, '');
      }
    });

    if (displayName.includes('/')) {
      const parts = displayName.split('/');
      displayName = parts[1];
    }

    displayName = displayName.replace(/-\d{1,2}b/, '');
    displayName = displayName.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');

    return {
      displayName,
      specialText: joinArrayWithDifferentLastElement(specials, ', ', ' & ')
    }
  }

  onMounted(async () => {
    await getModels(CHAT_STRUCTURE.value)
    selectModel(models.value[0])
  })


  return {
    models,
    selectedModel,
    selectModel,
    messages,
    newMessage,
    isResponding,
    sendMessage,
    getModels,
    ROLE_STYLES,
    CHAT_STRUCTURE,
    toggleChatStructure,
    modelDisplayName,
    modelModalText,
    formatModelInfo,
    openRouterGroups,
isOpenRouterFreeModel,
  }
}
