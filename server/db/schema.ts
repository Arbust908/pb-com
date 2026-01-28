import { sqliteTable, text, integer, unique } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const holidays = sqliteTable('holidays', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  date: text('date').notNull(), // ISO date string
  endDate: text('end_date'), // Optional ISO date string
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})

export type Holiday = typeof holidays.$inferSelect
export type NewHoliday = typeof holidays.$inferInsert

// CV Tables

export const cvExperiences = sqliteTable('cv_experiences', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  company: text('company').notNull(),
  startDate: text('start_date').notNull(), // ISO date string
  endDate: text('end_date'), // null = present
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})

export type CvExperience = typeof cvExperiences.$inferSelect
export type NewCvExperience = typeof cvExperiences.$inferInsert

export const cvStudies = sqliteTable('cv_studies', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  dateRange: text('date_range').notNull(), // e.g. "2009-2013" or "2016"
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})

export type CvStudy = typeof cvStudies.$inferSelect
export type NewCvStudy = typeof cvStudies.$inferInsert

export const cvSkills = sqliteTable('cv_skills', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  skillList: text('skill_list').notNull(), // comma-separated
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})

export type CvSkill = typeof cvSkills.$inferSelect
export type NewCvSkill = typeof cvSkills.$inferInsert

export const cvLanguages = sqliteTable('cv_languages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})

export type CvLanguage = typeof cvLanguages.$inferSelect
export type NewCvLanguage = typeof cvLanguages.$inferInsert

export const cvTranslations = sqliteTable(
  'cv_translations',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    entityType: text('entity_type').notNull(), // 'experience' | 'study' | 'skill' | 'language'
    entitySlug: text('entity_slug').notNull(),
    locale: text('locale').notNull(), // 'en' | 'es'
    field: text('field').notNull(), // e.g. 'rol', 'description', 'title', 'name'
    value: text('value').notNull(),
    createdAt: text('created_at')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    unique('cv_translations_unique').on(
      table.entityType,
      table.entitySlug,
      table.locale,
      table.field
    ),
  ]
)

export type CvTranslation = typeof cvTranslations.$inferSelect
export type NewCvTranslation = typeof cvTranslations.$inferInsert
