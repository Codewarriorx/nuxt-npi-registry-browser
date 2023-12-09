// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'NPI Registry Browser',
      meta: [
        { name: 'description', content: 'This is a simple browser for the NPI Registry API using Nuxt' },
      ],
    }
  },
  modules: ['nuxt-icon', '@nuxtjs/tailwindcss']
})
