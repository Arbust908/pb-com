import type { ModelResponse } from 'ollama'

export interface OpenRouterModel {
  id: string
  name: string
  description: string
  pricing: {
    prompt: number
    completion: number
  }
}

export interface GroupedOpenRouterModels {
  name: string
  models: OpenRouterModel[]
  hasFreeModels: boolean
}

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
  parameter_size: '8b',
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
// openchat/openchat-7b:free
const OPENCHAT: ModelResponse = {
  ..._BASE_MODEL,
  name: 'openchat/openchat-7b:free',
  family: 'openchat',
  families: ['openchat'],
  parameter_size: '7b',
}
// google/gemma-7b-it:free
const GEMMA: ModelResponse = {
  ..._BASE_MODEL,
  name: 'google/gemma-7b-it:free',
  family: 'gemma',
  families: ['gemma'],
  parameter_size: '7b',
}
// meta-llama/llama-3-8b-instruct:free
const LLAMA_3_8B: ModelResponse = {
  ..._BASE_MODEL,
  name: 'meta-llama/llama-3-8b-instruct:free',
  family: 'llama',
  families: ['llama'],
  parameter_size: '8b',
}


export const allowedModels = [
  TOPPY_M,
  NOUS_CAPYBARA,
  MISTRAL,
  MYTHOMIST,
  CINEMATIKA,
  OPENCHAT,
  GEMMA,
  LLAMA_3_8B,
] satisfies ModelResponse[]

export const modelNames = allowedModels.map((model) => model.name) as  ModelResponse['name'][]
export const defaultModel = TOPPY_M.name as ModelResponse['name']

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
  text?: string
  role: 'user' | 'model' | 'error'
  timestamp?: number
}
