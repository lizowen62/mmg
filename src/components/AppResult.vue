<template>
  <div
    :style="{ width: $vuetify.display.mdAndUp ? '100%' : '95%'}"
    style="
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    "
  >
    <div
      v-if="false"
      style="
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        margin: 0em 1em 0em 0em;
      "
    >
      <div>
        <v-card class="my-3" max-width="100%" color="white" style="padding: 1em; border-radius: 1em;">
          <div
            style="
              display: flex;
              flex-direction: column;
              align-items: start;
              justify-content: center;
              border-radius: 1em;
            "
          >
          <div style="display: flex; flex-direction: row; margin-bottom: 0.5em;">
            <v-card
              class="mx-auto"
              elevation="0"
              style="padding: 0.7em; border-radius: 1em;"
              color="white"
            >
              <v-btn color="orange" variant="outlined" class="mx-2">
                2022
              </v-btn>
              <v-btn color="orange" variant="outlined" class="mx-2">
                2023
              </v-btn>
              <v-btn color="orange" variant="outlined" class="mx-2">
                2024
              </v-btn>
              <v-btn color="orange" variant="outlined" class="mx-2">
                2025
              </v-btn>
            </v-card>
          </div>
            <div>
              <div style="display: flex; flex-direction: row; align-items: center; justify-content: center;">
                <v-icon color="pink" icon="mdi-information"></v-icon>
                <v-card-title style="color: orange">Comment participer & la tombola ?</v-card-title>
              </div>
              <v-card-text>Prendre un ticket en point de vente laisser mon numéro de téléphone</v-card-text>
            </div>
            <div>
              <div style="display: flex; flex-direction: row; align-items: center; justify-content: center;">
                <v-icon color="green" icon="mdi-information"></v-icon>
                <v-card-title style="color: orange">Je me tien informé du tirage</v-card-title>
              </div>
              <v-card-text
                >Suivre les pages facebook et instagram pour le tirage ( ou ici ) </v-card-text
              >
            </div>
            <div>
              <div style="display: flex; flex-direction: row; align-items: center; justify-content: center;">
                <v-icon color="orange" icon="mdi-information"></v-icon>
                <v-card-title style="color: orange">Suis je gagnant ? on me contacte </v-card-title>
              </div>
              <v-card-text>Je telecharge les resultats, prends mon numero de ticket regarde si je suis gagnant et attends d'être contacté via téléphone puis je viens chercher mon lot</v-card-text>
            </div>
          </div>
        </v-card>
      </div>
    </div>
    <div 
    style="margin-left: 1.5em">
      <div
        style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-top: 1.5em"
      >
        <v-card class="mx-auto my-auto" style="display: flex; padding-inline: 1em; margin: 1em !important; flex-direction: row; align-items: center; justify-content: center; border-radius: 1em;" color="white">
          <v-icon color="orange" icon="mdi-information"></v-icon>
          <v-card-text class="pt-4" style=" color: orange">
            Attention n'étant pas éligible a la vente en ligne cette vitrine est a titre
            informative! rendez en periode de vente pour acheter vos billet de tombola vous pouvez ici telecharger les resultats précédant sous tableur excel!
          </v-card-text>
        </v-card>
        <div style="width: 100%; padding: 1em">

<v-expansion-panels
  v-model="panel"
  multiple
  width="100%"
>
<v-expansion-panel
width="100%"
value="foo"
border-radius="2em"
bg-color="white"
text-color="orange"
expand-icon="mdi-plus"
collapse-icon="mdi-minus"
>
      <v-expansion-panel-title style="color: orange; max-width: 100%">
        Question 1
      </v-expansion-panel-title>
      <v-expansion-panel-text style="color: orange" bg-color="white" color="orange" max-width="100%">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </v-expansion-panel-text>
</v-expansion-panel>
</v-expansion-panels>
</div>
        <div class="grid">
          <div class="card" v-for="event in events" :key="event._id">
            <v-card-title style="text-align: start; color: orange">{{ event.title }}</v-card-title>
            <v-card-actions>
              <v-btn
                v-if="event.file?.asset?.url"
                :href="event.file.asset.url"
                download
                color="primary"
              >
                <v-icon icon="mdi-download" color="orange"></v-icon>
                <p style="color: orange; padding-left: 1em">
                  Télécharger {{ event.file.asset.originalFilename || 'le fichier' }}
                </p>
              </v-btn>
              <v-chip v-else color="red" text-color="white">Aucun fichier disponible</v-chip>
            </v-card-actions>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { sanity } from '../sanity';
import { ref } from 'vue'

const panel = ref([])
  function all () {
    panel.value = ['foo', 'bar', 'baz']
  }
  function none () {
    panel.value = []
  }

interface Resultats {
  _id: string;
  title: string;
  file?: {
    asset?: {
      originalFilename?: string;
      url?: string;
    };
  };
}

const itemss = [
  {
    text: 'Real-Time',
    icon: 'mdi-clock',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
  },
  {
    text: 'Audience',
    icon: 'mdi-account',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
  },
  {
    text: 'Conversions',
    icon: 'mdi-flag',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
  },
];

const currentPage = ref(1);
const totalPages = ref(1);

const events = ref<Resultats[]>([]);

onMounted(async () => {
  events.value = await getArticles();
});

const getArticles = async () => {
  return await sanity.fetch(`*[_type == "Resultats"]{
      title,
      file {
        asset->{
          url
        }
      }
    }`);
};

const items = [
  {
    id: 1,
    color: 'primary',
    icon: 'mdi-information inutile',
  },
  {
    id: 2,
    color: 'secondary',
    icon: 'mdi-alert-circle',
  },
];
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 1rem;
  width: 100%;
}

.card {
  background-color: white;
  height: fit-content;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}
</style>
