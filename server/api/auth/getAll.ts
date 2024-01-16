import { defineEventHandler } from 'h3'
import { redisService } from '@/server/redis-service'

export default defineEventHandler(async () => {
  try {
    const all = await redisService.getAllData()

    if (!all)
      return { error: 'No data' }

    return { success: true, all }
  }
  catch (error) {
    return { error: error.message }
  }
})
