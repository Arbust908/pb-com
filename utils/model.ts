import type { AI_MODEL_RESPONSE } from '@/types'

export function getResponseMsg(resp: AI_MODEL_RESPONSE) {
  const { choices } = resp
  const { message } = choices[0]
  return message.content
}
