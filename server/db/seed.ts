import * as dotenv from 'dotenv'
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import { holidays, type NewHoliday } from './schema'

// Load environment variables
dotenv.config()

// Create database connection for seed script
const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})

const db = drizzle(client)

// Original hardcoded holidays from the component
const seedHolidays: NewHoliday[] = [
  // 2025
  { name: "2025!", date: "2025-01-01" },
  { name: "Carnival", date: "2025-03-03" },
  { name: "Carnival", date: "2025-03-04" },
  { name: "Good Friday", date: "2025-04-18" },
  { name: "Labor Day", date: "2025-05-01" },
  { name: "Arg Independence", date: "2025-07-09" },
  { name: "Br Independence", date: "2025-09-07" },
  { name: "HQ Trip (?)", date: "2025-09-23", endDate: "2025-09-29" },
  { name: "XMas Day", date: "2025-12-25" },
  { name: "New Year's Eve", date: "2025-12-31" },
  // 2026
  { name: "2026!", date: "2026-01-01" },
]

async function seed() {
  console.log('🌱 Starting seed...')
  
  try {
    // Check if holidays already exist
    const existingHolidays = await db.select().from(holidays)
    
    if (existingHolidays.length > 0) {
      console.log('⚠️  Holidays already exist in database. Skipping seed.')
      return
    }
    
    // Insert seed holidays
    console.log('📝 Inserting holidays...')
    const insertedHolidays = await db.insert(holidays).values(seedHolidays).returning()
    
    console.log(`✅ Successfully inserted ${insertedHolidays.length} holidays`)
    
    // Display inserted holidays
    insertedHolidays.forEach(holiday => {
      console.log(`  - ${holiday.name} on ${holiday.date}${holiday.endDate ? ` to ${holiday.endDate}` : ''}`)
    })
    
  } catch (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  }
}

// Run the seed
seed().then(() => {
  console.log('🎉 Seed completed!')
  process.exit(0)
})
