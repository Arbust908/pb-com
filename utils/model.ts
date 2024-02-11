import type { AI_MODEL_RESPONSE, ChatMessage } from '@/types'

export function _getOpenRouterResponseMsg(resp: AI_MODEL_RESPONSE) {
  const { choices } = resp
  const { message } = choices[0]
  return message.content
}
export function _getOllamaResponseMsg(resp) {
  console.log('resp', resp)
  const { message } = resp
  console.log('message', message)
  console.log('message.content', message.content)
  return message.content
}
export function getResponseMsg(resp: AI_MODEL_RESPONSE, structure: 'ollama' | 'openrouter') {
  return structure === 'ollama' ? _getOllamaResponseMsg(resp) : _getOpenRouterResponseMsg(resp)
}

export function getNewId(msgs?: ChatMessage[]) {
  const lastId = msgs[msgs.length - 1]?.id || '0'
  const newId = parseInt(lastId) + 1
  return newId.toString()
}
