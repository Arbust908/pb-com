import { eq } from 'drizzle-orm'
import { db } from '~/server/db'
import { cvExperiences, cvStudies, cvSkills, cvLanguages } from '~/server/db/schema'
import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  try {
    // Auth check
    const user = await serverSupabaseUser(event)
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      })
    }

    const body = await readBody(event)
    const { entityType, orderedIds } = body as { entityType: string; orderedIds: number[] }

    if (!entityType || !['experience', 'study', 'skill', 'language'].includes(entityType)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid entity type',
      })
    }

    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'orderedIds must be a non-empty array',
      })
    }

    // Get the table based on entity type
    const tableMap = {
      experience: cvExperiences,
      study: cvStudies,
      skill: cvSkills,
      language: cvLanguages,
    } as const

    const table = tableMap[entityType as keyof typeof tableMap]

    // Update sortOrder for each item
    const updates = orderedIds.map((id, index) =>
      db
        .update(table)
        .set({ sortOrder: index, updatedAt: new Date().toISOString() })
        .where(eq(table.id, id))
    )

    await Promise.all(updates)

    return {
      success: true,
      message: `Reordered ${orderedIds.length} ${entityType}s`,
    }
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    const message = error instanceof Error ? error.message : 'Failed to reorder items'
    throw createError({
      statusCode: 500,
      statusMessage: message,
    })
  }
})
