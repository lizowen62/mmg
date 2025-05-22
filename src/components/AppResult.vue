
<template>
  <div style="display: flex; flex-direction: row; align-items: center; justify-content: center; width: 90%;">
    <div style="width: 25%; display: flex; flex-direction: column; align-items: start; justify-content: center; margin: 0em 1em 0em 0em;">
      <div style="display: flex; flex-direction: row; margin: 1em 0em 1em 0em;">
        <v-card
              class="mx-auto"
              style="opacity: 0.8; padding: 0.5em;"
              color="white"
              opacity="0.8"
              width="100%"
        >
          <v-btn  
            color="orange"
            variant="outlined"
            class="mx-2"
            @click="selectCategory('Tout')"
          >
            2022
          </v-btn>
          <v-btn
            color="orange"
            variant="outlined"
            class="mx-2"
            @click="selectCategory('Tout')"
          >
            2023
          </v-btn>
          <v-btn
            color="orange"
            variant="outlined"
            class="mx-2"
            @click="selectCategory('Tout')"
          >
            2024
          </v-btn>
          <v-btn
            color="orange"
            variant="outlined"
            class="mx-2"
            @click="selectCategory('Tout')"
          >
            2025
          </v-btn>
        </v-card>
      </div>
      <div>
        <v-card
          class="my-3"
          max-width="100%"
          style="opacity: 0.8;"
          color="white"
          opacity="0.8"
        >
      <div style="display: flex; flex-direction: column; align-items: start; justify-content: center;">
        <div>
          <v-card-title>Comment participer & la tombola ?</v-card-title>
          <v-card-text>Prendre un ticket en point de vente laissé mon numéro</v-card-text>
        </div>
        <div>
          <v-card-title>Comment participer & la tombola ?</v-card-title>
          <v-card-text>Suivre les pages facebook et instagram pour le tirage ( ou ici )</v-card-text>
        </div>
        <div>
          <v-card-title>Comment participer & la tombola ?</v-card-title>
          <v-card-text>Comment participer & la tombola ?</v-card-text>
        </div>
      </div>
    </v-card>
      </div>
    </div>
    <div style="width: 70%;">
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <v-card
              class="mx-auto"
              style="opacity: 0.8;"
              color="white"
              opacity="0.8"
              width="100%"
            >

              <v-card-text class="pt-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, 
                at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
              </v-card-text>
            </v-card>
    <div class="grid">
      <div class="card" v-for="event in events" :key="event.id">
                      <v-card-title style="text-align: start; color: orange;">{{ event.title }}</v-card-title>
                      <v-card-actions>
                        <v-btn
                          v-if="event.file?.asset?.url"
                          :href="event.file.asset.url"
                          download
                          color="primary"
                        >
                        <v-icon icon="mdi-download"></v-icon>
                        <p style="color: orange; padding-left: 1em;">Télécharger {{ event.file.asset.originalFilename || 'le fichier' }}</p>
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

  import { sanity } from '../sanity'

  const itemss = [
    { text: 'Real-Time', icon: 'mdi-clock', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!' },
    { text: 'Audience', icon: 'mdi-account', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!' },
    { text: 'Conversions', icon: 'mdi-flag', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!' },
  ]

  const currentPage = ref(1)
  const totalPages = ref(1)

  const events = ref(null)

  onMounted(async () => {
    events.value = await getArticles()
  })

  const getArticles = async () => {
    return await sanity.fetch(`*[_type == "Resultats"]{
      title,
      file {
        asset->{
          url
        }
      }
    }`)
  }


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
  ]

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
