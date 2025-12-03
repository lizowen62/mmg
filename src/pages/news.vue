<template>
  <v-container v-if="posts">
    <div style="padding: 1rem">
      <h1 style="color: orange; margin-bottom: 0.5rem" :style="{ display: $vuetify.display.mdAndDown ?  'block' : 'none' }">Présentation</h1>
    <div class="video-row" :style="{ flexDirection: $vuetify.display.mdAndDown ?  'column' : 'row' }">
    <div class="video" :style="{ width: $vuetify.display.mdAndDown ? '100%' : '70%' }">
      <LiteYouTubeEmbed
        id="86gh7GviHPw"
        title="Présentation"
      />
    </div>
    <div style="max-width: 50%; flex-direction: column; display: flex" :style="{ display: $vuetify.display.mdAndDown ?  'none' : 'flex' }">
      <h1 class="title" style="color: orange; margin-bottom: 0.5rem">{{ $t('presentation') }}</h1>
      <p class="text" style="font-size: large;">{{ $t('association') }}</p>
    </div>
  </div>
    </div>
    <div style="display: flex; flex-direction: column; align-items: start; justify-content: start">
      <div class="grid">
        <div class="card" v-for="post in posts" :key="post._id">
            <v-card-title class="news" style="text-align: center; color: orange">
              {{ post.title }}
            </v-card-title>
            <RouterLink :to="`/post/${post.slug.current}`" style="text-decoration: none;">
              <v-img :aspect-ratio="7 / 9" :src="post.mainImage?.asset?.url" cover />
            </RouterLink>
        </div>
      </div>
    </div>
  </v-container>
  <v-container v-else>
    <div v-for="i in 5" :key="i">
      <v-skeleton-loader
          class="mx-auto border"
          max-width="300"
          type="image, article"
      />
    </div>
  </v-container>
</template>

<script setup lang="ts">

interface Post {
  _id: string;
  title: string;
  body: string;
  slug: string;
  publishedAt: string;
  mainImage?: {
    asset?: {
      url?: string;
    };
  };
}

import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { sanity } from '../sanity';
import LiteYouTubeEmbed from 'vue-lite-youtube-embed'
import 'vue-lite-youtube-embed/style.css'

const route = useRoute();
const posts = ref<Post[]>([]);


const getPost = async () => {
  return await sanity.fetch(`
    *[_type == "customEvent"] | order(publishedAt desc){
      title,
      slug,
      mainImage {
        asset-> {
          url
        }
      },
      publishedAt,
      selection,
    }
  `);
};

onMounted(async () => {
  posts.value = await getPost();
  console.log(posts.value);
});
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
.video-row {
  display: flex;
  gap: 20px;
  justify-content: flex-start;
  border-radius: 8px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}



.video lite-youtube {
  width: 100% !important;   /* le composant prend toute la largeur du conteneur */
  height: auto !important;
  border-radius: 8px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

</style>

<style lang="scss">

.news {
  color: $blue !important;
}

.title {
  color: $blue !important;
}

.text {
  color: $color-text-secondary !important;
}

</style>

