import { defineEventHandler } from 'h3'
import { ToDoType } from '~/types'

const getAllData = async () => {
  return [{ username: 'admin', password: 'admin', email: 'admin@email.com' }]
}

export default defineEventHandler(async () => {
  try {
    const all = await getAllData()

    if (!all)
      return { error: 'No data' }

    return { success: true, all }
  }
  catch (error: ToDoType) {
    return { error: error.message }
  }
})
