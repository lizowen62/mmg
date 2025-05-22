<template>
  <v-footer
    app
    height="40"
    color="orange"
  >
    <a
      v-for="item in items"
      :key="item.title"
      class="d-inline-block mx-2 social-link flex flex-row"
      :href="item.href"
      rel="noopener noreferrer"
      target="_blank"
      :title="item.title"
    >
      <v-icon
        :icon="item.icon"
        color="white"
        :size="item.icon === '$vuetify' ? 24 : 16"
      />
      <p>{{ item.subtitle }}</p>
    </a>

    <div
      class="text-caption text-disabled"
      style="position: absolute; right: 16px;"
    >
      &copy; 2001-{{ (new Date()).getFullYear() }} <span class="d-none d-sm-inline-block">Monaco Maladie génétique</span>
      —
      <a
        class="text-decoration-none on-surface"
        href="https://vuetifyjs.com/about/licensing/"
        rel="noopener noreferrer"
        target="_blank"
      >
        MIT License
      </a>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
  const items = [
    {
      title: 'Facebook',
      subtitle: 'Suivez nous sur Facebook',
      icon: `mdi-facebook`,
      href: 'https://vuetifyjs.com/',
    },
    {
      title: 'Instagram',
      subtitle: 'Suivez nous sur Instagram',
      icon: 'mdi-instagram',
      href: 'https://support.vuetifyjs.com/',
    },
    {
      title: 'X',
      subtitle: 'Twitter',
      icon: `mdi-x-twitter`,
      href: 'https://x.com/vuetifyjs',
    },
  ]
</script>

<style scoped lang="sass">
  .social-link :deep(.v-icon)
    color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
    text-decoration: none
    transition: .2s ease-in-out

    &:hover
      color: rgba(25, 118, 210, 1)
</style>
