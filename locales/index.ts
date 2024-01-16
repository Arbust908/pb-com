import * as en from './en'
import * as es from './es'

export const messages = {
  es: es.default,
  en: en.default,
}

export const i18Nuxt = {
  legacy: false,
  locale: 'en',
  messages,
}
