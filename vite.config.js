import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    lib: {
      entry: './src/main.js',
      name: 'UcjcDescubrimiento',
      fileName: 'remote',
      formats: ['es']
    },
    rollupOptions: {
      // Si usas dependencias externas que provee el shell, ponlas aquí.
      // Si todo va autocontenido en el custom element, puedes dejarlo vacío.
      external: [],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'remote.css';
          return assetInfo.name;
        }
      }
    }
  }
});