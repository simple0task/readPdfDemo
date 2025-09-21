import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { ja } from 'vuetify/locale'

export const vuetify = createVuetify({
  ssr: true,
  components: {
    ...components,
    VDateInput,
  },
  locale: {
    locale: 'ja',
    messages: { ja },
  },
})

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vuetify)
})
