const startAt = Date.now()

export default defineEventHandler(() => ({
  startAt,
  uptime: Date.now() - startAt,
  msg: 'Hello from PB.dev!',
}))
