<template>
  <v-container class="py-12">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h1 class="text-h4 mb-4">Contactez-nous</h1>
        <p class="mb-8">
          Une question ? Un projet ? N’hésitez pas à nous écrire via ce formulaire.
        </p>

        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="submit"
        >
          <v-text-field
            v-model="name"
            :rules="[rules.required]"
            label="Nom"
            outlined
            class="mb-4"
            required
          />

          <v-select
            v-model="subject"
            :items="subjects"
            label="Sujet"
            :rules="[rules.required]"
            outlined
            class="mb-4"
            required
          />

          <v-text-field
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="Email"
            outlined
            class="mb-4"
            required
          />

          <v-textarea
            v-model="message"
            :rules="[rules.required]"
            label="Message"
            outlined
            rows="5"
            required
          />

          <div class="text-start pt-4">
            <v-btn
              type="submit"
              :disabled="!valid"
              color="orange"
              class="text-white px-8 py-6"
              style="display: flex; justify-content: center; align-items: center;"
              size="large"
            >
              Envoyer
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

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