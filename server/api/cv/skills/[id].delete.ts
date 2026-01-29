import { and, eq } from 'drizzle-orm'
import { db } from '~/server/db'
import { cvSkills, cvTranslations } from '~/server/db/schema'
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
        statusMessage: 'Invalid skill ID',
      })
    }

    // Get skill to get its slug
    const [existing] = await db
      .select()
      .from(cvSkills)
      .where(eq(cvSkills.id, Number(id)))

    if (!existing) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Skill not found',
      })
    }

    // Delete translations first
    await db
      .delete(cvTranslations)
      .where(
        and(
          eq(cvTranslations.entityType, 'skill'),
          eq(cvTranslations.entitySlug, existing.slug),
        ),
      )

    // Delete skill
    const [deletedSkill] = await db
      .delete(cvSkills)
      .where(eq(cvSkills.id, Number(id)))
      .returning()

    return {
      success: true,
      data: deletedSkill,
    }
  }
  catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    const message = error instanceof Error ? error.message : 'Failed to delete skill'
    throw createError({
      statusCode: 500,
      statusMessage: message,
    })
  }
})
