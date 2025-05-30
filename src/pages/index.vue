<template>
  <HelloWorld />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { sanity } from '../sanity';
import type { SanityDocument } from '@sanity/client';

interface HomePage extends SanityDocument {
  heroTitle: string;
  heroImage: any;
  sections: Array<{
    title: string;
    content: string;
  }>;
}

const home = ref([]);

onMounted(async () => {
  const data = await sanity.fetch(`*[_type == "post" && isFeatured == true]{
    title,
    slug,
    mainImage {
      asset-> {
        url
      }
    }
  }`);
  home.value = data;
  console.log(home.value);
});

const colors = ['indigo', 'warning', 'pink darken-2', 'red lighten-1', 'deep-purple accent-4'];
</script>
