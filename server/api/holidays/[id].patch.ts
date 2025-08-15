import { defineEventHandler } from 'h3'
import { serverSupabaseUser } from '#supabase/server'
import { db } from '~/server/db'
import { holidays } from '~/server/db/schema'
import { eq } from 'drizzle-orm'
import { parse } from 'valibot'
import { UpdateHolidaySchema } from '~/server/utils/holidays'

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

    // Get holiday ID from params
    const id = getRouterParam(event, 'id')
    if (!id || isNaN(Number(id))) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid holiday ID',
      })
    }

    // Get and validate request body
    const body = await readBody(event)
    
    // Validate with Valibot
    const validatedData = parse(UpdateHolidaySchema, body)
    
    // Validate date logic if both dates are provided
    if (validatedData.date && validatedData.endDate) {
      const startDate = new Date(validatedData.date)
      const endDate = new Date(validatedData.endDate)
      const oneDayLater = new Date(startDate)
      oneDayLater.setDate(oneDayLater.getDate() + 1)
      
      if (endDate < oneDayLater) {
        throw createError({
          statusCode: 400,
          statusMessage: 'End date must be at least 1 day after start date',
        })
      }
    }

    // Update in database
    const [updatedHoliday] = await db
      .update(holidays)
      .set({
        ...validatedData,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(holidays.id, Number(id)))
      .returning()

    if (!updatedHoliday) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Holiday not found',
      })
    }

    return {
      success: true,
      data: updatedHoliday,
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

    // Handle auth and not found errors
    if (error.statusCode === 401 || error.statusCode === 404 || error.statusCode === 400) {
      throw error
    }

    // Handle other errors
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to update holiday',
    })
  }
})
