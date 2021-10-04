/**
 * Nuxt / $content handling hot reload...
 * https://content.nuxtjs.org/advanced/
 *
 *
 *
 * nuxt.config.js
 * export default {
  plugins: [
    '@/plugins/update.client.js',//@nuxt/content dev hot-reload...
  ]
}
 */
export default function ({ store }) {
  // Only in development
  if (process.dev) {
    window.onNuxtReady(($nuxt) => {
      $nuxt.$on('content:update', ({ event, path }) => {
        // Refresh the store categories
        console.log('dispatch???');
        //how should i do this... wth touch the file?
        // store.dispatch('fetchCategories')
      })
    })
  }
}

