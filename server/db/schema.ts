import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const events = sqliteTable('events', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  startDate: text('start_date').notNull(),   // ISO-8601 TEXT
  endDate: text('end_date'),                 // nullable
  status: integer('status').notNull(),
  createdAt: text('created_at').notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
  updatedAt: text('updated_at').notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
}, (t) => ({
  startIdx: index('idx_events_start').on(t.startDate),
  statusIdx: index('idx_events_status').on(t.status),
}))

export type Event = typeof events.$inferSelect
export type NewEvent = typeof events.$inferInsert
