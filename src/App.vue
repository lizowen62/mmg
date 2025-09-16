<template>
  <v-app>


    <v-app-bar v-if="$vuetify.display.smAndUp" app>
      <v-spacer />
      <v-btn text :to="'/'" variant="outlined" class="mx-2">Accueil</v-btn>
      <v-btn text :to="'/news'" variant="outlined" class="mx-2">Actualités</v-btn>
      <v-btn text :to="'/shop'" variant="outlined" class="mx-2">Boutique</v-btn>
      <v-btn text :to="'/result'" variant="outlined" class="mx-2">Résultat de tombola</v-btn>
      <v-btn text :to="'/galery'" variant="outlined" class="mx-2">Galerie</v-btn>
      <!-- <v-btn text :to="'/contact'" variant="outlined" class="mx-2">Contact</v-btn> -->
    </v-app-bar>

  <!-- App-bar mobile (xsOnly) -->
  <v-app-bar v-else app>
    <v-toolbar-title>MMG</v-toolbar-title>
    <div class="text-caption text-disabled">
      <v-btn color="red" @click="dialog = true">Faire un don</v-btn>
    </div>
    <v-spacer />
    <v-btn icon @click="drawer = !drawer">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-app-bar>

  <!-- Drawer mobile -->
  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="left"
  >
    <v-list>
      <v-list-item to="/" title="Accueil" />
      <v-list-item to="/news" title="Actualités" />
      <v-list-item to="/shop" title="Boutique" />
      <v-list-item to="/result" title="Résultat de tombola" />
      <v-list-item to="/galery" title="Galerie" />
      <v-list-item to="/contact" title="Contact" />
    </v-list>
  </v-navigation-drawer>



      <v-carousel
        height="500"
        style="z-index: 1"
        show-arrows="hover"
        progress="primary"
        hide-delimiters
        cycle
        hide-delimiter-background
      >
        <v-carousel-item v-for="(slide, i) in home" :key="i">
          <v-sheet height="100%">
            <v-img :src="slide.mainImage?.asset?.url" height="100%" cover>
              <template #default>
                <div
                  class="d-flex align-center justify-center fill-height text-white"
                  style="flex-direction: column; gap: 1em"
                >
                  <h1 style="font-size: 5vw" class="font-weight-bold text-white">
                    {{ slide.title }}
                  </h1>
                  <v-btn
                    text
                    :to="'/post/' + (slide?.slug?.current ?? '')"
                    variant="outlined"
                    class="mx-2"
                  >
                    En savoir plus
                  </v-btn>
                </div>
              </template>
            </v-img>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>

      <v-divider :thickness="3" color="warning"></v-divider>
      
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
              <v-btn variant="outlined" @click="dialog = false">En mensuel</v-btn>
              <v-btn variant="outlined" @click="dialog = false">En don unique</v-btn>
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

const colors = ['indigo', 'warning', 'pink darken-2', 'red lighten-1', 'deep-purple accent-4'];
let isSmallScreen = false;
let MediumScreen = false;
const drawer = ref(false);
const home = ref<Slider[]>([]);
const dialog = ref(false);

onBeforeUnmount(() => {
  eventBus.off('open-dialog')
})

onMounted(async () => {
  eventBus.on('openDialog', () => {
    console.log('open dialog event')
    dialog.value = true;
  });
  home.value = await getArticles();
});

onMounted(() => {
  checkScreen();
  window.addEventListener('resize', checkScreen);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreen);
});

function checkScreen() {
  isSmallScreen = window.innerWidth <= 768;
  MediumScreen = window.innerWidth <= 200;
  provide('isSmallScreen', isSmallScreen);
  provide('MediumScreen', MediumScreen);
}

const getArticles = async () => {
  return await sanity.fetch(`*[_type == "post" && isFeatured == true]{
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
