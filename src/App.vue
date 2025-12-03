<template>
  <v-app theme="light" class="app-theme">
    <div class="header-wrapper">
    <!-- App-bar Desktop -->
    <v-app-bar v-if="$vuetify.display.smAndUp" app class="header-app-bar">
      <v-btn
        text
        :to="'/contact'"
        variant="outlined"
        class="header-btn donation-btn"
      >
        {{ $t('donation.donation_mmg') }}
      </v-btn>

      <v-spacer />

      <v-btn text :to="'/'" variant="outlined" class="header-btn">
        {{ $t('menu.home') }}
      </v-btn>
      <v-btn text :to="'/news'" variant="outlined" class="header-btn">
        {{ $t('menu.news') }}
      </v-btn>
      <v-btn text :to="'/shop'" variant="outlined" class="header-btn">
        {{ $t('menu.shop') }}
      </v-btn>
      <v-btn text :to="'/result'" variant="outlined" class="header-btn">
        {{ $t('menu.tombola') }}
      </v-btn>
      <v-btn text :to="'/galery'" variant="outlined" class="header-btn">
        {{ $t('menu.gallerie') }}
      </v-btn>

      <div class="lang-cart-wrapper">
        <!-- Switch Language Buttons -->
        <v-btn
          v-for="lang in languages"
          :key="lang.code"
          variant="text"
          :color="locale === lang.code ? '#e9389f' : 'grey lighten-2'"
          @click="changeLocale(lang.code)"
        >
          {{ lang.label }}
        </v-btn>

        <!-- Cart -->
        <v-btn icon class="cart-btn" :to="'/store/checkout'">
          <v-badge
            v-if="cartCount > 0"
            :content="cartCount"
            color="error"
            offset-x="6"
            offset-y="6"
          >
            <v-icon size="28" class="color-text">mdi-cart</v-icon>
          </v-badge>

          <template v-else>
            <v-icon size="28" class="color-text">mdi-cart</v-icon>
          </template>
        </v-btn>
      </div>
    </v-app-bar>

    <!-- App-bar Mobile -->
    <v-app-bar v-else app class="header-app-bar">
      <div class="header-mobile-caption">
        <v-btn
          variant="outlined"
          class="mobile-donation-btn"
          @click="dialog = true"
        >
          {{ $t('donation.donation') }}
        </v-btn>
      </div>

      <v-spacer />

      <v-btn icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Drawer Mobile -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      class="drawer"
      location="left"
    >
      <v-list>
        <v-list-item to="/" :title="$t('menu.home')" />
        <v-list-item to="/news" :title="$t('menu.news')" />
        <v-list-item to="/shop" :title="$t('menu.shop')" />
        <v-list-item to="/result" :title="$t('menu.tombola')" />
        <v-list-item to="/galery" :title="$t('menu.gallerie')" />
        <v-list-item to="/Store/Checkout" :title="$t('menu.cart')" />

        <div class="drawer-lang-container">
          <v-btn
            v-for="lang in languages"
            :key="lang.code"
            variant="text"
            class="drawer-lang-btn"
            :color="locale === lang.code ? '#e9389f' : 'grey lighten-2'"
            @click="changeLocale(lang.code)"
          >
            {{ lang.label }}
          </v-btn>
        </div>
      </v-list>
    </v-navigation-drawer>

    <!-- Banner -->
    <v-banner
      v-if="showBanner && $vuetify.display.mdAndUp"
      class="header-banner"
      color="blue"
      lines="one"
      :stacked="true"
      elevation="0"
      variant="tonal"
    >
      <template v-slot:text>
        <div class="banner-content">
          <div class="banner-text">
            {{ $t('banner') }}
          </div>

          <v-icon
            icon="mdi-close"
            size="24"
            class="close-banner-btn"
            @click="showBanner = false"
          />
        </div>
      </template>
    </v-banner>
    </div>

    <v-carousel
        height="650"
        style="z-index: 1"
        show-arrows="hover"
        progress="primary"
        hide-delimiters
        cycle
        hide-delimiter-background
      >
  <v-carousel-item 
    v-for="(slide, i) in home" 
    :key="i"
  >
    <v-sheet height="100%">
      <!-- On englobe l'image ET le contenu dans un router-link -->
      <router-link 
        :to="`/post/${slide?.slug?.current ?? ''}`"
        style="display: block; height: 100%; text-decoration: none; color: inherit;"
      >
        <v-img 
          :src="slide.mainImage?.asset?.url" 
          height="100%" 
          cover
        >
          <template #default>
            <div
              class="d-flex align-center justify-center fill-height text-white"
              style="flex-direction: column; gap: 1em"
            >
              <h1 style="font-size: 5vw" class="font-weight-bold text-white">
                {{ slide.title }}
              </h1>
            </div>
          </template>
        </v-img>
      </router-link>
    </v-sheet>
  </v-carousel-item>
    </v-carousel>

      <v-divider :thickness="5" class="color-text"></v-divider>
      
      <v-main :style="{ '--v-layout-top': '1em' }">
        <transition name="fade" mode="out-in">
          <router-view :key="$route.fullPath" />
        </transition>
      </v-main>

      <div class="text-center pa-4 my-4" style="display: flex; justify-content: center; align-items: center;">
        <v-dialog v-model="dialog" width="auto">
          <v-card
            max-width="400"
            style="display: flex; justify-content: center; align-items: center; padding: 1em"
            title="Payer avec Stripe"
          >
            <template v-slot:actions>
              <v-btn variant="outlined" @click="dialog = false">{{ $t('donation.donation_monthly') }}</v-btn>
              <v-btn variant="outlined" @click="dialog = false">{{ $t('donation.donation') }}</v-btn>
            </template>
          </v-card>
        </v-dialog>
        <!-- <v-dialog v-model="dialog" width="auto">
          <v-card
            max-width="400"
            style="display: flex; justify-content: center; align-items: center;"
            prepend-icon="mdi-payment"
            text="Choisissez un moyen de paiement"
            title=""
          >
            <template v-slot:actions>
              <v-btn variant="outlined" @click="dialog = false">Avec Paypal</v-btn>
              <v-btn variant="outlined" @click="dialog = false">Avec Stripe la</v-btn>
            </template>
          </v-card>
        </v-dialog> -->
      </div>

    <AppFooter />
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { sanity } from './sanity';
import { provide } from 'vue';
import eventBus from './eventBus';
import { useI18n } from 'vue-i18n'
import { useCart } from './components/UseCart'


const { locale } = useI18n()

interface Slider {
  title: string;
  slide?: {
    slug?: {
      current?: string;
    };
  };
  mainImage?: {
    asset?: {
      url?: string;
    };
  };
}


const drawer = ref(false);
const home = ref<Slider[]>([]);
const dialog = ref(false);
const showBanner = ref(true)
const languages = [
  { code: 'fr', label: 'Fr'},
  { code: 'en', label: 'En'},
]

const { cartCount, getCart } = useCart()

const changeLocale = (lang) => {
  locale.value = lang
}

onBeforeUnmount(() => {
  eventBus.off('open-dialog')
})

onMounted(async () => {
  eventBus.on('openDialog', () => {
    console.log('open dialog event')
    dialog.value = true;
  });
  home.value = await getArticles();
  await getCart()
});

const getArticles = async () => {
  return await sanity.fetch(`*[_type == "customEvent" && isFeatured == true]{
    title,
    slug,
    mainImage {
      asset-> {
        url
      }
    }
  }`);
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style lang="scss">
.app-theme {
  background-color: $color-bg !important;
}

.header-wrapper {
  background-color: $color-bg;
  color: $color-text;

  display: flex;
  justify-content: center;
  align-items: center;
}

.header-app-bar {
  background-color: $color-bg !important;
  color: $color-text !important;
}

.header-btn {
  //margin: 0 $space-md;
  margin-left: 1em;
  color: $pink !important;
  border: none !important;          // enlever tous les borders
  // border-bottom: 2px solid $pink !important; // couleur & taille de ton choix
  // //border-bottom: 1px solid $color-text-secondary !important;
  // //border-color: $pink !important;
  border-radius: 2 !important;      // éviter arrondi
  box-shadow: none !important; 
}

.drawer {
  //background-color: $color-bg !important;
}

.donation-btn {
  margin-left: 3em;
  font-size: large;
  position: relative !important;
  border: 2px solid $blue !important;
  margin-left: 2em !important;
  color: $blue !important;
  border-color: $blue !important;
}

.mobile-donation-btn {
  margin-left: 1em;
  color: $color-text-secondary !important;
  border-color: $color-text-secondary !important;
}

.lang-cart-wrapper {
  display: flex;
  align-items: center;
  //gap: $space-sm;
}

.cart-btn {
  //margin-left: $space-md;
  color: $color-text !important;
}

.header-banner {
  z-index: 2;
  position: relative;
  top: calc(120% - 10px);
  width: 100%;
  background-color: $blue !important;
  color: $color-text;
}

.banner-text {
  color: $color-bg !important;
  font-weight: bold;
  font-size: 3ch;
  text-shadow: 1px 1px 2px black;
}

.close-banner-btn {
  cursor: pointer;
  margin-right: 1em;
  color: $pink !important;
}
</style>
