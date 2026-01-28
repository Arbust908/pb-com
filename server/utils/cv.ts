import {
  object,
  string,
  number,
  optional,
  minLength,
  isoDate,
  partial,
  picklist,
  type Output,
} from 'valibot'

// Entity types for translations
export const EntityTypes = ['experience', 'study', 'skill', 'language'] as const
export type EntityType = (typeof EntityTypes)[number]

export const Locales = ['en', 'es'] as const
export type Locale = (typeof Locales)[number]

// Experience schemas
export const CreateExperienceSchema = object({
  slug: string([minLength(1, 'Slug is required')]),
  company: string([minLength(1, 'Company is required')]),
  startDate: string([isoDate('Invalid start date format')]),
  endDate: optional(string([isoDate('Invalid end date format')])),
  sortOrder: optional(number()),
  translations: optional(
    object({
      en: optional(
        object({
          rol: optional(string()),
          description: optional(string()),
          more: optional(string()),
        })
      ),
      es: optional(
        object({
          rol: optional(string()),
          description: optional(string()),
          more: optional(string()),
        })
      ),
    })
  ),
})

export const UpdateExperienceSchema = partial(CreateExperienceSchema)

export type CreateExperience = Output<typeof CreateExperienceSchema>
export type UpdateExperience = Output<typeof UpdateExperienceSchema>

// Study schemas
export const CreateStudySchema = object({
  slug: string([minLength(1, 'Slug is required')]),
  dateRange: string([minLength(1, 'Date range is required')]),
  sortOrder: optional(number()),
  translations: optional(
    object({
      en: optional(
        object({
          place: optional(string()),
          description: optional(string()),
        })
      ),
      es: optional(
        object({
          place: optional(string()),
          description: optional(string()),
        })
      ),
    })
  ),
})

export const UpdateStudySchema = partial(CreateStudySchema)

export type CreateStudy = Output<typeof CreateStudySchema>
export type UpdateStudy = Output<typeof UpdateStudySchema>

// Skill schemas
export const CreateSkillSchema = object({
  slug: string([minLength(1, 'Slug is required')]),
  skillList: string([minLength(1, 'Skill list is required')]),
  sortOrder: optional(number()),
  translations: optional(
    object({
      en: optional(
        object({
          title: optional(string()),
        })
      ),
      es: optional(
        object({
          title: optional(string()),
        })
      ),
    })
  ),
})

export const UpdateSkillSchema = partial(CreateSkillSchema)

export type CreateSkill = Output<typeof CreateSkillSchema>
export type UpdateSkill = Output<typeof UpdateSkillSchema>

// Language schemas
export const CreateLanguageSchema = object({
  slug: string([minLength(1, 'Slug is required')]),
  sortOrder: optional(number()),
  translations: optional(
    object({
      en: optional(
        object({
          name: optional(string()),
          level: optional(string()),
        })
      ),
      es: optional(
        object({
          name: optional(string()),
          level: optional(string()),
        })
      ),
    })
  ),
})

export const UpdateLanguageSchema = partial(CreateLanguageSchema)

export type CreateLanguage = Output<typeof CreateLanguageSchema>
export type UpdateLanguage = Output<typeof UpdateLanguageSchema>

// Translation schema
export const TranslationSchema = object({
  entityType: picklist(EntityTypes, 'Invalid entity type'),
  entitySlug: string([minLength(1, 'Entity slug is required')]),
  locale: picklist(Locales, 'Invalid locale'),
  field: string([minLength(1, 'Field is required')]),
  value: string(),
})

export type Translation = Output<typeof TranslationSchema>

// Reorder schema
export const ReorderSchema = object({
  entityType: picklist(EntityTypes, 'Invalid entity type'),
  orderedIds: object({}), // Will validate as array of numbers at runtime
})
