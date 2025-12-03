<template>
    <v-container class="py-10">
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
      <v-divider  style="margin-top: 2em; margin-bottom: 2em;" :thickness="2"></v-divider>
  
      <!-- 🛍️ Liste des produits -->
      <v-row v-if="cart?.items?.length">
        <v-col
          v-for="item in cart.items"
          :key="item.id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="rounded-xl">
            <v-img
              :src="item.thumbnail"
              height="160"
              cover
            ></v-img>
  
            <v-card-title>{{ item.title }}</v-card-title>
  
            <v-card-subtitle>
              {{ $t('store.quantity') }} : {{ item.quantity }}
            </v-card-subtitle>
  
            <v-card-text>
              Prix unitaire :
              {{ item.unit_price }} €
              <br />
              Total :
              {{ item.unit_price * item.quantity }} €
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- 🧾 Total du panier -->
      <v-row v-if="cart?.items?.length" class="mt-6">
        <v-col cols="12" sm="6" md="4">
          <v-card class="pa-4 rounded-xl">
            <v-card-title class="font-weight-bold">Résumé</v-card-title>
  
            <v-card-text>
              <div class="d-flex justify-space-between mb-2">
                <span>Sous-total</span>
                <span>{{ cart.subtotal }} €</span>
              </div>
  
              <div class="d-flex justify-space-between mb-2">
                <span>Frais de livraison</span>
                <span>
                  {{ cart.shipping_total }} €
                </span>
              </div>
  
              <v-divider class="my-3"></v-divider>
  
              <div class="d-flex justify-space-between font-weight-bold">
                <span>Total</span>
                <span>{{ cart.total }} €</span>
              </div>
            </v-card-text>

            <v-spacer> 
            </v-spacer>

            <div class="d-flex justify-space-between" style="flex-direction: column; align-items: start">
              <v-card-actions>
                <v-btn
                  color="orange"
                  block
                  @click="checkout"
                  :loading="loading"
                >
                  {{ $t('store.validation') }}
                </v-btn>
              </v-card-actions>
              <v-card-actions>
                <v-btn
                  color="orange"
                  block
                  @click="EmptyCart"
                >
                  {{ $t('store.clear_cart') }}
                </v-btn>
              </v-card-actions>
            </div>
  
          </v-card>
        </v-col>
      </v-row>
  
      <!-- 🪶 Panier vide -->
      <v-alert
        v-else
        type="warning"
        variant="tonal"
        class="mt-6"
      >
        {{ $t('store.empty_cart') }}
        <v-btn 
        variant="text" 
        color="orange" 
        @click="$router.push('/shop')">
          {{ $t('store.back_to_shop') }}
        </v-btn>
      </v-alert>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue"
  import { useCart } from "../../components/UseCart"
  import { useI18n } from 'vue-i18n';
  
  const { t } = useI18n();
  
  const { cart, getCart, clearCart } = useCart()
  const loading = ref(false)
  const panel = ref([0])
  
  onMounted(async () => {
    await getCart()
  })


  const EmptyCart = () => {
    clearCart()
  }
  
  /**
   * 🧾 Finaliser le checkout
   * (dans Medusa : POST /store/carts/:id/complete)
   */
  const checkout = async () => {
    if (!cart.value?.id) return
  
    loading.value = true
  
    try {
      const res = await fetch(`http://localhost:9000/store/carts/${cart.value.id}/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key": "pk_4e5382585e8ff934f2f4fd48b4c5c791a871a507029ef1389b6188df3b3b29a4",
        },
      })
  
      const data = await res.json()
  
      if (res.ok && data.type === "order") {
        alert("🎉 Commande confirmée ! Merci pour votre achat ❤️")
        clearCart()
        // redirige vers la page de confirmation
        window.location.href = `/confirmation/${data.order.id}`
      } else {
        console.error("Erreur Medusa :", data)
        alert("❌ Une erreur est survenue lors du paiement.")
      }
    } catch (error) {
      console.error("Erreur checkout :", error)
      alert("⚠️ Impossible de finaliser la commande.")
    } finally {
      loading.value = false
    }
  }

  
  </script>
  
  <style scoped>
  .v-card {
    transition: 0.2s ease;
  }
  .v-card:hover {
    transform: scale(1.02);
  }
  </style>
  