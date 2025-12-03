<template>
  <v-container>
    <v-sheet
        width="100%"
        style="padding: 0rem 1rem 0rem 1rem; border-radius: 0.5em;"
        >
          <div style="width: 100%;">
            <v-card
              class="mx-auto"
              style="
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                padding-top: 0.5em;
              "
              color="transparent"
              elevation="0" 
              width="100%"
            >
              <v-icon class="color-icon" icon="mdi-information" style="padding: 1em;"></v-icon>
              <v-card-text class="color-text-secondary">
                {{ t('shop.présentation') }}
              </v-card-text>
            </v-card>
            <v-expansion-panels
              v-model="panel"
          multiple
          width="100%"
        >
              <v-expansion-panel
              width="100%"
              value="foo"
              border-radius="2em"
              text-color="orange"
              elevation="0"
              expand-icon="mdi-plus"
              collapse-icon="mdi-minus"
              >
              <v-expansion-panel-title class="color-text-secondary" style="max-width: 100%">
                {{ t('resultat.instructions.instructions') }}
              </v-expansion-panel-title>
              <v-expansion-panel-text class="color-text-secondary" style="display: flex; align-items: center; justify-content: center;" max-width="100%">
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
    <v-divider  style="margin-top: 2em; margin-bottom: 2em;" :thickness="3" class="color-icon"></v-divider>
    <v-row>
      <v-col
        v-for="event in events"
        :key="event._id"
        cols="12"
        sm="6"
        md="4"
      >
      
        <v-card 
        class="v-theme--light flat-card"
        elevation="0"
        rounded="lg"
        >
          <v-card-title class="color-text" style="text-align: start;">{{ event.title }}</v-card-title>
          <v-card-actions>
            <v-btn
              v-if="event.file?.asset?.url"
              :href="event.file.asset.url"
              download
              class="color-text"
            >
              <v-icon icon="mdi-download" class="button-color"></v-icon>
              <p  class="button-color" style="padding-left: 1em">
                Télécharger {{ event.file.asset.originalFilename || 'le fichier' }}
              </p>
            </v-btn>
            <v-chip v-else color="red" text-color="white">Aucun fichier disponible</v-chip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">

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

import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { sanity } from '../sanity'

const { t } = useI18n()

const panel = ref([])

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


</script>

<style lang="scss">

.button-color {
  color: $button-color;
}

.flat-card {
  background-color: "white" !important; /* couleur du thème */
  padding: 0.5rem; 
  border: 1px solid rgba(0,0,0,0.06); 
  border-left: 0.2em solid $pink;
  opacity: 0.9;
}

</style>

