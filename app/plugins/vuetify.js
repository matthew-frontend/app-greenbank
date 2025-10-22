// plugins/00-vuetify.js
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetifyApp = createVuetify({          // ⬅ เปลี่ยนชื่อเป็น vuetifyApp
    components,
    directives,
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: '#0ea5e9',
            secondary: '#64748b',
            success: '#10b981',
            warning: '#f59e0b',
            error:   '#ef4444',
            surface: '#0e1e29',
            background: '#0b0b0c',
          },
        },
      },
    },
  })

  nuxtApp.vueApp.use(vuetifyApp)
})
