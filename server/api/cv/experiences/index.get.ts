import { defineEventHandler } from 'h3'
import data from '#server/data/experiences.json'

export default defineEventHandler(() => data)
