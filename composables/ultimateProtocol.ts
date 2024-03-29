export interface MetaData {
  title: string
  description: string
  base_url: string
}

function titleProtocol({ title }: MetaData) {
  return title === 'Pancho Blanco :: Desarrollador Creativo' ? `${title}` : `${title} :: Pancho Blanco`
}
function descriptioner({ description }: MetaData) {
  return [
    {
      hid: 'description',
      name: 'description',
      content: `${description}`,
    },
  ]
}
function ogProtocol(meta: MetaData) {
  return [
    {
      hid: 'og:title',
      property: 'og:title',
      content: `${meta.title}`,
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: `${meta.description}`,
    },
  ]
}
function twitterProtocol(meta: MetaData) {
  return [
    {
      hid: 'twitter:title',
      property: 'twitter:title',
      content: `${meta.title}`,
    },
    {
      hid: 'twitter:description',
      property: 'twitter:description',
      content: `${meta.description}`,
    },
    {
      hid: 'twitter:card',
      property: 'twitter:card',
      content: 'summary_large_image',
    },
  ]
}
function urlProtocol({ base_url }: MetaData) {
  const route = useRoute()
  return [
    {
      hid: 'og:url',
      property: 'og:url',
      content: base_url + route.fullPath,
    },
  ]
}

export function useUltimateProtocol(meta: MetaData) {
  return {
    title: titleProtocol(meta),
    meta: [
      ...descriptioner(meta),
      ...ogProtocol(meta),
      ...twitterProtocol(meta),
      ...urlProtocol(meta),
    ],
  }
}
export function useUP(meta: MetaData) {
  return useUltimateProtocol(meta)
}
