import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'
import { SITE_URL } from '~/constants'

interface JsonLdGraph {
  '@context': 'https://schema.org'
  '@graph': unknown[]
}

export interface PageSeoContext {
  canonicalUrl: string
  locale: 'en' | 'es'
  localeUrl: (locale: 'en' | 'es') => string
  absoluteUrl: (path: string) => string
}

interface UsePageSeoOptions {
  title: MaybeRefOrGetter<string | undefined>
  description: MaybeRefOrGetter<string | undefined>
  structuredData?: (context: PageSeoContext) => JsonLdGraph | null
  type?: 'article' | 'website'
}

const locales = ['en', 'es'] as const

function toAbsoluteUrl(path: string): string {
  return new URL(path, SITE_URL).href
}

export function usePageSeo(options: UsePageSeoOptions) {
  const route = useRoute()
  const { locale } = useI18n()

  const basePath = computed(() => route.path.replace(/^\/es(?=\/|$)/, '') || '/')
  function localePath(targetLocale: typeof locales[number]) {
    return targetLocale === 'es'
      ? `/es${basePath.value === '/' ? '' : basePath.value}`
      : basePath.value
  }
  const canonicalUrl = computed(() => toAbsoluteUrl(localePath(locale.value === 'es' ? 'es' : 'en')))

  const pageContext = computed<PageSeoContext>(() => ({
    canonicalUrl: canonicalUrl.value,
    locale: locale.value === 'es' ? 'es' : 'en',
    localeUrl: targetLocale => toAbsoluteUrl(localePath(targetLocale)),
    absoluteUrl: toAbsoluteUrl,
  }))

  useSeoMeta({
    title: () => toValue(options.title),
    description: () => toValue(options.description),
    ogTitle: () => toValue(options.title),
    ogDescription: () => toValue(options.description),
    ogType: options.type ?? 'website',
    ogUrl: () => canonicalUrl.value,
    ogLocale: () => locale.value === 'es' ? 'es_ES' : 'en_US',
    twitterCard: 'summary',
    twitterTitle: () => toValue(options.title),
    twitterDescription: () => toValue(options.description),
  })

  useHead(() => ({
    link: [
      { key: 'canonical', rel: 'canonical', href: canonicalUrl.value },
      ...locales.map(targetLocale => ({
        key: `alternate-${targetLocale}`,
        rel: 'alternate' as const,
        hreflang: targetLocale,
        type: 'text/html' as const,
        href: toAbsoluteUrl(localePath(targetLocale)),
      })),
      { key: 'alternate-x-default', rel: 'alternate', hreflang: 'x-default', type: 'text/html', href: toAbsoluteUrl(localePath('en')) },
    ],
  }))

  if (options.structuredData)
    useJsonld((() => options.structuredData?.(pageContext.value) ?? null) as never)
}
