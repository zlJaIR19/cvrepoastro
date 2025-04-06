// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@styles': '/src/styles',
        '@utils': '/src/utils',
        '@assets': '/src/assets',
        '@i18n': '/src/i18n',
      },
    },
  },
});