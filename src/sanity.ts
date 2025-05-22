import { createClient } from '@sanity/client'

export const sanity = createClient({
  projectId: 'su8vzff9',   // ← depuis sanity.io/manage
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-01-01',
})