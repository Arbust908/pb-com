import en from './en'
import es from './es'

export default defineI18nConfig(() => ({
  legacy: false,
  defaultLocale: 'en',
  messages: { en, es },
}))
