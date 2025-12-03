<template>
  <v-container v-if="images">
    <v-sheet
      width="100%"
      style="padding: 0rem 1rem 0rem 1rem; border-radius: 0.5em;"
    >
      <div style="width: 100%;">
        <v-card
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
          <v-card-text class="color-text">
            {{ t('shop.présentation') }}
          </v-card-text>
        </v-card>
      </div>
    </v-sheet>

    <v-divider style="margin-top: 2em; margin-bottom: 2em;" :thickness="5" class="color-text"></v-divider>

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

    <!-- <v-sheet elevation="4" style="width: 100%"> -->
      <!-- TABS -->
      <!-- <v-tabs v-model="tab" color="orange">
        <v-tab value="one">À propos de nous</v-tab>
        <v-tab value="two">{{ $t('menu.gallerie') }}</v-tab>
      </v-tabs>

      <v-divider :thickness="5" class="color-text"></v-divider> -->

      <!-- TABS CONTENT -->
      <!-- <v-tabs-window v-model="tab">
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
      </v-tabs-window> -->
    <!-- </v-sheet> -->
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import FsLightbox from 'fslightbox-vue'
import { sanity } from '../sanity'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface BlobImage {
  _id: string
  mainImage?: {
    asset?: {
      url?: string
    }
  }
}

const route = useRoute()
const images = ref<BlobImage[]>([])
const togglerLightBox = ref(false)
const tab = ref('one')
const slide = ref(0)

const openLightbox = (index: number) => {
  slide.value = index
  togglerLightBox.value = !togglerLightBox.value
}

const imageLayout = [
  { cols: 4 },
  { cols: 8, children: [{ cols: 12 }, { cols: 12 }] },
  { cols: 6 },
  { cols: 3 },
  { cols: 9 },
]

const getPost = async () => {
  return await sanity.fetch(`
    *[_type == "BlobImage"]{
      _id,
      mainImage {
        asset-> { url }
      }
    }
  `)
}

onMounted(async () => {
  images.value = await getPost()
})
</script>