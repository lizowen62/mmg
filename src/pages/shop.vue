

<template>
    <v-container fluid class="mt-10">
    <v-row dense class="flex justify-center align-center">
      <div style="display: flex; flex-direction: row; align-items: start; justify-content: center; width: 100%; height: 100%;">
        <div v-if="!isSmallScreen" style="display: flex; flex-direction: column; align-items: start; justify-content: start; elevation: 24; background-color: white; opacity: 0.8; height: 100%; border-radius: 1em; padding: 3em 1em 5em 1.5em;">
          <p style="font-size: 2vw; margin: 0em 0em 1em 0em; color: orange;">Filtres :</p>
          <v-btn
              v-for="cat in categories"
              :key="cat"
              :variant="cat === selectedCategory ? 'flat' : 'outlined'"
              color="orange"
              class="ma-2"
              @click="selectCategory(cat)"
            >
            {{ cat }}
          </v-btn>
        </div>
        <div style="display: flex; flex-direction: column; align-items: start; justify-content: start; width: 100%;">
          <div style="padding: 0rem 1rem 0rem 1rem;">
            <v-card
              class="mx-auto"
              style=" display: flex; opacity: 0.8; flex-direction: row; justify-content: center; align-items: center; padding-left: 1em;"
              color="white"
              opacity="0.8"
              width="100%"
            >
            <v-icon color="orange" icon="mdi-information"></v-icon>
              <v-card-text class="pt-4" style="font-size: 1vw; color: orange;">
                Attention n'étant pas éligible a la vente en ligne cette vitrine est a titre informative! rendez en periode de vente pour acheter!
              </v-card-text>
            </v-card>

          </div>
          <div class="grid">
          <div class="card" v-for="item in articles" :key="item.id">
            <v-hover v-slot="{ isHovering, props }">
                  <v-card
                    color="grey-lighten-4"
                    width="100%"
                    v-bind="props"
                  >
                    <v-img
                      :aspect-ratio="16/9"
                      :src="item.Image.asset.url"
                      cover
                    >
                      <v-expand-transition>
                        <div
                          v-if="isHovering"
                          class="d-flex bg-orange-darken-2 v-card--reveal text-h2"
                          style="height: 100%;"
                        >
                          $14.99
                        </div>
                      </v-expand-transition>
                    </v-img>
      
                    <v-card-text class="pt-2">
                      <h3 class="text-h4 font-weight-light text-orange">
                        {{ item.Name }}
                      </h3>
                    </v-card-text>
                  </v-card>
                </v-hover>
          </div>
          </div>     
        </div>
      </div>
    </v-row>
    <v-row justify="center">
        <v-pagination
            v-model="currentPage"
            :length="totalPages"
            :total-visible="7"
        />
    </v-row>
    </v-container>
  </template>
  
  <script setup>

  import { ref, onMounted } from 'vue'
  import { sanity } from '../sanity'
  import { inject } from 'vue';

    const categories = ref(['Tout', 'Doudou', 'Accessoires', 'Vêtements', 'Technologie'])
    const selectedCategory = ref('Tout')
    const isSmallScreen = inject('isSmallScreen');
    const articles = ref(null)
    const currentPage = ref(1)
    const totalPages = ref(1)

    onMounted(async () => {
        articles.value = await getArticles()
        console.log(articles.value)
    })

    function selectCategory(cat) {
        selectedCategory.value = cat
        currentPage.value = 1
    }

    // Fonction de filtre

    
    // const filteredArticles = computed(() => {
    // if (selectedCategory.value === 'Tous') return allArticles.value
    // return allArticles.value.filter(
    //     (article) => article.category === selectedCategory.value
    // )
    // })

    // // Pagination dynamique
    // const totalPages = computed(() =>
    // Math.ceil(filteredArticles.value.length / articlesPerPage)
    // )

    // const paginatedArticles = computed(() => {
    // const start = (currentPage.value - 1) * articlesPerPage
    // const end = start + articlesPerPage
    // return filteredArticles.value.slice(start, end)
    // })

    const getArticles = async () => {
    return await sanity.fetch(`*[_type == "Products"]{
        Name,
        Image {
            asset-> {
                url
            }
        },
        Description
    }`)
    }

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