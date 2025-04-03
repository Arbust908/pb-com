export interface SkillGroup {
  id: string
  title: string
  description: string | null
  parent_group_id: string | null
  language: string
  publish_state: number
}

export interface Skill {
  id: string
  title: string
  description: string | null
  group_id: string | null
  language: string
  publish_state: number
}
