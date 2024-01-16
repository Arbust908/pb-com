import { defineEventHandler } from 'h3'
import { z } from 'zod'
import { redisService } from '@/server/redis-service'
import { hashPassword } from '~/server/hushHush'

const userSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
})

export default defineEventHandler(async (event) => {
  try {
    const user = await readBody(event)
    console.info('User', user)
    userSchema.parse(user)
    const newUser = { ...user, password: await hashPassword(user.password) }

    const result = await redisService.addUser(newUser)
    console.info(result)
    if (!result)
      return { error: 'User already exists' }

    return { success: true, user }
  }
  catch (error) {
    return { error: error.message }
  }
})
