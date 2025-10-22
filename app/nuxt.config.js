import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
  ssr: false,
  dir: { public: "public" },
  app: {
    baseURL: "/",
    head: {
      base: [{ href: "/" }],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+Thai:wght@300;400;500;600;700&display=swap",
        },
      ],
    },
  },
  modules: ["@nuxtjs/i18n",'@pinia/nuxt'],

  i18n: {
    strategy: "prefix",
    defaultLocale: "en",
    lazy: true,
    langDir: "locales",
    locales: [
      { code: "en", file: "en.json", name: "English" } 
    ],
    vueI18n: "./i18n.config.ts",
  },

  css: ["~/assets/scss/main.scss", "~/assets/scss/swal.scss", "aos/dist/aos.css", "@mdi/font/css/materialdesignicons.css", "remixicon/fonts/remixicon.css"],
  build: { transpile: ["vuetify"] },
  vite: {
    plugins: [vuetify({ autoImport: true })],
    ssr: {
      noExternal: ["vuetify"],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/scss/variables.scss" as *;
            @use "@/assets/scss/mixins.scss" as *;
          `,
        },
      },
    },
  },
  nitro: {
    static: true,
  },
   runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8080/api',
    },
  },
  devtools: { enabled: false },
});
