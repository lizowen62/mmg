// @ts-nocheck
<template>
  <v-container v-if="post">
    <v-row justify="start">
      <v-btn text to="/news" variant="outlined" class="mx-2 mt-4"> Retour aux actualités </v-btn>
    </v-row>
    <div style="display: flex; flex-direction: column; align-items: start; justify-content: start">
      <h1 style="margin: 1em 0em 1em 0em">{{ post.title }}</h1>
      <BlockRenderer :value="post.body" />
      <v-img
        v-if="post.mainImage"
        :src="post.mainImage.asset.url"
        height="500"
        width="500"
        class="mb-2"
      />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { sanity } from '../../sanity';
import BlockRenderer from '../../components/PostContent.vue';

interface Post {
  title: string;
  body: string;
  mainImage?: {
    asset?: {
      url?: string;
    };
  };
}

const route = useRoute();
const post = ref<Post | null>(null);

const getPost = async () => {
  const result = await sanity.fetch(
    `*[_type == "customEvent" && slug.current == $slug][0]{
    title,
    body,
    mainImage {
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
});
</script>
