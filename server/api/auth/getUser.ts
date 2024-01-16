import { redisService } from '@/server/redis-service'

export default defineEventHandler(async (event) => {
  try {
    const username = await readBody(event)
    console.info('User', username)

    const result = await redisService.getUser(username)
    console.info(result)
    if (!result)
      return { error: 'User doesn`t exist' }

    return { success: true, username }
  }
  catch (error) {
    return { error: error.message }
  }
})
