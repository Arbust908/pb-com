import { appName, AUTHOR_LOCATION, AUTHOR_NAME, GITHUB_URL, SITE_URL } from '~/constants'

type JsonLdNode = Record<string, unknown> & { '@type': string }

export interface StructuredDataGraph {
  '@context': 'https://schema.org'
  '@graph': JsonLdNode[]
}

export interface StructuredDataPerson {
  description?: string
  email?: string
  jobTitle?: string
  knowsAbout?: string[]
  knowsLanguage?: string[]
}

export interface StructuredDataBreadcrumb {
  name: string
  url: string
}

export interface StructuredDataListItem {
  name: string
  url: string
}

export const WEBSITE_ID = `${SITE_URL}/#website`
export const PERSON_ID = `${SITE_URL}/#person`

function createWebsite(): JsonLdNode {
  return {
    '@id': WEBSITE_ID,
    '@type': 'WebSite',
    'name': appName,
    'url': `${SITE_URL}/`,
    'inLanguage': ['en', 'es'],
    'publisher': { '@id': PERSON_ID },
  }
}

function createPerson(details: StructuredDataPerson = {}): JsonLdNode {
  return {
    '@id': PERSON_ID,
    '@type': 'Person',
    'name': AUTHOR_NAME,
    'alternateName': 'Pancho Blanco',
    'url': `${SITE_URL}/`,
    'sameAs': [GITHUB_URL],
    'homeLocation': {
      '@type': 'Place',
      'name': AUTHOR_LOCATION,
    },
    ...details,
  }
}

function createBreadcrumbs(items: StructuredDataBreadcrumb[]): JsonLdNode | undefined {
  if (items.length < 2)
    return

  return {
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url,
    })),
  }
}

interface PageGraphOptions {
  breadcrumbs?: StructuredDataBreadcrumb[]
  description: string
  mainEntity?: boolean
  name: string
  person?: StructuredDataPerson
  type: 'CollectionPage' | 'ProfilePage' | 'WebPage'
  url: string
}

export function createPageGraph(options: PageGraphOptions): StructuredDataGraph {
  const pageId = `${options.url}#webpage`
  const breadcrumbs = createBreadcrumbs(options.breadcrumbs ?? [])
  const page: JsonLdNode = {
    '@id': pageId,
    '@type': options.type,
    'url': options.url,
    'name': options.name,
    'description': options.description,
    'inLanguage': options.url.includes('/es/') || options.url.endsWith('/es') ? 'es' : 'en',
    'isPartOf': { '@id': WEBSITE_ID },
    'publisher': { '@id': PERSON_ID },
  }

  if (options.type === 'ProfilePage' || options.mainEntity)
    page.mainEntity = { '@id': PERSON_ID }
  if (breadcrumbs)
    page.breadcrumb = breadcrumbs

  return {
    '@context': 'https://schema.org',
    '@graph': [createWebsite(), createPerson(options.person), page, ...(breadcrumbs ? [breadcrumbs] : [])],
  }
}

interface CollectionGraphOptions extends Omit<PageGraphOptions, 'type'> {
  items: StructuredDataListItem[]
}

export function createCollectionGraph(options: CollectionGraphOptions): StructuredDataGraph {
  const graph = createPageGraph({ ...options, type: 'CollectionPage' })
  const nodes = graph['@graph'] as JsonLdNode[]
  const page = nodes.find(node => node['@id'] === `${options.url}#webpage`) as JsonLdNode
  const itemListId = `${options.url}#itemlist`
  page.mainEntity = { '@id': itemListId }

  return {
    ...graph,
    '@graph': [
      ...nodes,
      {
        '@id': itemListId,
        '@type': 'ItemList',
        'numberOfItems': options.items.length,
        'itemListElement': options.items.map((item, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'name': item.name,
          'item': { '@id': `${item.url}#article` },
        })),
      },
    ],
  }
}

interface ArticleGraphOptions {
  breadcrumbs: StructuredDataBreadcrumb[]
  description: string
  keywords: string[]
  name: string
  publishedAt?: string
  section: string[]
  url: string
}

export function createArticleGraph(options: ArticleGraphOptions): StructuredDataGraph {
  const breadcrumbs = createBreadcrumbs(options.breadcrumbs)
  const article: JsonLdNode = {
    '@id': `${options.url}#article`,
    '@type': 'Article',
    'url': options.url,
    'headline': options.name,
    'description': options.description,
    'inLanguage': options.url.includes('/es/') ? 'es' : 'en',
    'author': { '@id': PERSON_ID },
    'mainEntityOfPage': { '@id': `${options.url}#webpage` },
    'isPartOf': { '@id': `${options.url.replace(/\/[^/]+$/, '')}#itemlist` },
    'keywords': options.keywords,
    'articleSection': options.section,
  }

  if (options.publishedAt)
    article.datePublished = options.publishedAt
  if (breadcrumbs)
    article.breadcrumb = breadcrumbs

  return {
    '@context': 'https://schema.org',
    '@graph': [createWebsite(), createPerson(), article, ...(breadcrumbs ? [breadcrumbs] : [])],
  }
}
