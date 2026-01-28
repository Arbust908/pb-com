import { eq } from 'drizzle-orm'
import { parse } from 'valibot'
import { db } from '~/server/db'
import { cvStudies, cvTranslations } from '~/server/db/schema'
import { CreateStudySchema } from '~/server/utils/cv'
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
    const validatedData = parse(CreateStudySchema, body)

    // Check for duplicate slug
    const existing = await db
      .select()
      .from(cvStudies)
      .where(eq(cvStudies.slug, validatedData.slug))
    if (existing.length > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Study with this slug already exists',
      })
    }

    // Get max sortOrder
    const allStudies = await db.select().from(cvStudies)
    const maxOrder = allStudies.reduce((max, s) => Math.max(max, s.sortOrder), -1)

    // Insert study
    const [newStudy] = await db
      .insert(cvStudies)
      .values({
        slug: validatedData.slug,
        dateRange: validatedData.dateRange,
        sortOrder: validatedData.sortOrder ?? maxOrder + 1,
      })
      .returning()

    // Insert translations if provided
    if (validatedData.translations) {
      const translationsToInsert = []

      for (const [locale, fields] of Object.entries(validatedData.translations)) {
        if (!fields) continue
        for (const [field, value] of Object.entries(fields)) {
          if (value) {
            translationsToInsert.push({
              entityType: 'study' as const,
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
      .where(eq(cvTranslations.entitySlug, newStudy.slug))

    const translationsByLocale: Record<string, Record<string, string>> = {}
    for (const t of translations) {
      if (t.entityType !== 'study') continue
      if (!translationsByLocale[t.locale]) {
        translationsByLocale[t.locale] = {}
      }
      translationsByLocale[t.locale][t.field] = t.value
    }

    return {
      success: true,
      data: {
        ...newStudy,
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
    const message = error instanceof Error ? error.message : 'Failed to create study'
    throw createError({
      statusCode: 500,
      statusMessage: message,
    })
  }
})
