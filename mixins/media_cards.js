export default {
  methods: {
    titleProtocol({ title }) {
      return `${title}`
    },
    descriptioner({ description }) {
      return [
        {
          hid: 'description',
          name: 'description',
          content: `${description}`,
        },
      ]
    },
    ogProtocol(meta) {
      return [
        {
          hid: `og:title`,
          property: 'og:title',
          content: `${meta.title}`,
        },
        {
          hid: `og:description`,
          property: 'og:description',
          content: `${meta.description}`,
        },
      ]
    },
    twitterProtocol(meta) {
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
          content: `summary_large_image`,
        },
      ]
    },
    urlProtocol(meta) {
      return [
        {
          hid: `og:url`,
          property: 'og:url',
          content: this.baseUrl + this.$route.fullPath,
        },
      ]
    },
    /**
     * Ultimate Protocol Genera los metas generles, de OG y de twitter
     *
     * @param Object meta {title, description}
     */
    ultimateProtocol(meta) {
      return {
        title: this.titleProtocol(meta),
        meta: [
          ...this.descriptioner(meta),
          ...this.ogProtocol(meta),
          ...this.twitterProtocol(meta),
          ...this.urlProtocol(meta),
        ],
      }
    },
  },
}
