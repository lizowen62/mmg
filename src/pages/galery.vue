<template>
    <v-container v-if="images">
    <FsLightbox
      :toggler="togglerLightBox"
      :sources="images.map(image => image.mainImage.asset.url)"
      :slide="slide"
    />
    <v-row>
      <template v-if="images.length > 0" v-for="(image,imgIdx) in imageLayout" :key="imgIdx">
        <v-col :cols="image.cols">
          <v-img
            :src="images[imgIdx].mainImage.asset.url"
            height="100%"
            cover
            @click="togglerLightBox = !togglerLightBox; slide = imgIdx"
          ></v-img>
        </v-col>

        <v-col v-if="image.children && images.length > 0" class="d-flex flex-column" cols="6">
          <v-row>
            <v-col v-for="(children,childIdx) in image.children" :key="childIdx" :cols="children.cols">
              <v-img
                :src="images[imgIdx].mainImage.asset.url"
                height="100%"
                cover
                @click="togglerLightBox = !togglerLightBox; slide = imgIdx + childIdx"
              ></v-img>
            </v-col>
          </v-row>
        </v-col>
      </template>
    </v-row>
    </v-container>
</template>
  
  <script setup lang="ts">
  
  interface BlobImage {
    _id: string;
    mainImage?: {
      asset?: {
        url?: string;
      };
    };
  }
  
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { sanity } from '../sanity';
  import FsLightbox from 'fslightbox-vue';
  
  const route = useRoute();
  const images = ref<BlobImage[]>([]);
  const togglerLightBox = ref(false);
  const slide = ref(0);
  const imageLayout = [
    { cols: 4 },
    {
      cols: 8,
      children: [{ cols: 12 }, { cols: 12 }],
    },
    { cols: 6 },
    { cols: 3 },
    { cols: 9 },
  ]
  
  const getPost = async () => {
    const tmp = await sanity.fetch(`*[_type == "BlobImage"]{
    _id,
    mainImage {
      asset-> {
        url
      }
    },
  }`);
    return tmp;
  };
  
  
  onMounted(async () => {
    images.value = await getPost();
    console.log(images.value);
  });

  </script>
  

  