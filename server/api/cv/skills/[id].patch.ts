import { and, eq } from 'drizzle-orm'
import { parse } from 'valibot'
import { db } from '~/server/db'
import { cvSkills, cvTranslations } from '~/server/db/schema'
import { UpdateSkillSchema } from '~/server/utils/cv'
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

    const body = await readBody(event)
    const validatedData = parse(UpdateSkillSchema, body)

    // Build update object
    const updateData: Record<string, unknown> = {
      updatedAt: new Date().toISOString(),
    }
    if (validatedData.slug)
      updateData.slug = validatedData.slug
    if (validatedData.skillList)
      updateData.skillList = validatedData.skillList
    if (validatedData.sortOrder !== undefined)
      updateData.sortOrder = validatedData.sortOrder

    // Get existing skill
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

    // Update skill
    const [updatedSkill] = await db
      .update(cvSkills)
      .set(updateData)
      .where(eq(cvSkills.id, Number(id)))
      .returning()

    // Update translations if provided
    if (validatedData.translations) {
      const entitySlug = validatedData.slug || existing.slug

      for (const [locale, fields] of Object.entries(validatedData.translations)) {
        if (!fields)
          continue
        for (const [field, value] of Object.entries(fields)) {
          if (value === undefined)
            continue

          const [existingTrans] = await db
            .select()
            .from(cvTranslations)
            .where(
              and(
                eq(cvTranslations.entityType, 'skill'),
                eq(cvTranslations.entitySlug, entitySlug),
                eq(cvTranslations.locale, locale),
                eq(cvTranslations.field, field),
              ),
            )

          if (existingTrans) {
            await db
              .update(cvTranslations)
              .set({ value, updatedAt: new Date().toISOString() })
              .where(eq(cvTranslations.id, existingTrans.id))
          }
          else if (value) {
            await db.insert(cvTranslations).values({
              entityType: 'skill',
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
          eq(cvTranslations.entityType, 'skill'),
          eq(cvTranslations.entitySlug, updatedSkill.slug),
        ),
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
        ...updatedSkill,
        translations: translationsByLocale,
      },
    }
  }
  catch (error: unknown) {
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
    const message = error instanceof Error ? error.message : 'Failed to update skill'
    throw createError({
      statusCode: 500,
      statusMessage: message,
    })
  }
})
