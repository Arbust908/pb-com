import { defineEventHandler } from 'h3'
import { serverSupabaseUser } from '#supabase/server'
import { db } from '~/server/db'
import { holidays } from '~/server/db/schema'
import { parse } from 'valibot'
import { CreateHolidaySchema, validateHolidayDates } from '~/server/utils/holidays'

export default defineEventHandler(async (event) => {
  try {
    // Check authentication
    const user = await serverSupabaseUser(event)
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      })
    }

    // Get and validate request body
    const body = await readBody(event)
    
    // Validate with Valibot
    const validatedData = parse(CreateHolidaySchema, body)
    
    // Validate date logic
    const finalData = validateHolidayDates(validatedData)

    // Insert into database
    const [newHoliday] = await db
      .insert(holidays)
      .values({
        name: finalData.name,
        date: finalData.date,
        endDate: finalData.endDate,
      })
      .returning()

    return {
      success: true,
      data: newHoliday,
    }
  } catch (error: any) {
    // Handle validation errors
    if (error.issues) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Validation failed',
        data: error.issues,
      })
    }
    
    // Handle custom validation error
    if (error.message?.includes('End date must be')) {
      throw createError({
        statusCode: 400,
        statusMessage: error.message,
      })
    }

    // Handle auth errors
    if (error.statusCode === 401) {
      throw error
    }

    // Handle other errors
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to create holiday',
    })
  }
})
