// @ts-nocheck

<template>
  <v-container fluid>
    <div
      class="root-row"
      :style="{
        padding: '0 0 2em 0',
        flexWrap: 'wrap'
      }"
    >
    <v-divider :thickness="5" class="color-text"></v-divider>
      <div class="center-column">
        <div class="center-row">
          <div class="card-wrapper">
            <v-hover>
              <v-card variant="text" width="90%">
                <v-row class="d-flex flex-row justify-center align-center">
                  <v-card class="presentation-card card-clean"  elevation="0" border="0" color="transparent" width="100%" :style="{ display: 'flex' }">
                    <div
                      v-if="$vuetify.display.smAndUp"
                      class="logo-wrapper"
                    >
                      <v-img :src="logoMMG" alt="Image locale" height="100%" contain />
                    </div>

                    <v-card-text
                      class="presentation-text"
                      :style="{
                        maxWidth: $vuetify.display.smAndUp ? '30%' : '90%',
                        margin: $vuetify.display.smAndUp ? '1em' : '0em',
                        padding: $vuetify.display.smAndUp ? '1em' : '2em'
                      }"
                    >
                      <p class="presentation-title">
                        {{ $t('presentation') }}
                      </p>

                      <p class="presentation-paragraph text-left font-weight-bold p-2">
                        {{ $t('présentation.présentation') }}
                      </p>
                    </v-card-text>

                    <v-card-text
                      v-if="$vuetify.display.smAndUp"
                      :style="{ marginLeft: $vuetify.display.smAndUp ? '3.5em' : '0em', padding: $vuetify.display.smAndUp ? '3em 0' : '5.5em 0' }"
                      class="price-wrapper"
                    >
                      <p class="price-text text-center color-text font-weight-bold p-2">
                        3600 €
                      </p>

                      <div class="button-row">
                        <v-btn
                          variant="outlined"
                          size="large"
                          class="font-weight-bold btn-large color-text"
                          @click="openDialog"
                        >
                          {{ $t('donation.donation_mmg') }}
                        </v-btn>

                        <v-btn
                          v-if="isCampaign"
                          variant="outlined"
                          color="white"
                          class="font-weight-bold btn-large"
                        >
                          {{ $t('donation.donation_telethon') }}
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
      style="display: flex; flex-direction: row; align-items: center; justify-content: space-around;" 
      :style="{ width: $vuetify.display.smAndUp ? '90%' : '100%', marginTop: $vuetify.display.smAndUp ? '1.5em' : '0em' , flexDirection: $vuetify.display.smAndUp ? 'row' : 'column' }">
        <div :style="{ padding: $vuetify.display.smAndUp ? '0em' : '1em', width: $vuetify.display.smAndUp ? '40%' : '100%' , marginBottom: $vuetify.display.smAndUp ? '0em' : '3.5em' }">
          <p class="title" style="width: 100%; margin-bottom: 1em;"> {{ $t('Activités') }}</p>
          <p class="event-title text-center font-weight-bold text-white" style="width: 100%;">
            {{ $t('présentation.présentation') }}
          </p>
        </div>
        <div class="event-section">
          <p class="title">
            {{ $t('présentation.evenements') }}
          </p>
          <div
            class="calendar-section"
            :style="{ flexDirection: $vuetify.display.smAndUp ? 'row' : 'column' }"
          >
            <Calendar
              v-if="ready"
              color="sky-blue"
              :attributes="highlightedDates"
              :locale="locale"
            ></Calendar>
    
            <div
              class="event-list"
              :style="{ marginLeft: $vuetify.display.smAndUp ? '1em' : '0em' }"
            >
              <div class="event-chip-list">
                <v-chip
                  v-for="date in customEvent"
                  :key="date._id"
                  :color="codecouleur[date.selection]"
                  variant="flat"
                  class="event-chip"
                  :to="`/post/${date.slug.current}`"
                >
                  {{ date.title }}
                </v-chip>
              </div>
            </div>
          </div>
        </div>
      </div>



    </div>

    <div class="partners-section">
      <p class="partners-title">
        {{ $t('présentation.partenaires') }}
      </p>

      <div class="partners-row">
        <div class="partner-logo" v-for="n in 6" :key="n">
          <v-img :src="logo" alt="Image locale" :aspect-ratio="16 / 9" contain :width="400" :height="200" />
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

import eventBus from '../eventBus'
import { ref, onMounted } from 'vue';
import { sanity } from '../sanity';
import { inject } from 'vue';
import logo from '@/assets/image/logo-gouvernement-princier.png';
import logoMMG from '@/assets/image/logoMMG.png';
import { Calendar } from 'v-calendar'

import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const ready = ref(false)

const codecouleur = {
  "a": 'orange',
  "b": 'yellow',
  "c": 'pink',
}

interface Event {
  _id: string;
  heroTitle: string;
  color: string;
  startDate: string;
  endDate: string;
}

interface CustomEvent {
  _id: string;
  title: string;
  slug: string;
  mainImage: any;
  publishedAt: string;
  isCalendar: boolean;
  isFeatured: boolean;
  selection: string;
  eventDate: string;
  body: any;
}

const openDialog = () => {
  eventBus.emit('openDialog')
}

const isCampaign = inject('isCampaign');
const customEvent = ref<CustomEvent[]>([]);

const highlightedDates = ref<{
  key: string;
  highlight: { color: string };
  dates: Date;
}[]>([]);

onMounted(async () => {
  // articles.value = await getArticles();
  customEvent.value = await getCustomEvent()
  highlightedDates.value = customEvent.value.map((event) => ({
  key: event.title,
  dates: new Date(event.eventDate),
  highlight: {
    color: codecouleur[event.selection],
    fillMode: 'solid', // optionnel : "light", "outline", etc.
  },
  popover: { // optionnel : affichage au survol
    label: event.title,
  },
}));
  ready.value = true
  console.log("value", highlightedDates.value)
});


const getCustomEvent = async () => {
  return await sanity.fetch(`
    *[_type == "customEvent" && (isFeatured == true || isCalendar == true)]{
      title,
      slug,
      mainImage {
        asset-> {
          url
        }
      },
      publishedAt,
      isCalendar,
      isFeatured,
      selection,
      eventDate,
    }
  `);
};

</script>

<style lang="scss">
/* --------------------------------------------- */
/* 🔸 VARIABLES GLOBALES CSS (utilisables partout) */
/* --------------------------------------------- */

:root {
  --spacing-xl: 3em;
  --spacing-lg: 2em;
  --spacing-md: 1em;
  --spacing-sm: 0.5em;

  --radius: 12px;
}

/* --------------------------------------------- */
/* 🔸 CONTENEUR PRINCIPAL */
/* --------------------------------------------- */

.root-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  row-gap: var(--spacing-lg);
}

/* --------------------------------------------- */
/* 🔸 CENTRAGE */
/* --------------------------------------------- */

.center-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.center-row {
  display: flex;
  flex-direction: row;
}

/* --------------------------------------------- */
/* 🔸 WRAPPER POUR LA CARTE */
/* --------------------------------------------- */

.card-wrapper {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  row-gap: var(--spacing-lg);
  align-items: center;
  justify-content: center;
}

/* --------------------------------------------- */
/* 🔸 CARTE DE PRÉSENTATION */
/* --------------------------------------------- */


.presentation-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: $card-bg;
  justify-content: center;
}

.card-clean {
  box-shadow: none !important;
  border: none !important;
}

.presentation-paragraph {
  color: $color-text-secondary;
  font-size: 1.5em;
}

/* --------------------------------------------- */
/* 🔸 LOGO DANS LA CARTE */
/* --------------------------------------------- */

.logo-wrapper {
  width: 20%;
  margin: var(--spacing-lg);
}

/* --------------------------------------------- */
/* 🔸 TEXTE DE PRÉSENTATION */
/* --------------------------------------------- */

.presentation-text {
  display: flex;
  flex-direction: column;
}

.presentation-title {
  font-size: 2em;
  font-weight: bold;
  color: $blue;
  margin-bottom: var(--spacing-sm);
}

/* --------------------------------------------- */
/* 🔸 BLOC DU PRIX */
/* --------------------------------------------- */

.price-wrapper {
  padding: 5.5em 0;
  border-left: 3px solid $pink;
  max-width: 60%;
}

.price-text {
  font-size: 9em;
}

/* --------------------------------------------- */
/* 🔸 BOUTONS */
/* --------------------------------------------- */

.button-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.btn-large {
  border-width: 3px;
  margin: var(--spacing-md);
  padding: 1.5em;
}

/* --------------------------------------------- */
/* 🔸 SECTION CALENDRIER */
/* --------------------------------------------- */

.calendar-section {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: var(--spacing-lg);
}

/* --------------------------------------------- */
/* 🔸 LISTE DES ÉVÈNEMENTS */
/* --------------------------------------------- */


.title {
  font-size: 2em;
  font-weight: bold;
  color: $blue !important;
  }

.event-title {
  font-size: 1.5em;
  font-weight: bold;
  text-align: left !important;
  color: $color-text-secondary !important;
}

.event-list {
  display: flex;
}

.event-chip-list {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}

.event-chip {
  margin: var(--spacing-sm);
}

/* --------------------------------------------- */
/* 🔸 SECTION PARTENAIRES */
/* --------------------------------------------- */

.partners-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.partners-title {
  font-size: 2em;
  margin: var(--spacing-sm);
  font-weight: bold;
  color: $blue;
}

.partners-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  // background-color: $pink;
  width: 100%;
  margin: var(--spacing-md) 0 var(--spacing-lg) 0;
}

.partner-logo {
  margin: 0 2em;
}
</style>
