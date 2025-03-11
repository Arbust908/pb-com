import { OpenRouterModel } from "~/types"

export default defineEventHandler(async () => {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/models')
    const models = await response.json()

    return models.data as OpenRouterModel[]
  }
  catch (error) {
    console.error(error)
    return { error: error?.message }
  }
})
