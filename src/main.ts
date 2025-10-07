/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins';

// Components
import App from './App.vue';

import { createI18n } from 'vue-i18n';

// Composables
import { createApp } from 'vue';

import fr from './locales/fr.json'
import en from './locales/en.json'

// Styles
import 'unfonts.css';


const i18n = createI18n({
    locale: 'fr',
    fallbackLocale: 'en',
    messages : {
        fr,
        en
    }
  })

const app = createApp(App);

registerPlugins(app);

app.use(i18n);

app.mount('#app');
