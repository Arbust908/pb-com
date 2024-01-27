import { defineEventHandler } from 'h3'
import { ToDoType } from '~/types'

/* import { z } from 'zod' */
/* const userSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
}) */

export default defineEventHandler(async (event) => {
  try {
    const user = await readBody(event)
    console.info('User', user)

    return { success: true, user }
  }
  catch (error: ToDoType) {
    return { error: error.message }
  }
})
