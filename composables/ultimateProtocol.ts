export interface MetaData {
  title: string
  description: string
  base_url: string
}

function titleProtocol({ title }: MetaData) {
  return title === 'Pancho Blanco :: Senior Front-End Developer' ? `${title}` : `${title} :: Pancho Blanco`
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
function urlProtocol({ base_url }: MetaData, path: string) {
  return [
    {
      hid: 'og:url',
      property: 'og:url',
      content: base_url + path,
    },
  ]
}

export function useUltimateProtocol(meta: MetaData, path: string) {
  return {
    title: titleProtocol(meta),
    meta: [
      ...descriptioner(meta),
      ...ogProtocol(meta),
      ...twitterProtocol(meta),
      ...urlProtocol(meta, path),
    ],
  }
}
export function useUP(meta: MetaData, path: string) {
  return useUltimateProtocol(meta, path)
}
