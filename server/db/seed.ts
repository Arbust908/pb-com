import * as dotenv from 'dotenv'
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import { type NewHoliday, holidays } from './schema'

// Load environment variables
dotenv.config()

// Create database connection for seed script
const client = createClient({
  url: import.meta.env.TURSO_DATABASE_URL!,
  authToken: import.meta.env.TURSO_AUTH_TOKEN!,
})

const db = drizzle(client)

// Original hardcoded holidays from the component
const seedHolidays: NewHoliday[] = [
  // 2025
  { name: '2025!', date: '2025-01-01' },
  { name: 'Carnival', date: '2025-03-03' },
  { name: 'Carnival', date: '2025-03-04' },
  { name: 'Good Friday', date: '2025-04-18' },
  { name: 'Labor Day', date: '2025-05-01' },
  { name: 'Arg Independence', date: '2025-07-09' },
  { name: 'Br Independence', date: '2025-09-07' },
  { name: 'HQ Trip (?)', date: '2025-09-23', endDate: '2025-09-29' },
  { name: 'XMas Day', date: '2025-12-25' },
  { name: 'New Year\'s Eve', date: '2025-12-31' },
  // 2026
  { name: '2026!', date: '2026-01-01' },
]

async function seed() {
  try {
    // Check if holidays already exist
    const existingHolidays = await db.select().from(holidays)

    if (existingHolidays.length > 0) {
      return
    }

    // Insert seed holidays
    await db.insert(holidays).values(seedHolidays).returning()
  }
  catch (error) {
    console.error('❌ Seed failed:', error)
    import.meta.exit(1)
  }
}

// Run the seed
seed().then(() => {
  import.meta.exit(0)
})
