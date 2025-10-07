<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <h1 class="text-h4" style="text-align: center; color: orange">{{ t('WIP') }}</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const display = useDisplay()

// Form refs
const form = ref(null)
const valid = ref(false)

// Champs
const name = ref('')
const email = ref('')
const message = ref('')

// Règles de validation
const rules = {
  required: value => !!value || 'Ce champ est requis',
  email: value =>
    /.+@.+\..+/.test(value) || 'Adresse e-mail invalide',
}

const subjects = [
  'Support technique',
  'Demande commerciale',
  'Autre'
]

// Soumission
const submit = () => {
  if (form.value?.validate()) {
    console.log('Formulaire soumis:', {
      name: name.value,
      email: email.value,
      message: message.value,
    })
    // 👉 ici tu pourrais envoyer via API/axios
    alert('Merci pour ton message !')
    form.value.reset()
  }
}
</script>