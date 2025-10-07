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
    style="margin-left: 1.5em">
    <div
    style="display: flex; flex-direction: column; align-items: center; justify-content: center;"
    >
    <div style="margin: 0.5em 0em 0.5em 0em !important; padding: 1em">
    <v-sheet
      color="white"
      width="100%"
      style="padding: 0rem 1rem 0rem 1rem; border-radius: 0.5em;"
    >
        <v-card class="mx-auto my-auto" elevation="0" style="display: flex; padding-inline: 1em; margin-top: 1em !important; padding-top: 1em; flex-direction: row; align-items: center; justify-content: center; border-radius: 1em;" color="white">
          <v-icon color="orange" icon="mdi-information"></v-icon>
          <v-card-text class="pt-4" style=" color: orange">
            {{ t('resultat.présentation') }}
          </v-card-text>
        </v-card>
        <div style="width: 100%;">
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
              elevation="0"
              expand-icon="mdi-plus"
              collapse-icon="mdi-minus"
              >
              <v-expansion-panel-title style="color: orange; max-width: 100%">
                {{ t('resultat.instructions.instructions') }}
              </v-expansion-panel-title>
              <v-expansion-panel-text style="color: orange; display: flex; align-items: center; justify-content: center;" bg-color="white" color="orange" max-width="100%">
                <v-timeline 
                :direction="$vuetify.display.mdAndUp ? 'horizontal' : 'vertical'"
                line-inset="12">
                  
    <v-timeline-item>
      <template v-slot:opposite>
        {{ t('resultat.instructions.first') }}
      </template>
      {{ t('resultat.instructions.etape 1') }}
    </v-timeline-item>

    <v-timeline-item>
      <template v-slot:opposite>
        {{ t('resultat.instructions.etape 2') }}
      </template>
      {{ t('resultat.instructions.second') }}
    </v-timeline-item>

    <v-timeline-item>
      <template v-slot:opposite>
        {{ t('resultat.instructions.third') }}
      </template>
      {{ t('resultat.instructions.etape 3') }}
    </v-timeline-item>
  </v-timeline>
              </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-sheet>
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
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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
