import { defineEventHandler } from 'h3'
import { serverSupabaseClient } from '#supabase/server'
import { ToDoType, User } from '~/types'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  try {
    const { email, password } = await readBody(event) as User
    console.log({ email, password })
    if (!email || !password)
      return { error: 'No data' }

    const { data, error } = await client.auth.signInWithPassword({ email, password })
    console.info(data, error)
    if (error)
    throw new Error(error.message)

  return { success: true, data }
  }
  catch (error: ToDoType) {
    return { error: error.message }
  }
})
