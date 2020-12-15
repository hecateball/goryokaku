export default {
  ssr: false,
  head: {
    title: 'AdVenture Capitalist Clone',
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
    // Sample Data
    businesses: [
      {
        displayName: 'Lemonade Stand',
        earnings: 1,
        interval: 1000,
        expansion: { cost: 10 },
        manager: { cost: 1000 },
        upgrades: [
          {
            displayName: 'Little Umbrellas',
            cost: 100,
            multiplier: 3,
          },
          {
            displayName: 'Upgrade 2',
            cost: 2000,
            multiplier: 3,
          },
          {
            displayName: 'Upgrade 3',
            cost: 20000,
            multiplier: 3,
          },
        ],
      },
      {
        displayName: 'Newspaper Delivery',
        earnings: 60,
        interval: 3000,
        expansion: { cost: 69 },
        manager: { cost: 100000 },
        upgrades: [
          {
            displayName: 'Funny Pages',
            cost: 500000,
            multiplier: 3,
          },
          {
            displayName: 'Upgrade 2',
            cost: 1000000,
            multiplier: 3,
          },
          {
            displayName: 'Upgrade 3',
            cost: 2000000,
            multiplier: 3,
          },
        ],
      },
      {
        displayName: 'Car Wash',
        earnings: 60,
        interval: 10000,
        expansion: { cost: 720 },
        manager: { cost: 500000 },
        upgrades: [
          {
            displayName: 'Drive Through Wash',
            cost: 1000000,
            multiplier: 3,
          },
          {
            displayName: 'Upgrade 2',
            cost: 2000000,
            multiplier: 3,
          },
          {
            displayName: 'Upgrade 3',
            cost: 30000000,
            multiplier: 3,
          },
        ],
      },
    ],
  },
}
