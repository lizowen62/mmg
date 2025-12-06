<template>
  <v-footer app height="40" class="app-footer">
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

    <div v-if="$vuetify.display.smAndUp" class="text-caption text-disabled" style="position: absolute; right: 16px; color: white !important">
      &copy; 2001-{{ new Date().getFullYear() }}
      <span class="d-none d-sm-inline-block" >{{ t('mmg') }}</span>
      —
      <!-- text-decoration-none -->
      <RouterLink
        class=" on-surface color-link"
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

<style lang="scss">
.app-footer {
  background-color: $blue !important;
  color: $color-text-secondary !important;
}

.color-link {
  font-weight: 500;
  color: white !important;
}
</style>
