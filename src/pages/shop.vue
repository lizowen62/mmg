// @ts-nocheck
<template>
  <v-container fluid>
    <v-row dense class="flex justify-center align-center">
      <div
        style="
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        "
      >
        <div
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
          "
        >
        <div style="width: 100%; padding: 0.5em 1rem 1em 1em;">
        <v-sheet
        color="white"
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
              <v-icon color="orange" icon="mdi-information"></v-icon>
              <v-card-text style="color: orange">
                Nos Produits ,
                Attention n'étant pas éligible a la vente en ligne cette vitrine est a titre
                informative! rendez en periode de vente pour acheter dans les point ventes !
              </v-card-text>
            </v-card>
          </div>
          <v-expansion-panels
            v-model="panel"
            multiple
            width="100%"
          >
          <v-expansion-panel
            width="100%"
            value="foo"
            border-radius="2em"
            bg-color="transparent"
            text-color="orange"
            elevation="0" 
            expand-icon="mdi-plus"
            collapse-icon="mdi-minus"
          >
            <v-expansion-panel-title style="color: orange; max-width: 100%">
              Filtrer par catégorie
            </v-expansion-panel-title>
            <v-expansion-panel-text style="color: orange" bg-color="white" color="orange" max-width="100%">
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
            </v-expansion-panel-text>
           </v-expansion-panel>
          </v-expansion-panels>
        </v-sheet>
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
                    <div style="display: flex; align-items: center; justify-content: space-between; flex-direction: row; width: 100%;">
                    <div style="color: orange; display: flex; align-items: start; margin-top: 1em; justify-content: start; flex-direction: column;">
                      <h6> Taille : {{ item.Description[0].content }}</h6>
                      <h6 style="font-size: 1em"> Prix : {{ item.Description[1].content }}</h6>
                    </div>
                    <div style="display: flex; align-items: space-between; justify-content: center; flex-wrap: wrap; row-gap: 0.5em; column-gap: 0.5em;">
                      <v-chip append-icon="mdi-check" color="orange">
                        Chip
                      </v-chip>
                      <v-chip append-icon="mdi-check"   color="orange">
                        Chip
                      </v-chip>
                      <v-chip append-icon="mdi-check" color="orange">
                        Chip
                      </v-chip>
                      <v-chip append-icon="mdi-close" color="orange">
                        Chip
                      </v-chip>
                    </div>
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

const panel = ref([])
  function all () {
    panel.value = ['foo', 'bar', 'baz']
  }
  function none () {
    panel.value = []
  }

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
  scale: 1.02;
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
