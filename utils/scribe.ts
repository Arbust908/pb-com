export function scribe(...args: any[]) {
  console.info(...args)
  // Add the log as a new line in the scribe.json file
  // check if ./logs folder exists
  // if not, create it
  // check if ./logs/scribe.json exists
  // if not, create it
  // append the log to the file under the current date format YYYY-MM-DD_hh-mm-ss: log

  const log = args.join(' ')
  const now = new Date()
  const date = now.toISOString().split('T')[0]
  const time = now.toTimeString().split(' ')[0].split(':').join('-')
  const filename = `./logs/scribe.json`
  const logEntry = `${date}_${time}: ${log}`
  console.info('logEntry', logEntry)
  console.info('filename', filename)

  const fs = require('node:fs')
  const path = require('node:path')
  const dir = './logs'

  if (!fs.existsSync(dir))
    fs.mkdirSync(dir, { recursive: true })

  const filePath = path.join(process.cwd(), filename)
  console.info('filePath', filePath)

  if (!fs.existsSync(filePath))
    fs.writeFileSync(filePath, '')

  fs.appendFileSync(filePath, `${logEntry}\n`)

  return log
}
