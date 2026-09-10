import { defineEventHandler } from 'h3'
import data from '#server/data/studies.json'

export default defineEventHandler(() => data)
