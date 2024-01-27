import type { AI_MODEL_RESPONSE, ChatMessage } from '@/types'

export function getResponseMsg(resp: AI_MODEL_RESPONSE) {
  const { choices } = resp
  const { message } = choices[0]
  return message.content
}

export function getNewId(msgs?: ChatMessage[]) {
  const lastId = msgs[msgs.length - 1]?.id || '0'
  const newId = parseInt(lastId) + 1
  return newId.toString()
}
