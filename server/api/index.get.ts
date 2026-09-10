import { createError, defineEventHandler, getQuery } from 'h3'
import en from '~~/i18n/locales/en'
import es from '~~/i18n/locales/es'

const messages = { en, es } as const

export default defineEventHandler((event) => {
  const { lang = 'en' } = getQuery(event)

  if (lang !== 'en' && lang !== 'es') {
    throw createError({
      statusCode: 400,
      statusMessage: 'lang must be "en" or "es"',
    })
  }

  const text = messages[lang]

  return {
    ...text.api,
    lang,
    pages: [
      { name: text.home, path: lang === 'es' ? '/es' : '/' },
      { name: text.resume, path: lang === 'es' ? '/es/cv' : '/cv' },
      { name: text.work, path: lang === 'es' ? '/es/work' : '/work' },
      { name: text.about_nav, path: lang === 'es' ? '/es/about' : '/about' },
      { name: text.privacy_link, path: lang === 'es' ? '/es/privacy' : '/privacy' },
    ],
    endpoints: {
      health: '/api/health',
      experiences: '/api/cv/experiences',
      skills: '/api/cv/skills',
      studies: '/api/cv/studies',
      languages: '/api/cv/languages',
      catalog: '/.well-known/api-catalog',
    },
  }
})
