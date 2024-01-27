export const allowedModels = {
  CAPYBARA: 'capybara-7b',
  CINEMATIKA: 'cinematika-7b',
  MIXTRAL: 'mixtral-8x7b',
  MYTHOMIST: 'mythomist-7b',
  OPENCHAT: 'openchat-7b',
  PPLX: 'pplx-7b',
  WORLD: 'world-3b',
  ZEPHYR: 'zephyr-7b',
} as const
export type MODEL_TYPES = typeof allowedModels[keyof typeof allowedModels]
export const modelRepos = {
  CAPYBARA: 'nousresearch/nous-capybara-7b',
  CINEMATIKA: 'openrouter/cinematika-7b',
  MIXTRAL: 'mistralai/mixtral-8x7b-instruct',
  MYTHOMIST: 'gryphe/mythomist-7b',
  OPENCHAT: 'openchat/openchat-7b',
  PPLX: 'perplexity/pplx-7b-online',
  WORLD: 'rwkv/rwkv-5-world-3b',
  ZEPHYR: 'huggingfaceh4/zephyr-7b-beta',
} as const
export type MODEL_REPO_TYPES = typeof modelRepos[keyof typeof modelRepos]
// Check that a string is a valid model type
export function isModelType(str: string): str is MODEL_TYPES {
  return Object.values(allowedModels).includes(str as MODEL_TYPES)
}

export const modelRepoMap: Record<MODEL_TYPES, MODEL_REPO_TYPES> = {
  [allowedModels.CAPYBARA]: modelRepos.CAPYBARA,
  [allowedModels.CINEMATIKA]: modelRepos.CINEMATIKA,
  [allowedModels.MIXTRAL]: modelRepos.MIXTRAL,
  [allowedModels.MYTHOMIST]: modelRepos.MYTHOMIST,
  [allowedModels.OPENCHAT]: modelRepos.OPENCHAT,
  [allowedModels.PPLX]: modelRepos.PPLX,
  [allowedModels.WORLD]: modelRepos.WORLD,
  [allowedModels.ZEPHYR]: modelRepos.ZEPHYR,
}
// get the repo name from the model type
export function getModelRepo(model: MODEL_TYPES) {
  return modelRepoMap[model]
}

export interface AI_MODEL_REQUEST_CLIENT {
  model: MODEL_TYPES
  message: string
}

export interface AI_MODEL_REQUEST_SERVER {
  model: MODEL_REPO_TYPES
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
  id: string
  text: string
  role: 'user' | 'model'
}