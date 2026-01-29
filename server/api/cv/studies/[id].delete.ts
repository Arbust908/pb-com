import { and, eq } from 'drizzle-orm'
import { db } from '~/server/db'
import { cvStudies, cvTranslations } from '~/server/db/schema'
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

    const id = getRouterParam(event, 'id')
    if (!id || Number.isNaN(Number(id))) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid study ID',
      })
    }

    // Get study to get its slug
    const [existing] = await db
      .select()
      .from(cvStudies)
      .where(eq(cvStudies.id, Number(id)))

    if (!existing) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Study not found',
      })
    }

    // Delete translations first
    await db
      .delete(cvTranslations)
      .where(
        and(
          eq(cvTranslations.entityType, 'study'),
          eq(cvTranslations.entitySlug, existing.slug),
        ),
      )

    // Delete study
    const [deletedStudy] = await db
      .delete(cvStudies)
      .where(eq(cvStudies.id, Number(id)))
      .returning()

    return {
      success: true,
      data: deletedStudy,
    }
  }
  catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    const message = error instanceof Error ? error.message : 'Failed to delete study'
    throw createError({
      statusCode: 500,
      statusMessage: message,
    })
  }
})
