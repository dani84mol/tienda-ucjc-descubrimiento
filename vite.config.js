import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/tienda-ucjc-descubrimiento/',
  build: {
    rollupOptions: {
      input: 'dev.html',
      output: {
        entryFileNames: 'remote.js',
      },
    },
  },
});