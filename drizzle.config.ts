import { defineConfig } from 'drizzle-kit'
import * as dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  schema: './server/db/schema.ts',
  out: './server/db/migrations',
  dialect: 'turso',
  dbCredentials: {
    url: import.meta.env.TURSO_DATABASE_URL!,
    authToken: import.meta.env.TURSO_AUTH_TOKEN!,
  },
})
