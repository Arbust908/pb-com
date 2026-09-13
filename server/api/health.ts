import { defineEventHandler } from 'h3'

const startAt = Date.now()

export default defineEventHandler(() => ({
  startAt,
  uptime: Date.now() - startAt,
  msg: 'Hello from PB.dev!',
}))
