<template>
  <v-container v-if="posts">
    <div style="display: flex; flex-direction: column; align-items: start; justify-content: start;">
        <div class="grid">
            <div class="card" v-for="post in posts" :key="post.id">
                <v-card-title style="text-align: center; color: orange;">
                    {{ post.title }}
                </v-card-title> 
                <v-img
                :aspect-ratio="16/9"
                :src="post.mainImage.asset.url"
                cover
                />
                <v-card-text>
                    <p style="color: orange;">Publié le {{ formatDate(post.publishedAt) }}</p>
                </v-card-text>
            </div>
        </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { sanity } from '../sanity'

const route = useRoute()
const posts = ref(null)

const getPost = async () => {
  return await sanity.fetch(`*[_type == "post"]{
    title,
    body,
    publishedAt,
    mainImage {
      asset->{
        url
      }
    }
  }`)
}

function formatDate(dateStr) {
      const date = new Date(dateStr)
      return new Intl.DateTimeFormat('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Paris'
      }).format(date)
    }

onMounted(async () => {
  posts.value = await getPost()
  console.log(posts.value)
})

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
</style>