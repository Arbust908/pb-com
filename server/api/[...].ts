import { createError, defineEventHandler } from 'h3'

// return 404
export default defineEventHandler(() => {
  throw createError({
    statusCode: 404,
    statusMessage: 'Not Found',
  })
})
