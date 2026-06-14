import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  build: {
    sourcemap: false
  },
  plugins: [
    vue(), 
    tailwindcss()
  ],
})
