import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' 
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/my-resume/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  
  server: {
    port: 3000,
  },
})
