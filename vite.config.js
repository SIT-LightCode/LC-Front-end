import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const VITE_BASE = process.env.VITE_BASE;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  base: VITE_BASE,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
  ,
  build: {
    target: 'esnext', // Set the output format to "esm"
  },
})
