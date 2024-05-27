import { allowedModels } from "~/types"

export default defineEventHandler(async () => {
  try {
    return allowedModels
  }
  catch (error) {
    console.error(error)
    return { error: error?.message }
  }
})
