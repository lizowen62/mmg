<template>
    <div>
      <PortableText :value="value" :components="myComponents" />
    </div>
  </template>
  
  <script setup>
  import { PortableText } from '@portabletext/vue'
  
  const props = defineProps({
    value: {
      type: Array,
      required: true,
    },
  })
  
  // Tu peux customiser les tags ici :
  const myComponents = {
    types: {
      image: ({ value }) => {
        return h('img', {
          src: value.asset?.url,
          alt: value.alt || '',
          style: 'max-width: 100%;',
        })
      },
    },
    marks: {
      link: ({ children, value }) => {
        return h('a', { href: value.href, target: '_blank', rel: 'noopener' }, children)
      },
    },
  }
  </script>