/**
 * Nuxt / $content handling hot reload...
 * https://content.nuxtjs.org/advanced/
 *
 * export default {
  plugins: [
    '@/plugins/update.client.js'
  ]
}
 */
export default function ({ store }) {
  // Only in development
  if (process.dev) {
    window.onNuxtReady(($nuxt) => {
      $nuxt.$on('content:update', ({ event, path }) => {
        // Refresh the store categories
        store.dispatch('fetchCategories')
      })
    })
  }
}

