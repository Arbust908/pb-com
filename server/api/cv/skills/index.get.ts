import { defineEventHandler } from 'h3'
import data from '#server/data/skills.json'

export default defineEventHandler(() => data)
