import { defineEventHandler } from 'h3'
import data from '#server/data/languages.json'

export default defineEventHandler(() => data)
