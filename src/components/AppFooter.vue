<template>
  <v-footer app height="40" color="orange">
    <a
      v-for="item in items"
      :key="item.title"
      style="
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        text-decoration: none;
      "
      class="mx-2 social-link"
      :href="item.href"
      rel="noopener noreferrer"
      target="_blank"
      :title="item.title"
    >
      <v-icon
        :icon="item.icon"
        style="margin-right: 0.5em"
        color="white"
        :size="item.icon === '$vuetify' ? 24 : 16"
      />
      <p v-if="$vuetify.display.mdAndUp" style="color: white; text-decoration: none">{{ t('réseaux') }} {{ item.subtitle }}</p>
    </a>

    <div v-if="$vuetify.display.smAndUp" class="text-caption text-disabled" style="position: absolute; right: 16px">
      &copy; 2001-{{ new Date().getFullYear() }}
      <span class="d-none d-sm-inline-block">{{ t('mmg') }}</span>
      —
      <RouterLink
        class="text-decoration-none on-surface"
        to="/contact"
      >
        {{ t('contact') }}
      </RouterLink>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import eventBus from '../eventBus'

const { t } = useI18n()

const openDialog = () => {
  eventBus.emit('openDialog')
}

const items = [
  {
    title: 'Facebook',
    subtitle: 'Facebook',
    icon: `mdi-facebook`,
    href: 'https://vuetifyjs.com/',
  },
  {
    title: 'Instagram',
    subtitle: 'Instagram',
    icon: 'mdi-instagram',
    href: 'https://support.vuetifyjs.com/',
  },
  {
    title: 'X',
    subtitle: 'Twitter',
    icon: `mdi-twitter`,
    href: 'https://x.com/Telethon_France',
  },
];
</script>

<style scoped lang="sass">
.social-link :deep(.v-icon)
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
  text-decoration: none
  transition: .2s ease-in-out

  &:hover
    color: rgba(25, 118, 210, 1)
</style>
