import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from './schema'

// Get environment variables
const tursoUrl = process.env.TURSO_DATABASE_URL
const tursoAuthToken = process.env.TURSO_AUTH_TOKEN

if (!tursoUrl || !tursoAuthToken) {
  throw new Error('TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set')
}

// Create the connection
const client = createClient({
  url: tursoUrl,
  authToken: tursoAuthToken,
})

// Create drizzle instance
export const db = drizzle(client, { schema })
