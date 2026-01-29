import { asc, eq } from 'drizzle-orm'
import { db } from '~/server/db'
import { cvExperiences, cvTranslations } from '~/server/db/schema'

export default defineEventHandler(async () => {
  try {
    // Fetch all experiences ordered by sortOrder
    const experiences = await db
      .select()
      .from(cvExperiences)
      .orderBy(asc(cvExperiences.sortOrder))

    // Fetch all translations for experiences
    const translations = await db
      .select()
      .from(cvTranslations)
      .where(eq(cvTranslations.entityType, 'experience'))

    // Build response with nested translations
    const data = experiences.map((exp) => {
      const expTranslations = translations.filter(t => t.entitySlug === exp.slug)

      const translationsByLocale: Record<string, Record<string, string>> = {}
      for (const t of expTranslations) {
        if (!translationsByLocale[t.locale]) {
          translationsByLocale[t.locale] = {}
        }
        translationsByLocale[t.locale][t.field] = t.value
      }

      return {
        ...exp,
        translations: translationsByLocale,
      }
    })

    return { success: true, data }
  }
  catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch experiences'
    throw createError({
      statusCode: 500,
      statusMessage: message,
    })
  }
})
