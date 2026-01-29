import { eq } from 'drizzle-orm'
import { parse } from 'valibot'
import { db } from '~/server/db'
import { cvSkills, cvTranslations } from '~/server/db/schema'
import { CreateSkillSchema } from '~/server/utils/cv'
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
    const validatedData = parse(CreateSkillSchema, body)

    // Check for duplicate slug
    const existing = await db
      .select()
      .from(cvSkills)
      .where(eq(cvSkills.slug, validatedData.slug))
    if (existing.length > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Skill with this slug already exists',
      })
    }

    // Get max sortOrder
    const allSkills = await db.select().from(cvSkills)
    const maxOrder = allSkills.reduce((max, s) => Math.max(max, s.sortOrder), -1)

    // Insert skill
    const [newSkill] = await db
      .insert(cvSkills)
      .values({
        slug: validatedData.slug,
        skillList: validatedData.skillList,
        sortOrder: validatedData.sortOrder ?? maxOrder + 1,
      })
      .returning()

    // Insert translations if provided
    if (validatedData.translations) {
      const translationsToInsert = []

      for (const [locale, fields] of Object.entries(validatedData.translations)) {
        if (!fields)
          continue
        for (const [field, value] of Object.entries(fields)) {
          if (value) {
            translationsToInsert.push({
              entityType: 'skill' as const,
              entitySlug: validatedData.slug,
              locale,
              field,
              value,
            })
          }
        }
      }

      if (translationsToInsert.length > 0) {
        await db.insert(cvTranslations).values(translationsToInsert)
      }
    }

    // Fetch translations for response
    const translations = await db
      .select()
      .from(cvTranslations)
      .where(eq(cvTranslations.entitySlug, newSkill.slug))

    const translationsByLocale: Record<string, Record<string, string>> = {}
    for (const t of translations) {
      if (t.entityType !== 'skill')
        continue
      if (!translationsByLocale[t.locale]) {
        translationsByLocale[t.locale] = {}
      }
      translationsByLocale[t.locale][t.field] = t.value
    }

    return {
      success: true,
      data: {
        ...newSkill,
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
    const message = error instanceof Error ? error.message : 'Failed to create skill'
    throw createError({
      statusCode: 500,
      statusMessage: message,
    })
  }
})
