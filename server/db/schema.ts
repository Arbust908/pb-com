import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
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
