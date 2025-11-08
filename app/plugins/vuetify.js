// plugins/00-vuetify.js
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetifyApp = createVuetify({
    // ⬅ เปลี่ยนชื่อเป็น vuetifyApp
    components,
    directives,
    theme: {
      defaultTheme: "light",
      themes: {
        light: {
          colors: {
            primary: "#268c6f",
            secondary: "#64748b",
            success: "#10b981",
            warning: "#f59e0b",
            error: "#ef4444",
            blue: "#0066ff",
            green: "#268c6f",
            surface: "#fff",
            background: "#0b0b0c",
          },
        },
      },
    },
    display: {
      thresholds: {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
      },
    },
    defaults: {
      VTextField: {
        rounded: "lg", // 12px
      },
      VTextarea: {
        rounded: "lg",
      },
      VSelect: {
        rounded: "lg",
      },
      VAutocomplete: {
        rounded: "lg",
      },
      VCombobox: {
        rounded: "lg",
      },
      VFileInput: {
        rounded: "lg",
      },
    },
  });

  nuxtApp.vueApp.use(vuetifyApp);
});
