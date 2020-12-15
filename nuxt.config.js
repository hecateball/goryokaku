export default {
  ssr: false,
  head: {
    title: 'Adventure Capitalist Clone',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  plugins: [
    '~/plugins/firebase',
    '~/plugins/authentication',
    '~/plugins/initialize',
  ],
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api',
    '@nuxtjs/tailwindcss',
  ],
  modules: ['@nuxtjs/pwa'],
  publicRuntimeConfig: {
    firebaseConfig: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    },
    businesses: [
      {
        displayName: 'Lemonade Stand',
        earnings: 1,
        interval: 1000,
        expansion: { cost: 10 },
        manager: { cost: 25 },
        upgrade: { cost: 20 },
      },
    ],
  },
}
