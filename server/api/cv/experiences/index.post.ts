import { eq } from 'drizzle-orm'
import { parse } from 'valibot'
import { db } from '~/server/db'
import { cvExperiences, cvTranslations } from '~/server/db/schema'
import { CreateExperienceSchema } from '~/server/utils/cv'
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
    const validatedData = parse(CreateExperienceSchema, body)

    // Check for duplicate slug
    const existing = await db
      .select()
      .from(cvExperiences)
      .where(eq(cvExperiences.slug, validatedData.slug))
    if (existing.length > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Experience with this slug already exists',
      })
    }

    // Get max sortOrder
    const allExps = await db.select().from(cvExperiences)
    const maxOrder = allExps.reduce((max, exp) => Math.max(max, exp.sortOrder), -1)

    // Insert experience
    const [newExperience] = await db
      .insert(cvExperiences)
      .values({
        slug: validatedData.slug,
        company: validatedData.company,
        startDate: validatedData.startDate,
        endDate: validatedData.endDate,
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
              entityType: 'experience' as const,
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
      .where(eq(cvTranslations.entitySlug, newExperience.slug))

    const translationsByLocale: Record<string, Record<string, string>> = {}
    for (const t of translations) {
      if (t.entityType !== 'experience')
        continue
      if (!translationsByLocale[t.locale]) {
        translationsByLocale[t.locale] = {}
      }
      translationsByLocale[t.locale][t.field] = t.value
    }

    return {
      success: true,
      data: {
        ...newExperience,
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
    const message = error instanceof Error ? error.message : 'Failed to create experience'
    throw createError({
      statusCode: 500,
      statusMessage: message,
    })
  }
})
