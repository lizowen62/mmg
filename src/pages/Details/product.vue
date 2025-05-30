// @ts-nocheck
<template>
  <v-container>
    <v-row justify="start" align="center">
      <v-btn text to="/shop" variant="outlined" class="mx-2 mt-4"> Retour </v-btn>
    </v-row>
    <v-row v-if="post" style="margin-top: 2em">
    <div style="display: flex; flex-direction: row; align-items: start; justify-content: start">
        <div>
            <v-img
              v-if="post.Image.asset.url"
              :src="post.Image.asset.url"
              height="500"
              width="500"
              class="mb-2"
            />
        </div>
        <div style="display: flex; flex-direction: column; align-items: start; justify-content: start; margin-left: 2em">
            <p>{{ post.Name }}</p>
        </div>
    </div>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { sanity } from '../../sanity';

interface Product {
  _id: string;
  Name: string;
  category: string;
  Image?: {
    asset?: {
      url?: string;
    };
  };
  Description: {
    title: string;
    price: number;
    content: string;
  }[];
}

const route = useRoute();
const post = ref<Product | null>(null);

const getPost = async () => {
  const result = await sanity.fetch(
    `*[_type == "Products" && slug.current == $slug][0]{
    _id,
    Name,
    category,
    Description[],
    Image {
      asset->{
        url
      }
    }
  }`,
    { slug: route.params.slug }
  );
  return result;
};

onMounted(async () => {
  console.log(route.params.slug);
  post.value = await getPost();
  console.log(post.value);
});


</script>
