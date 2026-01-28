import { eq, and } from 'drizzle-orm'
import { parse } from 'valibot'
import { db } from '~/server/db'
import { cvExperiences, cvTranslations } from '~/server/db/schema'
import { UpdateExperienceSchema } from '~/server/utils/cv'
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
    if (!id || isNaN(Number(id))) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid experience ID',
      })
    }

    const body = await readBody(event)
    const validatedData = parse(UpdateExperienceSchema, body)

    // Build update object
    const updateData: Record<string, unknown> = {
      updatedAt: new Date().toISOString(),
    }
    if (validatedData.slug) updateData.slug = validatedData.slug
    if (validatedData.company) updateData.company = validatedData.company
    if (validatedData.startDate) updateData.startDate = validatedData.startDate
    if (validatedData.endDate !== undefined) updateData.endDate = validatedData.endDate
    if (validatedData.sortOrder !== undefined) updateData.sortOrder = validatedData.sortOrder

    // Get existing experience to get its slug
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

    // Update experience
    const [updatedExperience] = await db
      .update(cvExperiences)
      .set(updateData)
      .where(eq(cvExperiences.id, Number(id)))
      .returning()

    // Update translations if provided
    if (validatedData.translations) {
      const entitySlug = validatedData.slug || existing.slug

      for (const [locale, fields] of Object.entries(validatedData.translations)) {
        if (!fields) continue
        for (const [field, value] of Object.entries(fields)) {
          if (value === undefined) continue

          // Check if translation exists
          const [existingTrans] = await db
            .select()
            .from(cvTranslations)
            .where(
              and(
                eq(cvTranslations.entityType, 'experience'),
                eq(cvTranslations.entitySlug, entitySlug),
                eq(cvTranslations.locale, locale),
                eq(cvTranslations.field, field)
              )
            )

          if (existingTrans) {
            await db
              .update(cvTranslations)
              .set({ value, updatedAt: new Date().toISOString() })
              .where(eq(cvTranslations.id, existingTrans.id))
          } else if (value) {
            await db.insert(cvTranslations).values({
              entityType: 'experience',
              entitySlug,
              locale,
              field,
              value,
            })
          }
        }
      }
    }

    // Fetch translations for response
    const translations = await db
      .select()
      .from(cvTranslations)
      .where(
        and(
          eq(cvTranslations.entityType, 'experience'),
          eq(cvTranslations.entitySlug, updatedExperience.slug)
        )
      )

    const translationsByLocale: Record<string, Record<string, string>> = {}
    for (const t of translations) {
      if (!translationsByLocale[t.locale]) {
        translationsByLocale[t.locale] = {}
      }
      translationsByLocale[t.locale][t.field] = t.value
    }

    return {
      success: true,
      data: {
        ...updatedExperience,
        translations: translationsByLocale,
      },
    }
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'issues' in error) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Validation failed',
        data: (error as { issues: unknown }).issues,
      })
    }
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    const message = error instanceof Error ? error.message : 'Failed to update experience'
    throw createError({
      statusCode: 500,
      statusMessage: message,
    })
  }
})
