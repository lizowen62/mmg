// @ts-nocheck

<template>
  <v-container fluid>
    <div
      :style="{ padding: $vuetify.display.smAndUp ? '2em 0em 2em 0em' : '0em 0em 2em 0em' , flexWrap: $vuetify.display.mdAndUp ? 'nowrap' : 'wrap' }"
      style="
        display: flex;
        flex-direction: row;
        align-items: center;
        row-gap: 2em;
        justify-content: space-around;
        width: 100%;
        height: 100%;
      "
    >
      <div
        style="display: flex; flex-direction: column; align-items: center; justify-content: center"
      >
        <div style="display: flex; flex-direction: row">
          <div
            style="
              display: flex;
              flex-wrap: wrap;
              row-gap: 2em; 
              flex-direction: column;
              align-items: center;
              justify-content: center;
            "
          >
            <v-hover>
              <v-card color="grey-lighten-4" width="90%">
                <v-row class="d-flex flex-row justify-center align-center">
                  <v-card
                    class="d-flex flex-row align-center justify-center w-full"
                    color="orange"
                    width="100%"
                  >
                  <div v-if="$vuetify.display.smAndUp" style="width: 20%; margin: 2em;">
                    <v-img :src="logoMMG" alt="Image locale" height="100%" contain />
                  </div>
                    <v-card-text
                    :style="{ maxWidth: $vuetify.display.smAndUp ? '30%' : '90%', margin: $vuetify.display.smAndUp ? '1em' : '0em', padding: $vuetify.display.smAndUp ? '1em 1em 1em 1em' : '2em' }"
                      style="
                        display: flex;
                        flex-direction: column;
                      "
                    >
                      <p
                        style="
                          font-size: 2em;
                          font-weight: bold;
                          color: white;
                          margin-bottom: 0.5em;
                        "
                      >
                        Présentation
                      </p>
                      <p class="text-left font-weight-bold text-white p-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. djiiirfl. Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua.
                      </p>
                    </v-card-text>
                    <v-card-text v-if="$vuetify.display.smAndUp" style="padding: 5.5em 0em 5.5em 0em; max-width: 60%">
                      <p class="text-center text-h1 font-weight-bold text-white p-2">3600 €</p>
                      <div
                        style="
                          display: flex;
                          flex-direction: row;
                          justify-content: center;
                          align-items: center;
                        "
                      >
                        <v-btn
                          variant="outlined"
                          color="white"
                          class="font-weight-bold"
                          style="border-width: 3px; margin: 1em; display: flex; padding: 1.5em"
                        >
                          Faire un don & MMG
                        </v-btn>
                        <v-btn
                          v-if="isCampaign"
                          variant="outlined"
                          color="white"
                          class="font-weight-bold"
                          style="border-width: 3px; margin: 1em; display: flex; padding: 1.5em"
                        >
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
      <div 
        :style="{ flexDirection: $vuetify.display.smAndUp ? 'row' : 'column' }"
        style="display: flex; align-items: center; justify-content: center;"
      >
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
        <div
          :style="{ marginLeft: $vuetify.display.smAndUp ? '1em' : '0em' }"
          style="
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: start;
            margin-top: 1em;
          "
        >
          <p class="text-center font-weight-bold text-white">Prochain événement</p>
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: start;
              align-items: start;
              margin-top: 1em;
            "
          >
            <v-chip
              v-for="date in articles"
              :key="date"
              :color="date.color"
              variant="flat"
              style="margin: 0.5em"
            >
              {{ date.heroTitle }}
            </v-chip>
          </div>
        </div>
      </div>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center">
      <p style="font-size: 3vw; margin: 0.5em 0em 0.5em 0.2em; font-weight: bold; color: orange">Nos Partenaires</p>
      <div
        style="
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          background-color: '#e9383f';
          height: 60%;
          width: 100%;
          margin: 1em 0em 2em 0em;
        "
      >
        <div style="width: 20%; margin: 0em 3em 0em 3em">
          <v-img :src="logo" alt="Image locale" height="100%" contain />
        </div>
        <div style="width: 20%; margin: 0em 3em 0em 3em">
          <v-img :src="logo" alt="Image locale" height="100%" contain />
        </div>
        <div style="width: 20%; margin: 0em 3em 0em 3em">
          <v-img :src="logo" alt="Image locale" height="100%" contain />
        </div>
        <div style="width: 20%; margin: 0em 3em 0em 3em">
          <v-img :src="logo" alt="Image locale" height="100%" contain />
        </div>
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
import { ref, onMounted } from 'vue';
import { sanity } from '../sanity';
import { inject } from 'vue';
import logo from '@/assets/image/logo-gouvernement-princier.png';
import logoMMG from '@/assets/image/logoMMG.png';

interface Event {
  _id: string;
  heroTitle: string;
  color: string;
  startDate: string;
  endDate: string;
}

const MediumScreen = inject('MediumScreen');
const isSmallScreen = inject('isSmallScreen');
const isCampaign = inject('isCampaign');
const articles = ref<Event[]>([]);
const currentPage = ref(1);
const totalPages = ref(1);

const categories = [
  {title: "Actualités", color: "orange"},
  {title: "Téléthon", color: "orange"},
  {title: "Tombola", color: "orange"},
];

const highlightedDates = ref(['2025-05-01', '2025-05-15', '2025-05-20']);

onMounted(async () => {
  articles.value = await getArticles();
  highlightedDates.value = articles.value.map((article: Event) => article.startDate);
  console.log(articles.value);
});

const getArticles = async () => {
  return await sanity.fetch(`*[_type == "Events"]{
        heroTitle,
        color,
        startDate,
        endDate,
    }`);
};
</script>
