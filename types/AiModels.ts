import type { ModelResponse } from 'ollama'

const _BASE_MODEL: ModelResponse = {
  name: '',
  modified_at: new Date(),
  size: 0,
  digest: '',
  format: '',
  family: '',
  families: [],
  parameter_size: '',
  quatization_level: 0,
}
const NOUS_CAPYBARA: ModelResponse = {
  ..._BASE_MODEL,
  name: 'nousresearch/nous-capybara-7b:free',
  family: 'capybara',
  families: ['capybara'],
  parameter_size: '8k',
}
const MISTRAL: ModelResponse = {
  ..._BASE_MODEL,
  name: 'mistralai/mistral-7b-instruct:free',
  family: 'mistral',
  families: ['mistral'],
  parameter_size: '7b',
}
const MYTHOMIST: ModelResponse = {
  ..._BASE_MODEL,
  name: 'gryphe/mythomist-7b:free',
  family: 'mythomist',
  families: ['mythomist'],
  parameter_size: '7b',
}
const TOPPY_M: ModelResponse = {
  ..._BASE_MODEL,
  name: 'undi95/toppy-m-7b:free',
  family: 'toppy-m',
  families: ['toppy-m'],
  parameter_size: '7b',
}
const CINEMATIKA: ModelResponse = {
  ..._BASE_MODEL,
  name: 'openrouter/cinematika-7b:free',
  family: 'cinematika',
  families: ['cinematika'],
  parameter_size: '7b',
}

export const allowedModels = [
  NOUS_CAPYBARA,
  MISTRAL,
  MYTHOMIST,
  TOPPY_M,
  CINEMATIKA,
  /* CAPYBARA: 'capybara-7b',
  CINEMATIKA: 'cinematika-7b',
  MIXTRAL: 'mixtral-8x7b',
  MYTHOMIST: 'mythomist-7b',
  OPENCHAT: 'openchat-7b',
  PPLX: 'pplx-7b',
  WORLD: 'world-3b',
  ZEPHYR: 'zephyr-7b', */
] satisfies ModelResponse[]

export interface AI_MODEL_REQUEST_CLIENT {
  model: ModelResponse['name']
  message: string
}

export interface AI_MODEL_REQUEST_SERVER {
  model: ModelResponse['name']
  messages: {
    role: string
    content: string
  }[]
  // Optional
/*   max_tokens?: number
  temperature?: number
  top_p?: number
  n?: number
  logprobs?: number
  stop?: string[]
  presence_penalty?: number
  frequency_penalty?: number
  best_of?: number
  logit_bias?: Record<string, number>
  echo?: boolean
  stream?: boolean */
}

export interface AI_MODEL_RESPONSE {
  id: string
  model: string
  choices: {
    message: {
      role: string
      content: string
    }
  }[]
  created: number
  object: string
}

export interface ChatMessage {
  id?: string
  text: string
  role: 'user' | 'model' | 'error'
}
