import { defineEventHandler } from 'h3'
import { ToDoType } from '~/types'

export default defineEventHandler(async (event) => {
  try {
    const { username, password } = await readBody(event)
    if (!username || !password)
      return { error: 'No data' }
    if (username !== 'admin' || password !== 'admin')
      return { error: 'Invalid credentials' }

    const user = { username, password, email: 'admin@email.com' }

    return { success: true, user }
  }
  catch (error: ToDoType) {
    return { error: error.message }
  }
})
