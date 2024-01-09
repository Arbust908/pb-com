import path from 'node:path'
import process from 'node:process'
import dotenv from 'dotenv'

// https://twitter.com/mattpocockuk/status/1615110808219918352
import { z } from 'zod'

const envVariables = z.object({
  SOMETHING_COOL: z.string(),
})

envVariables.parse(process.env)

declare global {
  namespace NodeJS {
    // Property 'SOMETHING_COOL' of type 'number' is not assignable
    // to 'string' index type 'string | undefined'.
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

console.log(process.env.SOMETHING_COOL)
