import type { AI_MODEL_REQUEST_SERVER } from '~/types/AiModels'

// https://twitter.com/BHolmesDev/status/1738757046290247956 for instanceOf validation

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

  const payload = {
    model, // Required
    messages: [
      { role: 'user', content: message },
    ],
  } satisfies AI_MODEL_REQUEST_SERVER
  const headers = {
    'Authorization': `Bearer ${config.openRouterKey}`,
    // 'HTTP-Referer': `${YOUR_SITE_URL}`, // Optional, for including your app on openrouter.ai rankings.
    'X-Title': `CodigoVikingo`, // Optional. Shows in rankings on openrouter.ai.
    'Content-Type': 'application/json',
  }
  console.log('payload', payload)
  console.log('headers', headers)

  const resp = await $fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  }).catch((err) => {
    console.error('ERROR', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching from openrouter.ai',
      message: err.message,
    })
  })

  console.log('resp', resp)

  return resp
})
