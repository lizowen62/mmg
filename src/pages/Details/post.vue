// @ts-nocheck
<template>
  <v-container v-if="post">
    <v-row justify="start">
      <v-btn text to="/news" variant="outlined" class="mx-2 mt-4 return-btn"> Retour aux actualités </v-btn>
    </v-row>
    <div style="display: flex; flex-direction: column; align-items: start; justify-content: start">
      <div style="margin: 2em 0em 0.5em 0em; display: flex; flex-direction: row; align-items: center; justify-content: space-between; width: 100%">
        <h1 class="text-h4 title">{{ post.title }}</h1>
        <p class="date">{{ $t('details.date') }} {{ formatDate(post.publishedAt) }}</p>
      </div>
      <BlockRenderer :value="post.body" />
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center">
        <v-img
          v-if="post.image"
          :src="post.image.asset.url"
          height="500"
          width="500"
          class="mb-2"
        />
      </div>
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
  publishedAt: string;
  mainImage?: {
    asset?: {
      url?: string;
    };
  };
}

const route = useRoute();
const post = ref<Post | null>(null);


function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Paris',
  }).format(date);
}

const getPost = async () => {
  const result = await sanity.fetch(
    `*[_type == "customEvent" && slug.current == $slug][0]{
    title,
    body,
    publishedAt,
    mainImage {
      asset->{
        url
      }
    },
    image {
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

<style lang="scss">

.return-btn {
 color: $color-text-secondary !important; 
}

.title {
  color: $color-text-secondary;
}

.date {
  color: $color-text-secondary;
}

</style>

