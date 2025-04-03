import { serverSupabaseServiceRole } from '#supabase/server'

import type { SkillGroup, Skill } from '~/types/Skills'
/***
 * Returns all skills grouped by group_id
 * If no group_id is provided, returns all skills as arrays on groups
 * 
 * @param event
 * @param event.query.lang - Language of skills to return
 * @param event.query?.group_id - Optional group id to return skills for
 * 
 * @returns Skills grouped by group_id
 */
export default eventHandler(async (event) => {
  const client = await serverSupabaseServiceRole(event)
  const query = getQuery(event)
  console.log(`Query lang: ${query.lang}`)
  const language = typeof query.lang === 'string' ? query.lang : ''
  const group_id = typeof query.group_id === 'string' ? query.group_id : ''

  const { data: _skills, error: skillsError } = await client.from('skills').select('*').eq('language', language)
  if (skillsError) {
    return createError({
      statusCode: 404,
      statusMessage: skillsError.message,
    })
  }

  const { data: _skill_groups, error: skill_groupsError } = await client.from('skill_groups').select('*').eq('language', language)

  if (!_skills || !_skill_groups) {
    const message = _skills ? 'Skills not found.' : 'Skill groups not found.'

    return createError({
      statusCode: 404,
      statusMessage: message,
    })
  }
  const skills = _skills as Skill[]

  if (group_id) {
    const skillsByGroup = skills.filter(skill => skill.group_id === group_id)
    return { skillsByGroup }
  }
  const skill_groups = _skill_groups as SkillGroup[]

  const skillsByGroup = skill_groups.map(group => {
    const skillsByGroup = skills.filter(skill => skill.group_id === group.id)
    return { ...group, skills: skillsByGroup }
  })

  return { skillsByGroup }
})