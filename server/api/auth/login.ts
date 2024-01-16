import { defineEventHandler } from 'h3'
import { redisService } from '@/server/redis-service'
import { verifyPassword } from '@/server/hushHush'

export default defineEventHandler(async (event) => {
  try {
    const { username, password } = await readBody(event)
    const user = await redisService.getUser(username)

    if (!user)
      return { error: 'No user found' }
    if (await verifyPassword(password, user.password))
      return { error: 'Invalid credentials' }

    return { success: true, user }
  }
  catch (error) {
    return { error: error.message }
  }
})
