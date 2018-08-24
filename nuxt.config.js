const contentful = require('contentful')
const config = require('./.contentful.json')
const client = contentful.createClient({
  space: config.CTF_SPACE_ID,
  accessToken: config.CTF_CDA_ACCESS_TOKEN
})

const routerBase = process.env.DEPLOY_ENV === 'PRD' ? {
  router: {
    base: '/acperience/'
  }
} : {}

module.exports = {
  ...routerBase,
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk}｜Acperience` : `Acperience`;
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: '', hid: 'description' },
      { property: 'og:type', content: 'article' },
      { property: 'og:locale', content: 'ja_JP' },
      { property: 'og:sitename', content: 'acperience' },
      { property: 'og:title', content: 'acperience', hid: 'og:title' },
      { property: 'og:description', content: '', hid: 'og:description' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@tomoya_otsuka' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  env: {
    CTF_SPACE_ID: config.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: config.CTF_CDA_ACCESS_TOKEN,
    CTF_PERSON_ID: config.CTF_PERSON_ID,
    CTF_BLOG_POST_TYPE_ID: config.CTF_BLOG_POST_TYPE_ID
  },

  generate: {
    routes () {
      return client.getEntries({
          'content_type': config.CTF_BLOG_POST_TYPE_ID
        }).then((entries) => {
        return [...entries.items.map(entry => `posts/${entry.fields.slug}`)]
      })
    }
  },

  modules: [
    ['@nuxtjs/google-tag-manager', {
      id: 'GTM-KFN3TB4',
      pageTracking: true
    }]
  ],

  plugins: [
    '~/plugins/gtm.js'
  ]
}

