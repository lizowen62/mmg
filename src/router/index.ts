/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto';
import { setupLayouts } from 'virtual:generated-layouts';
import HomeView from '../pages/index.vue';
import ShopView from '../pages/shop.vue';
import ResultView from '../pages/result.vue';
import post from '../pages/Details/post.vue';
import NewsView from '../pages/news.vue';
import product from '../pages/Details/product.vue';
import galery from '../pages/galery.vue';
import contact from '../pages/contact.vue';
import CheckoutView from '../pages/Store/Checkout.vue';
import ShowcaseView from '../pages/Store/Showcase.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/shop', component: ShowcaseView },
  { path: '/result', component: ResultView },
  { path: '/news', component: NewsView },
  { path: '/post/:slug', name: 'Post', component: post, props: true },
  { path: '/product/:slug', name: 'Product', component: product, props: true },
  { path: '/galery', name: 'Galery', component: galery, props: true },
  { path: '/contact', name: 'Contact', component: contact, props: true },
  { path: '/Store/Checkout', name: 'Checkout', component: CheckoutView, props: true },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error');
      localStorage.setItem('vuetify:dynamic-reload', 'true');
      location.assign(to.fullPath);
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload');
});

export default router;
