// return 404
export default defineEventHandler(() => {
  throw createError({
    statusCode: 404,
    statusMessage: 'Not Found',
  })
})
