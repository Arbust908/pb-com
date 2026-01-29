import { asc, eq } from 'drizzle-orm'
import { db } from '~/server/db'
import { cvSkills, cvTranslations } from '~/server/db/schema'

export default defineEventHandler(async () => {
  try {
    // Fetch all skills ordered by sortOrder
    const skills = await db
      .select()
      .from(cvSkills)
      .orderBy(asc(cvSkills.sortOrder))

    // Fetch all translations for skills
    const translations = await db
      .select()
      .from(cvTranslations)
      .where(eq(cvTranslations.entityType, 'skill'))

    // Build response with nested translations
    const data = skills.map((skill) => {
      const skillTranslations = translations.filter(t => t.entitySlug === skill.slug)

      const translationsByLocale: Record<string, Record<string, string>> = {}
      for (const t of skillTranslations) {
        if (!translationsByLocale[t.locale]) {
          translationsByLocale[t.locale] = {}
        }
        translationsByLocale[t.locale][t.field] = t.value
      }

      return {
        ...skill,
        translations: translationsByLocale,
      }
    })

    return { success: true, data }
  }
  catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch skills'
    throw createError({
      statusCode: 500,
      statusMessage: message,
    })
  }
})
