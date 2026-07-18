import { defineEventHandler } from 'h3'
import { eq } from 'drizzle-orm'
import { db } from '~/server/db'
import { holidays } from '~/server/db/schema'

export default defineEventHandler(async (event) => {
  try {
    // Get holiday ID from params
    const id = getRouterParam(event, 'id')
    if (!id || Number.isNaN(Number(id))) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid holiday ID',
      })
    }

    // Delete from database
    const [deletedHoliday] = await db
      .delete(holidays)
      .where(eq(holidays.id, Number(id)))
      .returning()

    if (!deletedHoliday) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Holiday not found',
      })
    }

    return {
      success: true,
      data: deletedHoliday,
    }
  }
  catch (error: any) {
    // Handle auth and not found errors
    if (error.statusCode === 401 || error.statusCode === 404 || error.statusCode === 400) {
      throw error
    }

    // Handle other errors
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to delete holiday',
    })
  }
})
