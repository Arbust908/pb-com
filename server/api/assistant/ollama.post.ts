import ollama from 'ollama'

export default defineEventHandler(async (event) => {
    console.log('event', event)
    const config = useRuntimeConfig(event)
    const body = await readBody(event) as { message: string, model?: string }

  // const query = getQuery(event)
  // const cookies = parseCookies(event)
  // await sendRedirect(event, '/path/redirect/to', 302)
  // const name = getRouterParam(event, 'name')

  if (!body || !body.message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing message in body.',
    })
  }

  const { model = '', message } = body
  console.log('model', model, 'message', message)
  

  try {
      const response = await ollama.chat({
        model: 'dolphin-mixtral',
        messages: [{ role: 'user', content: message }],
      })
      console.log('response', response) 
      return response
  }
    catch (error) {
        console.error(error)
        return { error: error?.message }
    }
    
 
})
