<template>
  <v-container>
    <Fragment v-if="products.length > 0">
      <v-sheet
          class="v-theme--dark"
          width="100%"
          style="padding: 0rem 1rem 0rem 1rem; border-radius: 0.5em;"
          >
            <div style="width: 100%;">
              <v-card
                class="mx-auto v-theme--dark"
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
              bg-color="transparent"
              text-color="orange"
              elevation="0" 
              expand-icon="mdi-plus"
              collapse-icon="mdi-minus"
            >
              <v-expansion-panel-title style="color: orange; max-width: 100%">
                {{ t('shop.filtre') }}
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
            </div>
      </v-sheet>
      <v-divider  style="margin-top: 2em; margin-bottom: 2em;" :thickness="2"></v-divider>
      <v-row>
        <v-col
          v-for="product in filteredProducts"
          :key="product.id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="rounded-xl">
            <v-img
              :src="product.thumbnail"
              :height="$vuetify.display.smAndDown ? 200 : 500"
              cover
            ></v-img>
  
            <v-card-title>{{ product.title }}</v-card-title>
  
            <!-- Affichage du prix -->
            <div style="display: flex; flex-direction: row;">
              <div>
                <v-card-subtitle v-if="product.variants[0]?.calculated_price">
                  {{ product.variants[0].calculated_price.calculated_amount }} €
                </v-card-subtitle>
      
                <!-- Variant title et stock -->
                <v-card-text v-if="product.tags[0]">
                  <v-chip>
                  {{ product.tags[0].value }}
                </v-chip>
                </v-card-text>
              </div>
              <!-- <div>
                <v-chip>
                  {{ product.tags[0].value }}
                </v-chip>
              </div> -->
            </div>
  
            <v-card-actions class="d-flex justify-start align-start">
              <v-btn
                class="d-flex justify-start align-start"
                color="orange"
                block
                @click="add(product.variants[0].id)"
              >
                Ajouter au panier
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-snackbar
        v-model="showSnackbar"
        color="orange"
        :timeout="1000"
        location="bottom"
        text-color="white"
      >
        Article ajouté au panier !
      </v-snackbar>
    </Fragment>
    <Fragment v-else>
      <v-empty-state
        headline="Whoops, 404"
        title="Page not found"
        text="The page you were looking for does not exist"
        image="https://vuetifyjs.b-cdn.net/docs/images/logos/v.png"
      ></v-empty-state> 
    </Fragment>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useCart } from "../../components/UseCart"
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const MEDUSA_URL = "http://localhost:9000"
const MEDUSA_KEY = "pk_44ca2dffa22441117d4799b94ac85a4f7f9f16f8b133b64712813e33bec72a37"

const products = ref([])
const regionId = ref("reg_01KAKMN0MTK41X5RZTNBFTP1E0")
const { addToCart } = useCart()
const panel = ref([])
const showSnackbar = ref(false)
const categories = ref(['Tout', 'Doudou', 'Accessoires', 'Vêtements', 'Technologie']);
const selectedCategory = ref('Tout');

// Récupération des produits depuis l'API Medusa
onMounted(async () => {
  try {
    // Changé de /products/id vers /products pour récupérer tous les produits
    const res = await fetch(
      `${MEDUSA_URL}/store/products?region_id=${regionId.value}&fields=*variants.calculated_price`, 
      {
        headers: { "x-publishable-api-key": MEDUSA_KEY },
    }
  )
  const data = await res.json()
  
  products.value = data.products
  } catch (error) {
    console.error('Error fetching products:', error)
  }
})

// Ajout au panier
const add = async (variantId) => {
  await addToCart(variantId)
  showSnackbar.value = true
}

function selectCategory(cat) {
  selectedCategory.value = cat;
}

const filteredProducts = computed(() => {
  console.log(selectedCategory.value);
  if (selectedCategory.value === 'Tout') return products.value;
  return products.value.filter((product) => {
    console.log(product.tags[0].value);
    if (selectedCategory.value.toLowerCase() === product.tags[0].value.toLowerCase()) {
      console.log("trouvé");
      return product;
    }
    console.log("non trouvé");
  });
});

// Fonction pour calculer le stock total d'un variant
const getAvailableStock = (variant) => {
  // Si le stock n'est pas géré, retourner illimité
  if (!variant?.manage_inventory) return 999
  
  // Si pas d'inventory items, retourner 0
  if (!variant?.inventory_items || variant.inventory_items.length === 0) {
    return 0
  }
  
  // Calculer le total depuis les location_levels
  return variant.inventory_items.reduce((total, item) => {
    const stockInLocations = item.location_levels?.reduce(
      (sum, level) => sum + (level.stocked_quantity || 0), 
      0
    ) || 0
    return total + stockInLocations
  }, 0)
}
</script>