<template>
    <v-container v-if="images">
        <!-- <v-row>
            <v-col
            v-for="image in images"
            :key="image._id"
            class="d-flex child-flex"
            cols="4"
            >
            <v-img
                :lazy-src="image.mainImage.asset.url"
                :src="image.mainImage.asset.url"
                aspect-ratio="1"
                class="bg-grey-lighten-2"
                cover
            >
                <template v-slot:placeholder>
                <v-row
                    align="center"
                    class="fill-height ma-0"
                    justify="center"
                >
                    <v-progress-circular
                    color="grey-lighten-5"
                    indeterminate
                    ></v-progress-circular>
                </v-row>
                </template>
            </v-img>
            </v-col>
        </v-row> -->
        <v-row>
    <template v-if="images.length > 0" v-for="(image,imgIdx) in imageLayout" :key="imgIdx">
      <v-col :cols="image.cols">
        <v-img
          :src="images[imgIdx].mainImage.asset.url"
          height="100%"
          cover
        ></v-img>
      </v-col>

      <v-col v-if="image.children && images.length > 0" class="d-flex flex-column" cols="6">
        <v-row>
          <v-col v-for="(children,childIdx) in image.children" :key="childIdx" :cols="children.cols">
            <v-img
              :src="images[imgIdx].mainImage.asset.url"
              height="100%"
              cover
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
  
  const route = useRoute();
  const images = ref<BlobImage[]>([]);

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
  

  