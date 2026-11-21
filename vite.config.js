import { defineConfig } from 'vite';

export default defineConfig({
  // Usa la variable VITE_BASE_PATH si existe, o la ruta del repo por defecto
  base: process.env.VITE_BASE_PATH || '/tienda-ucjc-descubrimiento/',
  build: {
    rollupOptions: {
      output: {
        // Asegura que el punto de entrada se llame exactamente remote.js
        entryFileNames: 'remote.js',
      },
    },
  },
});
