// @ts-nocheck
<template>
  <v-container fluid class="mt-10">
    <v-row dense class="flex justify-center align-center">
      <div
        style="
          display: flex;
          flex-direction: row;
          align-items: start;
          justify-content: center;
          width: 100%;
          height: 100%;
        "
      >
        <div
          v-if="!isSmallScreen"
          style="
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: start;
            elevation: 24;
            background-color: white;
            height: 100%;
            border-radius: 1em;
            padding: 3em 1em 5em 1.5em;
          "
        >
          <p style="font-size: 1vw; color: orange">Produits de cette année</p>
          <p style="font-size: 2vw; color: orange">Filtres :</p>
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
        <div
          style="
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: start;
            width: 100%;
          "
        >
          <div style="padding: 0rem 1rem 0rem 1rem">
            <v-card
              class="mx-auto"
              style="
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                padding-left: 1em;
              "
              color="white"
              width="100%"
            >
              <v-icon color="orange" icon="mdi-information"></v-icon>
              <v-card-text class="pt-4" style="font-size: 1vw; color: orange">
                Nos Produits ,
                Attention n'étant pas éligible a la vente en ligne cette vitrine est a titre
                informative! rendez en periode de vente pour acheter dans les point ventes !
              </v-card-text>
            </v-card>
          </div>
          <div class="grid">
            <div class="card" v-for="item in filteredArticles" :key="item._id">
              <v-hover v-slot="{ isHovering, props }">
                <v-card color="grey-lighten-4" width="100%" v-bind="props">
                  <v-img :aspect-ratio="16 / 9" :src="item.Image.asset.url" cover>
                    <v-expand-transition>
                      <div
                        v-if="isHovering"
                        class="d-flex bg-orange-darken-2 v-card--reveal text-h2 text-start"
                        style="height: 100%; text-align: start; display: flex; align-items: center; justify-content: center;"
                      >
                        <v-btn :to="`/product/${item.slug.current}`" color="white" variant="outlined" class="mx-2">
                          En savoir plus
                        </v-btn>
                      </div>
                    </v-expand-transition>
                  </v-img>

                  <v-card-text class="pt-2">
                    <h3 class="text-h4 font-weight-light text-orange">
                      {{ item.Name }}
                    </h3>
                    <div style="font-size: 1vw; color: orange; display: flex; align-items: start; margin-top: 1em; justify-content: start; flex-direction: column;">
                      <h6> Taille : {{ item.Description[0].content }}</h6>
                      <h6> Prix : {{ item.Description[1].content }}</h6>
                    </div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </div>
          </div>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { sanity } from '../sanity';
import { inject } from 'vue';

interface Product {
  _id: string;
  Name: string;
  category: string;
  slug: string;
  Description: {
    title: string;
    price: number;
    content: string;
  }[];
  Image?: {
    asset?: {
      url?: string;
    };
  };
}

const categories = ref(['Tout', 'Doudou', 'Accessoires', 'Vêtements', 'Technologie']);
const selectedCategory = ref('Tout');
const isSmallScreen = inject('isSmallScreen');
const articles = ref<Product[]>([]);
const currentPage = ref(1);
const articlesPerPage = 8; // Number of articles per page
const totalPages = computed(() =>
  Math.ceil(filteredArticles.value.length / articlesPerPage)
);

const filteredArticles = computed(() => {
  if (selectedCategory.value === 'Tout') return articles.value;
  return articles.value.filter((article: Product) => {
    console.log(article.category);
    if (selectedCategory.value.toLowerCase() === article.category.toLowerCase()) {
      console.log("trouvé");
      return article;
    }
    console.log("non trouvé");
  });
});

onMounted(async () => {
  articles.value = await getArticles();
  console.log(articles.value);
});

function selectCategory(cat: string) {
  selectedCategory.value = cat;
  currentPage.value = 1;
}

const getArticles = async () => {
  return await sanity.fetch(`*[_type == "Products"]{
    _id,
    Name,
    slug,
    category,
    Image {
      asset-> {
        url
      }
    },
    Description[]
  }`);
};
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
