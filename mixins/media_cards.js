export default {
  methods: {
    titleProtocol({ title }) {
      return `${title} | Quiero Invitar`
    },
    descriptioner({ description }) {
      return [
        {
          hid: 'description',
          name: 'description',
          content: `${description} | Quiero Invitar`,
        },
      ]
    },
    ogProtocol(meta) {
      return [
        {
          hid: `og:title`,
          property: 'og:title',
          content: `${meta.title} | Quiero Invitar`,
        },
        {
          hid: `og:description`,
          property: 'og:description',
          content: `${meta.description} | Quiero Invitar`,
        },
      ]
    },
    twitterProtocol(meta) {
      return [
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: `${meta.title} | Quiero Invitar`,
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content: `${meta.description} | Quiero Invitar`,
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
