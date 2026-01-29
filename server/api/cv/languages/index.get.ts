import { asc, eq } from 'drizzle-orm'
import { db } from '~/server/db'
import { cvLanguages, cvTranslations } from '~/server/db/schema'

export default defineEventHandler(async () => {
  try {
    // Fetch all languages ordered by sortOrder
    const languages = await db
      .select()
      .from(cvLanguages)
      .orderBy(asc(cvLanguages.sortOrder))

    // Fetch all translations for languages
    const translations = await db
      .select()
      .from(cvTranslations)
      .where(eq(cvTranslations.entityType, 'language'))

    // Build response with nested translations
    const data = languages.map((lang) => {
      const langTranslations = translations.filter(t => t.entitySlug === lang.slug)

      const translationsByLocale: Record<string, Record<string, string>> = {}
      for (const t of langTranslations) {
        if (!translationsByLocale[t.locale]) {
          translationsByLocale[t.locale] = {}
        }
        translationsByLocale[t.locale][t.field] = t.value
      }

      return {
        ...lang,
        translations: translationsByLocale,
      }
    })

    return { success: true, data }
  }
  catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch languages'
    throw createError({
      statusCode: 500,
      statusMessage: message,
    })
  }
})
