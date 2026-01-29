import { asc, eq } from 'drizzle-orm'
import { db } from '~/server/db'
import { cvStudies, cvTranslations } from '~/server/db/schema'

export default defineEventHandler(async () => {
  try {
    // Fetch all studies ordered by sortOrder
    const studies = await db
      .select()
      .from(cvStudies)
      .orderBy(asc(cvStudies.sortOrder))

    // Fetch all translations for studies
    const translations = await db
      .select()
      .from(cvTranslations)
      .where(eq(cvTranslations.entityType, 'study'))

    // Build response with nested translations
    const data = studies.map((study) => {
      const studyTranslations = translations.filter(t => t.entitySlug === study.slug)

      const translationsByLocale: Record<string, Record<string, string>> = {}
      for (const t of studyTranslations) {
        if (!translationsByLocale[t.locale]) {
          translationsByLocale[t.locale] = {}
        }
        translationsByLocale[t.locale][t.field] = t.value
      }

      return {
        ...study,
        translations: translationsByLocale,
      }
    })

    return { success: true, data }
  }
  catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch studies'
    throw createError({
      statusCode: 500,
      statusMessage: message,
    })
  }
})
