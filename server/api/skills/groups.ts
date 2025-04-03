import { serverSupabaseServiceRole } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = await serverSupabaseServiceRole(event)
  const query = getQuery(event)
  console.log(`Query lang: ${query.lang}`)
  const language = typeof query.lang === 'string' ? query.lang : 'en'

  const { data: skill_groups } = await client.from('skill_groups').select('*').eq('language', language)

  return { skill_groups }
})