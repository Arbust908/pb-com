export default defineEventHandler(async (event) => {
  try {
    const username = await readBody(event)
    console.info('User', username)

    const result = username === 'john'
    console.info(result)
    if (!result)
      return { error: 'User doesn`t exist' }

    return { success: true, username }
  }
  catch (error) {
    return { error: error?.message }
  }
})
