<template>
  <v-app>
    <v-parallax style="background-image: linear-gradient(to bottom, #1a1a1a, #000000)">
      <!-- penser a recup event telethon si matche afficher nouv bouton -->

      <!-- <v-app-bar scroll-behavior="hide" class="bg-transparent">
    <div>
      <router-link to="/ma-route">
        <v-btn variant="outlined">
        Button
        </v-btn>
      </router-link>
      <router-link to="/ma-route">
        <v-btn variant="outlined">
        Button
        </v-btn>
      </router-link>
    </div>
    </v-app-bar> -->

      <div class="mt-9 mr-12" style="position: absolute; right: 0; z-index: 2">
        <v-row>
          <v-col>
            <v-btn text to="/" variant="outlined" class="mx-2"> Accueil </v-btn>
            <v-btn text to="/news" variant="outlined" class="mx-2"> Actualités </v-btn>
            <v-btn text to="/shop" variant="outlined" class="mx-2"> Boutique </v-btn>
            <v-btn text to="/result" variant="outlined" class="mx-2"> Résultat de tombola </v-btn>
          </v-col>
        </v-row>
      </div>

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

      <v-main>
        <transition name="fade" mode="out-in">
          <router-view :key="$route.fullPath" />
        </transition>
      </v-main>
    </v-parallax>

    <AppFooter />
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { sanity } from './sanity';
import { provide } from 'vue';

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
const home = ref<Slider[]>([]);

onMounted(async () => {
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
