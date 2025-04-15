import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'index.html'),
        sidebar: resolve(__dirname, 'public/sidebar.html'),
        contentScript: resolve(__dirname, 'src/contentScript.ts'),
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === 'contentScript') return 'assets/contentScript.js';
          if (chunk.name === 'sidebar') return 'assets/sidebar.js';
          return 'assets/[name].js';
        }
      }
    }
  }
});