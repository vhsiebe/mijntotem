// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts'
  ],

  fonts: {
    families: [
      { name: 'Manrope', provider: 'google' }
    ]
  },

  css: ['~/assets/css/main.css'],

  tailwindcss: {
    configPath: '~/tailwind.config.ts'
  },

  runtimeConfig: {
    MOLLIE_API_KEY: process.env.MOLLIE_API_KEY,
    BREVO_API_KEY: process.env.NUXT_BREVO_API_KEY,
    MEDUSA_API_KEY: process.env.MEDUSA_API_KEY,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'nl'
      },
      title: 'MijnTotem - Unieke totemkledij voor scout en gidsen',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Laat je persoonlijkheid stralen met een T-shirt of sweater bedrukt met jouw totem. 100% ecologisch, lokaal bedrukt én vol trots gedragen door scouts.' 
        }
      ]
    }
  },

  compatibilityDate: '2024-11-01'
})
