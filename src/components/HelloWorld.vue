
<template>
  <v-container fluid>
    <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-around; width: 100%; padding: 2em 0em 2em 0em;  height: 100%;">
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <div style="display: flex; flex-direction: row;">
              <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <v-hover>
                  <v-card
                    color="grey-lighten-4"
                    width="90%"
                  >
                  <v-row class="d-flex flex-row justify-center align-center">
                <v-card
                  class="d-flex flex-row align-center justify-center w-full"
                  color="orange"
                  width="100%"
                >
                <v-card-text v-if="!isSmallScreen" style="padding: 1em 0em 1em 1em; max-width: 30%; margin-left: 1em; display: flex; flex-direction: column;">
                  <p style="font-size: 2em; font-weight: bold; color: white; margin-bottom: 0.5em;">Présentation</p>
                  <p class="text-left font-weight-bold text-white p-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                    labore et dolore magna aliqua.
                    djiiirfl.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                    labore et dolore magna aliqua.
                  </p>
                </v-card-text>
                <v-card-text style="padding: 5.5em 0em 5.5em 0em; max-width: 60%;">
                  <p class="text-center text-h1 font-weight-bold text-white p-2">
                    3600 €
                  </p>
                  <div style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
                    <v-btn variant="outlined" color="white" class="font-weight-bold" style="border-width: 3px; margin: 1em; display: flex; padding: 1.5em;">
                      Faire un don & MMG
                    </v-btn>
                    <v-btn v-if="isCampaign" variant="outlined" color="white" class="font-weight-bold" style="border-width: 3px; margin: 1em; display: flex; padding: 1.5em;">
                      Faire un don au téléthon
                    </v-btn>
                  </div>
                </v-card-text>
                </v-card>
                  </v-row>
                  </v-card>
                </v-hover>
              </div>
        </div>
      </div>
      <div style="display: flex; flex-direction:  isMediumScreen ? 'row' : 'column'; align-items: center; justify-content: center;">
        <v-date-picker 
              elevation="24"
              landscape="true"
              bg-color="white"
              disabled="true"
              show-adjacent-months="true"
              hide-weekdays="true"
              hide-header="true"
              highlight="highlightedDates"
              v-model="highlightedDates"
              ></v-date-picker>
              <div style="display: flex; flex-direction: column; justify-content: start; align-items: start; margin-left: 1em; margin-top: 1em;">
                <p class="text-center font-weight-bold text-white">
                    Prochain événement
                </p>
                <div style="display: flex; flex-direction: column; justify-content: start; align-items: start; margin-top: 1em">
                  <v-chip v-for="date in articles" :key="date" :color="date.color" variant="flat" style="margin: 0.5em;">
                    {{ date.heroTitle }}
                  </v-chip>         
                </div>
              </div>
      </div>
    </div>
    <div style="display: flex; flex-direction: row; align-items: center; justify-content: center; background-color: '#e9383f'; height: 60%; width: 100%; margin-bottom: 2em;">
      <div style="width: 20%; margin: 0em 3em 0em 3em;">
        <v-img
          :src="logo"
          alt="Image locale"
          height="100%"
          contain
        />
      </div>
      <div style="width: 20%; margin: 0em 3em 0em 3em;">
        <v-img
          :src="logo"
          alt="Image locale"
          height="100%"
          contain
        />
      </div>
      <div style="width: 20%; margin: 0em 3em 0em 3em;">
        <v-img
          :src="logo"
          alt="Image locale"
          height="100%"
          contain
        />
      </div>
    </div>
  </v-container>
</template>


<style scoped>
.custom-outlined {
  border-width: 0.5em !important;
}
</style>

<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { sanity } from '../sanity'
import { inject } from 'vue';
import logo from '@/assets/image/logo-gouvernement-princier.png'

    const MediumScreen = inject('MediumScreen');
    const isSmallScreen = inject('isSmallScreen');
    const isCampaign = inject('isCampaign');
    const articles = ref(null)
    const currentPage = ref(1)
    const totalPages = ref(1)

    const highlightedDates = ref([
        '2025-05-01',
        '2025-05-15',
        '2025-05-20',
    ])  

    onMounted(async () => {
      articles.value = await getArticles()
      highlightedDates.value = articles.value.map((article: any) => article.startDate)
      console.log(articles.value)
    })

    const getArticles = async () => {
    return await sanity.fetch(`*[_type == "Events"]{
        heroTitle,
        color,
        startDate,
        endDate,
    }`)
    }

</script>
