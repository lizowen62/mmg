<template>
  <v-container>
    <v-sheet elevation="4" style="width: 100%">
      <!-- TABS -->
      <v-tabs v-model="tab" color="pink">
        <v-tab value="one">À propos de nous</v-tab>
        <v-tab value="two">{{ $t('menu.gallerie') }}</v-tab>
        <v-tab value="three">{{ $t('CGV') }}</v-tab>
      </v-tabs>

      <v-divider :thickness="5" class="color-text"></v-divider>

      <!-- TABS CONTENT -->
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="one">
          <v-sheet class="pa-5">
            {{ t('aboutUs') }}
          </v-sheet>
        </v-tabs-window-item>

        <v-tabs-window-item value="two">
          <v-sheet >
            <FsLightbox
              :toggler="togglerLightBox"
              :sources="images.map(image => image.mainImage?.asset?.url)"
              :slide="slide"
            />

            <v-row>
              <template v-for="(image, imgIdx) in imageLayout" :key="imgIdx">
                <v-col :cols="image.cols">
                  <v-img
                    :src="images[imgIdx]?.mainImage?.asset?.url"
                    height="100%"
                    cover
                    @click="openLightbox(imgIdx)"
                  />
                </v-col>

                <v-col
                  v-if="image.children && images[imgIdx]"
                  class="d-flex flex-column"
                  cols="6"
                >
                  <v-row>
                    <v-col
                      v-for="(child, childIdx) in image.children"
                      :key="childIdx"
                      :cols="child.cols"
                    >
                      <v-img
                        :src="images[imgIdx + childIdx]?.mainImage?.asset?.url"
                        height="100%"
                        cover
                        @click="openLightbox(imgIdx + childIdx)"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </template>
            </v-row>
          </v-sheet>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const display = useDisplay()
const tab = ref('one')

// Form refs
const form = ref(null)
const valid = ref(false)

// Champs
const name = ref('')
const email = ref('')
const message = ref('')

// Règles de validation
const rules = {
  required: value => !!value || 'Ce champ est requis',
  email: value =>
    /.+@.+\..+/.test(value) || 'Adresse e-mail invalide',
}

const subjects = [
  'Support technique',
  'Demande commerciale',
  'Autre'
]

// Soumission
const submit = () => {
  if (form.value?.validate()) {
    console.log('Formulaire soumis:', {
      name: name.value,
      email: email.value,
      message: message.value,
    })
    // 👉 ici tu pourrais envoyer via API/axios
    alert('Merci pour ton message !')
    form.value.reset()
  }
}
</script>