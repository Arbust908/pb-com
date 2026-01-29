import { and, eq } from 'drizzle-orm'
import { db } from '~/server/db'
import { cvExperiences, cvTranslations } from '~/server/db/schema'
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
        statusMessage: 'Invalid experience ID',
      })
    }

    // Get experience to get its slug
    const [existing] = await db
      .select()
      .from(cvExperiences)
      .where(eq(cvExperiences.id, Number(id)))

    if (!existing) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Experience not found',
      })
    }

    // Delete translations first
    await db
      .delete(cvTranslations)
      .where(
        and(
          eq(cvTranslations.entityType, 'experience'),
          eq(cvTranslations.entitySlug, existing.slug),
        ),
      )

    // Delete experience
    const [deletedExperience] = await db
      .delete(cvExperiences)
      .where(eq(cvExperiences.id, Number(id)))
      .returning()

    return {
      success: true,
      data: deletedExperience,
    }
  }
  catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    const message = error instanceof Error ? error.message : 'Failed to delete experience'
    throw createError({
      statusCode: 500,
      statusMessage: message,
    })
  }
})
