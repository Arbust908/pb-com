import en from './en.ts'
import es from './es.ts'

export default defineI18nConfig(() => ({
  legacy: false,
  defaultLocale: 'en',
  messages: { en, es },
}))
