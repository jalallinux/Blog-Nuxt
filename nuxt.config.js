import colors from 'vuetify/es5/util/colors'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'server', // * for fix error server side render not matching with client side render

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - Blog',
    title: 'Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/plugins.scss',
    'simplemde/dist/simplemde.min.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/mixins/validation',
    { src: '~plugins/nuxt-simplemde-plugin.js', mode: 'client' },
    '~/plugins/api',
    // '~/plugins/mixins/user',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxtjs/dotenv",
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    // https://auth.nuxtjs.org/
    "@nuxtjs/auth-next",
    // https://gitlab.com/sweetgum/nuxt-izitoast
    'nuxt-izitoast',
    // https://www.npmjs.com/package/nuxt-highlightjs
    ['nuxt-highlightjs', {
      style: 'atom-one-dark'
    }]
  ],

  router: {
    middleware: ['auth', 'clearValidationErrors']
  },

  auth: {
    resetOnError: true,
    defaultStrategy: 'laravelJWT',
    scopeKey: 'roles',
    vuex: {
      namespace: 'auth', // Vuex store namespace for keeping state.
    },
    strategies: {
      laravelJWT: {
        provider: 'laravel/jwt',
        url: process.env.API_BASE_URL,
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          refresh: { url: '/auth/refresh', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/me', method: 'get' }
        },
        token: {
          property: 'access_token',
          maxAge: 24 * 60
        },
        user: {
          property: 'user',
        },
        refreshToken: {
          maxAge: 20160 * 60
        },
      },
    },
    redirect: {
      login: '/auth',
      logout: '/',
      callback: '/auth',
      home: '/'
    },
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.APP_BASE_URL,
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    rtl: true,
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        light: {
          primary: colors.yellow.darken3,
          secondary: colors.grey.darken3,
          accent: colors.shades.black,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        dark: {
          primary: colors.blue.darken2,
          secondary: colors.amber.darken3,
          accent: colors.grey.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  izitoast: {
    position: 'topCenter',
    transitionIn: 'bounceInDown',
    transitionOut: 'fadeOutUp',
    rtl: true,
    theme: 'light',
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
