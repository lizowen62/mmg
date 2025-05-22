/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import HomeView from '../pages/index.vue'
import ShopView from '../pages/Shop.vue'
import ResultView from '../pages/Result.vue'
import post from '../pages/Details/post.vue'
import NewsView from '../pages/news.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/shop', component: ShopView },
  { path: '/result', component: ResultView },
  { path: '/news', component: NewsView },
  { path: '/post/:slug', name: 'Post', component: post, props: true },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
