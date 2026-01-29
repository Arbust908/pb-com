import { defineEventHandler } from 'h3'
import { asc } from 'drizzle-orm'
import { db } from '~/server/db'
import { holidays } from '~/server/db/schema'

export default defineEventHandler(async () => {
  try {
    // Fetch all holidays ordered by date
    const allHolidays = await db
      .select()
      .from(holidays)
      .orderBy(asc(holidays.date))

    return {
      success: true,
      data: allHolidays,
    }
  }
  catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to fetch holidays',
    })
  }
})
